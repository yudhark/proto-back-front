import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

type DataType = {
  id: any;
  desc: string;
};

interface InlineCheckInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  label?: string;
  options?: Array<DataType>;
  customValue?: Array<any>;
  CustomHandler?: (e: React.ChangeEvent<HTMLInputElement>, data: Array<DataType>) => void;
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
    <ContentRow id={item.id.toString()} title="Check This!">
      <CheckBox id={item.desc} value={item.id} name={item.desc} checked={isChecked} onChange={changeHandler} />
      <label htmlFor={item.id} style={{ paddingRight: 5, cursor: "pointer" }}>
        {item.desc}
      </label>
    </ContentRow>
  );
};

const InlineCheckInput: React.FC<InlineCheckInputProps> = ({ width, label, options, customValue, CustomHandler, ...rest }) => {
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const LocalFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setOnFocus(true);
  };
  const LocalBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setOnFocus(false);
  };

  // begin of data manipulation
  const [initOptions, setInitOptions] = useState<Array<DataType>>([]);
  const [selected, setSelected] = useState<Array<DataType>>([]);

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
    if (options) setInitOptions(options);
  }, [options]);

  useEffect(() => {
    let newValue: Array<DataType> = [];
    newValue = dispatchArray();
    setSelected(newValue);
  }, [dispatchArray]);

  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name, checked } = e.currentTarget;
    let tempArr = selected;
    if (checked === true && options) {
      if (tempArr.length === 0 && options.length > 0) {
        if (typeof options[0].id === "number") tempArr.push({ id: Number(value), desc: name });
        else tempArr.push({ id: value, desc: name });
      } else {
        if (tempArr.map((item) => item.id.toString()).includes(value) === false) {
          if (typeof options[0].id === "number") tempArr.push({ id: Number(value), desc: name });
          else tempArr.push({ id: value, desc: name });
        }
      }
    }
    console.log(tempArr)
    setSelected(tempArr);
    if (rest.name) e.currentTarget.name = rest.name;
    CustomHandler && CustomHandler(e, tempArr);
  };
  return (
    <Wrapper width={width} active={onFocus} onFocus={LocalFocusHandler} onBlur={LocalBlurHandler}>
      <Column>{label && <label htmlFor={rest.name}>{label}</label>}</Column>
      <Column flex flexDir="row" gap={6}>
        {initOptions.length > 0 &&
          initOptions.map((item, index) => (
            <CheckItem
              key={index}
              item={item}
              index={index}
              CustomHandler={ChangeHandler}
              value={selected.map((val) => val.id).includes(item.id) ? true : false}
            />
          ))}
      </Column>
    </Wrapper>
  );
};
export default InlineCheckInput;

const Wrapper = styled.div<{ width?: number; active?: boolean }>`
  ${(props) => (props.width ? "width: " + props.width + "px;" : "flex: 1;")}
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  padding: 2px 5px;
  ${(props) => (props.active ? "border: 1px solid #29b6f66b; box-shadow: 1px 1px 10px 1px #29b6f63b;" : "border: 1px solid rgba(4, 9, 20, 0.2);")}
  justify-content: center;
  align-items: center;
`;

const Column = styled.div<{ flex?: boolean; flexDir?: "column" | "row"; gap?: number }>`
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.flexDir && "flex-direction: " + props.flexDir + ";"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  display: flex;
  font-size: 0.72rem;
`;

const ContentRow = styled.li`
  overflow-x: hidden;
  border: none;
  outline: none;
  font-size: 0.68rem;
  text-align: left;
  cursor: default;
  display: flex;
  gap: 6px;
  flex-direction: row;
  align-items: center;
  &:hover {
    background: #29b6f6;
    cursor: pointer;
    color: white;
  }
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  border: none;
  outline: none;
  margin: 2px;
  &:hover {
    cursor: pointer;
  }
`;
