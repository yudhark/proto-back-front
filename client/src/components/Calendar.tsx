import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import moment, { Moment } from "moment";

interface CalendarProps {
  width?: number;
}

const weekDays: Array<string> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Calendar: React.FC<CalendarProps> = ({ width }) => {
  const formatDate: string = "MMMM YYYY, DD";
  // eslint-disable-next-line
  const [choosedDay, setChoosedDay] = useState<Moment>(moment());
  return (
    <Wrapper width={width}>
      <InnerWrapper>
        <HeaderCal>
          <StepBox></StepBox>
          <TitleBox>
            <h3>{choosedDay.format(formatDate)}</h3>
          </TitleBox>
          <StepBox></StepBox>
        </HeaderCal>
        <BodyCal>
          <WeekDaysRow>
            {weekDays.map((day, key) => (
              <WeekDayColumn key={key}><h4>{day}</h4></WeekDayColumn>
            ))}
          </WeekDaysRow>
        </BodyCal>
        <FooterCal></FooterCal>
      </InnerWrapper>
    </Wrapper>
  );
};
export default Calendar;

const dropdown = keyframes`
0% {
  transform: scaleY(0);
} 100% {
  transform: scaleY(1);
}`;
const Wrapper = styled.div<{ width?: number }>`
  ${(props) => props.width && "width: calc(" + props.width + "px + 40px);"}
  background: white;
  height: 220px;
  border: 1px solid rgba(26, 54, 126, 0.125);
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%),
    0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  border-radius: 8px;
  transition: ${dropdown} 0.2s ease-in;
`;

const InnerWrapper = styled.div`
  margin: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
`;

const HeaderCal = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
`;
const TitleBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StepBox = styled.div``;

const BodyCal = styled.div`
  flex: 1;
  background: orange;
`;
const FooterCal = styled.div``;

const WeekDaysRow = styled.div`
  display: flex;
  flex-direction: row;
  background: #ddd;
`;
const WeekDayColumn = styled.div`
  display: inline-block;
  width: 40px;
  flex: 0 auto;
  padding: 6px 3px;
  text-align: center;
`;
