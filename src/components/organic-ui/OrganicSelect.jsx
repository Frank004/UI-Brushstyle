// ============================================
// ARCHIVO: src/components/organic-ui/OrganicSelect.jsx
// ============================================
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { generateOrganicPath, brushShadows, getFontFamily, getFontSize, getFontWeight } from './utils';

/**
 * OrganicSelect - Select dropdown con estilo orgánico
 * @param {Object} props
 * @param {Array} props.options - Array de opciones [{value, label}]
 * @param {string} props.value - Valor seleccionado
 * @param {Function} props.onChange - Función onChange
 * @param {string} props.placeholder - Texto placeholder
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.name - Nombre del select
 * @param {string} props.id - ID del select
 */
export const OrganicSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Selecciona una opción",
  className = "",
  strokeWidth = 3,
  disabled = false,
  name,
  id,
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: 600,
      height: 40,
      cornerRadius: 12,
      wobbleIntensity: 7,
      seed: 11111
    });
  }, []);

  const dropdownPathD = useMemo(() => {
    return generateOrganicPath({
      width: 600,
      height: Math.min(options.length * 36 + 12, 250),
      cornerRadius: 12,
      wobbleIntensity: 7,
      seed: 22222
    });
  }, [options.length]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
  };

  const dropdownHeight = Math.min(options.length * 36 + 12, 250);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ filter: brushShadows.soft, zIndex: isOpen ? 60 : 'auto', ...style }}
    >
      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="relative w-full h-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            fill="white"
            stroke="black"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="relative z-10 flex items-center justify-between px-4 h-full">
          <span
            className={selectedOption ? "text-[#1e1e1e]" : "text-[#6a6a6a]"}
            style={{
              fontFamily: getFontFamily('body'),
              fontSize: getFontSize('md'),
              fontWeight: getFontWeight('regular')
            }}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg 
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && options.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 z-[70]">
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 600 ${dropdownHeight}`}
            preserveAspectRatio="none"
          >
            <path
              d={dropdownPathD}
              fill="white"
              stroke="black"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="relative z-10 overflow-y-auto max-h-full p-2">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-[#f5f5f5] text-sm ${
                  option.value === value ? 'bg-[#f5f5f5] font-semibold' : ''
                }`}
                style={{
                  fontFamily: getFontFamily('body'),
                  fontSize: getFontSize('sm'),
                  fontWeight: option.value === value ? getFontWeight('semibold') : getFontWeight('regular')
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

