import React from "react";
import PropTypes from "prop-types";
import TaskForm from "../TaskForm";
import { getItemLocal, setItemLocal, sortToDoList } from "../../helper";
import { v4 } from "uuid";
import { Typography } from "antd";
import moment from "moment";
import { ADD } from "../../constants";

const initForm = {
  dueDate: moment(),
  priority: "normal",
};
const AddForm = ({setToDoList}) => {
  const toDoList = getItemLocal("toDoList") || [];
  const handleAdd = (values) => {
    let result;
    try {
      const newItem = { ...values, id: v4() }
      toDoList.push(newItem);
      setToDoList(sortToDoList(toDoList));
      setItemLocal("toDoList", toDoList);
      result = true;
    } catch (error) {
      result = false;
    }
    return result;
  };
  return (
    <div>
      <Typography.Title level={3} className="text-center mb-32">
        New Task
      </Typography.Title>
      <div className="p-12">
        <TaskForm mode={ADD} initForm={initForm} onSubmit={handleAdd} />
      </div>
    </div>
  );
};

AddForm.propTypes = {
  setToDoList: PropTypes.func
};

export default AddForm;
