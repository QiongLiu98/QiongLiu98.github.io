"use client";

import { useCallback, useRef, useState } from "react";
import { clamp, hexToHsv, hsvToHex, type Hsv } from "@/lib/color-math";

type ColorPicker2DProps = {
  value: string;
  onChange: (hex: string) => void;
};

function pickFromPlane(
  rect: DOMRect,
  clientX: number,
  clientY: number,
  hue: number,
): string {
  const x = clamp((clientX - rect.left) / rect.width, 0, 1);
  const y = clamp((clientY - rect.top) / rect.height, 0, 1);
  return hsvToHex({ h: hue, s: x * 100, v: (1 - y) * 100 });
}

export function ColorPicker2D({ value, onChange }: ColorPicker2DProps) {
  const hsv = hexToHsv(value);
  const [hue, setHue] = useState(hsv.h);
  const planeRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"plane" | "hue" | null>(null);

  const onPlanePointer = useCallback(
    (e: React.PointerEvent) => {
      const el = planeRef.current;
      if (!el) return;
      dragging.current = "plane";
      el.setPointerCapture(e.pointerId);
      onChange(pickFromPlane(el.getBoundingClientRect(), e.clientX, e.clientY, hue));
    },
    [hue, onChange],
  );

  const onHuePointer = useCallback(
    (e: React.PointerEvent) => {
      const el = hueRef.current;
      if (!el) return;
      dragging.current = "hue";
      el.setPointerCapture(e.pointerId);
      const rect = el.getBoundingClientRect();
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const newHue = x * 360;
      setHue(newHue);
      const current = hexToHsv(value);
      onChange(hsvToHex({ h: newHue, s: current.s, v: current.v }));
    },
    [onChange, value],
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragging.current === "plane" && planeRef.current) {
        onChange(
          pickFromPlane(
            planeRef.current.getBoundingClientRect(),
            e.clientX,
            e.clientY,
            hue,
          ),
        );
      }
      if (dragging.current === "hue" && hueRef.current) {
        const rect = hueRef.current.getBoundingClientRect();
        const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
        const newHue = x * 360;
        setHue(newHue);
        const current = hexToHsv(value);
        onChange(hsvToHex({ h: newHue, s: current.s, v: current.v }));
      }
    },
    [hue, onChange, value],
  );

  const endDrag = useCallback(() => {
    dragging.current = null;
  }, []);

  const sat = hsv.s / 100;
  const val = hsv.v / 100;

  return (
    <div className="space-y-3">
      <div
        ref={planeRef}
        role="application"
        aria-label="Saturation and brightness — drag horizontally for saturation, vertically for brightness"
        className="relative h-36 w-full cursor-crosshair touch-none select-none overflow-hidden rounded-sm border border-[var(--color-rule)]"
        style={{ backgroundColor: `hsl(${hue} 100% 50%)` }}
        onPointerDown={onPlanePointer}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white shadow-md"
          style={{
            left: `${sat * 100}%`,
            top: `${(1 - val) * 100}%`,
            backgroundColor: value,
          }}
          aria-hidden
        />
      </div>

      <div
        ref={hueRef}
        role="slider"
        aria-label="Hue"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hue)}
        className="relative h-3 w-full cursor-ew-resize touch-none select-none rounded-full border border-[var(--color-rule)]"
        style={{
          background:
            "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
        }}
        onPointerDown={onHuePointer}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{
            left: `${(hue / 360) * 100}%`,
            backgroundColor: `hsl(${hue} 100% 50%)`,
          }}
          aria-hidden
        />
      </div>

      <div className="flex items-center gap-2">
        <span
          className="h-8 w-8 shrink-0 rounded-sm border border-[var(--color-rule)]"
          style={{ backgroundColor: value }}
          aria-hidden
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value.trim();
            if (/^#[0-9a-fA-F]{6}$/.test(v)) {
              onChange(v.toLowerCase());
              setHue(hexToHsv(v).h);
            }
          }}
          className="num w-full rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1.5 text-xs text-[var(--color-ink)]"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
