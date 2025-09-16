import React from 'react'
import {
  TableContainer,
  GamesTable,
  TableHeader,
  TableCell,
  EmptyState
} from './GameTracker.styles'
import GameRowItem from './GameRowItem'

const GameTable = ({ 
  games, 
  isLoading, 
  onEdit, 
  onDelete, 
  onStatusToggle, 
  getStatusIcon, 
  getStatusColor,
  isAdding,
  editingId
}) => {
  return (
    <TableContainer>
      <GamesTable>
        <thead>
          <tr>
            <TableHeader className="game-name-header">Game Name</TableHeader>
            <TableHeader>Side Quests</TableHeader>
            <TableHeader>Free Achievements</TableHeader>
            <TableHeader>All Achievements</TableHeader>
            <TableHeader className="completion-column">100% Complete</TableHeader>
            <TableHeader>Date Started</TableHeader>
            <TableHeader>Date Finished</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <EmptyState colSpan="8">
                Loading games...
              </EmptyState>
            </tr>
          ) : games.length === 0 ? (
            <tr>
              <EmptyState colSpan="8">
                No games added yet. Click "Add Game" to get started!
              </EmptyState>
            </tr>
          ) : (
            games.map(game => (
              <GameRowItem
                key={game.id}
                game={game}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusToggle={onStatusToggle}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
                isAdding={isAdding}
                editingId={editingId}
              />
            ))
          )}
        </tbody>
      </GamesTable>
    </TableContainer>
  )
}

export default GameTable
