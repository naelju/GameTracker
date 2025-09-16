import React from 'react'
import { styled } from 'styled-components';

export const ImageView = () => {
  return (
    <S.ImagesContainer>
      <S.EmptyImagesView>
        <h3>Image View</h3>
        <p>This view will display games as image cards. Coming soon!</p>
      </S.EmptyImagesView>
    </S.ImagesContainer>
  )
}

namespace S {
  export const ImagesContainer = styled.div`
    padding: 24px;
    min-height: 400px;
  `;

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
  `;
}
