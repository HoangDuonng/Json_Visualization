import clsx from "clsx";
import { useRef, useState, useCallback, useEffect } from "react";
import { t } from "../../i18n";
import { alertTriangleIcon, zoomIn, zoomOut } from "../icons";
import Spinner from "../ui/Spinner";

const PREVIEW_ZOOM_MIN = 0.1;
const PREVIEW_ZOOM_MAX = 4;
const PREVIEW_ZOOM_STEP = 0.25;
const WHEEL_ZOOM_SENSITIVITY = 0.002;

interface TTDDialogOutputProps {
  error: Error | null;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  loaded: boolean;
  hideErrorDetails?: boolean;
}

export const TTDDialogOutput = ({
  error,
  canvasRef,
  loaded,
  hideErrorDetails,
}: TTDDialogOutputProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const zoomTowardPoint = useCallback(
    (newZoom: number, centerX: number, centerY: number) => {
      setZoom(z => {
        const clamped = Math.max(PREVIEW_ZOOM_MIN, Math.min(PREVIEW_ZOOM_MAX, newZoom));
        setPan(p => ({
          x: centerX * (1 - clamped / z) + p.x * (clamped / z),
          y: centerY * (1 - clamped / z) + p.y * (clamped / z),
        }));
        return clamped;
      });
    },
    []
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !loaded || error) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const centerX = e.clientX - rect.left - rect.width / 2;
      const centerY = e.clientY - rect.top - rect.height / 2;
      const delta = -e.deltaY * WHEEL_ZOOM_SENSITIVITY;
      setZoom(z => {
        const newZ = Math.max(PREVIEW_ZOOM_MIN, Math.min(PREVIEW_ZOOM_MAX, z * (1 + delta)));
        setPan(p => ({
          x: (centerX - p.x) * (1 - newZ / z) + p.x * (newZ / z),
          y: (centerY - p.y) * (1 - newZ / z) + p.y * (newZ / z),
        }));
        return newZ;
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [loaded, error]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    setPan(p => ({ x: p.x + dx, y: p.y + dy }));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const zoomOutPreview = () => {
    zoomTowardPoint(zoom - PREVIEW_ZOOM_STEP, 0, 0);
  };
  const zoomInPreview = () => {
    zoomTowardPoint(zoom + PREVIEW_ZOOM_STEP, 0, 0);
  };
  const resetPreviewZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const showZoom = loaded && !error;

  return (
    <div className={`ttd-dialog-output-wrapper ${error ? "ttd-dialog-output-wrapper--error" : ""}`}>
      {error && (
        <div key="error" data-testid="ttd-dialog-output-error" className="ttd-dialog-output-error">
          <div className="ttd-dialog-output-error-content">
            <div className="ttd-dialog-output-error-icon">{alertTriangleIcon}</div>
            <div className="ttd-dialog-output-error-title">{t("ttd.error")}</div>
            <div className="ttd-dialog-output-error-message">
              {hideErrorDetails ? t("chat.errors.mermaidParseError") : error.message}
            </div>
          </div>
        </div>
      )}
      {loaded ? (
        <div
          key="canvas"
          ref={viewportRef}
          className={clsx("ttd-dialog-output-canvas-container", {
            invisible: !!error,
            "ttd-dialog-output-canvas-container--grabbing": isDragging,
          })}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div
            className="ttd-dialog-output-canvas-scaled"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <div ref={canvasRef} className="ttd-dialog-output-canvas-content" />
          </div>
          {showZoom && (
            <div
              className="ttd-dialog-output-zoom-controls"
              role="group"
              aria-label="Preview zoom"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                className="ttd-dialog-output-zoom-btn"
                onClick={zoomOutPreview}
                disabled={zoom <= PREVIEW_ZOOM_MIN}
                title={t("buttons.zoomOut")}
              >
                {zoomOut}
              </button>
              <button
                type="button"
                className="ttd-dialog-output-zoom-btn ttd-dialog-output-zoom-reset"
                onClick={resetPreviewZoom}
                title={t("buttons.resetZoom")}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                className="ttd-dialog-output-zoom-btn"
                onClick={zoomInPreview}
                disabled={zoom >= PREVIEW_ZOOM_MAX}
                title={t("buttons.zoomIn")}
              >
                {zoomIn}
              </button>
            </div>
          )}
        </div>
      ) : (
        <Spinner size="2rem" />
      )}
    </div>
  );
};
