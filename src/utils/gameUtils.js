export const computeGame100Percent = (mainStory, sideQuests, freeAchievements, allAchievements) => {
  // 100% is yes only if all other fields are yes or undefined (no "no" values)
  const fields = [mainStory, sideQuests, freeAchievements, allAchievements]
  return fields.every(field => field === 'yes' || field === 'undefined') ? 'yes' : 'no'
}

export const getStatusIcon = (status) => {
  switch (status) {
    case 'yes': return '✅'
    case 'no': return '❌'
    case 'undefined': return '❓'
    default: return '❓'
  }
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'yes': return '#10b981'
    case 'no': return '#ef4444'
    case 'undefined': return '#f59e0b'
    default: return '#6b7280'
  }
}
