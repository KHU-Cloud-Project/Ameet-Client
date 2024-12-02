import { useEffect, useState } from 'react';
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
import { Log } from '../../../models/Log';
import { useFetchLogs } from '../../../hooks/useFetchLogs';

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
  teamId?: number;
  userId?: number;
  itemsPerPage?: number;
  title?: string;
};

function LogBoard({ teamId, userId, itemsPerPage = 7, title }: LogBoardProps) {
  const { logs = [], totalPages, fetchLogs, loading, error } = useFetchLogs();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  useEffect(() => {
    if (teamId && teamId > 0) {
      fetchLogs('team', teamId, currentPage - 1, itemsPerPage);
    } else if (userId && userId > 0) {
      fetchLogs('user', userId, currentPage - 1, itemsPerPage);
    }
  }, [teamId, userId, currentPage, itemsPerPage, fetchLogs]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <BoardContainer>
      <BoardTitle
        children={title ?? 'Meeting Logs'}
        actionComponent={<UploadBtn />}
        marginBottom={20}
      />
      {loading ? (
        <div>Loading logs...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : logs.length === 0 ? (
        <div>No meeting logs available.</div>
      ) : (
        <LogsContainer>
          <LogBlock type="header" />
          {logs.map((log, index) => (
            <LogBlock
              key={log.meetingId}
              type="data"
              log={log}
              index={(currentPage - 1) * itemsPerPage + index + 1}
              onClick={() => {
                setSelectedLog(log);
                setModalOpen(true);
              }}
            />
          ))}
        </LogsContainer>
      )}
      <div style={{ flex: 1 }} />
      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <FaAngleDoubleLeft />
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </PaginationButton>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <PageNumber
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageNumber>
          ),
        )}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <FaAngleDoubleRight />
        </PaginationButton>
      </PaginationContainer>
      {isModalOpen && selectedLog && (
        <LogModal log={selectedLog} onClose={() => setModalOpen(false)} />
      )}
    </BoardContainer>
  );
}

export default LogBoard;
