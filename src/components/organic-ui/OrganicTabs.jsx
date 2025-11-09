import React, { useMemo, useState } from 'react';
import { OrganicBox } from './OrganicBox';
import { OrganicButton } from './OrganicButton';
import { stringToSeed, getFontFamily, getFontWeight, getColor, organicSeeds } from './utils';

const generateOrganicLine = ({ segments = 6, amplitude = 12, seed = 1 }) => {
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

export const OrganicTabs = ({
  tabs = [],
  defaultValue,
  onValueChange,
  className = '',
  strokeWidth = 5,
  orientation = 'horizontal'
}) => {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? null);

  const handleSelect = (value) => {
    setActive(value);
    onValueChange?.(value);
  };

  const activeTab = useMemo(() => tabs.find((tab) => tab.value === active), [tabs, active]);

  // Fallback al estilo anterior si se requiere orientación vertical
  if (orientation === 'vertical') {
    return (
      <OrganicBox className={className} strokeWidth={strokeWidth}>
        <div className="flex flex-col gap-3 md:flex-row md:gap-6 mb-6">
          {tabs.map((tab) => (
            <OrganicButton
              key={tab.value}
              size="small"
              variant={tab.value === active ? 'primary' : 'default'}
              strokeWidth={tab.value === active ? 6 : 4}
              onClick={() => handleSelect(tab.value)}
              className="min-w-[120px]"
            >
              {tab.label}
            </OrganicButton>
          ))}
        </div>
        <div className="mt-4">
          {activeTab?.content || (
            <p className="text-sm" style={{ color: getColor('surfaceTextMuted') }}>Selecciona una pestaña para ver el contenido.</p>
          )}
        </div>
      </OrganicBox>
    );
  }

  const baseLinePath = useMemo(() => generateOrganicLine({ amplitude: 8, seed: organicSeeds.tabsLine }), []);
  const linePaths = useMemo(() => {
    const result = {};
    tabs.forEach((tab, index) => {
      const seed = stringToSeed(tab.value) || (index + 1) * 97;
      result[tab.value] = generateOrganicLine({ amplitude: 18, seed });
    });
    return result;
  }, [tabs]);

  const activeStrokeWidth = 7;
  const baseStrokeWidth = 5;
  const surface = getColor('surface');
  const borderMuted = getColor('borderMuted');
  const accent = getColor('accent');
  const text = getColor('surfaceText');
  const textMuted = getColor('surfaceTextMuted');

  return (
    <div
      className={`relative rounded-3xl ${className}`}
      style={{
        padding: 'clamp(1rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem)',
        backgroundColor: surface
      }}
    >
      <div className="relative pb-6">
        <div
          className="flex flex-wrap gap-8 text-sm uppercase tracking-[0.18em]"
          style={{ color: textMuted }}
        >
          {tabs.map((tab) => {
            const isActive = tab.value === active;
            const linePath = linePaths[tab.value];
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleSelect(tab.value)}
                className="relative pb-3 transition-colors duration-200"
                style={{
                  fontFamily: getFontFamily('display'),
                  fontWeight: getFontWeight(isActive ? 'bold' : 'medium'),
                  color: isActive ? text : textMuted
                }}
              >
                <span className="block font-semibold">{tab.label}</span>
                {isActive && linePath && (
                  <svg
                    className="absolute left-0 right-0 bottom-0 h-2 w-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={linePath}
                      fill="none"
                      stroke={accent}
                      strokeWidth={activeStrokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
        <svg
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-2 w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d={baseLinePath}
            fill="none"
            stroke={borderMuted}
            strokeWidth={baseStrokeWidth}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="mt-4">
        {activeTab?.content || (
          <p className="text-sm" style={{ color: textMuted }}>Selecciona una pestaña para ver el contenido.</p>
        )}
      </div>
    </div>
  );
};
