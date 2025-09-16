import React from 'react'
import { Plus } from 'lucide-react'
import { Controls as ControlsContainer, AddButton } from './GameTracker.styles'
import jsonStorage from '../services/jsonStorage'

const Controls = ({ onAddGame, isAdding, editingId, setGames }) => {
  const handleExport = () => {
    jsonStorage.exportData()
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      jsonStorage.importData(file)
        .then((games) => {
          setGames(games)
          alert('Data imported successfully!')
        })
        .catch((error) => {
          alert('Error importing data: ' + error.message)
        })
    }
  }

  return (
    <ControlsContainer>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <AddButton 
          onClick={onAddGame}
          disabled={isAdding || editingId}
        >
          <Plus size={20} />
          Add Game
        </AddButton>
        
        <button 
          onClick={handleExport}
          style={{
            padding: '8px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📤 Export
        </button>
        
        <label style={{
          padding: '8px 16px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          background: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          display: 'inline-block'
        }}>
          📥 Import
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </ControlsContainer>
  )
}

export default Controls
