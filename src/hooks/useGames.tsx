import { useState, useEffect } from 'react'
import { Game, GameData, UserGame, UserGameData, UserGameWithGame } from '../models/game'
import { useDatabaseInterraction } from './useDatabaseInterraction'

export const useGames = ( userId: string | null, adminKey: string) => {
  const [userGames, setUserGames] = useState<UserGameWithGame[]>([])
  const { getUserGamesWithGame, insertGame, insertUserGame, updateUserGame, deleteUserGame } = useDatabaseInterraction({ adminKey })

  const loadUserGames = async () => {    
    if (!userId) return

    try {
      const userGamesWithGame = await getUserGamesWithGame(userId)
      
      setUserGames(userGamesWithGame)
    } catch (error) {
      console.error('Error loading games:', error)
    }
  }

  const addUserGame = async (userGameData: UserGameData) => {    
    if (!userId) return
    
    try {
      let game = null;

      if (!userGameData.gameId) {
        const game = await insertGame(userGameData.gameName)
        userGameData.gameId = game.id
      }

      const userGame = await insertUserGame({...userGameData, userId: userId} as UserGame)

      const userGameWithGame = {
        ...userGame,
        game: game === null ? {id: userGameData.gameId, name: userGameData.gameName} as Game : game
      }

      setUserGames(prev => [userGameWithGame, ...prev])
    } catch (error) {
      console.error('Error adding game:', error)
      throw error
    }
  }

  const updateAndReoadUserGame = async (userGame: UserGame) => {    
    if (!userId) return
    
    try {
      const updatedUserGame = await updateUserGame(userGame);
      
      setUserGames(prev =>
        prev.map(userGame =>
          userGame.userId === updatedUserGame.userId && userGame.gameId === updatedUserGame.gameId
            ? { ...userGame, ...updatedUserGame }
            : userGame
        )
      )

      return updatedUserGame
    } catch (error) {
      console.error('Error updating game:', error)
      throw error
    }
  }

  const deleteAndReloadUserGame = async (gameId: string) => {    
    if (!userId) return
    
    try {
      await deleteUserGame(userId, gameId);
      
      setUserGames(prev => prev.filter(userGame => userGame.userId !== userId && userGame.gameId !== gameId))
    } catch (error) {
      console.error('Error deleting game:', error)
      throw error
    }
  }

  useEffect(() => {
      loadUserGames()
  }, [userId])

  return {
    userGames,
    loadUserGames,
    addUserGame,
    updateAndReoadUserGame,
    deleteAndReloadUserGame
  }
}
