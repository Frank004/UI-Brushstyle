import React, { useEffect, useMemo, useRef, useState } from 'react';
import { stringToSeed, getColor, organicSeeds } from './utils';

const generateOrganicLine = ({ segments = 8, amplitude = 12, seed = 7 }) => {
  const width = 100;
  const step = width / segments;
  const midY = 50;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  let path = `M 0 ${midY + (random() - 0.5) * amplitude}`;
  for (let i = 1; i <= segments; i += 1) {
    const controlX = step * (i - 0.5);
    const controlY = midY + (random() - 0.5) * amplitude;
    const x = step * i;
    const y = midY + (random() - 0.5) * amplitude;
    path += ` Q ${controlX} ${controlY}, ${x} ${y}`;
  }
  return path;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const OrganicSlider = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  showValue = true,
  className = '',
  accentColor,
  baseColor
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = clamp(isControlled ? value : internalValue, min, max);

  const handleChange = (event) => {
    const next = Number(event.target.value);
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const percent = ((currentValue - min) / (max - min)) || 0;

  const resolvedAccent = accentColor ?? getColor('accent');
  const resolvedBase = baseColor ?? getColor('borderMuted');
  const textColor = getColor('surfaceText');
  const textMuted = getColor('surfaceTextMuted');
  const textSubtle = getColor('surfaceTextSubtle');
  const surfaceColor = getColor('surface');

  const seed = useMemo(() => (label ? stringToSeed(label) : organicSeeds.sliderLine), [label]);
  const pathD = useMemo(() => generateOrganicLine({ amplitude: 10, segments: 10, seed }), [seed]);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [pathD]);

  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      const point = pathRef.current.getPointAtLength(pathLength * percent);
      setKnobPos({ x: point.x, y: point.y });
    }
  }, [percent, pathLength]);

  const clipWidth = Math.max(0, Math.min(100, percent * 100));
  const clipId = useMemo(() => `slider-clip-${Math.abs(seed).toString(36)}-${label ?? 'slider'}`, [seed, label]);

  return (
    <div
      className={`relative w-full rounded-3xl ${className}`}
      style={{
        padding: 'clamp(1rem, 3vw, 2rem)',
        backgroundColor: surfaceColor,
        color: textColor
      }}
    >
      {label && (
        <div className="mb-3 flex items-center justify-between text-sm font-semibold" style={{ color: textColor }}>
          <span>{label}</span>
          {showValue && <span style={{ color: textMuted }}>{currentValue}</span>}
        </div>
      )}
      <div className="relative">
        <svg
          className="w-full h-10 pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={clipWidth} height="100" />
            </clipPath>
          </defs>
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke={resolvedBase}
            strokeWidth={6}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={pathD}
            fill="none"
            stroke={resolvedAccent}
            strokeWidth={8}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            clipPath={`url(#${clipId})`}
          />
        </svg>
        <div
          className="pointer-events-none absolute top-0 left-0 h-10 w-full"
          style={{ transform: 'translateY(-2px)' }}
        >
          <div
            className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md"
            style={
              {
                top: `${knobPos.y}%`,
                left: `${knobPos.x}%`,
                border: `4px solid ${resolvedAccent}`,
                boxShadow: `4px 4px 0 color-mix(in srgb, ${resolvedAccent} 30%, transparent)`,
                backgroundColor: surfaceColor
              }
            }
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="organic-slider-range absolute inset-0 w-full"
        />
      </div>
      <div className="mt-3 flex justify-between text-xs" style={{ color: textSubtle }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
