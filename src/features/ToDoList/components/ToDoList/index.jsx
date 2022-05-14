import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Collapse, Input, Typography } from "antd";
import { setItemLocal, sortToDoList } from "../../helper";
import ToDoItem from "../ToDoItem";
import TaskForm from "../TaskForm";
import { UPDATE } from "../../constants";
import moment from "moment";

const ToDoList = ({ initToDoList, toDoList = [], setToDoList }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeKeys, setActiveKeys] = useState([]);
  const onSearch = (textSearch) => {
    setToDoList((prev) => {
      const temp = [...prev];
      if (textSearch) {
        return sortToDoList(temp.filter((o) => o?.title?.includes(textSearch)));
      } else {
        return sortToDoList(initToDoList);
      }
    });
  };
  const handleChangeSelectedPanel = (id) => {
    setActiveKeys((prev) => {
      const list = [...prev];
      const index = list.findIndex((o) => o === id);
      if (index > -1) {
        list.splice(index, 1);
      } else {
        list.push(id);
      }
      return list;
    });
  };
  const handleToggleCheckbox = (id, isChecked) => {
    setSelectedIds((prev) => {
      const list = [...prev];
      if (isChecked) {
        list.push(id);
      } else {
        const index = list.findIndex((o) => o === id);
        if (index > -1) {
          list.splice(index, 1);
        }
      }
      return list;
    });
  };
  const handleUpdate = (values) => {
    let result = true;
    try {
      setToDoList((prev) => {
        const list = [...prev];
        const id = values.id;
        const index = list.findIndex((o) => o.id === id);
        if (index > -1) {
          list[index] = { ...list[index], ...values };
        }
        const sortList = sortToDoList(list);
        setItemLocal("toDoList", sortList);
        handleChangeSelectedPanel(id);
        return sortList;
      });
    } catch (error) {
      result = false;
    }
    return result;
  };
  const handleBulkDone = () => {
    setToDoList((prev) => {
      const list = [...prev];
      const newList = list.map((o) =>
        selectedIds.includes(o.id) ? { ...o, isDone: true } : o
      );
      setItemLocal("toDoList", newList);
      return sortToDoList(newList);
    });
  };
  const handleRemove = (id) => {
    setToDoList((prev) => {
      const list = [...prev];
      const index = list.findIndex((o) => o.id === id);
      if (index > -1) {
        list.splice(index, 1);
      }
      const sortList = sortToDoList(list);
      setItemLocal("toDoList", sortList);
      return sortList;
    });
    handleToggleCheckbox(id, false);
  };
  const handleBulkRemove = () => {
    setToDoList((prev) => {
      const list = [...prev];
      const newList = list.filter((o) => !selectedIds.includes(o.id));
      const sortList = sortToDoList(newList);
      setItemLocal("toDoList", sortList);
      return sortList;
    });
    setSelectedIds([]);
  };
  const isDisableDoneButton = () => {
    const selectedItems = toDoList.filter((o) => selectedIds.includes(o.id));
    const isDoneItems = selectedItems.filter((o) => o.isDone);
    return !(selectedItems.length > isDoneItems.length);
  };
  return (
    <div className="flex-col-space-between min-height-100vh height-100vh">
      <div>
        <Typography.Title level={3} className="text-center mb-32">
          To Do List
        </Typography.Title>
        <div className="p-12">
          <Input.Search
            placeholder="Search..."
            onSearch={onSearch}
            className="mb-16"
          />
          <Collapse activeKey={activeKeys}>
            {toDoList.map((o) => (
              <Collapse.Panel
                header={
                  <ToDoItem
                    data={o}
                    onToggleCheckBox={handleToggleCheckbox}
                    onChangeSelectedPanel={handleChangeSelectedPanel}
                    onRemove={handleRemove}
                  />
                }
                key={o.id}
                collapsible="disabled"
                showArrow={false}
              >
                <TaskForm
                  onSubmit={handleUpdate}
                  mode={UPDATE}
                  initForm={{ ...o, dueDate: moment(o.dueDate) }}
                  key={o.id}
                />
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      </div>
      {selectedIds.length > 0 && (
        <div className="position-stick-footer w-100 flex-space-between-align-center p-12">
          <Typography.Text strong className="ml-24">
            Bulk Action:
          </Typography.Text>
          <div>
            <Button
              type="primary"
              onClick={handleBulkDone}
              disabled={isDisableDoneButton()}
              className="mr-8"
            >
              Done
            </Button>
            <Button type="danger" onClick={handleBulkRemove}>
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

ToDoList.propTypes = {
  initToDoList: PropTypes.any,
  toDoList: PropTypes.any,
  setToDoList: PropTypes.func,
};

export default ToDoList;
