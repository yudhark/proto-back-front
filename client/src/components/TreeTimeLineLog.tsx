import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Column, Row } from "../utils/styled.global";
import { ColorTheme, MonthList } from "../utils/context.global";
import { dummyTimeLine, TimelineType } from "../utils/dummy.data";
import { BsClock } from "react-icons/bs";

interface TreeTimeLineProps {
  title?: string;
  id?: any;
}

interface SeriesType extends TimelineType {
  index: number;
}

const generateShadow = (inset: boolean): string => {
  let insetString: string = "";
  if (inset) insetString = "inset ";
  return insetString + "1px 1px 3px 0 #3838384b";
};

const TwoDigitFormat = (value: number): string => {
  if (value < 10) return "0" + value;
  else return value.toString();
};

const getLasttDigits = (value: number): string => {
  let valueString = value.toString().slice(-2);
  return valueString;
};

const CustomCalendar: React.FC<{ date?: Date }> = ({ date }) => {
  return (
    <CalendarWrapper customShadow={generateShadow(false)}>
      {date ? (
        <DateWrapper>
          <CalendarRow>
            <CalendarText fontSize=".7rem">
              {MonthList[date.getMonth() + 1]} {getLasttDigits(date.getFullYear())}
            </CalendarText>
          </CalendarRow>
          <CalendarRow>
            <CalendarText bold>{date.getDate()}</CalendarText>
          </CalendarRow>
          <CalendarRow>
            <CalendarText fontSize=".65rem">
              {TwoDigitFormat(date.getHours())}:{TwoDigitFormat(date.getMinutes())}:{TwoDigitFormat(date.getSeconds())}
            </CalendarText>
          </CalendarRow>
        </DateWrapper>
      ) : (
        <BsClock fontSize={26} />
      )}
    </CalendarWrapper>
  );
};

const SeriesTime: React.FC<SeriesType> = ({ id, index, date, person, remarks, role }) => {
  const [marginTop, setMarginTop] = useState<number>(0);
  const [colorSeries, setColorSeries] = useState<string>("#7a7a7a");
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [stateObject, setStateObject] = useState<{
    state?: "Done" | "Waiting";
    color?: "success" | "pending" | "failed";
  }>({});

  useEffect(() => {
    if (index === 0) setMarginTop(10);
    else setMarginTop(5);
    if (index) {
      setColorIndex(index);
    }
    return () => {
      setMarginTop(0);
    };
  }, [index]);

  useEffect(() => {
    if (colorIndex < ColorTheme.length) setColorSeries(ColorTheme[colorIndex]);
    else {
      setColorIndex(colorIndex - ColorTheme.length);
    }
  }, [colorIndex]);

  useEffect(() => {
    if (date) {
      if (remarks?.toLowerCase().includes("reject")) setStateObject({ state: "Done", color: "failed" });
      else setStateObject({ state: "Done", color: "success" });
    } else {
      setStateObject({ state: "Waiting", color: "pending" });
    }
  }, [remarks, date]);

  return (
    <SingleSeries>
      <Column position="relative" width={24}>
        <SingleLineSeries bgColor={colorSeries}></SingleLineSeries>
        <VerticalLineSeries bgColor={colorSeries} first={index}></VerticalLineSeries>
      </Column>
      <Column flex disp="flex" flexDir="row" mt={marginTop} mb={10}>
        <Column mr={8}>
          <CustomCalendar date={date} />
        </Column>
        <Column flex mr={10} pl={2} pr={5}>
          <RemarksWrapper>
            <RemarksText bold>{person}</RemarksText>
            <RemarksText italic fontSize=".64rem">
              {role}
            </RemarksText>
            <RemarkBox>
              <RemarksText textAlign="right" bgColor={stateObject.color} state>
                {stateObject.state}
              </RemarksText>
              <RemarksText bold>-</RemarksText>
              <RemarksText textAlign="left">{remarks}</RemarksText>
            </RemarkBox>
          </RemarksWrapper>
        </Column>
      </Column>
    </SingleSeries>
  );
};

const TreeTimeLine: React.FC<TreeTimeLineProps> = ({ title, id }) => {
  const [logData, setLogData] = useState<Array<any>>([]);
  useEffect(() => {
    setLogData(dummyTimeLine.reverse());
  }, []);

  const endScrollReff = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if(endScrollReff.current) {
      endScrollReff.current.scrollIntoView({behavior: "smooth"})
    }
  }
  return (
    <Wrapper>
      <Row>
        <h5>Log - {title}</h5>
      </Row>
      <Row flex bgColor="#ddd" overflow="hidden" disp="flex" flexDir="column" customShadow={generateShadow(true)}>
        <SeriesWrapper onLoadStart={scrollToBottom}>
          <SeriesLineFull/>
          {logData.map((item: TimelineType, index) => (
            <SeriesTime
              key={index}
              index={index}
              person={item.person}
              date={item.date}
              remarks={item.remarks}
              role={item.role}
            />
          ))}
          <div ref={endScrollReff}></div>
        </SeriesWrapper>
      </Row>
    </Wrapper>
  );
};
export default TreeTimeLine;

const Wrapper = styled.div`
  flex: 1 0 auto;
  width: 100%;
  min-height: 150px;
  height: 100%;
  background: #fff;
  box-shadow: 0 0.86875rem 2.1875rem rgb(4 9 20 / 3%), 0 1.2375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  border-radius: 6px;
  position: relative;
  border: 1px solid rgba(4, 9, 20, 0.075);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  overflow: hidden;
`;

const SeriesWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  position: relative;
`;

const SeriesLineFull = styled.div`
  position: absolute;
  height: 100%;
  width: 4px;
  background: #a7a7a7;
  margin-left: 10px;
`;

const SingleSeries = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const VerticalLineSeries = styled.div<{ bgColor?: string; first?: number }>`
  position: absolute;
  height: 4px;
  width: 10px;
  ${(props) => (props.first === 0 ? "top: calc(50% - 2px);" : "top: calc(50% - 4px);")}
  margin-left: 14px;
  ${(props) => props.bgColor && "background-color: " + props.bgColor + ";"}
`;

const SingleLineSeries = styled.div<{ bgColor?: string }>`
  ${(props) => props.bgColor && "background-color: " + props.bgColor + ";"}
  position: absolute;
  height: 100%;
  width: 4px;
  margin-left: 10px;
`;

const RemarksWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background: #fafbfc;
  border-radius: 4px;
  padding: 2px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${"box-shadow: " + generateShadow(false) + ";"}
`;

const CalendarWrapper = styled.div<{ customShadow?: string }>`
  ${(props) => props.customShadow && "box-shadow: " + props.customShadow + ";"}
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px;
  background: #fafbfc;
  border-radius: 4px;
  height: 46px;
  width: 46px;
  overflow: hidden;
`;

const DateWrapper = styled.div`
  position: relative;
`;

const CalendarRow = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

const CalendarText = styled.span<{ fontSize?: string; bold?: boolean }>`
  ${(props) => props.fontSize && "font-size: " + props.fontSize + ";"}
  ${(props) => props.bold && "font-weight: bold;"}
  text-align: center;
`;

const RemarkBox = styled.div`
  flex: 1;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const RemarksText = styled.span<{
  flex?: boolean;
  bold?: boolean;
  italic?: boolean;
  fontSize?: string;
  textAlign?: string;
  bgColor?: "success" | "pending" | "failed";
  state?: boolean;
}>`
  ${(props) =>
    props.bgColor === "failed"
      ? "background-color: #E53935;"
      : props.bgColor === "pending"
      ? "background-color: #Ef6C00;"
      : props.bgColor === "success" && "background-color: #388e3c;"}
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.bold && "font-weight: bold;"}
  ${(props) => props.italic && "font-style: italic;"}
  ${(props) => (props.fontSize ? "font-size: " + props.fontSize + ";" : "font-size: 0.66rem;")}
  ${(props) =>
    props.textAlign === "left"
      ? "text-align: left;"
      : props.textAlign === "right"
      ? "text-align: right;"
      : "text-align: center;"}
  overflow: hidden;
  border-radius: 4px;
  ${(props) => props.state && "padding: 1px 6px;color: white;"}
`;
