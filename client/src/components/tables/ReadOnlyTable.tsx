import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import platform from "platform";

interface ReadOnlyTableProps {
  data?: Array<any>;
  toolbar?: Array<any>;
  headerComponent?: React.ReactNode;
}

const ReadOnlyTable: React.FC<ReadOnlyTableProps> = ({ data, toolbar, headerComponent }) => {
  const [browser, setBrowser] = useState<any>("");
  const [dummyData, setDummyData] = useState<Array<any>>([]);
  useEffect(() => {
    const dummy_arr = [];
    for (let i = 1; i <= 30; i++) {
      dummy_arr.push(i);
    }
    setDummyData(dummy_arr);
  }, []);

  useEffect(() => {
    setBrowser(platform.name);
  }, []);

  const popUpRef = useRef<HTMLDivElement>(null);
  const [enablePopUp, setEnablePopUp] = useState<boolean>(false);
  const [popUpPosition, setPopUpPosition] = useState<{ left?: number; top?: number }>({});
  const PopUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEnablePopUp(!enablePopUp);
    let rect = e.currentTarget.getBoundingClientRect();
    setPopUpPosition({ left: rect.width + rect.left, top: rect.top });
  };
  useEffect(() => {
    const closepopup = (e: any) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setEnablePopUp(false);
      }
    };
    document.addEventListener("mousedown", closepopup);
    return () => {
      document.removeEventListener("mousedown", closepopup);
    };
  }, []);
  return (
    <Wrapper>
      <ToolbarWrapper>
        <FilterText type="text" />
        <PopUpWrapper>
          <PopUpButton onClick={PopUpHandler}>more...</PopUpButton>
          {enablePopUp && (
            <PopUpBoxConatainer ref={popUpRef} left={popUpPosition.left} top={popUpPosition.top}>
              <InnerPopUpContainer>
                <PopUpInner></PopUpInner>
              </InnerPopUpContainer>
            </PopUpBoxConatainer>
          )}
        </PopUpWrapper>
      </ToolbarWrapper>
      <HeaderWrapper>
        {[1, 2, 3].map((item, index) => (
          <HeaderCell key={index} index={index}>
            <TextCell fontSize=".8rem">Col {item}</TextCell>
          </HeaderCell>
        ))}
        <FixedCell />
      </HeaderWrapper>
      <BodyWrapper>
        {dummyData.map((item, index) => (
          <RowBox index={index} key={index} id={item} browser={browser}>
            {[1, 2, 3].map((value, idx) => (
              <BodyCell index={idx} key={idx}>
                <TextCell noBold mr={5} ml={5} textAlign="right" fontSize=".68rem">
                  {value * item}
                </TextCell>
              </BodyCell>
            ))}
          </RowBox>
        ))}
      </BodyWrapper>
    </Wrapper>
  );
};
export default ReadOnlyTable;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const ToolbarWrapper = styled.div`
  padding-top: 3px;
  padding-bottom: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const HeaderWrapper = styled.div`
  padding-top: 3px;
  padding-bottom: 3px;
  height: 18px;
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(26, 54, 126, 0.2);
  background: #06beb6;
  background: -webkit-linear-gradient(to right, #48b1bf, #06beb6);
  background: linear-gradient(to right, #48b1bf, #06beb6);
`;
const BodyWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  border-left: 1px solid rgba(26, 54, 126, 0.08);
  border-bottom: 1px solid rgba(26, 54, 126, 0.08);
  border-right: 1px solid rgba(26, 54, 126, 0.08);
`;
const FixedCell = styled.div`
  width: 10px;
  border-left: 1px solid rgba(26, 54, 126, 0.2);
`;
const HeaderCell = styled.div<{ width?: number; index?: number }>`
  align-items: center;
  font-family: "Arial Narrow", Arial, sans-serif;
  color: white;
  display: flex;
  justify-content: center;
  position: relative;
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  ${(props) => (props.index && props.index !== 0 ? "border-left: 1px solid rgba(26, 54, 126, 0.2);" : "")}
`;

const BodyCell = styled.div<{ width?: number; index?: number }>`
  align-items: center;
  display: flex;
  justify-content: center;
  ${(props) => (props.index && props.index !== 0 ? "border-left: 1px solid rgba(26, 54, 126, 0.2);" : "")}
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  position: relative;
`;

const TextCell = styled.span<{
  noBold?: boolean;
  textAlign?: "left" | "right";
  mr?: number;
  ml?: number;
  fontSize?: string;
}>`
  ${(props) =>
    props.textAlign === "left"
      ? "text-align: left;"
      : props.textAlign === "right"
      ? "text-align: right;"
      : "text-align: center;"}
  ${(props) => (props.fontSize ? "font-size: " + props.fontSize + ";" : "font-size: 0.7rem;")}
  ${(props) => props.ml && props.mr && "width: calc(100% - " + (props.ml + props.mr) + "px);"}
  ${(props) => (props.noBold ? "" : "font-weight: bold;")}
  ${(props) => (props.ml ? "margin-left: " + props.ml + "px;" : "")}
  ${(props) => (props.mr ? "margin-right: " + props.mr + "px;" : "")}
`;

const RowBox = styled.div<{ index?: number; browser?: string }>`
  font-family: "Arial Narrow", Arial, sans-serif;
  height: 20px;
  padding: 2px 0;
  display: flex;
  border-bottom: 1px solid rgba(26, 54, 126, 0.08);
  ${(props) => props.index && props.index % 2 === 1 && "background: #f7f7f7;"}
  flex-direction: row;
  ${(props) => (props.browser?.includes("Firefox") ? "padding-right: 11px;" : "padding-right: 1px;")}
`;

const FilterText = styled.input`
  flex: 1;
  margin: 0 4px;
  outline: none;
  border: none;
  padding: 2px 4px;
  box-shadow: inset 1px 1px 3px 0 #3838384b;
  background: #ddd;
`;

const PopUpWrapper = styled.div`
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;
const PopUpButton = styled.button`
  width: 50px;
  // font-family: "Arial Narrow", Arial, sans-serif;
  font-size: 0.7rem;
  height: 100%;
  outline: none;
  border: none;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background: #5e5e5e;
    color: #fff;
  }
`;

const PopUpBoxConatainer = styled.div<{ left?: number; top?: number }>`
  ${(props) => props.left && "left: " + props.left + "px;"}
  ${(props) => props.top && "top: " + props.top + "px;"}
  position: fixed;
  z-index: 10;
`;

const InnerPopUpContainer = styled.div`
  position: relative;
  display: block
  padding: 6px;
  margin-top: 5px;
  margin-left: 5px;
  &:before {
    position: absolute;
    left: 0;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid #fff;
    content: '';
  }
  &:after {
    position: absolute;
    left: 0;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid #fff;
    content: '';
  }
`;

const PopUpInner = styled.div`
  padding: 6px;
  min-width: 100px;
  border-top: 1px solid rgba(26, 54, 126, 0.125);
  border-right: 1px solid rgba(26, 54, 126, 0.125);
  border-bottom: 1px solid rgba(26, 54, 126, 0.125);
  min-height: 100px;
  background: #fff;
  border-radius: 0.25rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: -10px;
  margin-left: 6px;
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
`;
