import React from 'react'
import { ViewTabs as ViewTabsContainer, TabButton } from './GameTracker.styles'

const ViewTabs = ({ activeView, onViewChange }) => {
  return (
    <ViewTabsContainer>
      <TabButton 
        className={activeView === 'table' ? 'active' : ''}
        onClick={() => onViewChange('table')}
      >
        Table View
      </TabButton>
      <TabButton 
        className={activeView === 'images' ? 'active' : ''}
        onClick={() => onViewChange('images')}
      >
        Image View
      </TabButton>
    </ViewTabsContainer>
  )
}

export default ViewTabs
