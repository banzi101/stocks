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
        <h2>Sell {stock.symbol}</h2>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
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
        <button onClick={handleSell}>Sell</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default SellPage;
