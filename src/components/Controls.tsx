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
    border-bottom: 1px solid #475569;
    background: #334155;
  `;

  export const AddButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #818cf8 0%, #a5b4fc 100%);
    color: #1e293b;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(129, 140, 248, 0.3);
      background: linear-gradient(135deg, #a5b4fc 0%, #c7d2fe 100%);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    `;
}