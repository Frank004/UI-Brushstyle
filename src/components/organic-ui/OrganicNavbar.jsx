import React from 'react';
import { OrganicBox } from './OrganicBox';
import { OrganicButton } from './OrganicButton';
import { getFontFamily, getFontWeight, getColor } from './utils';

const renderActionButton = (action, variant = 'primary', extraClass = '') => {
  if (!action) return null;
  return (
    <OrganicButton
      variant={variant}
      size="small"
      onClick={action.onClick}
      className={`whitespace-nowrap ${extraClass}`.trim()}
      fullWidth={false}
    >
      {action.label}
    </OrganicButton>
  );
};

export const OrganicNavbar = ({
  brand,
  links = [],
  actions,
  className = '',
  strokeWidth = 5,
  strokeColor,
  backgroundColor
}) => {
  const resolvedStroke = strokeColor ?? getColor('border');
  const resolvedBackground = backgroundColor ?? getColor('surface');
  const textColor = getColor('surfaceText');
  const textMuted = getColor('surfaceTextMuted');

  return (
    <OrganicBox
      className={`w-full ${className}`}
      strokeWidth={strokeWidth}
      strokeColor={resolvedStroke}
      backgroundColor={resolvedBackground}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: getFontFamily('display'),
              fontWeight: getFontWeight('bold'),
              fontSize: '1.5rem',
              color: textColor
            }}
          >
            {brand}
          </div>
          {(actions?.primary || actions?.secondary) && (
            <div className="flex items-center gap-2 lg:hidden">
              {renderActionButton(actions?.secondary, 'gray')}
              {renderActionButton(actions?.primary, 'primary')}
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-2 text-sm lg:flex-row lg:items-center lg:gap-6" style={{ color: textMuted }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href ?? '#'}
              className="transition-colors hover-text-ink"
              style={{ fontFamily: getFontFamily('body') }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {(actions?.primary || actions?.secondary) && (
          <div className="hidden items-center gap-3 lg:flex">
            {renderActionButton(actions?.secondary, 'gray')}
            {renderActionButton(actions?.primary, 'primary')}
          </div>
        )}
      </div>
    </OrganicBox>
  );
};
