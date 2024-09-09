import React, { useState, useEffect, useCallback } from 'react';
import StockItem from '../components/stockItem';
import '../css/portfolio.css';

function Portfolio({ fetchBalance }) {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState('');

  const fetchStockData = useCallback(async () => {
    const userID = localStorage.getItem('userID');
    const API_URL_getBalance = `/balance/getBalance?userId=${userID}`;

    try {
      const response = await fetch(API_URL_getBalance);
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      const data = await response.json();
      setStocks(data.stocks || []);
    } catch (error) {
      setError('Error fetching stock data: ' + error.message);
    }
  }, []);

  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

  const handleSell = async (symbol, quantity) => {
    const userID = localStorage.getItem('userID');

    try {
      const currentPriceResponse = await fetch(`/stocks/getQuote?symbol=${symbol}`);
      const currentPriceData = await currentPriceResponse.json();
      const currentPrice = currentPriceData.c;

      if (!currentPrice || isNaN(currentPrice)) {
        throw new Error('Failed to fetch the current price of the stock');
      }

      const totalPrice = currentPrice * quantity;

      const response = await fetch('/balance/updateBalance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userID,
          symbol,
          units: quantity,
          totalPrice,
          transactionType: 'sell',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to complete the sale');
      }

      console.log('Sale successful:', await response.json());

      fetchBalance();
      fetchStockData();

    } catch (error) {
      setError('Error completing sale: ' + error.message);
    }
  };

  return (
    <div className="portfolio">
      <h2>Portfolio</h2>
      <p>Click on a stock to sell it!</p>
      {error && <p className="error-message">{error}</p>}
      <div className="stock-list">
        {stocks.map((stock) => (
          <StockItem key={stock.symbol} stock={stock} onSell={handleSell} />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
