// ============================================
// ARCHIVO: src/components/organic-ui/OrganicModal.jsx
// ============================================
import React, { useEffect } from 'react';
import { OrganicBox } from './OrganicBox';
import { OrganicButton } from './OrganicButton';

/**
 * OrganicModal - Modal/Dialog con estilo orgánico
 * @param {Object} props
 * @param {boolean} props.isOpen - Si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {string} props.title - Título del modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.size - Tamaño del modal (small, medium, large, full)
 * @param {boolean} props.showCloseButton - Mostrar botón de cerrar
 * @param {boolean} props.closeOnOverlayClick - Cerrar al hacer click en el overlay
 * @param {React.ReactNode} props.footer - Contenido del footer
 */
export const OrganicModal = ({
  isOpen = false,
  onClose,
  title,
  children,
  className = "",
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer
}) => {
  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-[fadeIn_0.2s_ease-out]"
      onClick={handleOverlayClick}
    >
      <div 
        className={`w-full ${sizeClasses[size]} ${className} animate-[slideUp_0.3s_ease-out]`}
      >
        <OrganicBox className="p-8 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            {title && (
              <h2 className="text-2xl font-bold text-gray-800 pr-8">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Body */}
          <div className="text-gray-700">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              {footer}
            </div>
          )}
        </OrganicBox>
      </div>
    </div>
  );
};

/**
 * Hook para controlar el estado del modal
 * @returns {Object} { isOpen, open, close, toggle }
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev)
  };
};

