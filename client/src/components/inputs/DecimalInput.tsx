import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface DecimalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
  unit?: string;
  digits?: number;
}

const DecimalInput: React.FC<DecimalProps> = ({ width, label, unit, digits, ...rest }) => {
  const [currentValue, setCurrentValue] = useState<any>(0);
  const [onFocus, setOnFocus] = useState<boolean>(false)

  const FormatterDecimal = useCallback((value: any, dots?: number) => {
    //replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return value;
  }, []);

  const LocalHandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(FormatterDecimal(e.currentTarget.value));
  };
  const LocalFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    rest.value ? setCurrentValue(rest.value) : setCurrentValue("")
    setOnFocus(true)
  };

  const LocalBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setOnFocus(false)
  }

  useEffect(() => {
    if (rest.value) setCurrentValue(FormatterDecimal(rest.value, digits));
  }, [rest.value, digits, FormatterDecimal]);

  return (
    <Wrapper width={width} active={onFocus}>
      <Column>
        <label htmlFor={rest.name}>{label}</label>
      </Column>
      <Column flex gap={6}>
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
          pattern="[+-]?\d+(?:[.,]\d+)?"
          alt="number"
        />
        {unit && <span>{unit}</span>}
      </Column>
    </Wrapper>
  );
};
export default DecimalInput;

const Wrapper = styled.div<{ width?: number; active?: boolean }>`
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  ${props => props.active ? "border: 1px solid #29b6f66b; box-shadow: 1px 1px 10px 1px #29b6f63b;" : "border: 1px solid rgba(4, 9, 20, 0.2);"}
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 3px 5px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const Column = styled.div<{ flex?: boolean; gap?: number }>`
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  display: flex;
  flex-direction: row;
  align-items: center;
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
