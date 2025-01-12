import React from "react";
import "./Modal.scss";

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Taip</button>
          <button onClick={onCancel}>Ne</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
