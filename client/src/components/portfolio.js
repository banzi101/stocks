import React, { useState, useEffect } from 'react';
import StockItem from '../components/stockItem';
import '../css/portfolio.css';

function Portfolio() {
  const [stocks, setBalance] = useState([]);
  const [error, setError] = useState('');
  const API_URL = '/balance/getBalance?userId=tester4';

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        const data = await response.json();
        setBalance(data.stocks); // Assuming the stocks data is inside the balance API response
      } catch (error) {
        setError('Error fetching stock data: ' + error.message);
      }
    };

    fetchBalanceData();
  }, []);

  const handleSell = async (symbol, quantity) => {
    try {
      const response = await fetch('/balance/updateBalance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: 'tester4',
          symbol,
          units: quantity,
          totalPrice: 0,
          transactionType: 'sell',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to complete the sale');
      }

      const result = await response.json();
      console.log('Sale successful:', result);
      // Update state to reflect the sold stock
      setBalance(result.stocks); // Assuming the updated stock data is returned
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
