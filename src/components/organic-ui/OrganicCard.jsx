// ============================================
// ARCHIVO: src/components/organic-ui/OrganicCard.jsx
// ============================================
import React from 'react';
import { OrganicBox } from './OrganicBox';
import { getSpacing, getFontFamily, getFontSize, getFontWeight } from './utils';

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
        <h3
          className={headerClassName}
          style={{
            fontFamily: getFontFamily('display'),
            fontSize: getFontSize('title', '1.75rem'),
            fontWeight: getFontWeight('bold'),
            marginBottom: getSpacing('md', '1rem')
          }}
        >
          {title}
        </h3>
      )}
      <div
        className={bodyClassName}
        style={{ fontFamily: getFontFamily('body') }}
      >
        {children}
      </div>
    </OrganicBox>
  );
};

