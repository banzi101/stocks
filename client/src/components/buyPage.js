import React, { useState, useEffect, useCallback } from 'react';
import '../css/buyPage.css';
import SuccessModal from './successfulBuy'; // Import the success modal

function BuyPage() {
  const [item, setItem] = useState('');
  const [fetchedItem, setFetchedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pricePerItem, setPricePerItem] = useState(0);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [tradeInfo, setTradeInfo] = useState({}); // Store trade information

  const handleItemChange = (e) => setItem(e.target.value);
  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

  // Using useCallback to memoize the fetchPrice function
  const fetchPrice = useCallback(async () => {
    if (!item) {
      setError("Please enter a valid NASDAQ code.");
      return;
    }

    try {
      const response = await fetch(`/stocks/getQuote?symbol=${item}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Symbol not found');
      }

      const data = await response.json();
      const fetchedPrice = data.c;

      if (fetchedPrice !== pricePerItem) {
        setPricePerItem(fetchedPrice);
        setFetchedItem(item.toUpperCase());
      }
      setError(null);
    } catch (error) {
      setError('Please check the NASDAQ code. ' + error.message);
    }
  }, [item, pricePerItem]); // Dependencies

  // Fetch the price whenever the 'item' changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (item) {
        fetchPrice();
      }
    }, 500); // Delay for debouncing the input

    return () => clearTimeout(delayDebounceFn); // Clean up timeout on component unmount or when 'item' changes
  }, [item, fetchPrice]); // Include fetchPrice as a dependency

  useEffect(() => {
    setTotalPrice(pricePerItem * quantity);
  }, [quantity, pricePerItem]);

  const handleBuy = async () => {
    if (!fetchedItem || !pricePerItem || quantity <= 0) {
      setError("Please ensure all fields are correctly filled.");
      return;
    }

    try {
      const response = await fetch('/balance/updateBalance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: 'tester4', // Replace with actual userID
          symbol: fetchedItem,
          units: quantity,
          totalPrice: totalPrice,
          transactionType: 'buy', // For buying stocks
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to complete the purchase');
      }

      const result = await response.json();
      console.log('Purchase successful:', result);

      // Set trade information to display in the modal
      setTradeInfo({
        symbol: fetchedItem,
        quantity,
        totalPrice,
      });

      // Show the success modal
      setShowModal(true);

      setError(null);
    } catch (error) {
      setError('Error completing purchase: ' + error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
        {!error && fetchedItem && pricePerItem > 0 && (
          <p className="uppercase">{fetchedItem}: ${pricePerItem.toFixed(2)}</p>
        )}
        {error && <p className="error-message">{error}</p>}
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
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <button type="submit">Buy</button>
      </form>

      {/* Render the SuccessModal if purchase is successful */}
      {showModal && (
        <SuccessModal 
          symbol={tradeInfo.symbol}
          quantity={tradeInfo.quantity}
          totalPrice={tradeInfo.totalPrice}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default BuyPage;
