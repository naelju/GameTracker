import React, { useState } from 'react'
import { useGames } from '../hooks/useGames'
import { computeGame100Percent, getStatusIcon, getStatusColor } from '../utils/gameUtils'
import { GameTrackerContainer } from './GameTracker.styles'
import ViewTabs from './ViewTabs'
import Controls from './Controls'
import GameForm from './GameForm'
import GameTable from './GameTable'
import ImageView from './ImageView'

const GameTracker = () => {
  const [activeView, setActiveView] = useState('table')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    dateStarted: '',
    dateFinished: '',
    sideQuestsFinished: 'no',
    allFreeAchievements: 'no',
    allAchievements: 'no',
    game100Percent: 'no',
    sideQuestsComment: '',
    allFreeAchievementsComment: '',
    allAchievementsComment: '',
    game100PercentComment: ''
  })

  const { games, isLoading, addGame, updateGame, deleteGame, setGames } = useGames()

  const resetForm = () => {
    setFormData({
      name: '',
      dateStarted: '',
      dateFinished: '',
      sideQuestsFinished: 'no',
      allFreeAchievements: 'no',
      allAchievements: 'no',
      sideQuestsComment: '',
      allFreeAchievementsComment: '',
      allAchievementsComment: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAdd = async () => {
    if (!formData.name.trim()) return

    const game100Percent = computeGame100Percent(
      formData.sideQuestsFinished,
      formData.allFreeAchievements,
      formData.allAchievements
    )

    const newGameData = {
      ...formData,
      dateStarted: formData.dateStarted || null,
      dateFinished: formData.dateFinished || null,
      game100Percent
    }

    try {
      await addGame(newGameData)
      resetForm()
      setIsAdding(false)
    } catch (error) {
      console.error('Error adding game:', error)
    }
  }

  const handleEdit = (game) => {
    setEditingId(game.id)
    setFormData({
      name: game.name,
      dateStarted: game.dateStarted || '',
      dateFinished: game.dateFinished || '',
      sideQuestsFinished: game.sideQuestsFinished,
      allFreeAchievements: game.allFreeAchievements,
      allAchievements: game.allAchievements,
      sideQuestsComment: game.sideQuestsComment || '',
      allFreeAchievementsComment: game.allFreeAchievementsComment || '',
      allAchievementsComment: game.allAchievementsComment || ''
    })
  }

  const handleUpdate = async () => {
    if (!formData.name.trim()) return

    const game100Percent = computeGame100Percent(
      formData.sideQuestsFinished,
      formData.allFreeAchievements,
      formData.allAchievements
    )

    const updateData = {
      ...formData,
      dateStarted: formData.dateStarted || null,
      dateFinished: formData.dateFinished || null,
      game100Percent
    }

    try {
      await updateGame(editingId, updateData)
      resetForm()
      setEditingId(null)
    } catch (error) {
      console.error('Error updating game:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await deleteGame(id)
      } catch (error) {
        console.error('Error deleting game:', error)
      }
    }
  }

  const handleCancel = () => {
    resetForm()
    setIsAdding(false)
    setEditingId(null)
  }

  const handleStatusToggle = async (gameId, field) => {
    const game = games.find(g => g.id === gameId)
    if (!game) return

    const currentStatus = game[field]
    let newStatus
    if (currentStatus === 'yes') {
      newStatus = 'no'
    } else if (currentStatus === 'no') {
      newStatus = 'yes'
    } else {
      // Don't toggle undefined status
      return
    }
    
    const updatedGame = {
      ...game,
      [field]: newStatus
    }
    
    // Recompute 100% status
    updatedGame.game100Percent = computeGame100Percent(
      updatedGame.sideQuestsFinished,
      updatedGame.allFreeAchievements,
      updatedGame.allAchievements
    )

    try {
      await updateGame(gameId, updatedGame)
    } catch (error) {
      console.error('Error updating game status:', error)
    }
  }


  return (
    <GameTrackerContainer>
      <ViewTabs 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />

      <Controls 
        onAddGame={() => setIsAdding(true)}
        isAdding={isAdding}
        editingId={editingId}
        setGames={setGames}
      />

      <GameForm
        isAdding={isAdding}
        editingId={editingId}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={editingId ? handleUpdate : handleAdd}
        onCancel={handleCancel}
      />

      {activeView === 'table' && (
        <GameTable
          games={games}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
          isAdding={isAdding}
          editingId={editingId}
        />
      )}

      {activeView === 'images' && <ImageView />}
    </GameTrackerContainer>
  )
}

export default GameTracker
