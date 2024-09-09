import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import BuyPage from './components/buyPage';
import LoginPage from './components/loginPage';
import './css/App.css';
import logo from './mac-logo.svg';

function App() {
  const [userName, setUserName] = useState(null);

  const handleLogin = (name) => {
    setUserName(name);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo" className="App-logo" />
          <div className="name">MAC</div>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/buy">Buy</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

            {!userName ? (
              <Route path="*" element={<Navigate to="/login" />} />
            ) : (
              <>
                <Route path="/" element={<Dashboard userName={userName} />} />
                <Route path="/buy" element={<BuyPage />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
