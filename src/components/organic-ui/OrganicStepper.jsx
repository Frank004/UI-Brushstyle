import React, { useMemo } from 'react';
import { stringToSeed } from './utils';

const generateBrushPath = (segments, seed) => {
  const width = 100;
  const height = 12;
  const step = width / segments;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  let path = `M 0 ${height / 2 + (random() - 0.5) * 2}`;
  for (let i = 1; i <= segments; i += 1) {
    const controlX = step * (i - 0.5);
    const controlY = height / 2 + (random() - 0.5) * 2;
    const x = step * i;
    const y = height / 2 + (random() - 0.5) * 2;
    path += ` C ${controlX} ${controlY}, ${controlX} ${controlY}, ${x} ${y}`;
  }

  return path;
};

export const OrganicStepper = ({
  steps = [],
  current = 0,
  variant = 'linear',
  className = ''
}) => {
  if (variant === 'circular') {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(1, Math.max(0, current / Math.max(steps.length - 1, 1)));

    return (
      <div className={`flex flex-col items-center gap-3 rounded-3xl bg-white px-8 py-6 ${className}`}>
        <div className="relative">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#2563eb"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - circumference * progress}
              transform="rotate(-90 80 80)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#1e1e1e]/50">Paso</p>
            <p className="text-4xl font-bold leading-none text-[#1e1e1e]">{current + 1}</p>
            <p className="text-xs text-[#1e1e1e]/60">de {steps.length}</p>
          </div>
        </div>
        {steps[current] && (
          <p className="text-sm font-semibold text-[#1e1e1e] text-center">
            {steps[current].label}
          </p>
        )}
      </div>
    );
  }

  const progressPct = Math.min(1, Math.max(0, current / Math.max(steps.length - 1, 1)));
  const seed = useMemo(() => stringToSeed(`stepper-${steps.length}`), [steps.length]);
  const linePath = useMemo(() => generateBrushPath(24, seed), [seed]);

  return (
    <div className={`rounded-3xl bg-white p-6 ${className}`}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {steps.map((step, index) => {
            const status = index === current ? 'current' : index < current ? 'complete' : 'pending';
            return (
              <div key={step.label} className="flex flex-col items-center text-center min-w-[140px]">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-4 text-base font-semibold ${
                    status === 'current'
                      ? 'border-[#2563eb] text-[#2563eb]'
                      : status === 'complete'
                      ? 'border-[#16a34a] text-[#16a34a]'
                      : 'border-[#1e1e1e]/40 text-[#1e1e1e]/50'
                  }`}
                >
                  {index + 1}
                </span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1e1e1e]/60">
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="relative h-8">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 12" preserveAspectRatio="none">
            <path
              d={linePath}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={8}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <clipPath id="progress-mask">
                <rect x="0" y="0" width={progressPct * 100} height="12" />
              </clipPath>
            </defs>
            <path
              d={linePath}
              fill="none"
              stroke="#2563eb"
              strokeWidth={10}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              clipPath="url(#progress-mask)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
