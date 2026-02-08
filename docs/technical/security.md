# Security Considerations

Security best practices and considerations for JSON Visualization.

## Overview

JSON Visualization is a client-side application with security built into its architecture. All data processing happens in the browser, and no data is sent to servers.

## Client-Side Security

### Data Privacy

**All processing is local:**
- No data sent to servers
- No external API calls with user data
- No tracking of data content
- No server-side storage

**Browser storage:**
- SessionStorage for temporary data
- Cleared on tab close
- Not encrypted (browser limitation)
- No sensitive data persisted

**Recommendation:**
- Clear browser cache after use
- Use private/incognito mode for sensitive data
- Don't save sensitive data to files

### XSS Prevention

**Input sanitization:**
```typescript
// Sanitize user input
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
```

**React automatic escaping:**
```typescript
// ✅ Safe - React escapes by default
<div>{userInput}</div>

// ❌ Dangerous - bypasses escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Content Security Policy:**
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

### Code Injection

**Avoid eval():**
```typescript
// ❌ Dangerous
eval(userCode);

// ✅ Safe - use JSON.parse
JSON.parse(userInput);
```

**Avoid Function constructor:**
```typescript
// ❌ Dangerous
new Function(userCode)();

// ✅ Safe - use safe alternatives
```

**Monaco Editor safety:**
- Read-only mode for untrusted content
- Sandboxed execution
- No code execution from editor

## Data Validation

### Input Validation

**Validate format:**
```typescript
function validateJson(input: string): boolean {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}
```

**Validate size:**
```typescript
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function validateSize(input: string): boolean {
  return input.length <= MAX_SIZE;
}
```

**Validate structure:**
```typescript
function validateStructure(data: any): boolean {
  // Check for circular references
  try {
    JSON.stringify(data);
    return true;
  } catch {
    return false;
  }
}
```

### Schema Validation

**JSON Schema:**
```typescript
import Ajv from "ajv";

const ajv = new Ajv();
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number", minimum: 0 },
  },
  required: ["name"],
};

const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.error(validate.errors);
}
```

## File Upload Security

### File Type Validation

```typescript
const ALLOWED_TYPES = [
  "application/json",
  "text/yaml",
  "text/csv",
  "application/xml",
  "application/toml",
];

function validateFileType(file: File): boolean {
  return ALLOWED_TYPES.includes(file.type);
}
```

### File Size Limit

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}
```

### Safe File Reading

```typescript
async function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Invalid file content"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    
    reader.readAsText(file);
  });
}
```

## URL Import Security

### URL Validation

```typescript
function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    
    // Only allow HTTP(S)
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }
    
    // Block localhost/private IPs
    if (isPrivateIP(parsed.hostname)) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

function isPrivateIP(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname.startsWith("127.") ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("172.")
  );
}
```

### CORS Handling

```typescript
async function fetchUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      mode: "cors",
      credentials: "omit", // Don't send cookies
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch: ${error.message}`);
  }
}
```

## Dependency Security

### Regular Updates

```bash
# Check for vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit fix

# Update dependencies
pnpm update
```

### Dependency Scanning

**GitHub Dependabot:**
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Lock File

**Always commit:**
- `pnpm-lock.yaml`
- Ensures reproducible builds
- Prevents supply chain attacks

## Environment Variables

### Secure Storage

```env
# .env.local (gitignored)
NEXT_PUBLIC_API_KEY=secret-key
```

**Never commit:**
- API keys
- Secrets
- Passwords
- Tokens

### Public Variables

```env
# Only NEXT_PUBLIC_* exposed to browser
NEXT_PUBLIC_NODE_LIMIT=1000

# Private (server-only)
API_SECRET=secret
```

## Authentication (Future)

If authentication is added:

### JWT Handling

```typescript
// Store in httpOnly cookie (not localStorage)
// Server sets cookie
res.setHeader("Set-Cookie", `token=${jwt}; HttpOnly; Secure; SameSite=Strict`);

// Client reads from cookie automatically
// No JavaScript access to token
```

### Session Management

```typescript
// Expire sessions
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Refresh tokens
async function refreshToken() {
  const response = await fetch("/api/refresh", {
    method: "POST",
    credentials: "include",
  });
  
  if (!response.ok) {
    // Logout user
    logout();
  }
}
```

## Security Headers

### Recommended Headers

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Permissions policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
```

## HTTPS

### Always Use HTTPS

**Production:**
- Vercel: Automatic HTTPS
- Custom domain: Use Let's Encrypt
- Cloudflare: Free SSL

**Development:**
```bash
# Use mkcert for local HTTPS
mkcert -install
mkcert localhost
```

### HSTS

```javascript
// Strict-Transport-Security header
{
  key: "Strict-Transport-Security",
  value: "max-age=31536000; includeSubDomains",
}
```

## Rate Limiting (Future)

If API is added:

```typescript
// Simple rate limiter
const rateLimiter = new Map();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimiter.get(ip) || [];
  
  // Remove old requests
  const recent = requests.filter(time => now - time < 60000);
  
  // Check limit (100 requests per minute)
  if (recent.length >= 100) {
    return false;
  }
  
  recent.push(now);
  rateLimiter.set(ip, recent);
  return true;
}
```

## Security Checklist

### Development

- [ ] No secrets in code
- [ ] Input validation
- [ ] Output sanitization
- [ ] Dependencies updated
- [ ] No eval() or Function()
- [ ] HTTPS in production
- [ ] Security headers set
- [ ] CSP configured

### Deployment

- [ ] Environment variables secure
- [ ] HTTPS enabled
- [ ] Security headers active
- [ ] Dependencies scanned
- [ ] Error messages sanitized
- [ ] Logging configured
- [ ] Monitoring active

## Reporting Security Issues

**Found a security issue?**

1. **Do not** open public issue
2. Email: security@example.com
3. Include:
   - Description
   - Steps to reproduce
   - Impact assessment
   - Suggested fix (if any)

**Response time:**
- Acknowledgment: 24 hours
- Initial assessment: 48 hours
- Fix timeline: Based on severity

## Related

- [Architecture](../development/architecture.md) - System design
- [Deployment](../development/deployment.md) - Secure deployment
- [Privacy Policy](../../docs/legal/privacy.tsx) - Privacy details
