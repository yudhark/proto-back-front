import React from "react";
import Grid from "../../components/Grid";
import styled from "styled-components";
import { Column, Row } from "../../utils/styled.global";
import Widget from "../../components/Widget";
import LineChart from "../../components/charts/LineChart";
import InnerGrid from "../../components/InnerGrid";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Wrapper>
      <Column width={210}>
        <Grid header title="User Info" flexdir="column" gap={6}>
          <Row centerContent centerItem disp="flex">
            <ImageWrapper>
              <ImagerInnerWrapper>
                <ImageBox src="/assets/img/user_default_image.png" alt="user" />
              </ImagerInnerWrapper>
            </ImageWrapper>
          </Row>
          <Row flex flexDir="column" gap={2}>
            <Row centerContent centerItem disp="flex" mt={4}>
              <h5>User Login Name</h5>
            </Row>
            <Row centerContent centerItem disp="flex">
              <h5 style={{ fontStyle: "italic", fontWeight: "500" }}>User Login Role</h5>
            </Row>
          </Row>
        </Grid>
      </Column>
      <Column flex disp="flex" flexDir="column" gap={15}>
        <Row disp="flex" flexDir="row" gap={15} height={80} minHeight={80}>
          <Column flex>
            <Widget bgColor="#F8B195" title="SPPBJ" count={100} />
          </Column>
          <Column flex>
            <Widget bgColor="#F67280" title="Purchase Order" count={50} />
          </Column>
          <Column flex>
            <Widget bgColor="#C06C84" title="Good Received" count={10} />
          </Column>
          <Column flex>
            <Widget bgColor="#6C5B7B" title="Material Used" />
          </Column>
          <Column flex>
            <Widget bgColor="#355C7D" title="Internal Transfer" />
          </Column>
          <Column flex>
            <Widget bgColor="#EDDCD2" title="Stock Transfer" />
          </Column>
        </Row>
        <Row flex disp="flex" flexDir="row" gap={10}>
          <Row flex>
            <Grid title="Kurs" header>
              <Column flex disp="flex" flexDir="column">
                <Row></Row>
                <Row flex><LineChart/></Row>
              </Column>
            </Grid>
          </Row>
          <Row width={280}>
            <Grid header title="Recent Activities" footer footerComponent={<h5 style={{textAlign: "right", flex: 1}}>more...</h5>}>
              <Column flex disp="flex" flexDir="column" gap={5} overflow="hidden">
                <InnerGrid mode="SPPBJ" id="SPPBJ/06-00167" state="Confirmed"/>
                <InnerGrid mode="SPPBJ" id="SPPBJ/06-00168" state="Draft"/>
                <InnerGrid mode="Purchase Order" id="PO/06-00010" state="Draft"/>
                <InnerGrid mode="SPPBJ" id="SPPBJ/06-00167" state="Confirmed"/>
                <InnerGrid mode="SPPBJ" id="SPPBJ/06-00168" state="Draft"/>
                <InnerGrid mode="Purchase Order" id="PO/06-00010" state="Draft"/>
              </Column>
            </Grid>
          </Row>
        </Row>
      </Column>
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const ImageWrapper = styled.div`
  margin-top: 10px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background: #ddd;
  padding: 4px;
`;

const ImagerInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;
const ImageBox = styled.img`
  width: 100%;
  height: 100%;
`;
