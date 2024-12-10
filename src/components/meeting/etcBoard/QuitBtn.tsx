/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled'; /** @jsxImportSource @emotion/react */

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
  padding: 10px 26px;
  font-size: 0.9rem;
  font-weight: normal;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
  cursor: pointer;
  background-color: white;
  color: ${(props) => props.theme.colors.textBlack};

  &:hover {
    background-color: ${(props) => props.theme.colors.lightGray};
  }

  &:last-of-type {
    border-color: ${(props) => props.theme.colors.pastelDarkPink};
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
