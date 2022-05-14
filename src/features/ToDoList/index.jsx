import React, { useState } from "react";
import { Col, Row } from "antd";
import AddForm from "./components/AddForm";
import ToDoList from "./components/ToDoList";
import { getItemLocal, sortToDoList } from "./helper";

const MainPage = () => {
  const initToDoList = getItemLocal("toDoList");
  const [toDoList, setToDoList] = useState(sortToDoList(initToDoList) || []);
  return (
    <Row className="min-height-100vh">
      <Col span="10">
        <AddForm setToDoList={setToDoList} />
      </Col>
      <Col span="14" className="border-left" style={{ width: "800px" }}>
        <ToDoList
          initToDoList={initToDoList}
          toDoList={toDoList}
          setToDoList={setToDoList}
        />
      </Col>
    </Row>
  );
};

export default MainPage;
