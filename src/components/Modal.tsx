// src/components/Modal.tsx
// This component renders a full-screen modal overlay.
// It displays its children (any content passed into the modal) along with a close button.
// The modal is intended for use in mobile views, for example to display album details.

import React from 'react';

// Define the props for the Modal component.
// - onClose: A callback function to be invoked when the modal should close.
// - children: The content to be displayed inside the modal.
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    // The modal-overlay div covers the full viewport,
    // and uses ARIA attributes to indicate a dialog that is modal.
    <div className="modal-overlay" role="dialog" aria-modal="true">
      {/* The modal-content div contains the actual content of the modal,
          including the close button and any children passed to the component. */}
      <div className="modal-content">
        {/* Close button: Clicking this will call the onClose function to dismiss the modal.
            The aria-label ensures accessibility by informing screen readers what the button does. */}
        <button onClick={onClose} className="modal-close-button" aria-label="Close">
          &times;
        </button>
        {/* Render any content passed as children to the Modal component */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
