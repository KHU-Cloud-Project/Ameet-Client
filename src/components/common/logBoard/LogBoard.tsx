import { useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import styled from '@emotion/styled';
import LogBlock from './LogBlock';
import LogModal from './LogModal';
import UploadBtn from './UploadBtn';
import BoardTitle from '../board/BoardTitle';
import BoardContainer from '../board/BoardContainer';
import { formatDate } from '../../../utils/dateUtils';

export type Log = {
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

  /* &:hover {
    color: ${(props) =>
    props.disabled ? props.theme.colors.textGray : props.theme.colors.primary};
  } */
`;

const PageNumber = styled.button<{ active?: boolean }>`
  padding: 0px 12px;
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

type LogBoardProps = {
  title?: string;
  logs: Log[];
  itemsPerPage?: number;
};

function LogBoard({ logs, itemsPerPage = 7, title }: LogBoardProps) {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(logs.length / itemsPerPage);

  const currentLogs = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

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
        children={title ?? 'Meeting Logs'}
        actionComponent={<UploadBtn onClick={handleUploadClick} />}
        marginBottom={20}
      />
      <LogsContainer>
        <LogBlock type="header" />
        {currentLogs.map((log, index) => (
          <LogBlock
            key={log.id}
            type="data"
            log={{
              ...log,
              date: formatDate(log.date), // Only format the date
            }}
            index={(currentPage - 1) * itemsPerPage + index + 1}
            onClick={() => setSelectedLog(log)}
          />
        ))}
      </LogsContainer>
      <div style={{ flex: 1 }}></div>
      <PaginationContainer>
        <PaginationButton
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          <FaAngleDoubleLeft />
        </PaginationButton>
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
        <PaginationButton
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          <FaAngleDoubleRight />
        </PaginationButton>
      </PaginationContainer>
      {selectedLog && (
        <LogModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </BoardContainer>
  );
}

export default LogBoard;
