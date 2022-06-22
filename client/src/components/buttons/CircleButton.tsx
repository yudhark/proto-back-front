import React from "react";
import styled from "styled-components";

interface CircleButtonProps {
  name: string;
  value: string;
  icon?: React.ReactNode;
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({ name, value, icon, onClickHandler }) => {
  return (
    <ButtonGroup><Button>{icon}</Button></ButtonGroup>
  );
};
export default CircleButton;

const ButtonGroup = styled.div`
flex: 1;
display: flex;
flex-direction: row;
height: 100%;
`

const Button = styled.button`
height: 100%;
cursor: pointer;
outline: none;
`
