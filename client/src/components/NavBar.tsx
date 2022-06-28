import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaHome, FaBell, FaUserAlt, FaBars, FaBox, FaChevronDown, FaColumns, FaAddressBook } from "react-icons/fa";

interface NavBarProps {
  navHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  height?: number;
}

const Icons: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "home":
      return (
        <NavMenuIcon>
          <FaHome />
        </NavMenuIcon>
      );
    case "bars":
      return (
        <NavMenuIcon>
          <FaBars />
        </NavMenuIcon>
      );
    case "box":
      return (
        <NavMenuIcon>
          <FaBox />
        </NavMenuIcon>
      );
    case "column":
      return (
        <NavMenuIcon>
          <FaColumns />
        </NavMenuIcon>
      );
    case "book":
      return (
        <NavMenuIcon>
          <FaAddressBook />
        </NavMenuIcon>
      );
    default:
      return null;
  }
};

type MenuWrapperType = {
  id: string;
  desc: string;
  icon?: string;
  havechild?: boolean;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const MenuWrapper: React.FC<MenuWrapperType> = ({ id, desc, icon, havechild, onClickHandler }) => {
  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickHandler && onClickHandler(e);
  };
  return (
    <NavMenuLi>
      <NavMenuButton name={id} onClick={buttonHandler} value={id}>
        {icon && <Icons icon={icon} />}
        <NavMenuText>{desc}</NavMenuText>
        {havechild && (
          <NavMenuExpand>
            <FaChevronDown />
          </NavMenuExpand>
        )}
      </NavMenuButton>
    </NavMenuLi>
  );
};

const NavBar: React.FC<NavBarProps> = ({ navHandler, height }) => {
  const [showMainMenu, setShowMainMenu] = useState<boolean>(false);
  const MainMenuRef = useRef<HTMLDivElement>(null);
  const ShowMenuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowMainMenu(!showMainMenu);
  };

  useEffect(() => {
    const closepopupmainmenu = (e: any) => {
      if (MainMenuRef.current && !MainMenuRef.current.contains(e.target)) {
        setShowMainMenu(false);
      }
    };
    document.addEventListener("mousedown", closepopupmainmenu);
    return () => {
      document.removeEventListener("mousedown", closepopupmainmenu);
    };
  });

  return (
    <Wrapper height={height}>
      <AppHeader>
        <MainNavbarLeft>
          <MainMenuTitleContainer>
            <CompanyLogoBox></CompanyLogoBox>
            <CompanyTextBox>
              <TextH5>PT. Your Company Name</TextH5>
            </CompanyTextBox>
            <ShowMenuButtonBox>
              <ShowMenuButton onClick={ShowMenuHandler}>
                <FaBars fontSize={16} />
              </ShowMenuButton>
            </ShowMenuButtonBox>
          </MainMenuTitleContainer>
          {showMainMenu && (
            <MainMenuPopUpContainer ref={MainMenuRef}>
              <WrapperMainMenu>
                <InnerWrapperMainMenu>
                  <VerticalNavMenuUl>
                    <MenuWrapper desc="Home" icon="home" id="home" onClickHandler={navHandler} />
                    <MenuWrapper desc="Layout" icon="box" id="layout" onClickHandler={navHandler} />
                    <MenuWrapper desc="Tabel" icon="column" id="tableview" onClickHandler={navHandler} />
                    <MenuWrapper desc="Documentation" icon="book" id="documentation" onClickHandler={navHandler} />
                  </VerticalNavMenuUl>
                </InnerWrapperMainMenu>
              </WrapperMainMenu>
            </MainMenuPopUpContainer>
          )}
        </MainNavbarLeft>
        <Divider noMarginLeft />
        <RightButtonGroup>
          <CenterButtonGroup></CenterButtonGroup>
          <FixedRightButtonGroup>
            <NavigationGroup>
              <ButtonGroup>
                <DefaultButton title="Notification">
                  <ButtonIcon>
                    <FaBell fontSize={16} />
                  </ButtonIcon>
                </DefaultButton>
              </ButtonGroup>
              <ButtonGroup>
                <DefaultButton title="Home">
                  <ButtonIcon>
                    <FaHome fontSize={16} />
                  </ButtonIcon>
                </DefaultButton>
              </ButtonGroup>
            </NavigationGroup>
            <Divider />
            <UserInfoGroup>
              <ButtonGroup>
                <DefaultButton>
                  <ButtonIcon>
                    <FaUserAlt fontSize={16} />
                  </ButtonIcon>
                </DefaultButton>
              </ButtonGroup>
              <UserDescBox>
                <Text tebal>User Login Name</Text>
                <Text>User Login Role</Text>
              </UserDescBox>
            </UserInfoGroup>
          </FixedRightButtonGroup>
        </RightButtonGroup>
      </AppHeader>
    </Wrapper>
  );
};
export default NavBar;

const dropleft = keyframes`
0% {
  transform: scaleX(0);
} 100% {
  transform: scaleX(1);
}`;

const WrapperSizing = styled.div<{ height?: number }>`
  ${(props) => props.height && "height: " + props.height + "px;"}
  display: flex;
  align-items: center;
  align-content: center;
  z-index: 10;
  transition: all 0.2s;
  width: 100%;
`;

const Wrapper = styled(WrapperSizing)`
  background: #fafbfc;
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
    0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
`;

const AppHeader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: row;
  transition: all 0.2s;
`;

const MainNavbarLeft = styled.div`
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const RightButtonGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  float: right;
  height: 100%;
`;

const CenterButtonGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const FixedRightButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  gap: 5px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const NavigationGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
  gap: 6px;
  position: relative;
`;

const ButtonGroup = styled.div`
  height: 34px;
  width: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInfoGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 6px;
  position: relative;
`;

const DefaultButton = styled.div`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background: #ddd;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  box-shadow: inset 1px 1px 2px 1px #c1c1c1;
  &:hover {
    background: #c6c6c6;
  }
`;

const ButtonIcon = styled.div`
  position: relative;
  height: 70%;
  width: 70%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafbfc;
  box-shadow: 1px 1px 2px 1px #c1c1c1;
`;

const Divider = styled.div<{ noMarginLeft?: boolean }>`
  height: 70%;
  ${(props) => !props.noMarginLeft && "margin-left: 5px;"}
  margin-right: 5px;
  border-left: 1px solid #ddd;
`;

const UserDescBox = styled.div`
  height: 100%;
  max-width: 110px;
  display: flex;
  flex-direction: column;
`;

const Text = styled.span<{ tebal?: boolean }>`
  ${(props) => props.tebal && "font-weight: bold;"}
  font-size: .7rem;
  align-items: center;
  flex: 1;
`;

const MainMenuTitleContainer = styled.div`
  width: 100%;
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
  display: flex;
  flex-direction: row;
`;

const MainMenuPopUpContainer = styled.div`
  border-top: 1px solid rgba(4, 9, 20, 0.05);
  height: calc(100vh - 45px);
  width: 100%;
  position: absolute;
  display: flex;
  left: 0;
  top: 100%;
  background: #fafbfc;
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
    0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
  z-index: 1;
  transform-origin: center left;
  animation: ${dropleft} 0.2s;
`;

const CompanyLogoBox = styled.div`
  margin-left: 5px;
`;
const CompanyTextBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ShowMenuButtonBox = styled.div`
  margin-right: 5px;
  align-items: center;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const TextH5 = styled.h5`
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0.74rem;
  font-weight: 400;
`;

const ShowMenuButton = styled.button`
  background: none;
  color: #474747;
  ouline: none;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  &:hover {
    color: #757575;
  }
`;

const WrapperMainMenu = styled.div`
  flex: 1;
  margin: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const InnerWrapperMainMenu = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const VerticalNavMenuUl = styled.ul`
  margin: 0;
  padding: 0;
  position: relative;
  list-style: none;
`;

const NavMenuLi = styled.li`
  margin-left: 5px;
  display: flex;
`;
const NavMenuButton = styled.button`
flex: 1;
display: flex;
gap: .5rem;
align-items: center;
line-height: 1.5rem;
height: 1.5rem
position: relative;
color: #343a40;
white-space: nowrap;
transition: all .2s;
background: none;
border: none;
outline: none;
cursor: pointer;
&:hover{
  background: #e0f3ff;
  // background: #c6c6c6;
}
`;
const NavMenuIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 2px;
  color: #343a40;
`;
const NavMenuText = styled.span`
  display: flex;
  flex: 1;
  text-align: left;
  align-items: center;
  color: #343a40;
`;
const NavMenuExpand = styled.span`
  display: flex;
  margin-right: 2px;
  color: #343a40;
`;
