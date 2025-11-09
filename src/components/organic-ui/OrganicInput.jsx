// ============================================
// ARCHIVO: src/components/organic-ui/OrganicInput.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateOrganicPath, brushShadows, getFontFamily, getFontSize, getSpacing, getFontWeight, getColor, organicSeeds, organicShapePresets } from './utils';

const INPUT_PRESET = organicShapePresets.input;

/**
 * OrganicInput - Input con estilo orgánico
 * @param {Object} props
 * @param {string} props.placeholder - Texto placeholder
 * @param {string} props.value - Valor del input
 * @param {Function} props.onChange - Función onChange
 * @param {string} props.type - Tipo de input (text, email, password, etc)
 * @param {boolean} props.multiline - Si es textarea
 * @param {number} props.rows - Número de filas para textarea
 * @param {number} props.maxLength - Longitud máxima
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.name - Nombre del input
 * @param {string} props.id - ID del input
 */
export const OrganicInput = ({ 
  placeholder = "",
  value,
  onChange,
  type = "text",
  multiline = false,
  rows = 1,
  maxLength,
  className = "",
  strokeWidth = 4,
  disabled = false,
  name,
  id,
  style = {}
}) => {
  const height = multiline ? (rows * 36 + 24) : 44;
  
  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: INPUT_PRESET.width,
      height,
      cornerRadius: INPUT_PRESET.cornerRadius,
      wobbleIntensity: INPUT_PRESET.wobble,
      seed: organicSeeds.input
    });
  }, [height]);

  const inputClasses = "relative z-10 w-full h-full px-4 py-3 bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50";
 
  const surfaceColor = getColor('surface');
  const borderColor = getColor('border');
  const textColor = getColor('surfaceText');

  const typographyStyle = {
    fontFamily: getFontFamily('body'),
    fontSize: getFontSize('md'),
    lineHeight: 1.5,
    fontWeight: getFontWeight('regular'),
    color: textColor
  };

  const containerStyle = {
    height: `${height}px`,
    filter: brushShadows.soft,
    ...style
  };

  return (
    <div className={`relative w-full ${className}`} style={containerStyle}>
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${INPUT_PRESET.width} ${height}`}
        preserveAspectRatio="none"
      >
        <path
          d={pathD}
          fill={surfaceColor}
          stroke={borderColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          disabled={disabled}
          className={`${inputClasses} resize-none`}
          style={typographyStyle}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={inputClasses}
          style={typographyStyle}
        />
      )}
    </div>
  );
};

