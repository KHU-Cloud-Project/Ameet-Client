/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const InputLabelWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;

  span {
    margin-bottom: 8px;
    color: ${(props) => props.theme.colors.textDarkGray};
    font-size: ${(props) => props.theme.typography.fontSize.medium};
    font-weight: ${(props) => props.theme.typography.fontWeight.regular};
  }

  input {
    padding: 9px 12px;
    border: 1px solid ${(props) => props.theme.colors.lineGray};
    font-size: ${(props) => props.theme.typography.fontSize.default};
    border-radius: ${(props) => props.theme.borderRadius.small};
    min-width: 270px;

    &::placeholder {
      color: ${(props) => props.theme.colors.textGray};
    }

    &:focus {
      outline: none;
    }
  }
`;

type InputLabelProps = {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // The change handler
};

const InputLabel = ({
  label,
  value,
  placeholder,
  type = 'text',
  onChange,
}: InputLabelProps) => {
  return (
    <InputLabelWrapper>
      <span>{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </InputLabelWrapper>
  );
};

export default InputLabel;
