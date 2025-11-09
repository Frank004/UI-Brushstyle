// ============================================
// ARCHIVO: src/components/organic-ui/OrganicCard.jsx
// ============================================
import React from 'react';
import { OrganicBox } from './OrganicBox';

/**
 * OrganicCard - Tarjeta con estilo orgánico
 * @param {Object} props
 * @param {string} props.title - Título de la tarjeta
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.headerClassName - Clases CSS para el header
 * @param {string} props.bodyClassName - Clases CSS para el body
 * @param {number} props.strokeWidth - Grosor del borde
 * @param {string} props.backgroundColor - Color de fondo
 */
export const OrganicCard = ({ 
  title,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  strokeWidth = 5,
  backgroundColor = "white"
}) => {
  // Si no hay padding en className, usar p-8 por defecto para consistencia
  const hasPadding = className.match(/\b(p|px|py|pt|pb|pl|pr)-\d+\b/);
  const finalClassName = hasPadding ? className : `p-8 ${className}`;
  
  return (
    <OrganicBox 
      className={finalClassName}
      strokeWidth={strokeWidth}
      strokeColor="#000000" // Outline negro simple
      backgroundColor={backgroundColor}
    >
      {title && (
        <h3 className={`text-xl font-bold mb-4 ${headerClassName}`}>
          {title}
        </h3>
      )}
      <div className={bodyClassName}>
        {children}
      </div>
    </OrganicBox>
  );
};

