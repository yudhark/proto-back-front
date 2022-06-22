import React from "react";
import styled from "styled-components";
import { FaEnvelopeOpenText } from "react-icons/fa";

interface InnerGridProps {
  mode?: string;
  id?: string;
  state?: string;
}

const InnerGrid: React.FC<InnerGridProps> = ({ mode, id, state }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <InnerBox>
          <IconsBox>
            <FaEnvelopeOpenText fontSize={24} />
          </IconsBox>
        </InnerBox>
        <InnerBox flex>
          <h5>{mode}</h5>
          <TextBox>
            {id && (
              <>
                <h6 style={{ fontSize: "0.7rem", fontWeight: "normal" }}>{id}</h6>
                <h6 style={{ fontSize: "0.7rem", fontWeight: "normal" }}> - </h6>
                <h6 style={{ fontSize: "0.7rem", fontWeight: "bold", fontStyle: "italic" }}>{state}</h6>
              </>
            )}
          </TextBox>
        </InnerBox>
        <InnerBox></InnerBox>
      </InnerWrapper>
    </Wrapper>
  );
};
export default InnerGrid;

const Wrapper = styled.div`
  width: 100%;
  height: calc((100% - (1px * 7)) / 7);
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #e0f3ff;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 10px;
  padding-left: 10px;
  gap: 6px;
`;

const InnerBox = styled.div<{ flex?: boolean }>`
  ${(props) => props.flex && "flex: 1;"}
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const IconsBox = styled.span`
  color: #787878;
`;

const TextBox = styled.span`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
