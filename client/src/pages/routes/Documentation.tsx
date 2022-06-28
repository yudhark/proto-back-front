import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CustomGrid from "../../components/CustomGrid";
import Form from "../../components/Form";
import GroupButton from "../../components/GroupButton";
import { DefaultCheckInput, DropdownInput, TextInput } from "../../components/inputs";
import WindowPopUp from "../../components/WindowPopUp";
import { APIInterface } from "../../utils/interface.util";
import { Row } from "../../utils/styled.global";
import axios from "axios";
import WarningBox from "../../components/WarningBox";
import SingleRow from "../../components/tables/SingleRow";

interface DocumentationProps {}

const Documentation: React.FC<DocumentationProps> = () => {
  const ButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === "new") {
      enablepopup(true);
    }
  };

  const [popup, enablepopup] = useState<boolean>(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const WindowCloseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    enablepopup(false);
  };

  useEffect(() => {
    const closewindow = (e: any) => {
      if (windowRef.current && !windowRef.current.contains(e.target)) {
        enablepopup(false);
      }
    };
    document.addEventListener("mousedown", closewindow);
    return () => {
      document.removeEventListener("mousedown", closewindow);
    };
  }, []);

  const [apiForm, setApiForm] = useState<APIInterface>({ method: 0, url: "", published: false, desc: "" });
  const [popUpMessage, setPopUpMessage] = useState<{ show: boolean; type: "error" | "success" | "warning" | "default"; message?: string }>({
    show: false,
    type: "default",
    message: "",
  });
  const ClosePopUpMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPopUpMessage({ show: false, type: "default", message: "" });
  };
  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.alt === "checkbox") {
      setApiForm({ ...apiForm, [e.currentTarget.name]: e.currentTarget.checked });
    } else {
      setApiForm({ ...apiForm, [e.currentTarget.name]: e.currentTarget.value });
    }
  };
  const DropDownHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "method") {
      setApiForm({ ...apiForm, method: parseInt(e.currentTarget.id) });
    }
  };
  const ResetHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setApiForm({ method: 0, url: "", published: false, desc: "" });
  };

  const fetchApis = async () => {
    await axios.get("http://localhost:5000/api/v1/documentation").then((respon) => {
      if (respon.data.success) setApisDocData(respon.data.data);
    });
  };

  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    await axios.post("http://localhost:5000/api/v1/documentation/", apiForm).then((respon) => {
      console.log(respon);
      if (respon.data.success) {
        setPopUpMessage({ show: true, type: "success", message: respon.data.message });
        fetchApis();
      } else setPopUpMessage({ show: true, type: "error", message: respon.data.message });
    });
  };

  const [methodOptions, setMethodOptions] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      await axios.get("http://localhost:5000/api/v1/documentation/httpmethod").then((data) => {
        if (data.data.success) setMethodOptions(data.data.data);
      });
    };
    fetchOptions().catch((e) => console.log(e));
  }, []);

  const [apisDocData, setApisDocData] = useState<Array<any>>([]);
  useEffect(() => {
    fetchApis().catch((e) => console.log(e));
  }, []);
  return (
    <Wrapper>
      <CustomGrid
        headerComponent={<h4 style={{ textAlign: "left" }}>Api List</h4>}
        menuComponent={<GroupButton buttonList={["new"]} buttonHandler={ButtonHandler} />}
      >
        <SingleRow
          rows={apisDocData}
          enableFilter
          headerLayout={{ idColumn: "_id", frontBox: "methodName", decsBox: "url", locBox: "published" }}
          optionsFilter={["methodName"]}
        />
      </CustomGrid>
      {popup && (
        <WindowPopUp width={480} height={135} reference={windowRef} CloseWindow={WindowCloseHandler} title="Add New API">
          <Form flexDir="column" gap={10} resetFunc={ResetHandler} submitFunc={SubmitHandler}>
            <Row disp="flex" flexDir="row" gap={10}>
              <DropdownInput
                label="Method"
                width={150}
                name="method"
                onDoubleClick={DropDownHandler}
                value={apiForm.method}
                options={methodOptions.map((item) => ({ id: item.id, desc: item.name }))}
              />
              <TextInput label="Url" name="url" onChange={ChangeHandler} value={apiForm.url} />
              <DefaultCheckInput label="Published" name="published" onChange={ChangeHandler} checked={apiForm.published} />
            </Row>
            <Row disp="flex" flexDir="row" gap={10}>
              <TextInput label="Description" name="desc" onChange={ChangeHandler} value={apiForm.desc} />
            </Row>
          </Form>
        </WindowPopUp>
      )}
      {popUpMessage.show && <WarningBox message={popUpMessage.message} type={popUpMessage.type} closeBox={ClosePopUpMessage} />}
    </Wrapper>
  );
};
export default Documentation;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative;
`;
