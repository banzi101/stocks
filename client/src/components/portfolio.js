import React, { useState, useEffect } from 'react';
import StockItem from '../components/stockItem';
import '../css/portfolio.css';

function Portfolio() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState('');
  const API_URL_getBalance = '/balance/getBalance?userId=tester4';

  const fetchBalanceData = async () => {
    try {
      const response = await fetch(API_URL_getBalance);
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      const data = await response.json();
      setStocks(data.stocks || []); // Update state with the stocks data
    } catch (error) {
      setError('Error fetching balance: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(API_URL_getBalance);
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        const data = await response.json();
        setStocks(data.stocks || []); // Set stocks or empty array if undefined
      } catch (error) {
        setError('Error fetching stock data: ' + error.message);
      }
    };

    fetchStockData();
  }, []);

  const handleSell = async (symbol, quantity) => {
    try {
      // Fetch the current price of the stock
      const currentPriceResponse = await fetch(`/stocks/getQuote?symbol=${symbol}`);
      const currentPriceData = await currentPriceResponse.json();
      const currentPrice = currentPriceData.c;

      if (!currentPrice || isNaN(currentPrice)) {
        throw new Error('Failed to fetch the current price of the stock');
      }

      // Calculate total price for the transaction
      const totalPrice = currentPrice * quantity;

      const response = await fetch('/balance/updateBalance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: 'tester4',
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

      // Fetch and update balance after sale
      fetchBalanceData();

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