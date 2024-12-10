import React from 'react';
import styled from '@emotion/styled';
import lockIcon from '/assets/icons/dashboard/lock.png';

type BotBlockProps = {
  isActive: boolean;
  imageUrl: string;
  botType: string;
  description: string;
  onToggle?: () => void;
};

const BotContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: ${(props) => (props.isActive ? 'pointer' : 'default')};
  white-space: nowrap;
`;

const BotImage = styled.img<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  filter: ${(props) => (props.isActive ? 'none' : 'grayscale(100%)')};
  opacity: ${(props) => (props.isActive ? 1 : 0.6)};
  object-fit: cover;
  border: 0.8 solid ${(props) => props.theme.colors.darkWhite};
`;

const BotInfo = styled.div`
  flex: 1;
  margin-left: 11px;
  margin-right: 8px;
`;

const BotType = styled.div<{ isActive: boolean }>`
  // font-size: ${(props) => props.theme.typography.fontSize.default};
  font-size: 0.96rem;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.textBlack
      : props.theme.colors.textLightGray};
  margin-bottom: 2px;
`;

const BotDescription = styled.div<{ isActive: boolean }>`
  // font-size: ${(props) => props.theme.typography.fontSize.xSmall};
  font-size: 0.8rem;
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.textGray
      : props.theme.colors.textLightGray};
`;

const BotBlock: React.FC<BotBlockProps> = ({
  isActive,
  imageUrl,
  botType,
  description,
  onToggle,
}) => {
  return (
    <BotContainer isActive={isActive} onClick={isActive ? onToggle : undefined}>
      <BotImage src={imageUrl} isActive={isActive} />
      <BotInfo>
        <BotType isActive={isActive}>{botType}</BotType>
        <BotDescription isActive={isActive}>{description}</BotDescription>
      </BotInfo>
      {isActive ? (
        <input type="checkbox" checked={isActive} onChange={onToggle} />
      ) : (
        <div>
          <img src={lockIcon} alt="Lock Icon" width="24" height="24" />
        </div>
      )}
    </BotContainer>
  );
};

export default BotBlock;
