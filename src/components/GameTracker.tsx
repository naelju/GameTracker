import React, { useState } from 'react'
import { useGames } from '../hooks/useGames'
import { Controls } from './Controls'
import { GameForm } from './GameForm'
import { GameTable } from './GameTable'
import styled from 'styled-components'
import { type Game, type GameData, ObjectiveStatusEnum, type FormData, UserGameData, UserGame, UserGameWithGame } from '../models/game'

export type GameTrackerProps = {
  userId: string | null
  adminKey: string
}

export const GameTracker = ({ userId, adminKey }: GameTrackerProps) => {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    gameId: null,
    gameName: '',
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

  const { userGames, addUserGame, updateAndReoadUserGame, deleteAndReloadUserGame } = useGames(userId, adminKey)

  const resetForm = () => {
    setFormData({
      gameId: null,
      gameName: '',
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
      await addUserGame(newGameData as UserGameData)
      resetForm()
      setIsAdding(false)
    } catch (error) {
      console.error('Error adding game:', error)
    }
  }

  const handleEdit = (userGameWithGame: UserGameWithGame) => {
    setEditingId(userGameWithGame.gameId)
    setFormData({
      gameId: userGameWithGame.gameId,
      gameName: userGameWithGame.game.name,
      startDate: userGameWithGame.startDate,
      finishDate: userGameWithGame.finishDate,
      mainStory: userGameWithGame.mainStory,
      mainStoryComment: userGameWithGame.mainStoryComment,
      sideQuests: userGameWithGame.sideQuests,
      sideQuestsComment: userGameWithGame.sideQuestsComment,
      freeAchievements: userGameWithGame.freeAchievements,
      freeAchievementsComment: userGameWithGame.freeAchievementsComment,
      allAchievements: userGameWithGame.allAchievements,
      allAchievementsComment: userGameWithGame.allAchievementsComment
    } as FormData);
  }

  const handleUpdate = async () => {
    if (!formData.gameName.trim()) return

    const hundredPercent = computeGame100Percent(
      formData.mainStory,
      formData.sideQuests,
      formData.freeAchievements,
      formData.allAchievements
    )

    const updateData: GameData = {
      name: formData.gameName,
      mainStory: formData.mainStory,
      mainStoryComment: formData.mainStoryComment,
      sideQuests: formData.sideQuests,
      sideQuestsComment: formData.sideQuestsComment,
      freeAchievements: formData.freeAchievements,
      freeAchievementsComment: formData.freeAchievementsComment,
      allAchievements: formData.allAchievements,
      allAchievementsComment: formData.allAchievementsComment,
      hundredPercent,
      startDate: formData.startDate === '' ? null : formData.startDate,
      finishDate: formData.finishDate === '' ? null : formData.finishDate
    }

    if (updateData.startDate === '') {
      updateData.startDate = null
    }
    if (updateData.finishDate === '') {
      updateData.finishDate = null
    }

    try {
      if (!editingId) return
      await updateAndReoadUserGame({...updateData, userId: userId, gameId: editingId} as UserGame)
      resetForm()
      setEditingId(null)
    } catch (error) {
      console.error('Error updating game:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await deleteAndReloadUserGame(id)
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

  const handleStatusToggle = async (userGameWithGame: UserGameWithGame, field: string) => {
    const userGame = userGames.find(g => g.userId === userGameWithGame.userId && g.gameId === userGameWithGame.gameId)
    if (!userGame) throw new Error('User game not found')

    const currentStatus = userGame[field]
    const newStatus = currentStatus === ObjectiveStatusEnum.YES ? ObjectiveStatusEnum.NO : ObjectiveStatusEnum.YES;
    
    const updatedGame: UserGameWithGame = {
      ...userGame,
      [field]: newStatus
    }

    updatedGame.hundredPercent = computeGame100Percent(
      updatedGame.mainStory,
      updatedGame.sideQuests,
      updatedGame.freeAchievements,
      updatedGame.allAchievements
    )

    try {
      await updateAndReoadUserGame(updatedGame)
    } catch (error) {
      console.error('Error updating game status:', error)
    }
  }

  return (
    <S.GameTrackerContainer>
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
      <GameTable
        userGamesWithGame={userGames}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusToggle={handleStatusToggle}
      />
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
}

