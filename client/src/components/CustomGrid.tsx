import React from "react";
import styled from "styled-components";
import { Devider } from "../utils/styled.global";

interface CustomGridProps {
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  menuComponent?: React.ReactNode
}

const CustomGrid: React.FC<CustomGridProps> = ({ children, headerComponent, menuComponent }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        {headerComponent && (
          <>
            <Row centerized disp="flex" flexdir="row">
              <Row flex>{headerComponent}</Row>
              {
                menuComponent && menuComponent
              }
            </Row>
            <Devider pos="top" />
          </>
        )}
        <Row hidden flex disp="flex">
          {children}
        </Row>
      </InnerWrapper>
    </Wrapper>
  );
};
export default CustomGrid;

const Wrapper = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background: #fff;
  border: 1px solid rgba(26, 54, 126, 0.125);
  border-radius: 0.25rem;
  background-clip: border-box;
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  border-width: 0;
  transition: all 0.2s;
  padding: 6px;
`;
const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Row = styled.div<{
  flex?: boolean;
  autoscroll?: boolean;
  hidden?: boolean;
  bgcolor?: string;
  disp?: string;
  flexdir?: "column" | "row";
  centerized?: boolean;
}>`
  ${(props) => props.autoscroll && "overflow-y: auto;"}
  ${(props) => props.hidden && "overflow: hidden;"}
  ${(props) => props.flex && "flex: 1 auto;"}
  ${(props) => props.bgcolor && "background: " + props.bgcolor + ";"}
  ${(props) => props.disp && "display: " + props.disp + ";"}
  ${(props) => props.flexdir && "flex-direction: " + props.flexdir + ";"}
  ${(props) => props.centerized && "display: flex; justify-content: center; align-items: center;"}
`;
