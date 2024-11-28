import React from 'react';
import styled from '@emotion/styled';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.textBlack};

  label {
    margin-bottom: 8px;
    color: ${(props) => props.theme.colors.textDarkGray};
    font-size: ${(props) => props.theme.typography.fontSize.default};
    font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  }

  .date-picker-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid ${(props) => props.theme.colors.lineGray};
    border-radius: ${(props) => props.theme.borderRadius.small};
    background-color: none;

    &::placeholder {
      color: ${(props) => props.theme.colors.textGray};
    }

    &:focus {
      outline: none;
    }
  }

  .react-datepicker {
    border: 1px solid ${(props) => props.theme.colors.lineGray};
    background-color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.typography.fontSize.xSmall};
    border-radius: 4px;
  }

  .react-datepicker__header {
    background-color: ${(props) => props.theme.colors.pastelBlue};
    font-weight: ${(props) => props.theme.typography.fontWeight.medium};
    border-bottom: none;
    padding: 10px 0;
    // border-bottom: 1px solid #ccc;
  }

  .react-datepicker__current-month {
    font-weight: ${(props) => props.theme.typography.fontWeight.medium};
    font-size: ${(props) => props.theme.typography.fontSize.small};
    color: ${(props) => props.theme.colors.textDarkGray};
  }

  .react-datepicker__day {
    color: ${(props) => props.theme.colors.textDarkGray};
    padding: 0px;
    border-radius: 100%;
    cursor: pointer;
  }

  .react-datepicker__day-name {
    margin-bottom: 0;
    font-weight: ${(props) => props.theme.typography.fontWeight.regular};
    color: ${(props) => props.theme.colors.textDarkGray};
  }

  .react-datepicker__day:hover {
    background-color: ${(props) => props.theme.colors.background};
    padding: 0px;
    border-radius: 100%;
  }

  .react-datepicker__day--selected {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.white};
  }

  .react-datepicker__time-container {
    border-left: 1px solid ${(props) => props.theme.colors.lineGray};
  }

  .react-datepicker__time {
    font-size: ${(props) => props.theme.typography.fontSize.xSmall};
    color: ${(props) => props.theme.colors.textDarkGray};
  }

  .react-datepicker__time-list-item--selected {
    background-color: ${(props) => props.theme.colors.textBlue};
    color: ${(props) => props.theme.colors.white};
    font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  }
`;

type DatePickerProps = {
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  onChange,
}) => {
  return (
    <DatePickerWrapper>
      <label>{label}</label>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        showTimeSelect
        dateFormat="Pp"
        className="date-picker-input"
      />
    </DatePickerWrapper>
  );
};

export default DatePicker;
