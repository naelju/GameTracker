import React from 'react'
import { Save, X } from 'lucide-react'
import { styled } from 'styled-components'

export const GameForm = ({ 
  isAdding, 
  editingId, 
  formData, 
  onInputChange, 
  onSave, 
  onCancel 
}) => {
  if (!isAdding && !editingId) return null

  return (
    <S.FormOverlay>
      <S.FormContainer>
        <h3>{editingId ? 'Edit Game' : 'Add New Game'}</h3>
        
        <S.FormGrid>
          <S.FormGroup>
            <label>Game Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Enter game name"
              required
            />
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
              value={formData.startDate}
              onChange={onInputChange}
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>Date Finished</label>
            <input
              type="date"
              name="finishDate"
              value={formData.finishDate}
              onChange={onInputChange}
            />
          </S.FormGroup>

          <S.FormGroup>
            <label>Side Quests Finished</label>
            <select
              name="sideQuestsFinished"
              value={formData.sideQuestsFinished}
              onChange={onInputChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="undefined">Undefined</option>
            </select>
            {formData.sideQuestsFinished === 'undefined' && (
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
            <label>All Free Achievements</label>
            <select
              name="allFreeAchievements"
              value={formData.allFreeAchievements}
              onChange={onInputChange}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="undefined">Undefined</option>
            </select>
            {formData.allFreeAchievements === 'undefined' && (
              <input
                type="text"
                name="allFreeAchievementsComment"
                value={formData.allFreeAchievementsComment}
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
          <S.SaveButton onClick={onSave}>
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
    background: white;
    border-radius: 12px;
    padding: 32px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    h3 {
      margin-bottom: 24px;
      color: #1f2937;
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
      color: #374151;
      font-size: 14px;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s ease;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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

    &:hover {
      background: #059669;
      transform: translateY(-1px);
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
    }

    @media (max-width: 480px) {
      width: 100%;
      justify-content: center;
    }
  `
}