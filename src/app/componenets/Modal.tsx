import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  response: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, response }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className=" p-4 rounded bg-gray-800 shadow-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Modal;
