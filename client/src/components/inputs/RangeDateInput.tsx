import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Calendar from "../Calendar";

interface RangeDateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
}

const RangeDateInput: React.FC<RangeDateInputProps> = ({ width, label, ...rest }) => {
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const LocalFocusHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    setOnFocus(true);
  };
  const LocalBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    setOnFocus(false);
  };

  const [enableTo, setEnableTo] = useState<boolean>(false);
  const [enableFrom, setEnableFrom] = useState<boolean>(false);
  const [fullDate, setFullDate] = useState<string>("");

  const inputContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let today = new Date();
    setFullDate(today.toLocaleDateString());
  }, []);

  const [widthDateContainer, setWidthDateContainer] = useState<number>();
  useEffect(() => {
    if(inputContainerRef.current) {
      let rect = inputContainerRef.current.getBoundingClientRect()
      setWidthDateContainer(rect.width)
    }
  },[inputContainerRef])

  const popUpRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const closepopup = (e: any) => {
      if(popUpRef.current && !popUpRef.current.contains(e.target)) {
        setEnableFrom(false)
      }
    }
    document.addEventListener("mousedown", closepopup)
    return () => {
      document.removeEventListener("mousedown", closepopup)
    }
  },[popUpRef])
  return (
    <Wrapper width={width} active={onFocus} onFocus={LocalFocusHandler} onBlur={LocalBlurHandler}>
      <Column>
        <label htmlFor={rest.name} style={{ whiteSpace: "nowrap" }}>
          {label}
        </label>
      </Column>
      <Column flex flexDir="row" gap={4} ref={inputContainerRef}>
        <Column>
          <Input type="text" readOnly name="from" onFocus={(e) => setEnableFrom(true)} defaultValue={fullDate} />
          {enableFrom && (
            <PopUpWrapper ref={popUpRef}>
              <PopUpInnerWrapper>
                <Calendar width={widthDateContainer}/>
              </PopUpInnerWrapper>
            </PopUpWrapper>
          )}
        </Column>
        <span>-</span>
        <Column>
          <Input type="text" readOnly name="to" />
        </Column>
      </Column>
    </Wrapper>
  );
};
export default RangeDateInput;

const dropdown = keyframes`
0% {
  transform: scaleY(0);
} 100% {
  transform: scaleY(1);
}`;

const Wrapper = styled.div<{ width?: number; active?: boolean }>`
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  gap: 5px;
  padding: 3px 5px;
  ${(props) => (props.active ? "border: 1px solid #29b6f66b; box-shadow: 1px 1px 10px 1px #29b6f63b;" : "border: 1px solid rgba(4, 9, 20, 0.2);")}
  justify-content: center;
  align-items: center;
`;

const Column = styled.div<{ flex?: boolean; flexDir?: "column" | "row"; gap?: number }>`
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.flexDir && "flex-direction: " + props.flexDir + ";"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  display: flex;
  font-size: 0.72rem;
  position: relative;
`;

const Input = styled.input`
  box-shadow: inset 1px 1px 1px 0 #3838384b;
  background: #e3e3e3;
  width: 80px;
  padding: 2px 5px;
  outline: none;
  border: none;
  font-size: 0.7rem;
  overflow: hidden;
  border-radius: 2px;
  text-align: right;
`;

const PopUpWrapper = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 6px;
  transition: ${dropdown} .2s ease-in;
`;

const PopUpInnerWrapper = styled.div``;
