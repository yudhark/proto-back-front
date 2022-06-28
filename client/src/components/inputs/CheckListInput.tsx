import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaEraser, FaCheck } from "react-icons/fa";

type DataType = {
  id: any;
  desc: string;
};

interface CheckListInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
  options?: Array<DataType>;
  customValue?: Array<any>;
  CustomHandler?: (e: React.MouseEvent<HTMLButtonElement>, data: Array<DataType>) => void;
}

interface CheckItemProps {
  item: DataType;
  index: number;
  value?: boolean;
  CustomHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckItem: React.FC<CheckItemProps> = ({ item, CustomHandler, index, value: localValue }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.currentTarget.checked);
    CustomHandler && CustomHandler(e);
  };

  useEffect(() => {
    if (localValue) setIsChecked(localValue);
  }, [localValue]);

  return (
    <ContentRow id={item.id.toString()} title="Chcek To Add">
      <OptionColumn>
        <CheckBox id={item.desc} value={index} name={item.id} checked={isChecked} onChange={changeHandler} />
      </OptionColumn>
      <OptionColumn flex>
        <TextSpan>{item.desc}</TextSpan>
      </OptionColumn>
    </ContentRow>
  );
};

const CheckListInput: React.FC<CheckListInputProps> = ({ width, label, options, CustomHandler, customValue, ...rest }) => {
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
  // end of line view configuration

  // begin of data manipulation
  const [initOptions, setInitOptions] = useState<Array<DataType>>([]);
  const [selectedTemp, setSelectedTemp] = useState<Array<DataType>>([]);

  useEffect(() => {
    if (options) {
      setInitOptions(options);
    }
  }, [options]);

  const dispatchArray = useCallback(() => {
    let newValue: Array<DataType> = [];
    if (customValue && options) {
      customValue.forEach((item: any) => {
        let index = options.findIndex((opt) => {
          if (typeof opt.id === "number" && typeof item === "string") return opt.id === Number(item);
          else if (typeof opt.id === "string" && typeof item === "number") return opt.id === item.toString();
          else return opt.id === item;
        });
        if (index >= 0) newValue.push({ id: options[index].id, desc: options[index].desc });
      });
    }
    return newValue;
  }, [customValue, options]);

  useEffect(() => {
    let newValue: Array<DataType> = [];
    newValue = dispatchArray();
    setSelectedTemp(newValue);
    setSelected(newValue.map((item) => item.desc).join("/"));
  }, [dispatchArray]);

  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { id, name, checked } = e.currentTarget;
    let tempArr = selectedTemp;
    if (checked === true) {
      if (tempArr.map((item) => item.id).includes(id) === false) {
        tempArr.push({ id: id, desc: name });
      }
    } else {
      if (tempArr.map((item) => item.id).includes(id) === true) {
        let index = tempArr.findIndex((item) => {
          if (typeof item.id === "number") return item.id === Number(id);
          else return item.id === id;
        });
        tempArr.splice(index, 1);
      }
    }
    setSelectedTemp(tempArr);
  };

  const [selected, setSelected] = useState<string>();
  const SubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelected(selectedTemp.map((item) => item.desc).join("/"));
    CustomHandler && CustomHandler(e, selectedTemp);
    setPopUpEnable(false);
  };

  const ResetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let resetValue = [];
    if (customValue) {
      if (customValue.length > 0) {
        resetValue = dispatchArray();
        setSelectedTemp(resetValue);
        setSelected(resetValue.map((item) => item.desc).join("/"));
        CustomHandler && CustomHandler(e, resetValue);
      }
    } else {
      setSelectedTemp([]);
      setSelected("");
      CustomHandler && CustomHandler(e, []);
    }
  };

  return (
    <Wrapper width={width} active={popUpEnable}>
      <Column>
        <label htmlFor={rest.name}>{label}</label>
      </Column>
      <Column flex ref={ColumnReff} gap={4}>
        <input type="hidden" name="localId" />
        {rest.readOnly ? (
          <Input type="text" readOnly onFocus={PopUpHandler} defaultValue={customValue?.map(item=>item.desc).join("/")} />
        ) : (
          <Input type="text" readOnly onFocus={PopUpHandler} defaultValue={selected} />
        )}

        {!rest.readOnly && popUpEnable && (
          <PopUpWrapper width={columnRect.width} top={columnRect.top} left={columnRect.left} ref={PopUpReff}>
            <InnerWrapper>
              <HeaderPopUp>
                <Input type="text" placeholder="keyword" />
              </HeaderPopUp>
              <BodyPopUp>
                {initOptions &&
                  initOptions.map((item, index) => (
                    <CheckItem
                      key={index}
                      item={item}
                      index={index}
                      CustomHandler={ChangeHandler}
                      value={selectedTemp.map((val) => val.desc).includes(item.desc) ? true : false}
                    />
                  ))}
              </BodyPopUp>
              <Column gap={4} centerized>
                <ButtonSubmit name={rest.name} onClick={SubmitHandler}>
                  <FaCheck />
                </ButtonSubmit>
                <ButtonSubmit title="reset" onClick={ResetHandler}>
                  <FaEraser />
                </ButtonSubmit>
              </Column>
            </InnerWrapper>
          </PopUpWrapper>
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

const Column = styled.div<{ flex?: boolean; centerized?: boolean; gap?: number; flexDir?: "column" | "row" }>`
  ${(props) => props.flex && "flex: 1;"}
  display: flex;
  font-size: 0.72rem;
  position: relative;
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  ${(props) => props.centerized && "justify-content: center; align-items: center;"}
  ${(props) => props.flexDir && "flex-direction: " + props.flexDir + ";"}
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
  justify-content: center;
  align-items: center;
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

const ButtonSubmit = styled.button`
display: flex;
flex: 1;
justify-content: center;
align-items: center;
background: #ddd;
border: none;
ouline none;
padding: 2px 6px;
&:hover {
  cursor: pointer;
  color: white;
  background: #5e5e5e;
}
`;
