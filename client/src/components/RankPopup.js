import React from "react";

function Popup({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
      <div className="bg-white rounded-lg p-4">
        <button
          className="absolute top-16 right-16 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#215;
        </button>
        <h1 className="text-xl font-semibold">Popup Title</h1>
        <p className="text-gray-600 mt-2">This is your popup content.</p>
      </div>
    </div>
  );
}

export default Popup;
