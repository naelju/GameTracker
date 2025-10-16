import React, { useState, useEffect } from 'react'
import { Save, X, Search } from 'lucide-react'
import { styled } from 'styled-components'
import { FormData, Game } from '../models/game'
import { getSupabaseClient } from '../lib/supabase'

export type GameFormProps = {
  isAdding: boolean,
  editingId: string | null,
  formData: FormData,
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  onSave: () => void,
  onCancel: () => void,
}
export const GameForm = ({ 
  isAdding, 
  editingId, 
  formData, 
  onInputChange, 
  onSave, 
  onCancel 
}: GameFormProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [useCustomName, setUseCustomName] = useState(false)

  // Search for existing games
  const searchGames = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('game')
        .select('id, name')
        .ilike('name', `%${query}%`)
        .limit(10)
      
      if (error) throw error
      setSearchResults(data || [])
    } catch (error) {
      console.error('Error searching games:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    searchGames(query)
    setShowSearchResults(true)
  }

  // Select a game from search results
  const selectGame = (game: Game) => {
    onInputChange({
      target: { name: 'gameName', value: game.name },
    } as React.ChangeEvent<HTMLInputElement>)
    onInputChange({
      target: { name: 'gameId', value: game.id },
    } as React.ChangeEvent<HTMLInputElement>)
    setSearchQuery(game.name)
    setShowSearchResults(false)
    setUseCustomName(false)
  }

  // Toggle between search and custom input
  const toggleInputMode = () => {
    setUseCustomName(!useCustomName)
    setShowSearchResults(false)
    setSearchQuery('')
  }

  // Check if save button should be disabled
  const isSaveDisabled = () => {
    if (editingId) return false // Always allow saving when editing
    
    if (!useCustomName) {
      // In search mode, check if a game is selected
      return !formData.gameName || formData.gameName.trim() === ''
    } else {
      // In custom mode, check if name is provided
      return !formData.gameName || formData.gameName.trim() === ''
    }
  }

  if (!isAdding && !editingId) return null

  return (
    <S.FormOverlay>
      <S.FormContainer>
        <h3>{editingId ? 'Edit Game' : 'Add New Game'}</h3>
        
        <S.FormGrid>
          <S.FormGroup>
            <label>Game Name *</label>
            {!editingId ? (
              <S.GameNameContainer>
                <S.ModeSelector>
                  <S.ModeButton 
                    active={!useCustomName} 
                    onClick={() => setUseCustomName(false)}
                  >
                    Search Existing
                  </S.ModeButton>
                  <S.ModeButton 
                    active={useCustomName} 
                    onClick={() => setUseCustomName(true)}
                  >
                    Custom Name
                  </S.ModeButton>
                </S.ModeSelector>

                {!useCustomName ? (
                  // Search mode
                  <S.SearchContainer>
                    <S.SearchInput
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Type to search for existing games..."
                      onFocus={() => setShowSearchResults(true)}
                    />
                    <S.SearchIcon>
                      <Search size={16} />
                    </S.SearchIcon>
                    {showSearchResults && (
                      <S.SearchResults>
                        {isSearching ? (
                          <S.SearchItem>Searching...</S.SearchItem>
                        ) : searchResults.length > 0 ? (
                          searchResults.map((game) => (
                            <S.SearchItem 
                              key={game.id} 
                              onClick={() => selectGame(game)}
                            >
                              {game.name}
                            </S.SearchItem>
                          ))
                        ) : searchQuery.length >= 2 ? (
                          <S.SearchItem>No games found</S.SearchItem>
                        ) : null}
                      </S.SearchResults>
                    )}
                  </S.SearchContainer>
                ) : (
                  // Custom input mode
                  <S.CustomInput
                    type="text"
                    name="gameName"
                    value={formData.gameName}
                    onChange={onInputChange}
                    placeholder="Enter new game name"
                    required
                  />
                )}
              </S.GameNameContainer>
            ) : (
              // Editing mode - just show the name
              <S.CustomInput
                type="text"
                name="gameName"
                value={formData.gameName}
                onChange={onInputChange}
                placeholder="Enter game name"
                required
                disabled={true}
              />
            )}
            {editingId && (
              <S.HelpText>Game name cannot be changed after creation</S.HelpText>
            )}
          </S.FormGroup>

          <S.FormGroup>
            <label>Main Story</label>
            <select
              name="mainStory"
              value={formData.mainStory}
              onChange={onInputChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="undefined">Undefined</option>
            </select>
            {formData.mainStory === 'undefined' && (
              <input
                type="text"
                name="mainStoryComment"
                value={formData.mainStoryComment}
                onChange={onInputChange}
                placeholder="Add comment for undefined status..."
                style={{ marginTop: '8px' }}
              />
            )}
          </S.FormGroup>

          <S.FormGroup>
            <label>Date Started</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate ?? ''}
              onChange={onInputChange}
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>Date Finished</label>
            <input
              type="date"
              name="finishDate"
              value={formData.finishDate ?? ''}
              onChange={onInputChange}
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>Side Quests Finished</label>
            <select
              name="sideQuests"
              value={formData.sideQuests}
              onChange={onInputChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="undefined">Undefined</option>
            </select>
            {formData.sideQuests === 'undefined' && (
              <input
                type="text"
                name="sideQuestsComment"
                value={formData.sideQuestsComment}
                onChange={onInputChange}
                placeholder="Add comment for undefined status..."
                style={{ marginTop: '8px' }}
              />
            )}
          </S.FormGroup>

          <S.FormGroup>
            <label>Free Achievements</label>
            <select
              name="freeAchievements"
              value={formData.freeAchievements}
              onChange={onInputChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="undefined">Undefined</option>
            </select>
            {formData.freeAchievements === 'undefined' && (
              <input
                type="text"
                name="freeAchievementsComment"
                value={formData.freeAchievementsComment}
                onChange={onInputChange}
                placeholder="Add comment for undefined status..."
                style={{ marginTop: '8px' }}
              />
            )}
          </S.FormGroup>

          <S.FormGroup>
            <label>All Achievements</label>
            <select
              name="allAchievements"
              value={formData.allAchievements}
              onChange={onInputChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="undefined">Undefined</option>
            </select>
            {formData.allAchievements === 'undefined' && (
              <input
                type="text"
                name="allAchievementsComment"
                value={formData.allAchievementsComment}
                onChange={onInputChange}
                placeholder="Add comment for undefined status..."
                style={{ marginTop: '8px' }}
              />
            )}
          </S.FormGroup>
        </S.FormGrid>

        <S.FormActions>
          <S.SaveButton onClick={onSave} disabled={isSaveDisabled()}>
            <Save size={16} />
            {editingId ? 'Update' : 'Add'} Game
          </S.SaveButton>
          <S.CancelButton onClick={onCancel}>
            <X size={16} />
            Cancel
          </S.CancelButton>
        </S.FormActions>
      </S.FormContainer>
    </S.FormOverlay>
  )
}

namespace S {
  export const FormOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  `

  export const FormContainer = styled.div`
    background: #1e293b;
    border-radius: 12px;
    padding: 32px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    border: 1px solid #334155;

    h3 {
      margin-bottom: 24px;
      color: #f1f5f9;
      font-size: 1.5rem;
      font-weight: 600;
    }
  `

  export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `

  export const FormGroup = styled.div`
    &.full-width {
      grid-column: 1 / -1;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #e2e8f0;
      font-size: 14px;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #475569;
      border-radius: 6px;
      font-size: 14px;
      background: #334155;
      color: #e2e8f0;
      transition: border-color 0.2s ease;

      &:focus {
        outline: none;
        border-color: #818cf8;
        box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1);
      }
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }
  `

  export const FormActions = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  `

  export const SaveButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    border: none;
    background: #10b981;
    color: white;

    &:hover:not(:disabled) {
      background: #059669;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
    }

    &:disabled {
      background: #6b7280;
      cursor: not-allowed;
      opacity: 0.6;
      transform: none;
      box-shadow: none;
    }

    @media (max-width: 480px) {
      width: 100%;
      justify-content: center;
    }
  `

  export const CancelButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    border: none;
    background: #6b7280;
    color: white;

    &:hover {
      background: #4b5563;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(107, 114, 128, 0.3);
    }

    @media (max-width: 480px) {
      width: 100%;
      justify-content: center;
    }
  `

  export const HelpText = styled.div`
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
    font-style: italic;
  `

  export const GameNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `

  export const ModeSelector = styled.div`
    display: flex;
    gap: 4px;
    background: #475569;
    border-radius: 6px;
    padding: 4px;
  `

  export const ModeButton = styled.button<{ active: boolean }>`
    flex: 1;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${props => props.active ? '#3b82f6' : 'transparent'};
    color: ${props => props.active ? 'white' : '#94a3b8'};

    &:hover {
      background: ${props => props.active ? '#2563eb' : '#64748b'};
      color: white;
    }
  `

  export const SearchContainer = styled.div`
    position: relative;
    width: 100%;
  `

  export const SearchInput = styled.input`
    width: 100%;
    padding: 12px 40px 12px 12px;
    border: 1px solid #475569;
    border-radius: 6px;
    background: #334155;
    color: #f1f5f9;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }

    &::placeholder {
      color: #64748b;
    }
  `

  export const SearchIcon = styled.div`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    pointer-events: none;
  `

  export const SearchResults = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #334155;
    border: 1px solid #475569;
    border-top: none;
    border-radius: 0 0 6px 6px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `

  export const SearchItem = styled.div`
    padding: 12px;
    cursor: pointer;
    color: #e2e8f0;
    border-bottom: 1px solid #475569;
    transition: background-color 0.2s ease;

    &:hover {
      background: #475569;
    }

    &:last-child {
      border-bottom: none;
    }
  `

  export const CustomInput = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #475569;
    border-radius: 6px;
    background: #334155;
    color: #f1f5f9;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &::placeholder {
      color: #64748b;
    }
  `
}