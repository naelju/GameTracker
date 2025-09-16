import React from 'react'
import {
  TableRow,
  TableCell,
  StatusBadge,
  NoDate,
  EditButton,
  DeleteButton
} from './GameTracker.styles'
import editIcon from '../assets/edit_icon.png'
import deleteIcon from '../assets/trash_icon.png'

const GameRowItem = ({ 
  game, 
  onEdit, 
  onDelete, 
  onStatusToggle, 
  getStatusIcon, 
  getStatusColor,
  isAdding,
  editingId
}) => {
  return (
    <TableRow className={game.game100Percent === 'yes' ? 'completed-100' : ''}>
      <TableCell className="game-name">{game.name}</TableCell>
      <TableCell>
        <StatusBadge 
          className={game.mainStory !== 'undefined' ? 'clickable' : ''}
          style={{ backgroundColor: getStatusColor(game.mainStory) }}
          title={game.mainStory !== 'undefined' ? `Click to toggle: ${game.mainStory}` : (game.mainStoryComment ? game.mainStoryComment : 'Undefined status')}
          onClick={() => game.mainStory !== 'undefined' && onStatusToggle(game.id, 'mainStory')}
        >
          {getStatusIcon(game.mainStory)}
        </StatusBadge>
      </TableCell>
      <TableCell>
        <StatusBadge 
          className={game.sideQuestsFinished !== 'undefined' ? 'clickable' : ''}
          style={{ backgroundColor: getStatusColor(game.sideQuestsFinished) }}
          title={game.sideQuestsFinished !== 'undefined' ? `Click to toggle: ${game.sideQuestsFinished}` : (game.sideQuestsComment ? game.sideQuestsComment : 'Undefined status')}
          onClick={() => game.sideQuestsFinished !== 'undefined' && onStatusToggle(game.id, 'sideQuestsFinished')}
        >
          {getStatusIcon(game.sideQuestsFinished)}
        </StatusBadge>
      </TableCell>
      <TableCell>
        <StatusBadge 
          className={game.allFreeAchievements !== 'undefined' ? 'clickable' : ''}
          style={{ backgroundColor: getStatusColor(game.allFreeAchievements) }}
          title={game.allFreeAchievements !== 'undefined' ? `Click to toggle: ${game.allFreeAchievements}` : (game.allFreeAchievementsComment ? game.allFreeAchievementsComment : 'Undefined status')}
          onClick={() => game.allFreeAchievements !== 'undefined' && onStatusToggle(game.id, 'allFreeAchievements')}
        >
          {getStatusIcon(game.allFreeAchievements)}
        </StatusBadge>
      </TableCell>
      <TableCell>
        <StatusBadge 
          className={game.allAchievements !== 'undefined' ? 'clickable' : ''}
          style={{ backgroundColor: getStatusColor(game.allAchievements) }}
          title={game.allAchievements !== 'undefined' ? `Click to toggle: ${game.allAchievements}` : (game.allAchievementsComment ? game.allAchievementsComment : 'Undefined status')}
          onClick={() => game.allAchievements !== 'undefined' && onStatusToggle(game.id, 'allAchievements')}
        >
          {getStatusIcon(game.allAchievements)}
        </StatusBadge>
      </TableCell>
      <TableCell className="completion-column">
        <StatusBadge 
          className="computed"
          style={{ backgroundColor: getStatusColor(game.game100Percent) }}
          title={`Computed: ${game.game100Percent} (based on other fields)`}
        >
          {getStatusIcon(game.game100Percent)}
        </StatusBadge>
      </TableCell>
      <TableCell>
        {game.dateStarted ? (
          game.dateStarted
        ) : (
          <NoDate>Not set</NoDate>
        )}
      </TableCell>
      <TableCell>
        {game.dateFinished ? (
          game.dateFinished
        ) : (
          <NoDate>Not set</NoDate>
        )}
      </TableCell>
      <TableCell className="actions">
        <EditButton 
          onClick={() => onEdit(game)}
          disabled={isAdding || editingId}
        >
          <img src={editIcon} alt="Edit" width="16" height="16" />
        </EditButton>
        <DeleteButton 
          onClick={() => onDelete(game.id)}
          disabled={isAdding || editingId}
        >
          <img src={deleteIcon} alt="Delete" width="16" height="16" />
        </DeleteButton>
      </TableCell>
    </TableRow>
  )
}

export default GameRowItem
