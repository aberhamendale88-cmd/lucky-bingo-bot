import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [view, setView] = useState('lobby'); // lobby, game
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    // ከቴሌግራም የመጣ ተጫዋች መሆኑን ማረጋገጥ
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand(); // ሙሉ ስክሪን እንዲሆን
    
    const userData = tg.initDataUnsafe?.user;
    if (userData) {
      setUser(userData);
      // ወደ backend ልኮ እንዲመዘገብ ማድረግ
      registerUser(userData);
    }
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          telegramId: userData.id.toString(), 
          username: userData.username || userData.first_name 
        }),
      });
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleTicketSelect = (num) => {
    if (balance < 10) {
      alert("ለማጫወት በቂ ብር የለዎትም! እባክዎ አካውንትዎን ይሙሉ።");
      return;
    }
    setSelectedTicket(num);
    setView('game');
  };

  return (
    <div className="App">
      {/* Header ክፍል */}
      <div className="game-header">
        <div className="user-info">
          <span>👤 {user ? user.first_name : "ተጫዋች"}</span>
        </div>
        <div className="wallet-info">
          <span>💰 {balance} ETB</span>
        </div>
      </div>

      {/* የቁጥር መምረጫ (Lobby) */}
      {view === 'lobby' && (
        <div className="lobby-container">
          <h2 className="title">LUCKY BINGO</h2>
          <p className="subtitle">ከ 1 - 500 ቁጥር ይምረጡ (1 ትኬት 10 ብር)</p>
          <div className="numbers-grid">
            {Array.from({ length: 500 }, (_, i) => (
              <button 
                key={i + 1} 
                className="number-box"
                onClick={() => handleTicketSelect(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* የጨዋታ ገጽ (Game Screen) */}
      {view === 'game' && (
        <div className="game-container">
          <h3>ትኬት ቁጥር #{selectedTicket}</h3>
          <div className="status-msg">ጨዋታው በቅርቡ ይጀምራል...</div>
          <button className="back-btn" onClick={() => setView('lobby')}>ተመለስ</button>
        </div>
      )}
    </div>
  );
}

export default App;