import React, { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import NavBar from "../components/NavBar";
import { NavContext } from "../utils/context.global";
import { Wrapper } from "../utils/styled.global";
import SwitchPages from "./SwitchPages";

interface HomeProps {}

const Dashboard: React.FC<HomeProps> = () => {
  const {url, seturl} = useContext(NavContext);
  const NavHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(seturl) seturl(e.currentTarget.value)
  }
  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  useEffect(() => {
    setNavbarHeight(44)
  },[])
  return (
    <Wrapper>
      <NavBar navHandler={NavHandler} height={navbarHeight}/>
      <Container navbarHeight={navbarHeight}>
        <SwitchPages url={url ? url : "home"}/>
      </Container>
    </Wrapper>
  );
};
export default Dashboard;
