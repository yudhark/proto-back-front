import styled from "styled-components";

type CustomProps = {
  width?: number | string;
  height?: number | string;
  disp?: "inline-block" | "inline" | "flex" | "inline-flex" | "grid" | "none" | "inline-grid" | "block";
  position?: "relative" | "absolute" | "fixed" | "static" | "sticky";
  flexDir?: "row" | "column";
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  bgColor?: string;
  gap?: number;
  centerContent?: boolean;
  centerItem?: boolean;
  flex?: boolean;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  customShadow?: string;
  borderRadius?: string;
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
};

const DefaultDiv = styled.div<CustomProps>`
  ${(props) => props.disp && "display: " + props.disp + ";"}
  ${(props) => props.position && "position: " + props.position + ";"}
  ${(props) =>
    typeof props.width === "number"
      ? "width: " + props.width + "px;"
      : typeof props.width === "string" && "width: " + props.width + ";"}
  ${(props) =>
    typeof props.height === "number"
      ? "height: " + props.height + "px;"
      : typeof props.height === "string" && "height: " + props.height + ";"}
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.flexDir && "flex-direction: " + props.flexDir + ";"}
  ${(props) => props.bgColor && "background-color: " + props.bgColor + ";"}
  ${(props) => props.mt && "margin-top: " + props.mt + "px;"}
  ${(props) => props.mb && "margin-bottom: " + props.mb + "px;"}
  ${(props) => props.ml && "margin-left: " + props.ml + "px;"}
  ${(props) => props.mr && "margin-right: " + props.mr + "px;"}
  ${(props) => props.pt && "padding-top: " + props.pt + "px;"}
  ${(props) => props.pb && "padding-bottom: " + props.pb + "px;"}
  ${(props) => props.pl && "padding-left: " + props.pl + "px;"}
  ${(props) => props.pr && "padding-right: " + props.pr + "px;"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  ${(props) => props.centerContent && "justify-content: center;"}
  ${(props) => props.centerItem && "align-items: center;"}
  ${(props) => props.overflow && "overflow: " + props.overflow + ";"}
  ${(props) => props.customShadow && "box-shadow: " + props.customShadow + ";"}
  ${(props) => props.borderRadius && "border-radius: " + props.borderRadius + ";"}
  ${(props) => props.minWidth && "min-width: " + props.minWidth + "px;"}
  ${(props) => props.minHeight && "min-height: " + props.minHeight + "px;"}
  ${(props) => props.maxWidth && "max-width: " + props.maxWidth + "px;"}
  ${(props) => props.maxHeight && "max-height: " + props.maxHeight + "px;"}
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e9e9ea;
`;

export const Devider = styled.div<{ pos?: "top" | "bottom"; width?: string }>`
  ${props => props.width && "width: "+props.width+";"}
  ${(props) =>
    props.pos === "top"
      ? "border-bottom: 1px solid rgba(26, 54, 126, 0.2);"
      : "border-top: 1px solid rgba(26, 54, 126, 0.2);"}
`;

export const Column = styled(DefaultDiv)``;
export const Row = styled(DefaultDiv)``;
