import { getSupabaseClient } from '../lib/supabase'
import { Game, UserGame, UserGameWithGame } from '../models/game'

export type DatabaseInterractionProps = {
  adminKey: string
}

export const useDatabaseInterraction = ({ adminKey }: DatabaseInterractionProps) => {

  const getUserGamesWithGame = async (userId: string): Promise<UserGameWithGame[]> => {
    const supabase = getSupabaseClient(adminKey)
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

      return data
  }

  const insertGame = async (name: string): Promise<Game> => {
    const supabase = getSupabaseClient(adminKey)

    const { data, error } = await supabase
    .from('game')
    .insert([{ name: name }])
    .select()
    .single()

    if (error) throw error

    return data
  }

  const insertUserGame = async (userGame: UserGame): Promise<UserGame> => {
    const supabase = getSupabaseClient(adminKey)
    
    const { data, error } = await supabase
      .from('user_game')
      .insert([{
        gameId: userGame.gameId,
        userId: userGame.userId ,
        mainStory: userGame.mainStory,
        mainStoryComment: userGame.mainStoryComment,
        sideQuests: userGame.sideQuests,
        sideQuestsComment: userGame.sideQuestsComment,
        freeAchievements: userGame.freeAchievements,
        freeAchievementsComment: userGame.freeAchievementsComment,
        allAchievements: userGame.allAchievements,
        allAchievementsComment: userGame.allAchievementsComment,
        hundredPercent: userGame.hundredPercent,
        startDate: userGame.startDate,
        finishDate: userGame.finishDate
      }])
      .select()
      .single()

    if (error) throw error

    return data
  }

  const updateUserGame = async (userGame: UserGame): Promise<UserGame> => {
    const supabase = getSupabaseClient(adminKey)

    const { data, error } = await supabase
      .from('user_game')
      .update({
        mainStory: userGame.mainStory,
        mainStoryComment: userGame.mainStoryComment,
        sideQuests: userGame.sideQuests,
        sideQuestsComment: userGame.sideQuestsComment,
        freeAchievements: userGame.freeAchievements,
        freeAchievementsComment: userGame.freeAchievementsComment,
        allAchievements: userGame.allAchievements,
        allAchievementsComment: userGame.allAchievementsComment,
        hundredPercent: userGame.hundredPercent,
        startDate: userGame.startDate,
        finishDate: userGame.finishDate
      })
      .eq('gameId', userGame.gameId)
      .eq('userId', userGame.userId)
      .select()
      .single()
      
    if (error) throw error

    return data
  }

  const deleteUserGame = async (userGameUserId: string, userGameGameId: string) => {
    const supabase = getSupabaseClient(adminKey)
    
    const { data, error } = await supabase
      .from('user_game')
      .delete()
      .eq('userId', userGameUserId)
      .eq('gameId', userGameGameId)
      .select()
      .single()

    if (error) throw error

    return data
  }

  return {
    getUserGamesWithGame,
    insertGame,
    insertUserGame,
    updateUserGame,
    deleteUserGame
  }
}
