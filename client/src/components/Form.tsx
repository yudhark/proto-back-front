import React, { useRef } from "react";
import styled from "styled-components";
import { FaCheck, FaTimes } from "react-icons/fa";

interface FormProps {
  children?: React.ReactNode;
  flexDir?: "row" | "column";
  gap?: number;
  submitFunc?: (e: React.FormEvent<HTMLFormElement>) => void;
  resetFunc?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ children, submitFunc, resetFunc, flexDir, gap }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.type === "submit") submitFunc && submitFunc(e);
    else if (e.type === "reset") {
      formRef.current?.reset();
      resetFunc && resetFunc(e);
    }
  };
  return (
    <FormWrapper onSubmit={submitHandler} flexDir={flexDir || "column"} onReset={submitHandler} ref={formRef} gap={gap}>
      {children}
      <ButtonWrapper>
        <MenuButton type="submit">
          <MenuIcon type="success">
            <FaCheck />
          </MenuIcon>
          <MenuText>Save</MenuText>
        </MenuButton>
        <MenuButton type="reset">
          <MenuIcon type="error">
            <FaTimes />
          </MenuIcon>
          <MenuText>Cancel</MenuText>
        </MenuButton>
      </ButtonWrapper>
    </FormWrapper>
  );
};
export default Form;

const FormWrapper = styled.form<{ flexDir?: "row" | "column"; gap?: number }>`
  flex: 1;
  padding: 5px 5px;
  position: relative;
  display: flex;
  overflow-y: auto;
  ${(props) => props.flexDir && "flex-direction: " + props.flexDir + ";"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  background: #ededed;
  border: 1px solid rgba(26, 54, 126, 0.125);
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 4px 6px;
  border-radius: 4px;
  bottom: 0px;
  right: 0px;
  transition: all 0.2s ease;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;

const MenuButton = styled.button`
  background: #ddd;
  outline: none;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  gap: 4px;
  &:hover {
    cursor: pointer;
    background: #5e5e5e;
    color: #fff;
  }
`;

const MenuIcon = styled.span<{ type?: "success" | "error" }>`
  align-items: center;
  display: flex;
  justify-content: center;
  ${(props) => (props.type === "success" ? "color: green;" : props.type === "error" ? "color: red;" : "")}
`;
const MenuText = styled.span`
  font-family: "Arial Narrow", Arial, sans-serif;
  text-align: center;
  font-size: 0.7rem;
`;
