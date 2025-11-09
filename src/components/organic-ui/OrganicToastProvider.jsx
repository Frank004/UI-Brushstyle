import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { OrganicAlert } from './OrganicAlert';
import { brushShadows } from './utils';

const ToastContext = createContext(null);

let uniqueId = 0;

const TOAST_PORTAL_ID = 'organic-toast-portal';

const ensurePortal = () => {
  if (typeof document === 'undefined') return null;
  let portal = document.getElementById(TOAST_PORTAL_ID);
  if (!portal) {
    portal = document.createElement('div');
    portal.id = TOAST_PORTAL_ID;
    document.body.appendChild(portal);
  }
  return portal;
};

export const OrganicToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(({ title, description, variant = 'info', duration = 4000 }) => {
    uniqueId += 1;
    const id = uniqueId;
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    if (duration !== null) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const value = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <OrganicToastViewport toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

export const useOrganicToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useOrganicToast debe usarse dentro de <OrganicToastProvider>');
  }
  return ctx;
};

const OrganicToastViewport = ({ toasts, onDismiss }) => {
  if (typeof document === 'undefined') return null;
  const portal = ensurePortal();
  if (!portal) return null;

  return createPortal(
    <div
      style={{ filter: brushShadows.soft }}
      className="fixed top-4 right-4 z-[9999] flex w-full max-w-sm flex-col gap-4"
    >
      {toasts.map((toast) => (
        <OrganicAlert
          key={toast.id}
          variant={toast.variant}
          title={toast.title}
          description={toast.description}
          onClose={() => onDismiss(toast.id)}
          compact
          strokeWidth={4}
        />
      ))}
    </div>,
    portal
  );
};
