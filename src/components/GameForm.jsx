import React from 'react'
import { Save, X } from 'lucide-react'
import {
  FormOverlay,
  FormContainer,
  FormGrid,
  FormGroup,
  FormActions,
  SaveButton,
  CancelButton
} from './GameTracker.styles'

const GameForm = ({ 
  isAdding, 
  editingId, 
  formData, 
  onInputChange, 
  onSave, 
  onCancel 
}) => {
  if (!isAdding && !editingId) return null

  return (
    <FormOverlay>
      <FormContainer>
        <h3>{editingId ? 'Edit Game' : 'Add New Game'}</h3>
        
        <FormGrid>
          <FormGroup>
            <label>Game Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Enter game name"
              required
            />
          </FormGroup>

          <FormGroup>
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
          </FormGroup>

          <FormGroup>
            <label>Date Started</label>
            <input
              type="date"
              name="dateStarted"
              value={formData.dateStarted}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Date Finished</label>
            <input
              type="date"
              name="dateFinished"
              value={formData.dateFinished}
              onChange={onInputChange}
            />
          </FormGroup>

          <FormGroup>
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
          </FormGroup>

          <FormGroup>
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
          </FormGroup>

          <FormGroup>
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
          </FormGroup>
        </FormGrid>

        <FormActions>
          <SaveButton onClick={onSave}>
            <Save size={16} />
            {editingId ? 'Update' : 'Add'} Game
          </SaveButton>
          <CancelButton onClick={onCancel}>
            <X size={16} />
            Cancel
          </CancelButton>
        </FormActions>
      </FormContainer>
    </FormOverlay>
  )
}

export default GameForm
