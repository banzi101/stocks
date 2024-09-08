import React, { useState } from 'react';
import SellStockModal from './sellPage';
import '../css/stockItem.css';

function StockItem({ stock, onSell }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSell = (symbol, quantity) => {
    onSell(symbol, quantity);
    handleClose();
  };

  return (
    <div>
      <div className="stock-item" onClick={handleClick}>
        <div className="stock-symbol">{stock.symbol}</div>
        <div className="stock-info">
          <div className="stock-price">${stock.price} USD</div>
          <div className={`stock-profit ${stock.profit < 0 ? 'negative' : 'positive'}`}>
            ${stock.profit} ({stock.units} units)
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SellStockModal
          stock={stock}
          onClose={handleClose}
          onSell={handleSell}
        />
      )}
    </div>
  );
}

export default StockItem;
