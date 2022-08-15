import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MethodTheme } from "../../utils/context.global";
import { FaChevronDown, FaLock, FaLockOpen } from "react-icons/fa";
import { Column } from "../../utils/styled.global";
import { filteredData, groupedData } from "../../utils/helper.util";
import { CheckListInput, DefaultCheckInput, InlineCheckInput, RangeDateInput } from "../inputs";

interface RowType {
  item: any;
  headerStructure?: ILayout;
}

const SingleRowContainer: React.FC<RowType> = ({ item, headerStructure }) => {
  const [styleBox, setStyleBox] = useState<{ primary: string; secondary: string; name: string }>(MethodTheme[MethodTheme.length - 1]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  useEffect(() => {
    const setCustomData = (value: number) => {
      return MethodTheme[value];
    };
    setStyleBox(setCustomData(item.method));
  }, [item]);

  const collapseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowDetail(!showDetail);
  };
  if (headerStructure) {
    return (
      <RowBox id={item[headerStructure.idColumn]}>
        <InnerRowBox bgColor={styleBox.primary}>
          <Column bgColor={styleBox.secondary} disp="flex" centerContent centerItem pl={4} pr={4}>
            <TextBox>{item[headerStructure.frontBox]}</TextBox>
          </Column>
          <Column flex>
            <TextBox>{item[headerStructure.decsBox]}</TextBox>
          </Column>
          <Column style={{ marginRight: "10px" }}>{item[headerStructure.locBox] ? <FaLockOpen /> : <FaLock />}</Column>
          <Column disp="flex" centerContent centerItem mr={4}>
            <CollapseButton onClick={collapseHandler}>
              <FaChevronDown />
            </CollapseButton>
          </Column>
        </InnerRowBox>
        {showDetail && (
          <DetailBox>
            <InnerDetailBox>
              <Pre>{JSON.stringify(item, undefined, 2)}</Pre>
            </InnerDetailBox>
          </DetailBox>
        )}
      </RowBox>
    );
  } else {
    return <></>;
  }
};

interface ILayout {
  idColumn: string;
  frontBox: string;
  decsBox: string;
  locBox: string;
}

interface SingleRowProps {
  rows?: Array<any>;
  enableFilter?: boolean;
  optionsFilter?: Array<string>;
  headerLayout?: ILayout;
}

const SingleRow: React.FC<SingleRowProps> = ({ rows, enableFilter, headerLayout, optionsFilter }) => {
  const [localData, setLocalData] = useState<Array<any>>([]);
  const [filterForm, setFilterForm] = useState<any>({});
  const [textFilterHeader, setTextFilterHeader] = useState<Array<string>>([]);
  const [booleanFilterHeader, setBooleanFilterHeader] = useState<Array<string>>([]);
  // eslint-disable-next-line
  const [dateFilterHeader, setDateFilterHeader] = useState<Array<string>>([]);
  // eslint-disable-next-line
  const [optionsFilterHeader, setOptionsFilterHeader] = useState<Array<{ name?: string; value?: Array<string> }>>([]);

  useEffect(() => {
    if (rows) {
      setLocalData(rows);
    }
  }, [rows]);

  useEffect(() => {
    if (rows) {
      if (rows.length > 0) {
        let firstRow: any = rows[0];
        let rowsObject: Array<string> = Object.keys(firstRow);
        let _idIndex = rowsObject.indexOf("_id");
        rowsObject.splice(_idIndex, 1);
        let _vIndex = rowsObject.indexOf("__v");
        rowsObject.splice(_vIndex, 1);

        let textFilter: Array<string> = [];
        let booleanFilter: Array<string> = [];
        let dateFilter: Array<string> = [];

        rowsObject.forEach((item: string) => {
          if (typeof firstRow[item] === "number") {
            textFilter.push(item);
          } else if (typeof firstRow[item] === "boolean") {
            booleanFilter.push(item);
          } else if (typeof firstRow[item] === "string") {
            if (isNaN(Date.parse(firstRow[item])) === true) textFilter.push(item);
            else dateFilter.push(item);
          }
        });
        setTextFilterHeader(textFilter);
        setBooleanFilterHeader(booleanFilter);
        setDateFilterHeader(dateFilter);
      }
    }
  }, [rows]);

  const TextFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const BooleanFilterHandler = (e: React.MouseEvent<HTMLButtonElement>, data: Array<any>) => {
    let rawData: Array<boolean> = [];
    data.forEach((item) => {
      if (item.id === "TRUE") rawData.push(true);
      else rawData.push(false);
    });
    setFilterForm({ ...filterForm, [e.currentTarget.name]: { data, rawData } });
  };

  const OptionsFilterHandler = (e: React.MouseEvent<HTMLButtonElement>, data: Array<any>) => {
    setFilterForm({ ...filterForm, [e.currentTarget.name]: data });
  };

  useEffect(() => {
    if (optionsFilter && rows) {
      let optionsList: Array<{ name?: string; value?: Array<string> }> = [];
      if (optionsFilter.length > 0 && rows.length > 0) {
        optionsFilter.forEach((value) => {
          let groupedValue = groupedData(rows, value);
          let keys = Object.keys(groupedValue);
          optionsList.push({ name: value, value: keys });
        });
      }
      setOptionsFilterHeader(optionsList);
    }
  }, [optionsFilter, rows]);

  // eslint-disable-next-line
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const FilterAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let { value } = e.currentTarget;
    if (value === "submit") {
      console.log(filterForm);
    } else {
      setFilterForm({});
    }
  };
  return (
    <Wrapper>
      {enableFilter && (
        <ToolbarWrapper>
          <MenuWrapper width={200} disp="flex">
            <FilterText type="text" placeholder="keyword" onChange={TextFilterHandler} />
          </MenuWrapper>
          <MenuWrapper disp="inline-flex" gap={8}>
            {optionsFilterHeader.length > 0 && (
              <MenuWrapper disp="flex" flexDir="row" gap={8}>
                {optionsFilterHeader.map((item, index) => (
                  <CheckListInput
                    key={index}
                    label={item.name ? (item.name.charAt(0).toUpperCase() + item.name.slice(1)).match(/[A-Z][a-z]+/g)?.join(" ") : ""}
                    name={item.name}
                    options={item.value?.map((ini) => ({ id: ini, desc: ini }))}
                    width={220}
                    customValue={item.name && filterForm[item.name] ? filterForm[item.name].map((val: any) => val.desc) : [""]}
                    CustomHandler={OptionsFilterHandler}
                  />
                ))}
              </MenuWrapper>
            )}
            {booleanFilterHeader.length > 0 && (
              <MenuWrapper disp="flex" flexDir="row" gap={8}>
                {booleanFilterHeader.map((item, index) => (
                  <CheckListInput
                    key={index}
                    label={item ? (item.charAt(0).toUpperCase() + item.slice(1)).match(/[A-Z][a-z]+/g)?.join(" ") : ""}
                    name={item}
                    width={150}
                    options={[
                      { id: "TRUE", desc: "TRUE" },
                      { id: "FALSE", desc: "FALSE" },
                    ]}
                    customValue={item && filterForm[item] ? filterForm[item].data.map((val: any) => val.desc) : [""]}
                    CustomHandler={BooleanFilterHandler}
                  />
                ))}
              </MenuWrapper>
            )}
            {dateFilterHeader.length > 0 && (
              <MenuWrapper disp="flex" flexDir="row" gap={8}>
                {dateFilterHeader.map((item, index) => (
                  <RangeDateInput key={index} label={item ? (item.charAt(0).toUpperCase() + item.slice(1)).match(/[A-Z][a-z]+/g)?.join(" ") : ""} />
                ))}
              </MenuWrapper>
            )}

            <MenuWrapper>
              <ResetButton onClick={FilterAction} value="reset">
                clear
              </ResetButton>
            </MenuWrapper>
            <MenuWrapper>
              <ResetButton onClick={FilterAction} value="submit">
                submit
              </ResetButton>
            </MenuWrapper>
          </MenuWrapper>
        </ToolbarWrapper>
      )}
      <BodyWrapper>
        {localData && localData.map((item, index) => <SingleRowContainer key={index} item={item} headerStructure={headerLayout} />)}
      </BodyWrapper>
    </Wrapper>
  );
};
export default SingleRow;

const fallDown = keyframes`
0% {
  transform: translateY(-10rem);
} 100% {
  transform: translateY(0);
}`;

const dropdown = keyframes`
0% {
  transform: scaleY(0);
} 100% {
  transform: scaleY(1);
}`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const BodyWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const RowBox = styled.div<{ browser?: string }>`
  padding: 2px 0;
  display: flex;
  flex-direction: column;
  ${(props) => (props.browser?.includes("Firefox") ? "padding-right: 11px;" : "padding-right: 1px;")}
  transition: ${fallDown} .2s ease-in;
`;

const InnerRowBox = styled.div<{ bgColor?: string }>`
  ${(props) => (props.bgColor ? "background: " + props.bgColor + ";" : "background: #ddd;")}
  margin: 4px;
  padding: 4px 6px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  transition: all 0.2s;
`;

const TextBox = styled.h5<{ fontSize?: string }>`
  ${(props) => props.fontSize && "font-size: " + props.fontSize + ";"}
`;

const CollapseButton = styled.button`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;

const ToolbarWrapper = styled.div`
  padding-top: 3px;
  padding-bottom: 8px;
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 24px;
  border-bottom: 1px solid #ddd;
`;

const MenuWrapper = styled.div<{ flex?: boolean; width?: number; disp?: string; flexDir?: "column" | "row"; gap?: number }>`
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.width && "width: " + props.width + "px;"}
  ${(props) => props.disp && "display: " + props.disp + ";"}
  ${(props) => props.flexDir && "flex-direction: " + props.flexDir + ";"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
`;

const DetailBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.075);
  margin-top: 2px;
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 4px;
  padding: 4px;
  transform-origin: center top;
  animation: ${dropdown} 0.1s ease-in;
  background: #f2f2f2;
  box-shadow: inset 1px 1px 2px 0 rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow: hidden;
  display: flex;
`;

const InnerDetailBox = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Pre = styled.pre`
  margin: 0;
  padding: 0;
`;

const FilterText = styled.input`
  flex: 1;
  margin: 0 4px;
  outline: none;
  border: none;
  padding: 2px 4px;
  box-shadow: inset 1px 1px 3px 0 #3838384b;
  background: #ddd;
`;

const ResetButton = styled.button`
  background: #ddd;
  border-radius: 4px;
  outline: none;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
  &:hover {
    cursor: pointer;
    background: #5e5e5e;
    color: #fff;
  }
`;
