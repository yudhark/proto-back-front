import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTimes, FaWindowMaximize, FaWindowRestore } from "react-icons/fa";
import Dragable from "react-draggable";

interface WindowProps {
  title?: string;
  width: number;
  height: number;
  reference: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  CloseWindow: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const WindowPopUp: React.FC<WindowProps> = ({ title, width, height, reference, children, CloseWindow }) => {
  const [style, setStyle] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [bounds, setBounds] = useState<string>("")
  const [maximize, setMaximize] = useState<boolean>(false);
  useEffect(() => {
    const halfHeight = window.outerHeight / 2 - height;
    const halfWidth = window.outerWidth / 2 - width / 2;
    setStyle({ left: halfWidth, top: halfHeight });
  }, [width, height]);

  const _maximizeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMaximize(true);
    setBounds("parent")
  };

  const _minimizeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMaximize(false);
    setBounds("")
  };

  const _closeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    CloseWindow(e);
  };

  const DoubleClickHeader = (e: React.MouseEvent<HTMLDivElement>) => {
    setMaximize(!maximize)
  }

  return (
    <Dragable nodeRef={reference} bounds={bounds}>
      <Wrapper ref={reference} width={width} height={height} maxWindow={maximize} id="popwindow" style={style}>
        <HeaderWindow onDoubleClick={DoubleClickHeader}>
          <TitileBox>
            <TitleText>{title}</TitleText>
          </TitileBox>
          <ButtonBox>
            <ButtonWindow onClick={_minimizeHandler}>
              <FaWindowRestore />
            </ButtonWindow>
            <ButtonWindow onClick={_maximizeHandler}>
              <FaWindowMaximize />
            </ButtonWindow>
            <ButtonWindow onClick={_closeHandler}>
              <FaTimes />
            </ButtonWindow>
          </ButtonBox>
        </HeaderWindow>
        <BodyWindow>{children}</BodyWindow>
      </Wrapper>
    </Dragable>
  );
};
export default WindowPopUp;

const Wrapper = styled.div<{ width?: number; height?: number; maxWindow?: boolean; movable?: boolean }>`
  position: fixed;
  ${(props) => props.width && "width: " + props.width + "px;"}
  ${(props) => props.height && "height: " + props.height + "px;"}
  ${(props) => props.maxWindow && "width: 100% !important; height: 100% !important; top: 0px !important; left: 0px !important;"}
  z-index: 10;
  background: white;
  display: flex;
  border: 1px solid rgba(26, 54, 126, 0.125);
  flex-direction: column;
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%),
    0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  gap: 2px;
  border-radius: 4px;
  transition: all 0.3s;
`;

const HeaderWindow = styled.div`
  display: flex;
  flex-direction: row;
`;

const BodyWindow = styled.div`
  flex: 1;
  margin-bottom: 6px;
  margin-left: 6px;
  margin-right: 6px;
  overflow: hidden;
  display: flex;
  border: 1px solid rgba(26, 54, 126, 0.125);
`;

const TitileBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 6px;
  margin-right: 4px;
`;
const TitleText = styled.span`
  font-weight: bold;
  font-size: .78rem;
  &:hover {
    cursor: default;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  margin-right: 4px;
  margin-bottom: 2px;
`;

const ButtonWindow = styled.button`
  background: #fefefe;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background: #ff9f9f;
  }
`;
