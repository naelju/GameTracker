import React from 'react'
import styled from 'styled-components'

export const ViewTabs = ({ activeView, onViewChange }) => {
  return (
    <S.ViewTabs>
      <S.TabButton 
        className={activeView === 'table' ? 'active' : ''}
        onClick={() => onViewChange('table')}
      >
        Table View
      </S.TabButton>
      <S.TabButton 
        className={activeView === 'images' ? 'active' : ''}
        onClick={() => onViewChange('images')}
      >
        Image View
      </S.TabButton>
    </S.ViewTabs>
  )
}

namespace S {
  export const ViewTabs = styled.div`
    display: flex;
    background: #334155;
    border-bottom: 1px solid #475569;
    padding: 0 24px;
  `;

  export const TabButton = styled.button`
    background: none;
    border: none;
    padding: 16px 24px;
    font-weight: 500;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 3px solid transparent;
    font-size: 14px;

    &:hover {
      color: #e2e8f0;
      background: rgba(129, 140, 248, 0.1);
    }

    &.active {
      color: #818cf8;
      border-bottom-color: #818cf8;
      background: #1e293b;
      font-weight: 600;
    }
  `;
}