import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
   <div className="modalContainer">
    
   </div>
  );
};

export default Modal;
