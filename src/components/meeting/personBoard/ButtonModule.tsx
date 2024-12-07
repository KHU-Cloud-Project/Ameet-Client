import styled from '@emotion/styled';
import { useState } from 'react';

// 버튼 모듈 컨테이너
const ButtonModule = styled.div`
  position: absolute;
  bottom: 15px; /* 하단에서 20px 위로 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 30px; /* 버튼 사이 간격 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  padding: 6px 12px;
  border-radius: 10px;
`;

// 개별 버튼 스타일
const IconButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: #333;
  }

  &.muted svg {
    fill: #999;
  }

  &.muted::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 24px;
    background-color: red;
    transform: rotate(-45deg);
  }
`;

// 아이콘 모듈 예시
import { FaVolumeUp, FaMicrophone, FaVideo } from 'react-icons/fa';

const MeetingButtons = () => {
  const [isMuted, setIsMuted] = useState({
    volume: false,
    mic: false,
    video: false,
  });

  const toggleMute = (type: 'volume' | 'mic' | 'video') => {
    setIsMuted((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  };
  return (
    <ButtonModule>
      <IconButton
        className={isMuted.volume ? 'muted' : ''}
        onClick={() => toggleMute('volume')}
      >
        <FaVolumeUp />
      </IconButton>
      <IconButton
        className={isMuted.mic ? 'muted' : ''}
        onClick={() => toggleMute('mic')}
      >
        <FaMicrophone />
      </IconButton>
      <IconButton
        className={isMuted.video ? 'muted' : ''}
        onClick={() => toggleMute('video')}
      >
        <FaVideo />
      </IconButton>
    </ButtonModule>
  );
};

export default MeetingButtons;
