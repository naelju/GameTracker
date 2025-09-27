import { useState, useEffect } from 'react'
import { getSupabaseClient } from '../lib/supabase'
import { Game, GameData } from '../models/game'

export const useGames = (userId: string | null, adminKey: string = '') => {
  const [games, setGames] = useState<Game[]>([])

  const loadGames = async () => {
    if (!userId) return
    
    try {
      const supabase = getSupabaseClient(adminKey)
      // Join game and user_game tables to get complete game data
      const { data, error } = await supabase
        .from('user_game')
        .select(`
          *,
          game:gameId (
            id,
            name
          )
        `)
        .eq('userId', userId)
      
      if (error) throw error
      
      // Transform the data to match our Game model
      const transformedGames = data?.map(item => ({
        id: item.gameId,
        name: item.game.name,
        mainStory: item.mainStory,
        mainStoryComment: item.mainStoryComment,
        sideQuests: item.sideQuests,
        sideQuestsComment: item.sideQuestsComment,
        freeAchievements: item.freeAchievements,
        freeAchievementsComment: item.freeAchievementsComment,
        allAchievements: item.allAchievements,
        allAchievementsComment: item.allAchievementsComment,
        hundredPercent: item.hundredPercent,
        startDate: item.startDate,
        finishDate: item.finishDate
      })) || []
      
      setGames(transformedGames)
    } catch (error) {
      console.error('Error loading games:', error)
    }
  }

  const addGame = async (gameData: GameData) => {
    if (!userId) throw new Error('User ID is required')
    
    try {
      const supabase = getSupabaseClient(adminKey)
      // First, insert the game into the game table
      const { data: gameData, error: gameError } = await supabase
        .from('game')
        .insert([{ name: gameData.name }])
        .select()
        .single()
      
      if (gameError) throw gameError
      
      // Then, insert the user_game record
      const { data: userGameData, error: userGameError } = await supabase
        .from('user_game')
        .insert([{
          gameId: gameData.id,
          userId: userId,
          name: gameData.name,
          mainStory: gameData.mainStory,
          mainStoryComment: gameData.mainStoryComment,
          sideQuests: gameData.sideQuests,
          sideQuestsComment: gameData.sideQuestsComment,
          freeAchievements: gameData.freeAchievements,
          freeAchievementsComment: gameData.freeAchievementsComment,
          allAchievements: gameData.allAchievements,
          allAchievementsComment: gameData.allAchievementsComment,
          hundredPercent: gameData.hundredPercent,
          startDate: gameData.startDate,
          finishDate: gameData.finishDate
        }])
        .select()
        .single()
      
      if (userGameError) throw userGameError
      
      // Transform the data to match our Game model
      const transformedGame = {
        id: gameData.id,
        name: gameData.name,
        mainStory: userGameData.mainStory,
        mainStoryComment: userGameData.mainStoryComment,
        sideQuests: userGameData.sideQuests,
        sideQuestsComment: userGameData.sideQuestsComment,
        freeAchievements: userGameData.freeAchievements,
        freeAchievementsComment: userGameData.freeAchievementsComment,
        allAchievements: userGameData.allAchievements,
        allAchievementsComment: userGameData.allAchievementsComment,
        hundredPercent: userGameData.hundredPercent,
        startDate: userGameData.startDate,
        finishDate: userGameData.finishDate
      }
      
      setGames(prev => [transformedGame, ...prev])
      return transformedGame
    } catch (error) {
      console.error('Error adding game:', error)
      throw error
    }
  }

  const updateGame = async (id: string, gameData: GameData) => {    
    if (!userId) throw new Error('User ID is required')
    
    try {
      const supabase = getSupabaseClient(adminKey)
      // Update the game name in the game table
      const { error: gameError } = await supabase
        .from('game')
        .update({ name: gameData.name })
        .eq('id', id)
      
      if (gameError) throw gameError
      
      // Update the user_game record (without name field)
      const { data, error } = await supabase
        .from('user_game')
        .update({
          mainStory: gameData.mainStory,
          mainStoryComment: gameData.mainStoryComment,
          sideQuests: gameData.sideQuests,
          sideQuestsComment: gameData.sideQuestsComment,
          freeAchievements: gameData.freeAchievements,
          freeAchievementsComment: gameData.freeAchievementsComment,
          allAchievements: gameData.allAchievements,
          allAchievementsComment: gameData.allAchievementsComment,
          hundredPercent: gameData.hundredPercent,
          startDate: gameData.startDate,
          finishDate: gameData.finishDate
        })
        .eq('gameId', id)
        .eq('userId', userId)
        .select()
        .single()
      
      if (error) throw error
      
      // Transform the data to match our Game model
      const transformedGame = {
        id: id,
        name: gameData.name,
        mainStory: data.mainStory,
        mainStoryComment: data.mainStoryComment,
        sideQuests: data.sideQuests,
        sideQuestsComment: data.sideQuestsComment,
        freeAchievements: data.freeAchievements,
        freeAchievementsComment: data.freeAchievementsComment,
        allAchievements: data.allAchievements,
        allAchievementsComment: data.allAchievementsComment,
        hundredPercent: data.hundredPercent,
        startDate: data.startDate,
        finishDate: data.finishDate
      }
      
      setGames(prev => prev.map(game => 
        game.id === id ? transformedGame : game
      ))
      return transformedGame
    } catch (error) {
      console.error('Error updating game:', error)
      throw error
    }
  }

  const deleteGame = async (id: string) => {
    if (!userId) throw new Error('User ID is required')
    
    try {
      const supabase = getSupabaseClient(adminKey)
      // Delete from user_game table first
      const { error: userGameError } = await supabase
        .from('user_game')
        .delete()
        .eq('gameId', id)
        .eq('userId', userId)
      
      if (userGameError) throw userGameError
      
      // Delete from game table
      const { error: gameError } = await supabase
        .from('game')
        .delete()
        .eq('id', id)
      
      if (gameError) throw gameError
      
      setGames(prev => prev.filter(game => game.id !== id))
    } catch (error) {
      console.error('Error deleting game:', error)
      throw error
    }
  }

  useEffect(() => {
    if (userId) {
      loadGames()
    } else {
      setGames([])
    }
  }, [userId])

  return {
    games,
    addGame,
    updateGame,
    deleteGame,
    loadGames
  }
}
