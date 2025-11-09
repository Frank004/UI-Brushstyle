import React from 'react';
import { OrganicBox } from './OrganicBox';
import { brushShadows, getFontFamily, getFontWeight, getFontSize } from './utils';
import {
  TfiInfoAlt,
  TfiCheck,
  TfiAlert,
  TfiAnnouncement
} from 'react-icons/tfi';

const variantStyles = {
  info: {
    background: '#eef5ff',
    stroke: '#1d4ed8',
    iconColor: '#1d4ed8'
  },
  success: {
    background: '#ecfdf5',
    stroke: '#047857',
    iconColor: '#047857'
  },
  warning: {
    background: '#fff7ed',
    stroke: '#b45309',
    iconColor: '#b45309'
  },
  danger: {
    background: '#fef2f2',
    stroke: '#b91c1c',
    iconColor: '#b91c1c'
  },
  announcement: {
    background: '#f5f3ff',
    stroke: '#6d28d9',
    iconColor: '#6d28d9'
  }
};

const variantIcons = {
  info: TfiInfoAlt,
  success: TfiCheck,
  warning: TfiAlert,
  danger: TfiAlert,
  announcement: TfiAnnouncement
};

export const OrganicAlert = ({
  title,
  description,
  variant = 'info',
  onClose,
  actions,
  className = '',
  strokeWidth = 4,
  icon,
  compact = false
}) => {
  const styles = variantStyles[variant] || variantStyles.info;
  const Icon = icon || variantIcons[variant] || TfiInfoAlt;

  return (
    <OrganicBox
      className={`w-full ${className}`}
      strokeWidth={strokeWidth}
      backgroundColor={styles.background}
      strokeColor={styles.stroke}
      style={{ filter: brushShadows.soft }}
    >
      <div className={`flex ${compact ? 'items-center' : 'items-start'} gap-4`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80`}
          style={{ color: styles.iconColor, border: `2px solid ${styles.stroke}` }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="flex-1 space-y-1">
          {title && (
            <p
              style={{
                fontFamily: getFontFamily('body'),
                fontWeight: getFontWeight('semibold'),
                fontSize: getFontSize('lg')
              }}
              className="text-[#1e1e1e]"
            >
              {title}
            </p>
          )}
          {description && (
            <p
              className={`${compact ? 'leading-snug' : 'leading-relaxed'} text-[#1e1e1e]/80`}
              style={{
                fontFamily: getFontFamily('body'),
                fontSize: getFontSize('sm'),
                fontWeight: getFontWeight('regular')
              }}
            >
              {description}
            </p>
          )}
          {actions && <div className="mt-3 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-white/50"
            aria-label="Cerrar alerta"
            style={{
              fontFamily: getFontFamily('display'),
              fontWeight: getFontWeight('bold'),
              fontSize: getFontSize('xl'),
              color: styles.stroke,
              lineHeight: 1
            }}
          >
            ×
          </button>
        )}
      </div>
    </OrganicBox>
  );
};
