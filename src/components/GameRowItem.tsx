import React from 'react'
import editIcon from '../assets/edit_icon.png'
import deleteIcon from '../assets/trash_icon.png'
import styled from 'styled-components'
import { StatusBadge } from './StatusBadge';
import { Game, UserGameWithGame } from '../models/game';

export type GameRowItemProps = {
  userGameWithGame: UserGameWithGame,
  onEdit: (userGameWithGame: UserGameWithGame) => void,
  onDelete: (gameId: string) => void,
  onStatusToggle: (userGameWithGame: UserGameWithGame, field: string) => void,
}

export const GameRowItem = ({ 
  userGameWithGame, 
  onEdit, 
  onDelete, 
  onStatusToggle, 
}: GameRowItemProps) => {
  const getStatusIcon = (status: boolean) => {
    switch (status) {
      case true: return '✅'
      case false: return '❌'
      default: return '❓'
    }
  }
  
  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true: return '#10b981'
      case false: return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <S.TableRow className={userGameWithGame.hundredPercent === true ? 'completed-100' : ''}>
      <S.TableCell className="game-name">{userGameWithGame.game.name}</S.TableCell>
      <S.TableCell>
        <StatusBadge 
          userGameWithGame={userGameWithGame}
          propertyName="mainStory"
          propertyStatus={userGameWithGame.mainStory}
          propertyComment={userGameWithGame.mainStoryComment}
          onStatusToggle={onStatusToggle}
        />
      </S.TableCell>
      <S.TableCell>
        <StatusBadge 
          userGameWithGame={userGameWithGame}
          propertyName="sideQuests"
          propertyStatus={userGameWithGame.sideQuests}
          propertyComment={userGameWithGame.sideQuestsComment}
          onStatusToggle={onStatusToggle}
        />
      </S.TableCell>
      <S.TableCell>
        <StatusBadge 
          userGameWithGame={userGameWithGame}
          propertyName="freeAchievements"
          propertyStatus={userGameWithGame.freeAchievements}
          propertyComment={userGameWithGame.freeAchievementsComment}
          onStatusToggle={onStatusToggle}
        />
      </S.TableCell>
      <S.TableCell>
      < StatusBadge 
          userGameWithGame={userGameWithGame}
          propertyName="allAchievements"
          propertyStatus={userGameWithGame.allAchievements}
          propertyComment={userGameWithGame.allAchievementsComment}
          onStatusToggle={onStatusToggle}
        />
      </S.TableCell>
      <S.TableCell className="completion-column">
        <S.StatusBadge 
          className="computed"
          style={{ backgroundColor: getStatusColor(userGameWithGame.hundredPercent) }}
          title={`Computed: ${userGameWithGame.hundredPercent} (based on other fields)`}
        >
          {getStatusIcon(userGameWithGame.hundredPercent)}
        </S.StatusBadge>
      </S.TableCell>
      <S.TableCell>
        {userGameWithGame.startDate ? (
          userGameWithGame.startDate
        ) : (
          <S.NoDate>Not set</S.NoDate>
        )}
      </S.TableCell>
      <S.TableCell>
        {userGameWithGame.finishDate ? (
          userGameWithGame.finishDate
        ) : (
          <S.NoDate>Not set</S.NoDate>
        )}
      </S.TableCell>
      <S.TableCell className="actions">
        <S.EditButton 
          onClick={() => onEdit(userGameWithGame)}
        >
          <img src={editIcon} alt="Edit" width="16" height="16" />
        </S.EditButton>
        <S.DeleteButton 
          onClick={() => onDelete(userGameWithGame.gameId)}
        >
          <img src={deleteIcon} alt="Delete" width="16" height="16" />
        </S.DeleteButton>
      </S.TableCell>
    </S.TableRow>
  )
}

namespace S {
  export const TableCell = styled.td`
    padding: 10px 8px;
    border-bottom: 1px solid #475569;
    vertical-align: middle;
    text-align: center;
    color: #e2e8f0;

    @media (max-width: 768px) {
      padding: 12px 8px;
    }

    &.game-name {
      font-weight: 600;
      color: #cecece;
      min-width: 150px;
      text-align: left !important;
      vertical-align: middle;

      @media (max-width: 768px) {
        min-width: 120px;
      }
    }

    &.completion-column {
      width: 60px;
      min-width: 60px;
      max-width: 60px;
      text-align: center;
    }

    &.actions {
      white-space: nowrap;
      text-align: center;
    }
  `;

  export const TableRow = styled.tr`
  background-color: #334155;
    /* &:hover {
      background: #334155;
    } */

    &.completed-100 {
      background: linear-gradient(135deg, #f59e0b 0%, #334155 10%, #334155 90%, #f59e0b 100%);
      box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);

      /* &:hover {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
      } */

      td {
        /* border-bottom-color: rgba(251, 191, 36, 0.3); */
      }

      /* .game-name {
        color: #ffa600;
      } */

      .status-badge {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.9);

        &.computed {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
          box-shadow: 0 3px 8px rgba(16, 185, 129, 0.4);
        }
      }
    }
  `;

  export const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 16px;
    font-weight: bold;
    margin: 0 auto;

    &.clickable {
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }

    &.computed {
      cursor: default;
      opacity: 0.8;
      border: 2px solid rgba(0, 0, 0, 0.1);
    }
  `;

  export const NoDate = styled.span`
    color: #94a3b8;
    font-style: italic;
    font-size: 13px;
    background: #334155;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #475569;
    display: inline-block;
  `;

  export const EditButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-right: 4px;
    background: #3b82f6;
    color: white;
    border: 2px solid #2563eb;

    &:hover:not(:disabled) {
      background: #2563eb;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  export const DeleteButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-right: 4px;
    background: #ef4444;
    color: white;
    border: 2px solid #dc2626;

    &:hover:not(:disabled) {
      background: #dc2626;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(239, 68, 68, 0.4);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
}