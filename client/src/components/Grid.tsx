import React from "react";
import styled from "styled-components";

interface IGrid {
  flex?: boolean;
  width?: number;
  flexdir?: "row" | "column";
}

interface GridProps extends IGrid {
  header?: boolean;
  footer?: boolean;
  title?: string;
  children?: React.ReactNode;
  footerComponent?: React.ReactNode;
  gap?: number;
}

const Grid: React.FC<GridProps> = ({ flex, header, footer, title, children, footerComponent, flexdir, gap }) => {
  return (
    <Wrapper flex={flex}>
      {header && (
        <Header>
          <Box centerized>
            <HeaderTitle>{title}</HeaderTitle>
          </Box>
        </Header>
      )}
      <Body>
        <Box flexdir={flexdir} gap={gap} hidden>
          {children}
        </Box>
      </Body>
      {footer && (
        <Footer>
          <Box>{footerComponent}</Box>
        </Footer>
      )}
    </Wrapper>
  );
};
export default Grid;

const Wrapper = styled.div<IGrid>`
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid rgba(26, 54, 126, 0.125);
  border-radius: 0.25rem;
  background-clip: border-box;
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  border-width: 0;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgba(26, 54, 126, 0.125);
`;
const Body = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  overflow: hidden;
`;
const Footer = styled.div`
  width: 100%;
`;
const Box = styled.div<{ flexdir?: "row" | "column"; centerized?: boolean; gap?: number; hidden?: boolean }>`
  margin: 6px;
  display: flex;
  flex: 1;
  ${(props) => props.flexdir && "flex-direction: " + props.flexdir + ";"}
  ${(props) => props.centerized && "justify-content: center;"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  ${(props) => props.hidden && "overflow: hidden;"}
`;

const HeaderTitle = styled.h5`
  font-weight: 500;
  text-align: center;
`;
