import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Grid from "../../components/Grid";
import TreeTimeLineLog from "../../components/TreeTimeLineLog";
import { Column, Row } from "../../utils/styled.global";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const contexwindowwidth = 450;
  const contexwindowheight = 220;
  const [titleState, setTitleState] = useState<string>("");
  const [contextMenu, setContextMenu] = useState<boolean>(false);
  const [verticalBased, setVerticalBased] = useState<"top" | "bottom">("top");
  const [horizaonlaBase, setHorizontalBased] = useState<{ based: "left" | "right"; position: number }>({
    based: "left",
    position: 0,
  });
  const ContextMenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let rect = e.currentTarget.getBoundingClientRect();
    if (e.type === "contextmenu") {
      if (window.innerHeight - e.clientY <= contexwindowheight + 30) setVerticalBased("bottom");
      else setVerticalBased("top");
      if (window.innerWidth - e.clientX <= contexwindowwidth + 10) {
        setHorizontalBased({ based: "right", position: rect.right - e.clientX + 10 });
      } else {
        setHorizontalBased({ based: "left", position: e.clientX - rect.left });
      }
      setContextMenu(true);
      setTitleState(e.currentTarget.id);
    }
  };

  const timelineReff = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closecontextmenu = (e: any) => {
      if (timelineReff.current && !timelineReff.current.contains(e.target)) {
        setContextMenu(false);
      }
    };
    document.addEventListener("mousedown", closecontextmenu);
    return () => {
      document.removeEventListener("mousedown", closecontextmenu);
    };
  });

  const DoubleClickHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("Double Click");
  };
  return (
    <Wrapper>
      <Column width={280}>
        <Grid title="Main Table" header />
      </Column>
      <Column flex disp="flex" flexDir="column" gap={10}>
        <Row height={150}>
          <Grid title="Your Form" header />
        </Row>
        {/* <Row flex><Grid title='Your Detail' header/></Row> */}
        <Row flex position="relative" disp="flex" flexDir="column" gap={10}>
          {/* <Row flex></Row> */}
          <Row
            onContextMenu={ContextMenuHandler}
            onDoubleClick={DoubleClickHandle}
            id="NO/2022/01"
            position="relative"
            disp="flex"
            flexDir="row"
            gap={20}
            height={50}
          >
            {contextMenu && (
              <ContextMenuWrapper
                ref={timelineReff}
                width={contexwindowwidth}
                height={contexwindowheight}
                verticalbased={verticalBased}
                horizontalbased={horizaonlaBase}
              >
                <TreeTimeLineLog title={titleState} />
              </ContextMenuWrapper>
            )}
            <Column flex>
              <Grid />
            </Column>
            <Column flex>
              <Grid />
            </Column>
            <Column flex>
              <Grid />
            </Column>
          </Row>
        </Row>
      </Column>
    </Wrapper>
  );
};
export default Layout;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ContextMenuWrapper = styled.div<{
  verticalbased?: "top" | "bottom";
  horizontalbased?: { based: "left" | "right"; position: number };
  width: number;
  height: number;
}>`
  position: absolute;
  ${(props) => props.width && "width: " + props.width + "px;"}
  ${(props) => props.height && "height: " + props.height + "px;"}
  ${(props) => (props.verticalbased === "bottom" ? "bottom: 50%;" : "top: 50%;")}
  ${(props) =>
    props.horizontalbased?.based === "right"
      ? "right: " + props.horizontalbased.position + "px;"
      : "left: " + props.horizontalbased?.position + "px;"}
`;
