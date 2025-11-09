// ============================================
// ARCHIVO: src/components/organic-ui/OrganicSelect.jsx
// ============================================
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { generateOrganicPath, brushShadows, getFontFamily, getFontSize, getFontWeight, getColor, organicShapePresets, organicSeeds } from './utils';

const SELECT_TRIGGER_PRESET = organicShapePresets.selectTrigger;
const SELECT_MENU_PRESET = organicShapePresets.selectMenu;

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
      width: SELECT_TRIGGER_PRESET.width,
      height: 40,
      cornerRadius: SELECT_TRIGGER_PRESET.cornerRadius,
      wobbleIntensity: SELECT_TRIGGER_PRESET.wobble,
      seed: organicSeeds.selectTrigger
    });
  }, []);

  const dropdownPathD = useMemo(() => {
    return generateOrganicPath({
      width: SELECT_MENU_PRESET.width,
      height: Math.min(options.length * 36 + 12, 250),
      cornerRadius: SELECT_MENU_PRESET.cornerRadius,
      wobbleIntensity: SELECT_MENU_PRESET.wobble,
      seed: organicSeeds.selectMenu
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
  const surface = getColor('surface');
  const border = getColor('border');
  const text = getColor('surfaceText');
  const textMuted = getColor('textMuted');
  const textSubtle = getColor('textSubtle');
  const surfaceActive = getColor('surfaceActive');

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
          viewBox={`0 0 ${SELECT_TRIGGER_PRESET.width} 40`}
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            fill={surface}
            stroke={border}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="relative z-10 flex items-center justify-between px-4 h-full">
          <span
            style={{
              fontFamily: getFontFamily('body'),
              fontSize: getFontSize('md'),
              fontWeight: getFontWeight('regular'),
              color: selectedOption ? text : textSubtle
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
            viewBox={`0 0 ${SELECT_MENU_PRESET.width} ${dropdownHeight}`}
            preserveAspectRatio="none"
          >
            <path
              d={dropdownPathD}
              fill={surface}
              stroke={border}
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
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                  option.value === value ? 'bg-surface-active font-semibold' : 'hover-bg-surface-active'
                }`}
                style={{
                  fontFamily: getFontFamily('body'),
                  fontSize: getFontSize('sm'),
                  fontWeight: option.value === value ? getFontWeight('semibold') : getFontWeight('regular'),
                  color: text
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

