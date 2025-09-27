import React, { useState } from 'react'
import { useGames } from '../hooks/useGames'
import { ViewTabs } from './ViewTabs'
import { Controls } from './Controls'
import { GameForm } from './GameForm'
import { GameTable } from './GameTable'
import { ImageView } from './ImageView'
import styled from 'styled-components'
import { type Game, type GameData, ObjectiveStatusEnum, type FormData } from '../models/game'

interface GameTrackerProps {
  userId: string
  adminKey: string
}

export const GameTracker: React.FC<GameTrackerProps> = ({ userId, adminKey }) => {
  const [activeView, setActiveView] = useState('table')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    startDate: null,
    finishDate: null,
    mainStory: ObjectiveStatusEnum.NO,
    sideQuests: ObjectiveStatusEnum.NO,
    freeAchievements: ObjectiveStatusEnum.NO,
    allAchievements: ObjectiveStatusEnum.NO,
    mainStoryComment: '',
    sideQuestsComment: '',
    freeAchievementsComment: '',
    allAchievementsComment: ''
  })

  const { games, addGame, updateGame, deleteGame } = useGames(userId, adminKey)

  const resetForm = () => {
    setFormData({
      name: '',
      startDate: null,
      finishDate: null,
      mainStory: ObjectiveStatusEnum.NO,
      sideQuests: ObjectiveStatusEnum.NO,
      freeAchievements: ObjectiveStatusEnum.NO,
      allAchievements: ObjectiveStatusEnum.NO,
      mainStoryComment: '',
      sideQuestsComment: '',
      freeAchievementsComment: '',
      allAchievementsComment: ''
    })
  }

  const computeGame100Percent = (mainStory: ObjectiveStatusEnum, sideQuests: ObjectiveStatusEnum, freeAchievements: ObjectiveStatusEnum, allAchievements: ObjectiveStatusEnum) => {
    const fields = [mainStory, sideQuests, freeAchievements, allAchievements]
    return fields.every(field => field === ObjectiveStatusEnum.YES || field === ObjectiveStatusEnum.UNDEFINED) ? true : false
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
    const newStatus = currentStatus === ObjectiveStatusEnum.YES ? ObjectiveStatusEnum.NO : ObjectiveStatusEnum.YES;
    
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
        />
      )}

      {activeView === 'images' && <ImageView />}
    </S.GameTrackerContainer>
  )
}

namespace S {
  export const GameTrackerContainer = styled.div`
    background: #1e293b;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    min-height: 600px;
    border: 1px solid #334155;
  `;

  export const ViewTabs = styled.div`
    display: flex;
    background: #334155;
    border-bottom: 1px solid #475569;
    padding: 0 24px;
    `;
}

