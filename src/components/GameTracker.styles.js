import styled from 'styled-components'

// Styled Components
export const GameTrackerContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  min-height: 600px;
`

export const ViewTabs = styled.div`
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 24px;
`

export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 16px 24px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  font-size: 14px;

  &:hover {
    color: #334155;
    background: rgba(102, 126, 234, 0.05);
  }

  &.active {
    color: #667eea;
    border-bottom-color: #667eea;
    background: white;
    font-weight: 600;
  }
`

export const Controls = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
`

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

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

export const TableContainer = styled.div`
  overflow-x: auto;
`

export const GamesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

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
`

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
`

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
`

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
`

export const NoDate = styled.span`
  color: #9ca3af;
  font-style: italic;
  font-size: 13px;
  background: #f9fafb;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  display: inline-block;
`

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
`

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
`

export const EmptyState = styled.td`
  text-align: center;
  color: #6b7280;
  font-style: italic;
  padding: 48px 16px;
  background: #f9fafb;
`

export const ImagesContainer = styled.div`
  padding: 24px;
  min-height: 400px;
`

export const EmptyImagesView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  color: #6b7280;

  h3 {
    color: #374151;
    margin-bottom: 12px;
    font-size: 1.25rem;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
  }
`
