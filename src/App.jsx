import React from 'react'
import GameTracker from './components/GameTracker'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🎮 Game Tracker</h1>
        <p>Track your gaming progress and achievements</p>
      </header>
      <main>
        <GameTracker />
      </main>
    </div>
  )
}

export default App