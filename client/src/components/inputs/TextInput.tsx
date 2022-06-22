import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
  auto?: boolean;
}

const TextInput: React.FC<TextProps> = ({ width, label, auto, ...rest }) => {
  const [currentValue, setCurrentValue] = useState<any>("");
  const [onFocus, setOnFocus] = useState<boolean>(false)
  const LocalHandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value);
    rest.onChange && rest.onChange(e);
  };

  const LocalFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setOnFocus(true)
  }
  const LocalBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setOnFocus(false)
  }

  useEffect(() => {
    if(auto) {
      setCurrentValue("**auto**")
    }else{
      if(rest.value) setCurrentValue(rest.value)
      else setCurrentValue("")
    }
  }, [rest.value, auto]);

  return (
    <Wrapper width={width} active={onFocus}>
      <Column>
        <label htmlFor={rest.name}>{label}</label>
      </Column>
      <Column flex>
        <Input
          type="text"
          name={rest.name}
          onChange={LocalHandlerChange}
          onFocus={LocalFocusHandler}
          onBlur={LocalBlurHandler}
          value={currentValue}
          disabled={rest.disabled}
          readOnly={auto ? true : rest.readOnly}
          placeholder={rest.placeholder}
          alt="text"
        />
      </Column>
    </Wrapper>
  );
};
export default TextInput;

const Wrapper = styled.div<{ width?: number; active?: boolean }>`
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  gap: 5px;
  padding: 3px 5px;
  ${props => props.active ? "border: 1px solid #29b6f66b; box-shadow: 1px 1px 10px 1px #29b6f63b;" : "border: 1px solid rgba(4, 9, 20, 0.2);"}
  justify-content: center;
  align-items: center;
`;

const Column = styled.div<{ flex?: boolean }>`
  ${(props) => props.flex && "flex: 1;"}
  display: flex;
  font-size: 0.72rem;
`;

const Input = styled.input`
  width: calc(100% - 4px);
  box-shadow: inset 1px 1px 1px 0 #3838384b;
  background: #e3e3e3;
  padding: 2px 5px;
  outline: none;
  border: none;
  font-size: 0.7rem;
  overflow: hidden;
  border-radius: 2px;
`;
