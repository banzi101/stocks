import React from 'react';
import '../css/stockItem.css';

function StockItem({ stock }) {
  return (
    <div className="stock-item">
      <div className="stock-symbol">{stock.symbol}</div>
      <div className="stock-info">
        <div className="stock-price">{stock.price} USD</div>
        <div className={`stock-profit ${stock.profit.startsWith('-') ? 'negative' : 'positive'}`}>
          {stock.profit} ({stock.units} units)
        </div>
      </div>
    </div>
  );
}

export default StockItem;
