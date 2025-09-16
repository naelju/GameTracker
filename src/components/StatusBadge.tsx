import React from 'react';
import { styled } from "styled-components";

export type StatusBadgeProps = {
    gameId: string;
    propertyName: string;
    propertyStatus?: boolean;
    propertyComment?: string;
    onStatusToggle: (gameId: string, propertyName: string) => void;
}

export const StatusBadge = ({ gameId, propertyName, propertyStatus, propertyComment, onStatusToggle }: StatusBadgeProps ) => {
  const getStatusColor = (status?: boolean) => {
      switch (status) {
          case true: return '#10b981';
          case false: return '#ef4444';
          case null: return '#f59e0b';
          default: return '#6b7280';
      }
  }

  const getStatusIcon = (status?: boolean) => {
    switch (status) {
      case true: return '✅';
      case false: return '❌';
      default: return '❓';
    }
  }

  return (
    <S.StatusBadge 
    className={propertyStatus !== null ? 'clickable' : ''}
    style={{ backgroundColor: getStatusColor(propertyStatus) }}
    title={propertyStatus === null ? (propertyComment ? propertyComment : 'No comment') : undefined}
    onClick={() => propertyStatus !== null && onStatusToggle(gameId, propertyName)}
  >
    {/* TODO: replace by an image or something better instead of text */}
    {getStatusIcon(propertyStatus)}
  </S.StatusBadge>
  )
}

namespace S {
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
    `;
}