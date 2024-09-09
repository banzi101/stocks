import React, { useState, useEffect, useCallback } from 'react';
import Portfolio from './portfolio';
import '../css/dashboard.css';

function Dashboard() {
  const [userID] = useState(localStorage.getItem('userID'));

  const [balance, setBalance] = useState({
    totalValue: 0,
    totalProfitLoss: 0,
  });

  const fetchBalance = useCallback(async () => {
    if (!userID) return;

    const API_URL = `/balance/getBalance?userId=${userID}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
      setBalance({
        totalValue: Number(data.totalValue),
        totalProfitLoss: Number(data.totalProfitLoss),
      });
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }, [userID]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <div className="total-value">
          <p>Total Value</p>
          <h3>${balance.totalValue.toLocaleString()}</h3>
        </div>
        <div className="total-profit-loss">
          <p>Total Profit/Loss</p>
          <h3 className={balance.totalProfitLoss < 0 ? 'loss' : 'profit'}>
            ${balance.totalProfitLoss.toLocaleString()}
          </h3>
        </div>
      </div>
      <Portfolio fetchBalance={fetchBalance} />
    </div>
  );
}

export default Dashboard;
