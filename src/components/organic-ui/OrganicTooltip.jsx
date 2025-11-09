// ============================================
// ARCHIVO: src/components/organic-ui/OrganicTooltip.jsx
// ============================================
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { generateOrganicPath, getColor, organicSeeds } from './utils';

/**
 * OrganicTooltip - Tooltip con estilo orgánico
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elemento que activa el tooltip
 * @param {string} props.content - Contenido del tooltip
 * @param {string} props.position - Posición (top, bottom, left, right)
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {number} props.delay - Delay antes de mostrar (ms)
 */
export const OrganicTooltip = ({
  children,
  content,
  position = 'top',
  className = "",
  strokeWidth = 2,
  delay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const timeoutRef = useRef(null);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: 200,
      height: 40,
      cornerRadius: 8,
      wobbleIntensity: 4,
      seed: organicSeeds.tooltip
    });
  }, []);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = -tooltipRect.height - 8;
          left = (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.height + 8;
          left = (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = (triggerRect.height - tooltipRect.height) / 2;
          left = -tooltipRect.width - 8;
          break;
        case 'right':
          top = (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.width + 8;
          break;
        default:
          break;
      }

      setTooltipStyle({
        top: `${top}px`,
        left: `${left}px`
      });
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isVisible && content && (
        <div
          ref={tooltipRef}
          className="absolute z-50 pointer-events-none animate-[fadeIn_0.15s_ease-out]"
          style={tooltipStyle}
        >
          <div className="relative px-4 py-2 min-w-max max-w-xs">
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 200 40"
            >
              <path
                d={pathD}
                fill={getColor('border')}
                stroke={getColor('border')}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span
              className="relative z-10 text-sm whitespace-nowrap"
              style={{ color: getColor('surface') }}
            >
              {content}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

