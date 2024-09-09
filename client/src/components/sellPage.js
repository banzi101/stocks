import React, { useState } from 'react';
import '../css/sellPage.css';

function SellPage({ stock, onClose, onSell }) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

  const handleSell = () => {
    if (quantity <= 0 || quantity > stock.units) {
      setError('Invalid quantity.');
      return;
    }
    onSell(stock.symbol, quantity);
    onClose();
  };

  return (
    <div className="sell-page">
      <div className="page-content">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2>Sell {stock.symbol}</h2>
        <p className="stock-sell-question">
          How many units would you like to sell? 
          <br></br>
          <br></br>
          You bought {stock.units} units at {stock.price} USD

        </p>

        <div className="form-group">
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={stock.units}
            required
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        <div className="button-group">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="sell-button" onClick={handleSell}>Sell</button>
        </div>
      </div>
    </div>
  );
}

export default SellPage;
