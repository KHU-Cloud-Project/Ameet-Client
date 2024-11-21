import styled from '@emotion/styled';

type Log = {
  id: string;
  name: string;
  date: string;
  length: number;
  participants: { nickname: string }[];
};

type LogBlockProps = {
  type: 'header' | 'data';
  log?: Log;
  index?: number;
  onClick?: () => void;
};

const LogRow = styled.div<{ type: 'header' | 'data' }>`
  font-size: ${(props) =>
    props.type === 'header'
      ? props.theme.typography.fontSize.xSmall
      : props.theme.typography.fontSize.small};
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) =>
    props.type === 'header'
      ? props.theme.colors.textGray
      : props.theme.colors.textDarkGray};
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-bottom: 0.4px solid ${(props) => props.theme.colors.lineGray};
  cursor: ${(props) => (props.type === 'data' ? 'pointer' : 'default')};
  &:hover {
    background-color: ${(props) =>
      props.type === 'data' ? props.theme.colors.lightGray : 'transparent'};
  }
`;

const Cell = styled.div<{ flex?: number; width?: string }>`
  flex: ${(props) => props.flex || 1};
  width: ${(props) => props.width || 'auto'};
  text-align: center;
`;
const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  flex: 1.2;
`;

const ActionBtn = styled.button`
  padding: 2px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

function formatLength(lengthInSeconds: number) {
  const hours = Math.floor(lengthInSeconds / 3600);
  const minutes = Math.floor((lengthInSeconds % 3600) / 60);
  const seconds = lengthInSeconds % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function LogBlock({ type, log, index, onClick }: LogBlockProps) {
  if (type === 'header') {
    return (
      <LogRow
        type="header"
        style={{
          paddingBottom: '8px',
        }}
      >
        <div
          style={{
            width: '32px',
            textAlign: 'center',
          }}
        >
          #
        </div>
        <Cell flex={2}>Name</Cell>
        <Cell flex={1.5}>Date</Cell>
        <Cell flex={1}>Length</Cell>
        <Cell flex={2}>Participants</Cell>
        <Actions>Actions</Actions>
      </LogRow>
    );
  }

  if (!log) return null;

  const participantsDisplay =
    log.participants.length > 2
      ? `${log.participants[0].nickname}, ${log.participants[1].nickname}...(${log.participants.length})`
      : log.participants.map((p) => p.nickname).join(', ');

  return (
    <LogRow type="data" onClick={onClick}>
      <div
        style={{
          width: '32px',
          textAlign: 'center',
        }}
      >
        {index?.toString().padStart(2, '0')}
      </div>
      <Cell flex={2}>{log.name}</Cell>
      <Cell flex={1.5}>{log.date}</Cell>
      <Cell flex={1}>{formatLength(log.length)}</Cell>
      <Cell flex={2}>{participantsDisplay}</Cell>
      <Actions>
        <ActionBtn>⬇️</ActionBtn>
        <ActionBtn>✏️</ActionBtn>
        <ActionBtn>🗑️</ActionBtn>
      </Actions>
    </LogRow>
  );
}

export default LogBlock;
