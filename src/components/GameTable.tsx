import React, { useState, useMemo } from 'react'
import { Game, UserGameWithGame } from '../models/game'
import { GameRowItem } from './GameRowItem'
import styled from 'styled-components'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

export type SortField = 'hundredPercent'
export type SortDirection = 'asc' | 'desc' | null

export type GameTableProps = {
  userGamesWithGame: UserGameWithGame[],
  onEdit: (userGameWithGame: UserGameWithGame) => void,
  onDelete: (gameId: string) => void,
  onStatusToggle: (userGameWithGame: UserGameWithGame, field: string) => void,
}

export const GameTable = ({ 
  userGamesWithGame, 
  onEdit, 
  onDelete, 
  onStatusToggle,
}: GameTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null (default) -> asc
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortDirection(null)
        setSortField(null)
      } else {
        setSortDirection('asc')
      }
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedGames = useMemo(() => {
    if (!sortDirection || !sortField) {
      // Default sort by name (always ascending)
      return [...userGamesWithGame].sort((a, b) => a.game.name.localeCompare(b.game.name))
    }

    return [...userGamesWithGame].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'hundredPercent':
          // Sort by completion status: true first, then false
          comparison = (b.hundredPercent ? 1 : 0) - (a.hundredPercent ? 1 : 0)
          break
      }

      // If values are equal, sort by name as secondary sort (always ascending)
      if (comparison === 0) {
        comparison = a.game.name.localeCompare(b.game.name)
        return comparison // Always return name comparison in ascending order
      }

      return sortDirection === 'desc' ? -comparison : comparison
    })
  }, [userGamesWithGame, sortField, sortDirection])

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronsUpDown size={16} />
    }
    
    switch (sortDirection) {
      case 'asc':
        return <ChevronUp size={16} />
      case 'desc':
        return <ChevronDown size={16} />
      default:
        return <ChevronsUpDown size={16} />
    }
  }

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
            <S.SortableHeader 
              className="completion-column" 
              onClick={() => handleSort('hundredPercent')}
            >
              <S.HeaderContent>
                100% Complete
                {getSortIcon('hundredPercent')}
              </S.HeaderContent>
            </S.SortableHeader>
            <S.TableHeader>Date Started</S.TableHeader>
            <S.TableHeader>Date Finished</S.TableHeader>
            <S.TableHeader>Actions</S.TableHeader>
          </tr>
        </thead>
        <tbody>
          {userGamesWithGame.length === 0 ? (
            <tr>
              <S.EmptyState colSpan={9}>
                No games added yet. Click "Add Game" to get started!
              </S.EmptyState>
            </tr>
          ) : (
            sortedGames.map(userGameWithGame => (
              <GameRowItem
                key={userGameWithGame.gameId}
                userGameWithGame={userGameWithGame}
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
    background: #334155;
    padding: 10px 8px;
    text-align: center;
    font-weight: 600;
    color: #e2e8f0;
    border-bottom: 2px solid #475569;
    white-space: nowrap;

    &.game-name-header {
      text-align: left;
    }

    @media (max-width: 768px) {
      padding: 12px 8px;
    }
  `;

  export const SortableHeader = styled.th`
    background: #334155;
    padding: 10px 8px;
    text-align: center;
    font-weight: 600;
    color: #e2e8f0;
    border-bottom: 2px solid #475569;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
    position: relative;

    &:hover {
      background: #475569;
    }

    &.game-name-header {
      text-align: left;
    }

    @media (max-width: 768px) {
      padding: 12px 8px;
    }
  `;

  export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;

    .game-name-header & {
      justify-content: flex-start;
    }
  `;

  export const EmptyState = styled.td`
    text-align: center;
    color: #94a3b8;
    font-style: italic;
    padding: 48px 16px;
    background: #334155;
  `;
}