import React, { useEffect, useCallback } from 'react';
import '../css/successfulBuy.css';

function SuccessfulBuy({ symbol, quantity, totalPrice, onClose }) {
  const handleOutsideClick = useCallback((e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Purchase Successful</h3>
        <p>You have successfully purchased {quantity} units of {symbol} for a total price of ${totalPrice.toFixed(2)}.</p>
      </div>
    </div>
  );
}

export default SuccessfulBuy;
