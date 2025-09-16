import React from 'react'
import { Game } from '../models/game'
import { GameRowItem } from './GameRowItem'
import styled from 'styled-components'

export type GameTableProps = {
  games: Game[],
  onEdit: (game: Game) => void,
  onDelete: (gameId: string) => void,
  onStatusToggle: (gameId: string, field: string) => void,
}

export const GameTable = ({ 
  games, 
  onEdit, 
  onDelete, 
  onStatusToggle,
}: GameTableProps) => {
  return (
    <S.TableContainer>
      <S.GamesTable>
        <thead>
          <tr>
            <S.TableHeader className="game-name-header">Game Name</S.TableHeader>
            <S.TableHeader>Main Story</S.TableHeader>
            <S.TableHeader>Side Quests</S.TableHeader>
            <S.TableHeader>Free Achievements</S.TableHeader>
            <S.TableHeader>All Achievements</S.TableHeader>
            <S.TableHeader className="completion-column">100% Complete</S.TableHeader>
            <S.TableHeader>Date Started</S.TableHeader>
            <S.TableHeader>Date Finished</S.TableHeader>
            <S.TableHeader>Actions</S.TableHeader>
          </tr>
        </thead>
        <tbody>
          {games.length === 0 ? (
            <tr>
              <S.EmptyState colSpan={9}>
                No games added yet. Click "Add Game" to get started!
              </S.EmptyState>
            </tr>
          ) : (
            games.map(game => (
              <GameRowItem
                key={game.id}
                game={game}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusToggle={onStatusToggle}
              />
            ))
          )}
        </tbody>
      </S.GamesTable>
    </S.TableContainer>
  )
}

namespace S {
  export const TableContainer = styled.div`
    overflow-x: auto;
  `;

  export const GamesTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  `;

  export const TableHeader = styled.th`
    background: #f3f4f6;
    padding: 10px 8px;
    text-align: center;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
    white-space: nowrap;

    &.game-name-header {
      text-align: left;
    }

    @media (max-width: 768px) {
      padding: 12px 8px;
    }
  `;

  export const EmptyState = styled.td`
    text-align: center;
    color: #6b7280;
    font-style: italic;
    padding: 48px 16px;
    background: #f9fafb;
  `;
}