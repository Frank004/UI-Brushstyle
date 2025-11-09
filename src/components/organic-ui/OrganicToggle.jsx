// ============================================
// ARCHIVO: src/components/organic-ui/OrganicToggle.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateRegularPath } from './utils';

/**
 * OrganicToggle - Switch/Toggle con estilo orgánico
 * @param {Object} props
 * @param {boolean} props.checked - Si está activado
 * @param {Function} props.onChange - Función onChange
 * @param {string} props.label - Etiqueta del toggle
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.name - Nombre del toggle
 * @param {string} props.id - ID del toggle
 * @param {string} props.size - Tamaño (small, medium, large)
 */
export const OrganicToggle = ({
  checked = false,
  onChange,
  label,
  className = "",
  strokeWidth = 4,
  disabled = false,
  name,
  id,
  size = "medium"
}) => {
  const sizes = {
    small: { width: 44, height: 24, knob: 18 },
    medium: { width: 56, height: 32, knob: 24 },
    large: { width: 68, height: 40, knob: 32 }
  };

  const { width, height, knob } = sizes[size] || sizes.medium;

  const trackPath = useMemo(() => {
    return generateRegularPath({
      width,
      height,
      cornerRadius: height / 2
    });
  }, [width, height]);

  // Círculo regular para el knob
  const knobPath = useMemo(() => {
    const center = knob / 2;
    const radius = knob / 2 - 2;
    return `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center} ${center + radius} A ${radius} ${radius} 0 1 1 ${center} ${center - radius} Z`;
  }, [knob]);

  const knobOffset = checked ? width - knob - 4 : 4;

  return (
    <label 
      className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div className="relative flex-shrink-0" style={{ width: `${width}px`, height: `${height}px` }}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        
        {/* Track */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${width} ${height}`}
        >
          <path
            d={trackPath}
            fill={checked ? '#3b82f6' : '#e5e7eb'}
            stroke="black"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
        </svg>
        
        {/* Knob */}
        <svg 
          className="absolute top-1/2 pointer-events-none transition-all duration-300"
          style={{ 
            transform: `translate(${knobOffset}px, -50%)`,
            width: `${knob}px`,
            height: `${knob}px`
          }}
          viewBox={`0 0 ${knob} ${knob}`}
        >
          <path
            d={knobPath}
            fill="white"
            stroke="black"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {label && (
        <span className="ml-3 text-gray-800 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

