import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface DefaultCheckProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
  auto?: boolean;
}

const DefaultCheckInput: React.FC<DefaultCheckProps> = ({ width, label, auto, ...rest }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const LocalHandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
    rest.onChange && rest.onChange(e);
  };

  const LocalFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setOnFocus(true);
  };
  const LocalBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setOnFocus(false);
  };

  useEffect(() => {
    if(rest.checked) setChecked(rest.checked);
    return () => {
      setChecked(false)
    }
  }, [rest.checked]);

  return (
    <Wrapper width={width} active={onFocus}>
      <Column>
        <label htmlFor={rest.name}>{label}</label>
      </Column>
      <Column flex>
        <Input
          type="checkbox"
          name={rest.name}
          onChange={LocalHandlerChange}
          onFocus={LocalFocusHandler}
          onBlur={LocalBlurHandler}
          checked={checked}
          disabled={rest.disabled}
          readOnly={auto ? true : rest.readOnly}
          placeholder={rest.placeholder}
          alt="checkbox"
        />
      </Column>
    </Wrapper>
  );
};
export default DefaultCheckInput;

const Wrapper = styled.div<{ width?: number; active?: boolean }>`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  gap: 5px;
  padding: 3px 5px;
  ${(props) => (props.active ? "border: 1px solid #29b6f66b; box-shadow: 1px 1px 10px 1px #29b6f63b;" : "border: 1px solid rgba(4, 9, 20, 0.2);")}
  justify-content: center;
  align-items: center;
`;

const Column = styled.div<{ flex?: boolean }>`
  ${(props) => props.flex && "flex: 1;"}
  display: flex;
  font-size: 0.72rem;
`;

const Input = styled.input`
  box-shadow: inset 1px 1px 1px 0 #3838384b;
  background: #e3e3e3;
  padding: 2px 5px;
  outline: none;
  border: none;
  font-size: 0.7rem;
  overflow: hidden;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
  }
`;
