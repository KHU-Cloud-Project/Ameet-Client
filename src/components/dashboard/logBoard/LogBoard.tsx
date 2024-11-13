import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PaginationButton = styled.button`
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  font-size: ${(props) => props.theme.typography.fontSize.xSmall};
  color: ${(props) =>
    props.disabled ? props.theme.colors.lineGray : props.theme.colors.textGray};

  &:focus {
    outline: none;
  }
  /* &:hover {
    color: ${(props) =>
    props.disabled ? props.theme.colors.textGray : props.theme.colors.primary};
  } */
`;

const PageNumber = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: transparent;
  font-size: ${(props) => props.theme.typography.fontSize.default};
  font-weight: ${(props) =>
    props.active
      ? props.theme.typography.fontWeight.semibold
      : props.theme.typography.fontWeight.regular};
  color: ${(props) =>
    props.active ? props.theme.colors.textBlue : props.theme.colors.textGray};
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};

  &:hover {
    background-color: ${(props) =>
      props.active ? props.theme.colors.white : props.theme.colors.background};
  }

  &:focus {
    outline: none;
  }
`;

const dummyLogs: Log[] = Array.from({ length: 20 }, (_, i) => ({
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

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1,
      ),
    );
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </PageNumber>,
      );
    }

    return pages;
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
      <PaginationContainer>
        <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <FaChevronLeft />
        </PaginationButton>
        {renderPageNumbers()}
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </PaginationButton>
      </PaginationContainer>
      {selectedLog && (
        <LogModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </BoardContainer>
  );
}

export default LogBoard;
