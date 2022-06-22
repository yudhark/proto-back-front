import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface NumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
}

const NumberInput: React.FC<NumberProps> = ({ width, label, ...rest }) => {
  const [currentValue, setCurrentValue] = useState<any>(0);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const LocalHandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let typingValue = e.currentTarget.value;
    const pattern = new RegExp(/^\d+$/, "g");
    if (typingValue.match(pattern)) {
      setCurrentValue(typingValue);
      rest.onChange && rest.onChange(e);
    } else if (typingValue === "") {
      setCurrentValue("");
    }
  };

  const LocalFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!rest.value) setCurrentValue("");
    setOnFocus(true);
  };

  const LocalBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setOnFocus(false);
  };

  useEffect(() => {
    if (rest.value) setCurrentValue(rest.value);
  }, [rest.value]);

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
          readOnly={rest.readOnly}
          placeholder={rest.placeholder}
          alt="number"
        />
      </Column>
    </Wrapper>
  );
};
export default NumberInput;

const Wrapper = styled.div<{ width?: number; active?: boolean }>`
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  ${(props) => (props.active ? "border: 1px solid #29b6f66b; box-shadow: 1px 1px 10px 1px #29b6f63b;" : "border: 1px solid rgba(4, 9, 20, 0.2);")}
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  gap: 5px;
  padding: 3px 5px;
  justify-content: center;
  align-items: center;
`;

const Column = styled.div<{ flex?: boolean; }>`
  ${(props) => props.flex && "flex: 1;"}
  display: flex;
  font-size: 0.72rem;
`;

const Input = styled.input`
  width: calc(100% - 4px);
  box-shadow: inset 1px 1px 1px 0 #3838384b;
  background: #e3e3e3;
  border-radius: 2px;
  padding: 2px 5px;
  outline: none;
  border: none;
  font-size: 0.7rem;
  overflow: hidden;
  text-align: right;
`;
