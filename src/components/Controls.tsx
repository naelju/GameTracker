import React from 'react'
import { Plus } from 'lucide-react'
import { styled } from 'styled-components'

export const Controls = ({ onAddGame }) => {
  return (
    <S.Controls>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <S.AddButton 
          onClick={onAddGame}
        >
          <Plus size={20} />
          Add Game
        </S.AddButton>
      </div>
    </S.Controls>
  )
}

namespace S {
  export const Controls = styled.div`
    padding: 24px;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  `;

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
    `;
}