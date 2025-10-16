import React from 'react';
import { styled } from "styled-components";
import { ObjectiveStatusEnum, UserGameWithGame } from '../models/game';

export type StatusBadgeProps = {
    userGameWithGame: UserGameWithGame;
    propertyName: string;
    propertyStatus: ObjectiveStatusEnum;
    propertyComment?: string;
    onStatusToggle: (userGameWithGame: UserGameWithGame, propertyName: string) => void;
}

export const StatusBadge = ({ userGameWithGame, propertyName, propertyStatus, propertyComment, onStatusToggle }: StatusBadgeProps ) => {
  const getStatusColor = (status: ObjectiveStatusEnum) => {
      switch (status) {
          case ObjectiveStatusEnum.YES: return '#10b981';
          case ObjectiveStatusEnum.NO: return '#ef4444';
          case ObjectiveStatusEnum.UNDEFINED: return '#f59e0b';
          default: return '#6b7280';
      }
  }

  const getStatusIcon = (status: ObjectiveStatusEnum) => {
    switch (status) {
      case ObjectiveStatusEnum.YES: return '✅';
      case ObjectiveStatusEnum.NO: return '❌';
      default: return '❓';
    }
  }

  return (
    <S.StatusBadge 
    className={propertyStatus !== ObjectiveStatusEnum.UNDEFINED ? 'clickable' : ''}
    style={{ backgroundColor: getStatusColor(propertyStatus) }}
    title={propertyStatus === ObjectiveStatusEnum.UNDEFINED ? (propertyComment ? propertyComment : 'No comment') : undefined}
    onClick={() => propertyStatus !== ObjectiveStatusEnum.UNDEFINED && onStatusToggle(userGameWithGame, propertyName)}
  >
    {/* TODO: replace by an image or something better instead of text */}
    {getStatusIcon(propertyStatus as ObjectiveStatusEnum)}
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