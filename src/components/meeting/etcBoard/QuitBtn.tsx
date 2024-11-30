/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';/** @jsxImportSource @emotion/react */


type QuitBtnProps = {
  onExit: () => void;
  onQuitMeeting: () => void;
};

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 0.9rem;
  font-weight: normal; /* 텍스트 굵기를 얇게 */
  border: 2px solid ${(props) => props.theme.colors.primary}; /* 기본 테두리는 primary */
  border-radius: 8px;
  cursor: pointer;
  background-color: white; /* 버튼 안쪽 배경을 흰색으로 */
  color: ${(props) => props.theme.colors.textBlack}; /* 텍스트 색상을 검정으로 */

  &:hover {
    background-color: ${(props) => props.theme.colors.lightGray}; /* 호버 시 약간 다른 배경색 */
  }

  &:last-of-type {
    border-color: ${(props) => props.theme.colors.red}; /* 마지막 버튼 테두리 색상 변경 */
  }
`;

function QuitBtn({ onExit, onQuitMeeting }: QuitBtnProps) {
  return (
    <ButtonContainer>
      <Button onClick={onExit}>Exit</Button>
      <Button onClick={onQuitMeeting}>Quit Meeting</Button>
    </ButtonContainer>
  );
}

export default QuitBtn;