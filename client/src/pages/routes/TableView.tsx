import React from "react";
import styled from "styled-components";
import CustomGrid from "../../components/CustomGrid";
import Form from "../../components/Form";
import GroupButton from "../../components/GroupButton";
import ReadOnlyTable from "../../components/tables/ReadOnlyTable";
import { Column, Row } from "../../utils/styled.global";
import { DecimalInput, NumberInput, TextInput, DropdownInput,CheckListInput, WindowPopUpInput } from "../../components/inputs";
import { PrivOpt } from "../../utils/dummy.data";

interface TableViewProps {}

const TableView: React.FC<TableViewProps> = () => {
  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.currentTarget.alt === "number") {
    //   console.log(parseInt(e.currentTarget.value))
    // } else if(e.currentTarget.alt==="decimal") {
    //   console.log(parseFloat(e.currentTarget.value))
    // }else{
    //   console.log(e.currentTarget.value)
    // }
  };

  const OptionsHandler = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>, data: any) => {
    console.log(data)
  }
  return (
    <Wrapper>
      <Column width={260}>
        <CustomGrid>
          <ReadOnlyTable />
        </CustomGrid>
      </Column>
      <Column flex disp="flex" flexDir="column" gap={10}>
        <Column minHeight={150} maxHeight={250}>
          <CustomGrid headerComponent={<h4 style={{ textAlign: "center" }}>Form 1</h4>} menuComponent={<GroupButton />}>
            <Form flexDir="column" gap={10}>
              <Row disp="flex" flexDir="row" gap={15}>
                <TextInput width={120} label="Reff No." onChange={ChangeHandler} auto />
                <TextInput width={150} label="ID" onChange={ChangeHandler} />
                <TextInput width={300} label="Deskripsi" onChange={ChangeHandler} />
                <NumberInput width={80} label="Qty" onChange={ChangeHandler} />
                <WindowPopUpInput width={150} label="Genre" />
              </Row>
              <Row disp="flex" flexDir="row" gap={15}>
                <TextInput width={200} label="Reff No." onChange={ChangeHandler} auto />
                <TextInput width={150} label="ID" onChange={ChangeHandler} />
                <DecimalInput width={140} label="Qty" onChange={ChangeHandler} value={12345678.2677} unit="liter" digits={2} />
                <DropdownInput width={150} label="Genre" />
                <CheckListInput width={150} label="Priviledge" options={PrivOpt} CustomHandler={OptionsHandler}/>
              </Row>
            </Form>
          </CustomGrid>
        </Column>
        <Column flex>
          <CustomGrid headerComponent={<h4 style={{ textAlign: "left" }}>Detail</h4>} menuComponent={<GroupButton />}></CustomGrid>
        </Column>
      </Column>
    </Wrapper>
  );
};
export default TableView;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
