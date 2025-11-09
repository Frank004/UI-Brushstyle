import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { generateOrganicPath, getColor } from './utils';
import { OrganicBox } from './OrganicBox';

const POINTER_OFFSET = 18;

const getPositionStyles = (triggerRect, size, placement) => {
  const padding = 8;
  const styles = { top: 0, left: 0 };
  switch (placement) {
    case 'bottom':
      styles.top = triggerRect.bottom + padding;
      styles.left = triggerRect.left + triggerRect.width / 2 - size.width / 2;
      break;
    case 'left':
      styles.top = triggerRect.top + triggerRect.height / 2 - size.height / 2;
      styles.left = triggerRect.left - size.width - padding;
      break;
    case 'right':
      styles.top = triggerRect.top + triggerRect.height / 2 - size.height / 2;
      styles.left = triggerRect.right + padding;
      break;
    default:
      styles.top = triggerRect.top - size.height - padding;
      styles.left = triggerRect.left + triggerRect.width / 2 - size.width / 2;
  }
  if (placement === 'top') styles.top -= POINTER_OFFSET;
  if (placement === 'bottom') styles.top += POINTER_OFFSET;
  if (placement === 'left') styles.left -= POINTER_OFFSET;
  if (placement === 'right') styles.left += POINTER_OFFSET;
  return styles;
};

export const OrganicPopover = ({
  trigger,
  children,
  placement = 'top',
  open,
  onOpenChange,
  width = 260,
  strokeWidth = 4
}) => {
  const [isOpen, setIsOpen] = useState(open ?? false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  useEffect(() => {
    if (isOpen && triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const size = {
        width: width,
        height: popoverRef.current.offsetHeight
      };
      setPosition(getPositionStyles(triggerRect, size, placement));
    }
  }, [isOpen, placement, width, triggerRef.current]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handle = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen, onOpenChange]);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
  };

  const pointerPath = useMemo(
    () => 'M30 0 C40 10 50 22 56 30 L4 30 C10 22 20 10 30 0 Z',
    []
  );

  const pointerClass = useMemo(() => {
    switch (placement) {
      case 'bottom':
        return 'absolute -top-9 left-1/2 -translate-x-1/2';
      case 'left':
        return 'absolute top-1/2 -right-9 -translate-y-1/2 -rotate-90';
      case 'right':
        return 'absolute top-1/2 -left-9 -translate-y-1/2 rotate-90';
      default:
        return 'absolute -bottom-9 left-1/2 -translate-x-1/2 rotate-180';
    }
  }, [placement]);

  const surface = getColor('surface');
  const border = getColor('border');

  return (
    <>
      <span ref={triggerRef} onClick={toggle} className="inline-flex">
        {trigger}
      </span>
      {isOpen && typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={popoverRef}
            className="fixed z-[9500]"
            style={{ top: position.top, left: position.left, width }}
          >
            <div className="relative">
              <OrganicBox
                className="p-6 text-sm"
                strokeWidth={strokeWidth}
                cornerRadius={14}
                wobbleIntensity={3}
                backgroundColor={surface}
                strokeColor={border}
              >
                {children}
              </OrganicBox>
              <svg className={`${pointerClass} h-7 w-14 pointer-events-none`} viewBox="0 0 60 30" preserveAspectRatio="none">
                <path
                  d={pointerPath}
                  fill={surface}
                  stroke={border}
                  strokeWidth={strokeWidth}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
