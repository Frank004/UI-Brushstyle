// ============================================
// ARCHIVO: src/components/organic-ui/OrganicBox.jsx
// ============================================
import React, { useMemo } from 'react';
import { generateOrganicPath, brushShadows } from './utils';

/**
 * OrganicBox - Contenedor base con estilo orgánico
 *
 * Visualmente inspirado en el textarea de OrganicInput para lograr
 * trazos orgánicos pero proporcionados, sin resultar invasivos.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del box
 * @param {string} props.className - Clases CSS adicionales
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {number} props.cornerRadius - Radio de las esquinas
 * @param {number} props.wobbleIntensity - Intensidad de la irregularidad
 * @param {string} props.backgroundColor - Color de fondo
 * @param {string} props.strokeColor - Color del borde
 * @param {string} props.pathId - (No usado, mantenido para compatibilidad)
 */
export const OrganicBox = ({
  children,
  className = "",
  strokeWidth = 5,
  cornerRadius = 16,
  wobbleIntensity = 6,
  backgroundColor = "white",
  strokeColor = "#000000",
  pathId = null,
  style = {}
}) => {
  // Path orgánico inspirado en OrganicInput (width 600) para lograr escalado uniforme
  const pathD = useMemo(() => {
    return generateOrganicPath({
      width: 600,
      height: 220,
      cornerRadius,
      wobbleIntensity,
      seed: 87431 // Seed fijo para consistencia visual en contenedores
    });
  }, [cornerRadius, wobbleIntensity]);

  // Extraer clases de padding de className y moverlas al div interno
  const paddingRegex = /\b(p|px|py|pt|pb|pl|pr)-\d+\b/g;
  const paddingClasses = className.match(paddingRegex) || [];
  const classNameWithoutPadding = className.replace(paddingRegex, '').trim();
  const defaultPadding = paddingClasses.length === 0 ? { padding: 'clamp(1.1rem, 4.5vw, 2.75rem)' } : {};

  return (
    <div
      className={`relative ${classNameWithoutPadding}`}
      style={{ filter: brushShadows.medium, ...style }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 220"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <path
          d={pathD}
          fill={backgroundColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className={`relative z-10 ${paddingClasses.join(' ')}`}
        style={defaultPadding}
      >
        {children}
      </div>
    </div>
  );
};

