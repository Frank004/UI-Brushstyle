import React from 'react';
import { createPortal } from 'react-dom';
import { OrganicBox } from './OrganicBox';
import { OrganicButton } from './OrganicButton';

const DrawerOverlay = ({ isOpen, onClose, blur }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[9000] bg-black/40"
      style={{ backdropFilter: blur ? 'blur(4px)' : 'none' }}
      onClick={onClose}
    />
  );
};

export const OrganicDrawer = ({
  isOpen,
  onClose,
  position = 'right',
  size = 'medium',
  title,
  children,
  footer,
  blurOverlay = true,
  className = '',
  strokeWidth = 5
}) => {
  if (typeof document === 'undefined') return null;

  const sizes = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-2xl'
  };

  const translateClass = {
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    left: isOpen ? 'translate-x-0' : '-translate-x-full'
  }[position];

  const originClass = position === 'right' ? 'right-0' : 'left-0';

  return createPortal(
    <>
      <DrawerOverlay isOpen={isOpen} onClose={onClose} blur={blurOverlay} />
      <div
        className={`fixed top-0 ${originClass} z-[9200] flex h-full w-full justify-${position === 'right' ? 'end' : 'start'} pointer-events-none`}
      >
        <div
          className={`pointer-events-auto h-full ${sizes[size]}`}
          style={{ transform: translateClass === 'translate-x-0' ? 'translateX(0)' : translateClass === 'translate-x-full' ? 'translateX(100%)' : 'translateX(-100%)', transition: 'transform 0.3s ease' }}
        >
          <OrganicBox
            className={`flex h-full flex-col rounded-none ${className}`}
            strokeWidth={strokeWidth}
            backgroundColor="#fefefe"
            style={{
              transformOrigin: position === 'right' ? 'right center' : 'left center',
              ...(position === 'right'
                ? { borderTopLeftRadius: '2rem', borderBottomLeftRadius: '2rem' }
                : { borderTopRightRadius: '2rem', borderBottomRightRadius: '2rem' })
            }}
          >
            <div
              className="flex-1 overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 pb-6">
                {title && (
                  <h2 className="text-xl font-semibold text-[#1e1e1e]">{title}</h2>
                )}
                <OrganicButton
                  variant="default"
                  size="small"
                  onClick={onClose}
                  strokeWidth={4}
                  className="!px-3"
                  fullWidth={false}
                >
                  Cerrar
                </OrganicButton>
              </div>
              <div className="pr-1">
                {children}
              </div>
            </div>
            {footer && (
              <div className="mt-6 border-t border-[#1e1e1e]/10 pt-4">
                {footer}
              </div>
            )}
          </OrganicBox>
        </div>
      </div>
    </>,
    document.body
  );
};
