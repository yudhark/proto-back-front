import React from "react";
import styled from "styled-components";
import { FaPrint,FaFileExcel,FaUpload,FaPlusSquare,FaEdit,FaTrashAlt } from "react-icons/fa";

interface GroupButtonProps {}

const GroupButton: React.FC<GroupButtonProps> = () => {
  return (
    <Wrapper>
      <ColumnButton>
        <MenuButton>
          <MenuIcon>
            <FaPrint />
          </MenuIcon>
          <MenuText>Print</MenuText>
        </MenuButton>
      </ColumnButton>
      <ColumnButton>
        <MenuButton>
          <MenuIcon><FaFileExcel/></MenuIcon>
          <MenuText>Excel</MenuText>
        </MenuButton>
      </ColumnButton>
      <ColumnButton>
        <MenuButton>
          <MenuIcon><FaUpload/></MenuIcon>
          <MenuText>Upload</MenuText>
        </MenuButton>
      </ColumnButton>
      <ColumnButton>
        <MenuButton>
          <MenuIcon><FaPlusSquare/></MenuIcon>
          <MenuText>New</MenuText>
        </MenuButton>
      </ColumnButton>
      <ColumnButton>
        <MenuButton>
          <MenuIcon><FaEdit/></MenuIcon>
          <MenuText>Edit</MenuText>
        </MenuButton>
      </ColumnButton>
      <ColumnButton>
        <MenuButton>
          <MenuIcon><FaTrashAlt/></MenuIcon>
          <MenuText>Del</MenuText>
        </MenuButton>
      </ColumnButton>
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
