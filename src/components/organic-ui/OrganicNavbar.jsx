import React from 'react';
import { OrganicBox } from './OrganicBox';
import { OrganicButton } from './OrganicButton';

const renderActionButton = (action, variant = 'primary', extraClass = '') => {
  if (!action) return null;
  return (
    <OrganicButton
      variant={variant}
      size="small"
      onClick={action.onClick}
      className={extraClass}
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
  strokeColor = '#000000',
  backgroundColor = 'white'
}) => {
  return (
    <OrganicBox
      className={`w-full ${className}`}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      backgroundColor={backgroundColor}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xl font-semibold text-[#1e1e1e] flex items-center gap-2">
            {brand}
          </div>
          {(actions?.primary || actions?.secondary) && (
            <div className="flex items-center gap-2 lg:hidden">
              {renderActionButton(actions?.secondary, 'gray')}
              {renderActionButton(actions?.primary, 'primary')}
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-2 text-sm text-[#1e1e1e]/80 lg:flex-row lg:items-center lg:gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href ?? '#'}
              className="hover:text-[#1e1e1e] transition-colors"
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
