import React, { useState } from 'react'
import { useGames } from '../hooks/useGames'
import { computeGame100Percent, getStatusIcon, getStatusColor } from '../utils/gameUtils'
import { ViewTabs } from './ViewTabs'
import { Controls } from './Controls'
import { GameForm } from './GameForm'
import { GameTable } from './GameTable'
import { ImageView } from './ImageView'
import styled from 'styled-components'
import { Game, GameData } from '../models/game'

export type FormData = {
  name: string,
  mainStory?: boolean,
  sideQuests?: boolean,
  freeAchievements?: boolean,
  allAchievements?: boolean,
  startDate?: string | null,
  finishDate?: string | null,
  mainStoryComment?: string,
  sideQuestsComment?: string,
  freeAchievementsComment?: string,
  allAchievementsComment?: string
}

export const GameTracker = () => {
  const [activeView, setActiveView] = useState('table')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    startDate: null,
    finishDate: null,
    mainStory: false,
    sideQuests: false,
    freeAchievements: false,
    allAchievements: false,
    mainStoryComment: '',
    sideQuestsComment: '',
    freeAchievementsComment: '',
    allAchievementsComment: ''
  })

  const { games, addGame, updateGame, deleteGame } = useGames()

  const resetForm = () => {
    setFormData({
      name: '',
      startDate: null,
      finishDate: null,
      mainStory: false,
      sideQuests: false,
      freeAchievements: false,
      allAchievements: false,
      mainStoryComment: '',
      sideQuestsComment: '',
      freeAchievementsComment: '',
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

    const hundredPercent = computeGame100Percent(
      formData.mainStory,
      formData.sideQuests,
      formData.freeAchievements,
      formData.allAchievements
    )

    const newGameData = {
      ...formData,
      hundredPercent
    }

    if (newGameData.startDate === '') {
      newGameData.startDate = null
    }
    if (newGameData.finishDate === '') {
      newGameData.finishDate = null
    }

    try {
      await addGame(newGameData as Game)
      resetForm()
      setIsAdding(false)
    } catch (error) {
      console.error('Error adding game:', error)
    }
  }

  const handleEdit = (game: Game) => {
    setEditingId(game.id)
    setFormData({...game})
  }

  const handleUpdate = async () => {
    if (!formData.name.trim()) return

    const hundredPercent = computeGame100Percent(
      formData.mainStory,
      formData.sideQuests,
      formData.freeAchievements,
      formData.allAchievements
    )

    const updateData: GameData = {
      ...formData,
      hundredPercent
    }

    if (updateData.startDate === '') {
      updateData.startDate = null
    }
    if (updateData.finishDate === '') {
      updateData.finishDate = null
    }

    try {
      if (!editingId) return
      await updateGame(editingId, updateData)
      resetForm()
      setEditingId(null)
    } catch (error) {
      console.error('Error updating game:', error)
    }
  }

  const handleDelete = async (id: string) => {
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

  const handleStatusToggle = async (gameId: string, field: string) => {
    const game = games.find(g => g.id === gameId)
    if (!game) return

    const currentStatus = game[field]
    let newStatus = !currentStatus
    
    const updatedGame = {
      ...game,
      [field]: newStatus
    }

    updatedGame.hundredPercent = computeGame100Percent(
      updatedGame.mainStory,
      updatedGame.sideQuests,
      updatedGame.freeAchievements,
      updatedGame.allAchievements
    )

    try {
      await updateGame(gameId, updatedGame)
    } catch (error) {
      console.error('Error updating game status:', error)
    }
  }


  return (
    <S.GameTrackerContainer>
      <ViewTabs 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
      <Controls 
        onAddGame={() => setIsAdding(true)}
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
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
        />
      )}

      {activeView === 'images' && <ImageView />}
    </S.GameTrackerContainer>
  )
}

namespace S {
  export const GameTrackerContainer = styled.div`
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    min-height: 600px;
  `;

  export const ViewTabs = styled.div`
    display: flex;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 0 24px;
    `;
}

