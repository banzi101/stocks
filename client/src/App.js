import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/dashboard';
import BuyPage from './components/buyPage';
import './css/App.css';
import logo from './mac-logo.svg';

function App() {
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/buy" element={<BuyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
