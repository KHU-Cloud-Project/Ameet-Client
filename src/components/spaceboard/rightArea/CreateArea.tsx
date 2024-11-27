/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import BoardContainer from '../../common/board/BoardContainer';
import styled from '@emotion/styled';
import BoardTitle from '../../common/board/BoardTitle';
import { theme } from '../../../styles/theme';
import { css } from '@emotion/react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import CustomBtn from '../../common/CustomBtn';
import CreateModal from './CreateModal';

const Label = styled.label`
  color: ${(props) => props.theme.colors.textGray};
  // font-size: ${(props) => props.theme.typography.fontSize.default};
  font-size: 0.95rem;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 7px 10px;
  font-size: ${(props) => props.theme.typography.fontSize.small};
  border: 1px solid ${(props) => props.theme.colors.lineGray};
  border-radius: 5px;
  margin-bottom: 18px;
  color: ${(props) => props.theme.colors.textDarkGray};

  &::placeholder {
    color: ${(props) => props.theme.colors.textLightGray};
  }

  &:focus {
    outline: none;
  }
`;

const wrapperStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
`;

const MemberControl = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.textDarkGray};
  gap: 16px;
`;

const CounterBtn = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid ${(props) => props.theme.colors.lineGray};
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.textLightGray
      : props.theme.colors.textGray};
  font-size: ${(props) => props.theme.typography.fontSize.small};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.lineGray};
  }

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.lineGray};
  }
`;

const CreateArea = () => {
  const [spaceName, setSpaceName] = useState('');
  const [spaceDescription, setSpaceDescription] = useState('');
  const [entryPassword, setEntryPassword] = useState('');
  const [members, setMembers] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increaseMembers = () => {
    if (members < 8) setMembers(members + 1);
  };

  const decreaseMembers = () => {
    if (members > 1) setMembers(members - 1);
  };

  return (
    <BoardContainer>
      <BoardTitle
        children="Create New Space"
        fontSize={theme.typography.fontSize.mediumLarge}
        marginBottom={18}
      />
      <Label htmlFor="name">Space Name*</Label>
      <Input
        id="name"
        type="text"
        value={spaceName}
        onChange={(e) => setSpaceName(e.target.value)}
        placeholder="Enter space name"
      />
      <Label htmlFor="desc">Space Description</Label>
      <Input
        id="desc"
        value={spaceDescription}
        onChange={(e) => setSpaceDescription(e.target.value)}
        placeholder="Enter space description"
      />
      <Label htmlFor="pswd">Entry Password*</Label>
      <Input
        id="pswd"
        type="password"
        value={entryPassword}
        onChange={(e) => setEntryPassword(e.target.value)}
        placeholder="Enter password"
      />
      <div style={{ flex: 1 }}></div>
      <div css={wrapperStyle}>
        <MemberControl>
          <CounterBtn onClick={decreaseMembers} disabled={members <= 1}>
            <AiOutlineMinus />
          </CounterBtn>
          <span style={{ width: '1rem' }}>{members}</span>
          <CounterBtn onClick={increaseMembers} disabled={members >= 8}>
            <AiOutlinePlus />
          </CounterBtn>
        </MemberControl>
        <CustomBtn
          text="Create"
          padding="16px"
          onClick={() => {
            openModal();
          }}
          disabled={!spaceName || !entryPassword}
        />
      </div>
      {isModalOpen && (
        <CreateModal
          onClose={closeModal}
          spaceName={spaceName}
          spaceDescription={spaceDescription || `Team Space for ${spaceName}`}
        />
      )}
    </BoardContainer>
  );
};

export default CreateArea;
