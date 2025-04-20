import { useEffect } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.7)] z-1000"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[320px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[10]"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
