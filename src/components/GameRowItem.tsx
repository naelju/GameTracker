import React from 'react'
import editIcon from '../assets/edit_icon.png'
import deleteIcon from '../assets/trash_icon.png'
import styled from 'styled-components'
import { StatusBadge } from './StatusBadge';
import { Game } from '../models/game';

export type GameRowItemProps = {
  game: Game,
  onEdit: (game: Game) => void,
  onDelete: (gameId: string) => void,
  onStatusToggle: (gameId: string, field: string) => void,
  getStatusIcon: (status: boolean) => string,
  getStatusColor: (status: boolean) => string,
}

export const GameRowItem = ({ 
  game, 
  onEdit, 
  onDelete, 
  onStatusToggle, 
  getStatusIcon, 
  getStatusColor,
}: GameRowItemProps) => {

  console.log(game.mainStory);
  return (
    <S.TableRow className={game.hundredPercent === true ? 'completed-100' : ''}>
      <S.TableCell className="game-name">{game.name}</S.TableCell>
      <S.TableCell>
        <StatusBadge 
          gameId={game.id || ''}
          propertyName="mainStory"
          propertyStatus={game.mainStory}
          propertyComment={game.mainStoryComment}
          onStatusToggle={onStatusToggle}
        />
      </S.TableCell>
      <S.TableCell>
        <StatusBadge 
          gameId={game.id || ''}
          propertyName="sideQuests"
          propertyStatus={game.sideQuests}
          propertyComment={game.sideQuestsComment}
          onStatusToggle={onStatusToggle}
        />
      </S.TableCell>
      <S.TableCell>
        <StatusBadge 
          gameId={game.id || ''}
          propertyName="freeAchievements"
          propertyStatus={game.freeAchievements}
          propertyComment={game.freeAchievementsComment}
          onStatusToggle={onStatusToggle}
        />
      </S.TableCell>
      <S.TableCell>
      < StatusBadge 
          gameId={game.id || ''}
          propertyName="allAchievements"
          propertyStatus={game.allAchievements}
          propertyComment={game.allAchievementsComment}
          onStatusToggle={onStatusToggle}
        />
      </S.TableCell>
      <S.TableCell className="completion-column">
        <S.StatusBadge 
          className="computed"
          style={{ backgroundColor: getStatusColor(game.hundredPercent) }}
          title={`Computed: ${game.hundredPercent} (based on other fields)`}
        >
          {getStatusIcon(game.hundredPercent)}
        </S.StatusBadge>
      </S.TableCell>
      <S.TableCell>
        {game.startDate ? (
          game.startDate
        ) : (
          <S.NoDate>Not set</S.NoDate>
        )}
      </S.TableCell>
      <S.TableCell>
        {game.finishDate ? (
          game.finishDate
        ) : (
          <S.NoDate>Not set</S.NoDate>
        )}
      </S.TableCell>
      <S.TableCell className="actions">
        <S.EditButton 
          onClick={() => onEdit(game)}
        >
          <img src={editIcon} alt="Edit" width="16" height="16" />
        </S.EditButton>
        <S.DeleteButton 
          onClick={() => onDelete(game.id)}
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
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle;
    text-align: center;

    @media (max-width: 768px) {
      padding: 12px 8px;
    }

    &.game-name {
      font-weight: 600;
      color: #1f2937;
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
    &:hover {
      background: #f9fafb;
    }

    &.completed-100 {
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);

      &:hover {
        background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
        box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
      }

      td {
        border-bottom-color: rgba(255, 215, 0, 0.3);
      }

      .game-name {
        color: #8b4513;
      }

      .status-badge {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.8);

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
    color: #9ca3af;
    font-style: italic;
    font-size: 13px;
    background: #f9fafb;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #e5e7eb;
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
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
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
      box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
}