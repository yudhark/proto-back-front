import React from "react";
import styled from "styled-components";
import { Column } from "../utils/styled.global";

type CustomProps = {
  bgColor?: string;
};

interface WidgetProps extends CustomProps {
  title?: string;
  count?: number;
}

const Widget: React.FC<WidgetProps> = ({ bgColor, title, count }) => {
  return (
    <Wrapper bgColor={bgColor}>
      <BackTitle>{title ? title : "Your Title"}</BackTitle>
      <ContenWrapper>
        <Column flex></Column>
        <Column disp="flex" flexDir="column" pl={4} pr={4} pb={4} position="relative" height="100%">
          <TextBox>On Going</TextBox>
          <NumberBox>{count ? count : 0}</NumberBox>
        </Column>
      </ContenWrapper>
    </Wrapper>
  );
};
export default Widget;

const Wrapper = styled.div<CustomProps>`
  ${(props) => props.bgColor && "background-color: " + props.bgColor + ";"}
  height: 100%;
  width: 100%;
  border: 1px solid rgba(26, 54, 126, 0.125);
  border-radius: 0.25rem;
  background-clip: border-box;
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  border-width: 0;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
`;

const BackTitle = styled.h5`
  font-size: 38px;
  color: rgba(0, 0, 0, 0.4);
  position: absolute;
  font-weight: 700;
  z-index: 1;
  top: -8px;
  left: 0;
  line-height: 100%;
  font-family: "Oswald", sans-serif;
`;

const ContenWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TextBox = styled.span`
  position: absolute;
  top: 20px;
  right: 2px;
  font-family: "Oswald", sans-serif;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8rem;
  text-align: right;
  white-space: nowrap;
`;
const NumberBox = styled.span`
  text-align: right;
  position: absolute;
  bottom: -14px;
  right: -4px;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.4);
  font-size: 50px;
`;
