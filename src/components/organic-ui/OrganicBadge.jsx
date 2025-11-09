// ============================================
// ARCHIVO: src/components/organic-ui/OrganicBadge.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateRegularPath, colorVariants, getFontFamily, getFontWeight, getFontSize } from './utils';

/**
 * OrganicBadge - Badge/Etiqueta con estilo orgánico
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del badge
 * @param {string} props.variant - Variante de color (default, primary, success, danger, warning, gray, info)
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {string} props.size - Tamaño (small, medium, large)
 */
export const OrganicBadge = ({
  children,
  variant = 'default',
  className = "",
  strokeWidth = 3,
  size = 'medium'
}) => {
  const color = colorVariants[variant] || colorVariants.default;

  const sizes = {
    small: { height: 20, text: 'text-xs', px: 'px-2' },
    medium: { height: 24, text: 'text-xs', px: 'px-2.5' },
    large: { height: 28, text: 'text-sm', px: 'px-3' }
  };

  const sizeConfig = sizes[size] || sizes.medium;
  const fontMap = {
    small: getFontSize('xs'),
    medium: getFontSize('sm'),
    large: getFontSize('md')
  };
  const fontSize = fontMap[size] ?? getFontSize('sm');

  const pathD = useMemo(() => {
    return generateRegularPath({
      width: 200,
      height: sizeConfig.height,
      cornerRadius: sizeConfig.height / 2
    });
  }, [sizeConfig.height]);

  return (
    <span
      className={`relative inline-flex items-center justify-center ${sizeConfig.px} ${className}`}
      style={{
        filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,0.05))',
        height: `${sizeConfig.height}px`
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 200 ${sizeConfig.height}`}
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill={color.bg}
          stroke={color.border}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`relative z-10 whitespace-nowrap ${sizeConfig.text}`}
        style={{
          color: color.text,
          fontFamily: getFontFamily('body'),
          fontWeight: getFontWeight('semibold'),
          fontSize,
          lineHeight: 1.2
        }}
      >
        {children}
      </span>
    </span>
  );
};

/**
 * OrganicBadgeCount - Badge numérico (para notificaciones)
 * @param {Object} props
 * @param {number} props.count - Número a mostrar
 * @param {string} props.variant - Variante de color
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.max - Número máximo a mostrar (muestra +max si excede)
 */
export const OrganicBadgeCount = ({
  count = 0,
  variant = 'danger',
  className = "",
  max = 99
}) => {
  const displayCount = count > max ? `${max}+` : count;

  if (count === 0) return null;

  return (
    <OrganicBadge
      variant={variant}
      size="small"
      className={className}
    >
      {displayCount}
    </OrganicBadge>
  );
};

