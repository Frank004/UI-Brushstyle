// ============================================
// ARCHIVO: src/components/organic-ui/OrganicButton.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateOrganicPath, colorVariants, sizeConfigs, brushShadows, getFontFamily, getFontWeight } from './utils';

/**
 * OrganicButton - Botón con estilo orgánico
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {Function} props.onClick - Función al hacer click
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {string} props.variant - Variante de color (default, primary, success, danger, warning, gray, info)
 * @param {string} props.size - Tamaño (small, medium, large)
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.type - Tipo de botón (button, submit, reset)
 */
export const OrganicButton = ({ 
  children, 
  onClick,
  className = "",
  strokeWidth = 6,
  variant = 'default',
  size = 'medium',
  disabled = false,
  type = 'button',
  style = {},
  fullWidth = true
}) => {
  const color = colorVariants[variant] || colorVariants.default;
  const sizeConfig = sizeConfigs[size] || sizeConfigs.medium;

  // Ajustar height del path según el tamaño del botón
  const pathHeight = useMemo(() => {
    return sizeConfig.height === '32px' ? 32 : 
           sizeConfig.height === '40px' ? 40 : 48;
  }, [sizeConfig.height]);

  // Mantener aspect ratio consistente (15:1 ratio como en el original 600:40)
  // Esto asegura que todos los tamaños tengan el mismo estilo visual
  const pathWidth = useMemo(() => {
    return pathHeight * 15; // Mantener proporción 15:1
  }, [pathHeight]);

  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: pathWidth,
      height: pathHeight,
      cornerRadius: 20,
      wobbleIntensity: 8,
      seed: 12345 // Seed fijo para consistencia
    });
  }, [pathHeight, pathWidth]);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : 'inline-flex'} ${sizeConfig.px} ${className}`}
      style={{
        height: sizeConfig.height,
        filter: brushShadows.soft,
        fontFamily: getFontFamily('body'),
        fontWeight: getFontWeight('semibold'),
        ...style
      }}
    >
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${pathWidth} ${pathHeight}`}
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill={color.bg}
          stroke={color.border}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span 
        className={`relative z-10 font-semibold ${sizeConfig.text} flex items-center justify-center h-full`} 
        style={{ color: color.text }}
      >
        {children}
      </span>
    </button>
  );
};

