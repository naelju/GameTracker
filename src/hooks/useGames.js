import { useState, useEffect } from 'react'
import jsonStorage from '../services/jsonStorage'

export const useGames = () => {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const loadGames = async () => {
    try {
      setIsLoading(true)
      const gamesData = await jsonStorage.getGames()
      setGames(gamesData)
    } catch (error) {
      console.error('Error loading games:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addGame = async (gameData) => {
    try {
      const newGame = await jsonStorage.createGame(gameData)
      setGames(prev => [...prev, newGame])
      return newGame
    } catch (error) {
      console.error('Error adding game:', error)
      throw error
    }
  }

  const updateGame = async (id, gameData) => {
    try {
      const updatedGame = await jsonStorage.updateGame(id, gameData)
      setGames(prev => prev.map(game => 
        game.id === id ? updatedGame : game
      ))
      return updatedGame
    } catch (error) {
      console.error('Error updating game:', error)
      throw error
    }
  }

  const deleteGame = async (id) => {
    try {
      await jsonStorage.deleteGame(id)
      setGames(prev => prev.filter(game => game.id !== id))
    } catch (error) {
      console.error('Error deleting game:', error)
      throw error
    }
  }

  useEffect(() => {
    loadGames()
  }, [])

  return {
    games,
    isLoading,
    addGame,
    updateGame,
    deleteGame,
    loadGames
  }
}
