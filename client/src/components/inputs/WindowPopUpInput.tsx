import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaEraser } from "react-icons/fa";
import WindowPopUp from "../WindowPopUp";
import ReadOnlyTable from "../tables/ReadOnlyTable";

type OptionsType = {
  id: any;
  desc: string;
};
interface DropdownInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
  options?: Array<OptionsType>;
}

const DropdownInput: React.FC<DropdownInputProps> = ({ width, label, options, ...rest }) => {
  const ColumnReff = useRef<HTMLDivElement>(null);
  const PopUpReff = useRef<HTMLDivElement>(null);
  const [popUpEnable, setPopUpEnable] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<OptionsType>({ id: 0, desc: "" });

  const PopUpHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setPopUpEnable(true);
  };

  const ClosePopUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPopUpEnable(false)
  }

  useEffect(() => {
    const closePopUp = (e: any) => {
      if (PopUpReff.current && !PopUpReff.current.contains(e.target)) {
        setPopUpEnable(false);
      }
    };

    document.addEventListener("mousedown", closePopUp);
    return () => {
      document.removeEventListener("mousedown", closePopUp);
    };
  }, []);

  const ResetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLocalValue({ id: "", desc: "" });
  };
  return (
    <Wrapper width={width} active={popUpEnable}>
      <Column>
        <label htmlFor={rest.name}>{label}</label>
      </Column>
      <Column flex ref={ColumnReff} gap={4}>
        <input type="hidden" name="localId" value={localValue.id} />
        <Input type="text" readOnly onFocus={PopUpHandler} value={localValue.desc} title={localValue.desc} />
        {!rest.readOnly && popUpEnable && (
          <WindowPopUp width={400} height={200} reference={PopUpReff} title="Please Select" CloseWindow={ClosePopUp}><ReadOnlyTable /></WindowPopUp>
        )}
        {!rest.readOnly && (
          <Column centerized>
            <ResetButton title="reset" onClick={ResetHandler}>
              <FaEraser />
            </ResetButton>
          </Column>
        )}
      </Column>
    </Wrapper>
  );
};
export default DropdownInput;

const Wrapper = styled.div<{ width?: number; active?: boolean }>`
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  ${(props) => (props.active ? "border: 1px solid #29b6f66b; box-shadow: 1px 1px 10px 1px #29b6f63b;" : "border: 1px solid rgba(4, 9, 20, 0.2);")}
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 3px 5px;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
`;

const Column = styled.div<{ flex?: boolean; centerized?: boolean; gap?: number }>`
  ${(props) => props.flex && "flex: 1;"}
  display: flex;
  font-size: 0.72rem;
  position: relative;
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  ${(props) => props.centerized && "justify-content: center; align-items: center;"}
`;

const Input = styled.input`
  width: calc(100% - 4px);
  box-shadow: inset 1px 1px 1px 0 #3838384b;
  background: #e3e3e3;
  padding: 2px 5px;
  outline: none;
  border: none;
  font-size: 0.7rem;
  border-radius: 2px;
  overflow: hidden;
`;

const ResetButton = styled.button`
  border: none;
  outline: none;
  font-size: 0.68rem;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  &:hover {
    background: #b8b8b8;
    cursor: pointer;
  }
`;
