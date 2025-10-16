// export type Game = {
//   id: string,
//   name: string,
// }

export type User = {
  id: string,
  name: string,
}

export enum ObjectiveStatusEnum {
  NO = 'no',
  YES = 'yes',
  UNDEFINED = 'undefined'
}

// user_game table
export type UserGame = {
  gameId: string,
  userId: string,
  name: string,
  mainStory: ObjectiveStatusEnum,
  mainStoryComment?: string,
  sideQuests: ObjectiveStatusEnum,
  sideQuestsComment?: string,
  freeAchievements: ObjectiveStatusEnum,
  freeAchievementsComment?: string,
  allAchievements: ObjectiveStatusEnum,
  allAchievementsComment?: string,
  hundredPercent: boolean,
  startDate?: string | null,
  finishDate?: string | null,
}

export type UserGameData = {
  gameId: string | null,
  gameName: string,
  userId: string,
  name: string,
  mainStory: ObjectiveStatusEnum,
  mainStoryComment?: string,
  sideQuests: ObjectiveStatusEnum,
  sideQuestsComment?: string,
  freeAchievements: ObjectiveStatusEnum,
  freeAchievementsComment?: string,
  allAchievements: ObjectiveStatusEnum,
  allAchievementsComment?: string,
  hundredPercent: boolean,
  startDate?: string | null,
  finishDate?: string | null,
}

export type UserGameWithGame = UserGame & {
  game: Game,
}



export type Game = {
  id: string,
  name: string,
  mainStory: ObjectiveStatusEnum,
  mainStoryComment?: string,
  sideQuests: ObjectiveStatusEnum,
  sideQuestsComment?: string,
  freeAchievements: ObjectiveStatusEnum,
  freeAchievementsComment?: string,
  allAchievements: ObjectiveStatusEnum,
  allAchievementsComment?: string,
  hundredPercent: boolean,
  startDate?: string | null,
  finishDate?: string | null,
}

export type GameData = {
  name: string,
  mainStory: ObjectiveStatusEnum,
  mainStoryComment?: string,
  sideQuests: ObjectiveStatusEnum,
  sideQuestsComment?: string,
  freeAchievements: ObjectiveStatusEnum,
  freeAchievementsComment?: string,
  allAchievements: ObjectiveStatusEnum,
  allAchievementsComment?: string,
  hundredPercent: boolean,
  startDate?: string | null,
  finishDate?: string | null,
}


export type FormData = {
  gameId: string | null,
  gameName: string,
  mainStory: ObjectiveStatusEnum,
  mainStoryComment?: string,
  sideQuests: ObjectiveStatusEnum,
  sideQuestsComment?: string,
  freeAchievements: ObjectiveStatusEnum,
  freeAchievementsComment?: string,
  allAchievements: ObjectiveStatusEnum,
  allAchievementsComment?: string,
  startDate?: string | null,
  finishDate?: string | null,
}