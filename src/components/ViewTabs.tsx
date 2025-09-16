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
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 0 24px;
  `;

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
  `;
}