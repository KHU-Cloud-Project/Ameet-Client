import { useState } from 'react';
import styled from '@emotion/styled';
import LogBlock from './LogBlock';
import LogModal from './LogModal';
import UploadBtn from './UploadBtn';
import BoardTitle from '../../common/BoardTitle';
import BoardContainer from '../../common/BoardContainer';

type Log = {
  id: string;
  name: string;
  date: string;
  length: number;
  participants: { nickname: string }[];
};

const LogsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
`;

const PaginationButton = styled.button`
  padding: 6px 12px;
  background-color: ${(props) => props.theme.colors.lightGray};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  &:disabled {
    background-color: ${(props) => props.theme.colors.darkWhite};
    cursor: not-allowed;
  }
`;

const dummyLogs: Log[] = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Meeting ${i + 1}`,
  date: `2024-09-01 23:00:01`,
  length: 3799 + i * 10,
  participants: [
    { nickname: 'Say' },
    { nickname: 'Sumin' },
    { nickname: 'User3' },
    { nickname: 'User4' },
  ],
}));

const ITEMS_PER_PAGE = 7;

function LogBoard() {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyLogs.length / ITEMS_PER_PAGE);

  const currentLogs = dummyLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleUploadClick = () => {
    console.log('Upload button 누름');
  };

  return (
    <BoardContainer>
      <BoardTitle
        children="Meeting Logs"
        actionComponent={<UploadBtn onClick={handleUploadClick} />}
      />
      <LogsContainer>
        <LogBlock type="header" />
        {currentLogs.map((log, index) => (
          <LogBlock
            key={log.id}
            type="data"
            log={log}
            index={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
            onClick={() => setSelectedLog(log)}
          />
        ))}
      </LogsContainer>
      <div
        style={{
          flex: 1,
        }}
      ></div>
      <Pagination>
        <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </PaginationButton>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </Pagination>
      {selectedLog && (
        <LogModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </BoardContainer>
  );
}

export default LogBoard;
