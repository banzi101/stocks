import React, { useState, useEffect } from 'react';
import StockItem from './stockItem';
import '../css/portfolio.css';


function Portfolio() {
  const [stocks, setStocks] = useState([]);
  const API_URL = '/balance/getBalance?userId=tester3';

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setStocks(data.stocks); // Assuming the stocks data is inside the balance API response
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="portfolio">
      <h2>Portfolio</h2>
      <p>Click on a stock to sell it!</p>
      <div className="stock-list">
        {stocks.map((stock) => (
          <StockItem key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
