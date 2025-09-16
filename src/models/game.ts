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

export enum ObjectiveStatusEnum {
  NO = 'no',
  YES = 'yes',
  UNDEFINED = 'undefined'
}

export type FormData = {
  name: string,
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