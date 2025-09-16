export const computeGame100Percent = (mainStory, sideQuests, freeAchievements, allAchievements) => {
  const fields = [mainStory, sideQuests, freeAchievements, allAchievements]
  return fields.every(field => field === true || field === null) ? true : false
}

export const getStatusIcon = (status) => {
  switch (status) {
    case true: return '✅'
    case false: return '❌'
    default: return '❓'
  }
}

export const getStatusColor = (status) => {
  switch (status) {
    case true: return '#10b981'
    case false: return '#ef4444'
    case null: return '#f59e0b'
    default: return '#6b7280'
  }
}
