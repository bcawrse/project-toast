import React from "react";

export const ToastContext = React.createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function handleEscapeKeydown(e) {
      if (e.key === "Escape") {
        setToasts([]);
      }
    }

    window.addEventListener("keydown", handleEscapeKeydown);

    return () => {
      window.removeEventListener("keydown", handleEscapeKeydown);
    };
  }, []);

  function addToast({ variant, message }) {
    if (message == null || message === "") return;

    setToasts((currToasts) => [
      ...currToasts,
      { variant, message, id: crypto.randomUUID() },
    ]);
  }

  function removeToast(id) {
    const newToasts = toasts.filter((t) => t.id !== id);
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
