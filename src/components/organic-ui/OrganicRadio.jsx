// ============================================
// ARCHIVO: src/components/organic-ui/OrganicRadio.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateOrganicCircle } from './utils';

/**
 * OrganicRadio - Radio button con estilo orgánico
 * @param {Object} props
 * @param {boolean} props.checked - Si está seleccionado
 * @param {Function} props.onChange - Función onChange
 * @param {string} props.label - Etiqueta del radio
 * @param {string} props.value - Valor del radio
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.name - Nombre del radio (para agrupar)
 * @param {string} props.id - ID del radio
 */
export const OrganicRadio = ({
  checked = false,
  onChange,
  label,
  value,
  className = "",
  strokeWidth = 4,
  disabled = false,
  name,
  id
}) => {
  const size = 28;

  const outerCircle = useMemo(() => {
    return generateOrganicCircle({
      size,
      wobbleIntensity: 2,
      seed: 44444
    });
  }, []);

  const innerCircle = useMemo(() => {
    return generateOrganicCircle({
      size: size * 0.5,
      wobbleIntensity: 1,
      seed: 55555
    });
  }, []);

  return (
    <label 
      className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div className="relative flex-shrink-0" style={{ width: `${size}px`, height: `${size}px` }}>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        
        {/* Outer circle */}
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${size} ${size}`}
        >
          <path
            d={outerCircle}
            fill="white"
            stroke="black"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-200"
          />
        </svg>
        
        {/* Inner circle (when checked) */}
        {checked && (
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${size} ${size}`}
          >
            <g transform={`translate(${size * 0.25}, ${size * 0.25})`}>
              <path
                d={innerCircle}
                fill="#3b82f6"
                className="animate-[scaleIn_0.2s_ease-out]"
              />
            </g>
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

/**
 * OrganicRadioGroup - Grupo de radio buttons
 * @param {Object} props
 * @param {Array} props.options - Array de opciones [{value, label}]
 * @param {string} props.value - Valor seleccionado
 * @param {Function} props.onChange - Función onChange
 * @param {string} props.name - Nombre del grupo
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.orientation - Orientación (vertical, horizontal)
 */
export const OrganicRadioGroup = ({
  options = [],
  value,
  onChange,
  name,
  className = "",
  orientation = "vertical"
}) => {
  const containerClass = orientation === "horizontal" 
    ? "flex flex-wrap gap-4" 
    : "flex flex-col gap-3";

  return (
    <div className={`${containerClass} ${className}`}>
      {options.map((option, index) => (
        <OrganicRadio
          key={option.value}
          id={`${name}-${option.value}`}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={() => onChange({ target: { name, value: option.value } })}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

