import React, { useMemo } from 'react';
import { stringToSeed } from './utils';

const generateOrganicBand = (seed, thickness) => {
  const segments = 18;
  const width = 100;
  const step = width / segments;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const topPoints = [];
  const bottomPoints = [];

  for (let i = 0; i <= segments; i += 1) {
    const x = step * i;
    const t = i / segments;
    const mid = 50 + (random() - 0.5) * 2;
    const localThickness = thickness * (0.35 + 0.65 * Math.pow(Math.sin(Math.PI * t), 1.2));
    const wobble = (random() - 0.5) * 3;
    const topY = mid - localThickness / 2 + wobble;
    const bottomY = mid + localThickness / 2 + wobble;
    topPoints.push({ x, y: topY });
    bottomPoints.push({ x, y: bottomY });
  }

  let path = `M ${topPoints[0].x} ${topPoints[0].y}`;
  for (let i = 1; i < topPoints.length; i += 1) {
    const prev = topPoints[i - 1];
    const curr = topPoints[i];
    const controlX = prev.x + step / 2;
    const controlY = (prev.y + curr.y) / 2 + (random() - 0.5) * 2;
    path += ` Q ${controlX} ${controlY}, ${curr.x} ${curr.y}`;
  }

  for (let i = bottomPoints.length - 1; i >= 0; i -= 1) {
    const curr = bottomPoints[i];
    if (i === bottomPoints.length - 1) {
      path += ` L ${curr.x} ${curr.y}`;
    } else {
      const next = bottomPoints[i + 1];
      const controlX = curr.x + step / 2;
      const controlY = (curr.y + next.y) / 2 + (random() - 0.5) * 2;
      path += ` Q ${controlX} ${controlY}, ${curr.x} ${curr.y}`;
    }
  }

  path += ' Z';
  return path;
};

export const OrganicDivider = ({
  orientation = 'horizontal',
  color = '#edeff2',
  thickness = 24,
  length = '100%',
  className = '',
  style = {}
}) => {
  const seed = useMemo(() => stringToSeed(`${orientation}-${color}-${thickness}-${length}`), [orientation, color, thickness, length]);
  const pathD = useMemo(() => generateOrganicBand(seed || 1, thickness), [seed, thickness]);

  const isHorizontal = orientation === 'horizontal';
  const containerStyle = {
    width: isHorizontal ? length : `${Math.max(thickness, 32)}px`,
    height: isHorizontal ? `${Math.max(thickness, 32)}px` : length,
    ...style
  };

  return (
    <span className={`block ${className}`} style={containerStyle}>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill={color}
          opacity={0.85}
          transform={isHorizontal ? undefined : 'rotate(90 50 50)'}
        />
      </svg>
    </span>
  );
};
