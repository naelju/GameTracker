import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Game, GameData } from '../models/game'

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([])

  const loadGames = async () => {
    try {
      const { data, error } = await supabase.from('game').select('*')
      console.log(data)
      if (error) throw error
      setGames(data)
    } catch (error) {
      console.error('Error loading games:', error)
    }
  }

  const addGame = async (gameData: GameData) => {
    try {
      const { data, error } = await supabase
        .from('game')
        .insert([gameData])
        .select()
        .single()
      if (error) throw error
      setGames(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error adding game:', error)
      throw error
    }
  }

  const updateGame = async (id: string, gameData: GameData) => {    
    try {
      const { data, error } = await supabase
        .from('game')
        .update(gameData)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      setGames(prev => prev.map(game => 
        game.id === id ? data : game
      ))
      return data
    } catch (error) {
      console.error('Error updating game:', error)
      throw error
    }
  }

  const deleteGame = async (id: string) => {
    try {
      const { error } = await supabase
        .from('game')
        .delete()
        .eq('id', id)
      if (error) throw error
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
    addGame,
    updateGame,
    deleteGame,
    loadGames
  }
}
