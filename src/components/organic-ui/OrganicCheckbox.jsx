// ============================================
// ARCHIVO: src/components/organic-ui/OrganicCheckbox.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateRegularPath } from './utils';

/**
 * OrganicCheckbox - Checkbox con estilo orgánico
 * @param {Object} props
 * @param {boolean} props.checked - Si está marcado
 * @param {Function} props.onChange - Función onChange
 * @param {string} props.label - Etiqueta del checkbox
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.name - Nombre del checkbox
 * @param {string} props.id - ID del checkbox
 */
export const OrganicCheckbox = ({
  checked = false,
  onChange,
  label,
  className = "",
  strokeWidth = 4,
  disabled = false,
  name,
  id
}) => {
  const boxSize = 28;

  const pathD = useMemo(() => {
    return generateRegularPath({
      width: boxSize,
      height: boxSize,
      cornerRadius: 6
    });
  }, []);

  return (
    <label 
      className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div className="relative flex-shrink-0" style={{ width: `${boxSize}px`, height: `${boxSize}px` }}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${boxSize} ${boxSize}`}
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            fill={checked ? '#3b82f6' : 'white'}
            stroke="black"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-200"
          />
        </svg>
        
        {/* Checkmark */}
        {checked && (
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline 
              points="20 6 9 17 4 12"
              className="animate-[checkmark_0.3s_ease-in-out]"
            />
          </svg>
        )}
      </div>
      
      {label && (
        <span className="ml-3 text-gray-800 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

