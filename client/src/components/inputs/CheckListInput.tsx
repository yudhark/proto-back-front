import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaEraser } from "react-icons/fa";

type DataType = {
  id: any;
  desc: string;
  checked: boolean;
};
interface CheckListInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
  options?: Array<DataType>;
  CustomHandler?: (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>, data: Array<DataType>) => void;
}

interface CheckItemProps {
  data: DataType;
  index: number;
  CustomHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckItem: React.FC<CheckItemProps> = ({ data, CustomHandler, index }) => {
  return (
    <ContentRow id={data.id.toString()} key={index} title="Chcek To Add">
      <OptionColumn>
        <CheckBox id={data.id} onChange={CustomHandler} />
      </OptionColumn>
      <OptionColumn flex>
        <TextSpan>{data.desc}</TextSpan>
      </OptionColumn>
    </ContentRow>
  );
};

const CheckListInput: React.FC<CheckListInputProps> = ({ width, label, options, CustomHandler, ...rest }) => {
  const [columnRect, setColumnRect] = useState<{ width: number; top: number; left: number }>({ width: 0, top: 0, left: 0 });
  const ColumnReff = useRef<HTMLDivElement>(null);
  const PopUpReff = useRef<HTMLDivElement>(null);
  const [popUpEnable, setPopUpEnable] = useState<boolean>(false);

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

  const [initOptions, setInitOptions] = useState<Array<DataType>>([]);

  useEffect(() => {
    if (options) {
      setInitOptions(options);
    }
  }, [options]);

  const [viewChecked, setViewChecked] = useState<string>("");

  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.currentTarget.id;
    let index = initOptions.findIndex((item) => {
      if (typeof item.id === "number") return item.id === Number(key);
      else if (typeof item.id === "string") return item.id === key;
      else return -1;
    });
    initOptions[index].checked = e.currentTarget.checked;
    setInitOptions(initOptions);
    setViewChecked(
      initOptions
        .filter((item) => item.checked === true)
        .map((item) => item.desc)
        .join("/")
    );
    CustomHandler && CustomHandler(e, initOptions);
  };

  const ResetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    let newOpt: Array<DataType> = [];
    initOptions.forEach((item) => {
      newOpt.push({ id: item.id, desc: item.desc, checked: false });
    });
    setViewChecked(
      newOpt
        .filter((item) => item.checked === true)
        .map((item) => item.desc)
        .join("/")
    );
    setInitOptions(newOpt);
    CustomHandler && CustomHandler(e, []);
  };

  return (
    <Wrapper width={width} active={popUpEnable}>
      <Column>
        <label htmlFor={rest.name}>{label}</label>
      </Column>
      <Column flex ref={ColumnReff} gap={4}>
        <input type="hidden" name="localId" />
        <Input type="text" readOnly onFocus={PopUpHandler} defaultValue={viewChecked} />
        {!rest.readOnly && popUpEnable && (
          <PopUpWrapper width={columnRect.width} top={columnRect.top} left={columnRect.left} ref={PopUpReff}>
            <InnerWrapper>
              <HeaderPopUp>
                <Input type="text" placeholder="keyword" />
              </HeaderPopUp>
              <BodyPopUp>
                {initOptions && initOptions.map((item, index) => <CheckItem key={index} index={index} data={item} CustomHandler={ChangeHandler} />)}
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
export default CheckListInput;

const dropdown = keyframes`
0% {
  transform: scaleY(0);
} 100% {
  transform: scaleY(1);
}`;

const Wrapper = styled.div<{ width?: number; active?: boolean }>`
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 3px 5px;
  border-radius: 4px;
  ${(props) => (props.active ? "border: 1px solid #29b6f66b; box-shadow: 1px 1px 10px 1px #29b6f63b;" : "border: 1px solid rgba(4, 9, 20, 0.2);")}
  justify-content: center;
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
  border-radius: 2px;
  padding: 2px 5px;
  outline: none;
  border: none;
  font-size: 0.7rem;
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
  border-radius: 2px;
  list-style: none;
  margin-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  padding-inline-start: 0;
  > * {
    &:first-child {
      margin-top: 4px !important;
    }
    &:last-child {
      margin-bottom: 4px !important;
    }
  }
`;

const ContentRow = styled.li`
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 6px;
  margin-left: 6px;
  padding: 4px;
  width: calc(100% - 12px - 8px);
  background: #fff;
  box-shadow: 1px 1px 1px 0 #3838384b;
  overflow-x: hidden;
  border: none;
  outline: none;
  font-size: 0.68rem;
  text-align: left;
  cursor: default;
  display: flex;
  gap: 6px;
  flex-direction: row;
  &:hover {
    background: #29b6f6;
    cursor: pointer;
    color: white;
  }
`;

const OptionColumn = styled.div<{ flex?: boolean; centerized?: boolean }>`
  ${(props) => (props.flex ? "flex: 1;" : "")}
  ${(props) => (props.centerized ? "justify-content: center; align-items: center;" : "")}
  overflow-x: hidden;
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  border: none;
  outline: none;
  margin: 2px;
  &:hover {
    cursor: pointer;
  }
`;

const TextSpan = styled.span`
  width: 100%;
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
