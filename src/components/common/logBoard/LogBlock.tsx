import styled from '@emotion/styled';
import { Log } from '../../../models/Log';
import { formatDate, formatISODuration } from '../../../utils/dateUtils';

type LogBlockProps = {
  type: 'header' | 'data';
  log?: Log;
  index?: number;
  onClick?: () => void;
};

const LogRow = styled.div<{ type: 'header' | 'data' }>`
  font-size: ${(props) =>
    props.type === 'header'
      ? props.theme.typography.fontSize.small
      : props.theme.typography.fontSize.small};
  font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  color: ${(props) =>
    props.type === 'header'
      ? props.theme.colors.textGray
      : props.theme.colors.textDarkGray};
  display: flex;
  align-items: center;
  padding: 8.2px 8px;
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
  white-space: nowrap;
`;

// const Actions = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 6px;
//   flex: 1.2;
// `;

// const ActionBtn = styled.button`
//   padding: 2px;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
// `;

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
        <Cell width="25%">Name</Cell>
        <Cell width="25%">Date</Cell>
        <Cell width="25%">Length</Cell>
        <Cell width="25%">Participants</Cell>
        {/* <Actions>Actions</Actions> */}
      </LogRow>
    );
  }

  if (!log) return null;

  const participantsDisplay =
    log.participants && log.participants.length > 2
      ? `${log.participants[0]}, ${log.participants[1]}... (${log.participants.length})`
      : log.participants?.join(', ') || '-';

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
      <Cell width="200px">{log.title}</Cell>
      <Cell width="150px">{formatDate(log.startedAt!)}</Cell>
      <Cell width="100px">{formatISODuration(log.duration)}</Cell>
      <Cell width="250px">{participantsDisplay}</Cell>
      {/* <Actions>
        <ActionBtn>⬇️</ActionBtn>
        <ActionBtn>✏️</ActionBtn>
        <ActionBtn>🗑️</ActionBtn>
      </Actions> */}
    </LogRow>
  );
}

export default LogBlock;
