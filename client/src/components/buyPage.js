import React, { useState } from 'react';
import '../css/buyPage.css';

function BuyPage() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleItemChange = (e) => setItem(e.target.value);
  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));
  
  const calculateTotalPrice = () => {
    const pricePerItem = 10;
    setTotalPrice(pricePerItem * quantity);
  };

  const handleBuy = () => {
    console.log('Item:', item);
    console.log('Quantity:', quantity);
    console.log('Total Price:', totalPrice);
  };

  return (
    <div className="buy-page">
      <h2>Buy Stocks</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleBuy(); }}>
        <div className="form-group">
          <label htmlFor="item">NASDAQ Code</label>
          <input
            id="item"
            type="text"
            value={item}
            onChange={handleItemChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            required
          />
        </div>
        <div>
          <button type="button" onClick={calculateTotalPrice}>Calculate Total Price</button>
        </div>
        <div>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <button type="submit">Buy</button>
      </form>
    </div>
  );
}

export default BuyPage;
