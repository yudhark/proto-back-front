import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaEraser } from "react-icons/fa";

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
  const [columnRect, setColumnRect] = useState<{ width: number; top: number; left: number }>({ width: 0, top: 0, left: 0 });
  const ColumnReff = useRef<HTMLDivElement>(null);
  const PopUpReff = useRef<HTMLDivElement>(null);
  const [popUpEnable, setPopUpEnable] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<OptionsType>({ id: 0, desc: "" });

  useEffect(() => {
    if (ColumnReff.current) {
      let rect = ColumnReff.current.getBoundingClientRect();
      setColumnRect({ width: rect.width, top: rect.bottom, left: rect.left });
    }
  }, []);

  const PopUpHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setPopUpEnable(true);
  };

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

  const LocalDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (rest.onDoubleClick) {
      rest.name && (e.currentTarget.name = rest.name);
      rest.onDoubleClick(e);
    }
    setLocalValue({ id: e.currentTarget.id, desc: e.currentTarget.value });
    setPopUpEnable(false);
  };

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
          <PopUpWrapper width={columnRect.width} top={columnRect.top} left={columnRect.left} ref={PopUpReff}>
            <InnerWrapper>
              <HeaderPopUp>
                <Input type="text" placeholder="keyword" />
              </HeaderPopUp>
              <BodyPopUp>
                {options &&
                  options.map((item, index) => (
                    <ContentRow
                      type="button"
                      key={index}
                      id={item.id.toString()}
                      onDoubleClick={LocalDoubleClick}
                      defaultValue={item.desc}
                      title="Double Click To Choose"
                    />
                  ))}
              </BodyPopUp>
            </InnerWrapper>
          </PopUpWrapper>
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

const dropdown = keyframes`
0% {
  transform: scaleY(0);
} 100% {
  transform: scaleY(1);
}`;

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

const PopUpWrapper = styled.div<{ left?: number; top?: number; width?: number }>`
  ${(props) => props.left && "left: " + props.left + "px;"}
  ${(props) => props.top && "top: " + props.top + "px;"}
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  margin-top: 6px;
  position: fixed;
  z-index: 20;
  display: flex;
`;

const InnerWrapper = styled.div`
  flex: 1 0 auto;
  width: calc(100% - 12px);
  max-height: 200px;
  background: #fff;
  // box-shadow: 0 0.86875rem 2.1875rem rgb(4 9 20 / 3%), 0 1.2375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%),
    0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  border-radius: 4px;
  position: relative;
  // border: 1px solid rgba(4, 9, 20, 0.1);
  border: 1px solid #29b6f64b; 
  box-shadow: 1px 1px 20px 1px #29b6f63b;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
  overflow: hidden;
  transform-origin: center top;
  animation: ${dropdown} 0.1s;
`;

const HeaderPopUp = styled.div`
  display: flex;
  font-size: 0.72rem;
  position: relative;
`;

const BodyPopUp = styled.ul`
  flex: 1;
  overflow-y: auto;
  position: relative;
  box-shadow: inset 1px 1px 1px 0 #3838384b;
  background: #ddd;
  padding-top: 4px;
  padding-bottom: 4px;
  list-style: none;
  margin-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  padding-inline-start: 0;
`;

const ContentRow = styled.input`
  margin: 3px 5px;
  padding: 4px;
  width: calc(100% - 10px);
  background: #fff;
  box-shadow: 1px 1px 1px 0 #3838384b;
  overflow-x: hidden;
  border: none;
  outline: none;
  font-size: 0.68rem;
  text-align: left;
  cursor: default;
  font-weigth: bold;
  &:hover {
    color: white;
    background: #29b6f6;
    cursor: pointer;
  }
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
