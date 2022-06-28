import React from "react";
import styled, { keyframes } from "styled-components";
import { FaTimes } from "react-icons/fa";

interface WarningBoxProps {
  type?: "error" | "success" | "warning" | "default";
  message?: string;
  closeBox?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const WarningBox: React.FC<WarningBoxProps> = ({ closeBox, message, type }) => {
  return (
    <Wrapper mode={type}>
      <InnerWrapper>
        <MessageText>{message}</MessageText>
        <CloseButton onClick={closeBox}>
          <FaTimes />
        </CloseButton>
      </InnerWrapper>
    </Wrapper>
  );
};
export default WarningBox;
const fallDown = keyframes`
0% {
  opacity: 0;
  transform: translateY(-10rem);
} 100% {
  opacity: 1;
  transform: translateY(0);
}`;

const Wrapper = styled.div<{ mode?: "error" | "success" | "warning" | "default" }>`
  z-index: 10;
  min-width: 150px;
  max-width: 300px;
  min-height: 30px;
  ${(props) =>
    props.mode === "error"
      ? "background-color: #CC0000;"
      : props.mode === "warning"
      ? "background-color: #FF8800;"
      : props.mode === "success"
      ? "background-color: #007E33;"
      : "background-color: #646464;"}
  position: absolute;
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%),
    0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  top: 0px;
  margin-top: -5px;
  left: calc(50% - 75px);
  animation: ${fallDown} 0.4s ease-in;
  border-radius: 6px;
  display: flex;
  opacity: 0.7;
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;

const InnerWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.h4`
  flex: 1;
  font-size: 0.8rem;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  margin: 4px;
`;

const CloseButton = styled.button`
  color: white;
  border: none;
  background: none;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  font-size: 1rem;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;
