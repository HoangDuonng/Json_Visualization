import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Returns ICE servers (STUN/TURN) for WebRTC P2P when using Metered.
 * Uses METERED_DOMAIN + METERED_SECRET_KEY (server-only) to create a
 * credential and build the ICE array. Secret never exposed to client.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const domain = process.env.METERED_DOMAIN;
  const secretKey = process.env.METERED_SECRET_KEY;

  if (!domain?.trim() || !secretKey?.trim()) {
    return res.status(503).json({
      error: "TURN not configured",
      hint: "Set METERED_DOMAIN and METERED_SECRET_KEY in .env",
    });
  }

  const baseUrl = `https://${domain.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  try {
    const createRes = await fetch(
      `${baseUrl}/api/v1/turn/credential?secretKey=${encodeURIComponent(secretKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: "jsonviz-p2p" }),
      }
    );

    if (!createRes.ok) {
      const text = await createRes.text();
      console.error("[turn-credentials] Metered create failed:", createRes.status, text);
      return res.status(502).json({
        error: "Failed to create TURN credential",
        detail: createRes.status === 401 ? "Invalid secret key" : text.slice(0, 200),
      });
    }

    const { username, password } = (await createRes.json()) as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return res.status(502).json({ error: "Invalid credential response from Metered" });
    }

    // Metered fixed hosts (same for all apps); see metered.ca docs
    const iceServers = [
      { urls: "stun:stun.relay.metered.ca:80" },
      { urls: "turn:global.relay.metered.ca:80", username, credential: password },
      { urls: "turn:global.relay.metered.ca:80?transport=tcp", username, credential: password },
      { urls: "turn:global.relay.metered.ca:443", username, credential: password },
      { urls: "turns:global.relay.metered.ca:443?transport=tcp", username, credential: password },
    ];

    res.setHeader("Cache-Control", "private, max-age=300");
    return res.status(200).json(iceServers);
  } catch (err) {
    console.error("[turn-credentials]", err);
    return res.status(500).json({
      error: "Failed to fetch TURN credentials",
      detail: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
