import React, { useState } from 'react'
import { GameTracker } from './components/GameTracker'
import './App.css'

function App() {
  const [userId, setUserId] = useState('')
  const [adminKey, setAdminKey] = useState('')

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎮 Game Tracker 🎮</h1>
        <p>Track your gaming progress and achievements</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <label htmlFor="userId" style={{ color: '#e2e8f0', marginRight: '10px' }}>
              User ID:
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID..."
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #475569',
                background: '#334155',
                color: '#f1f5f9',
                width: '300px'
              }}
            />
          </div>
          <div>
            <label htmlFor="adminKey" style={{ color: '#e2e8f0', marginRight: '10px' }}>
              Admin Key (optional):
            </label>
            <input
              id="adminKey"
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key for elevated access..."
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #475569',
                background: '#334155',
                color: '#f1f5f9',
                width: '300px'
              }}
            />
          </div>
        </div>
      </header>
      <main>
        <GameTracker userId={userId} adminKey={adminKey} />
      </main>
    </div>
  )
}

export default App