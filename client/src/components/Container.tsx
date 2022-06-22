import React from "react";
import styled from "styled-components";

interface ContainerProps {
  children?: React.ReactNode;
  navbarHeight?: number;
}

const Container: React.FC<ContainerProps> = ({ children, navbarHeight }) => {
  return <Wrapper navbar={navbarHeight}>{children}</Wrapper>;
};
export default Container;

const Wrapper = styled.div<{ navbar?: number }>`
  ${(props) => props.navbar && "height: calc(100vh - " + props.navbar + "px - 30px);"}
  width: calc(100vw - 30px);
  padding: 15px;
`;
