import React from "react";
import styled from "styled-components";
import { FaPrint, FaFileExcel, FaUpload, FaPlusSquare, FaEdit, FaTrashAlt } from "react-icons/fa";

interface ButtonProps {
  value: "new" | "edit" | "delete" | "print" | "excel" | "upload";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SingleButton: React.FC<ButtonProps> = ({ value, onClick }) => {
  return (
    <ColumnButton>
      <MenuButton value={value} onClick={onClick}>
        <MenuIcon>
          {value === "new" ? (
            <FaPlusSquare />
          ) : value === "edit" ? (
            <FaEdit />
          ) : value === "delete" ? (
            <FaTrashAlt />
          ) : value === "excel" ? (
            <FaFileExcel />
          ) : value === "print" ? (
            <FaPrint />
          ) : value === "upload" ? (
            <FaUpload />
          ) : null}
        </MenuIcon>
        <MenuText>
          {value === "new"
            ? "Add"
            : value === "edit"
            ? "Edit"
            : value === "delete"
            ? "Delete"
            : value === "excel"
            ? "Excel"
            : value === "print"
            ? "Print"
            : value === "upload"
            ? "Upload"
            : ""}
        </MenuText>
      </MenuButton>
    </ColumnButton>
  );
};

interface GroupButtonProps {
  buttonList: Array<"new" | "edit" | "delete" | "print" | "excel" | "upload"> | "all";
  buttonHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const GroupButton: React.FC<GroupButtonProps> = ({ buttonList, buttonHandler }) => {
  const buttonGroup: Array<"new" | "edit" | "delete" | "print" | "excel" | "upload"> = ["new", "edit", "delete", "print", "excel", "upload"];
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    buttonHandler && buttonHandler(e);
  };
  return (
    <Wrapper>
      {buttonList === "all"
        ? buttonGroup.map((item, index) => <SingleButton value={item} onClick={onClick} key={index} />)
        : buttonList.map((item, index) => <SingleButton value={item} onClick={onClick} key={index} />)}
    </Wrapper>
  );
};
export default GroupButton;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding-right: 6px;
`;

const ColumnButton = styled.div``;

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

const MenuIcon = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
`;
const MenuText = styled.span`
  font-family: "Arial Narrow", Arial, sans-serif;
  text-align: center;
  font-size: 0.7rem;
`;
