import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Button,
  Row,
  DatePicker,
  Col,
  Select,
  Typography,
  message,
} from "antd";
import moment from "moment";
import { ADD } from "../../constants";
const { Option } = Select;
const options = [
  {
    id: 0,
    textContent: "low",
    value: "low",
  },
  {
    id: 1,
    textContent: "normal",
    value: "normal",
  },
  {
    id: 2,
    textContent: "hight",
    value: "hight",
  },
];

const TaskForm = ({ mode, initForm, onSubmit }) => {
  const isAddMode = mode === ADD;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(initForm);
  }, []);
  const onFinish = () => {
    const values = form.getFieldsValue(true)
    const result = onSubmit(values);
    if (result) {
      message.info(
        isAddMode ? "Successfully added item" : "Successfully updated item"
      );
    }
    if (isAddMode) {
      form.setFieldsValue({ ...initForm, title: "", description: "" });
    }
  };
  const renderPlaceHolder = () => {
    return isAddMode ? "Add new task..." : "title";
  };
  const renderTextButton = () => {
    return isAddMode ? "Add" : "Update";
  };
  function disabledDate(current) {
    return current && current.isBefore(moment().startOf("day"));
  }
  return (
    <Form form={form} name="taskForm" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please enter Title!" }]}
      >
        <Input className="w-100" placeholder={renderPlaceHolder()} />
      </Form.Item>

      <Typography.Text strong>Description</Typography.Text>
      <Form.Item name="description">
        <Input.TextArea rows={4} className="w-100" />
      </Form.Item>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text strong>Due Date</Typography.Text>
          <Form.Item name="dueDate">
            <DatePicker className="w-100" disabledDate={disabledDate} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Priority</Typography.Text>
          <Form.Item name="priority">
            <Select className="w-100">
              {options.map((o, i) => (
                <Option key={i} value={o.value}>
                  {o.textContent}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-100 mt-18 green-button"
        >
          {renderTextButton()}
        </Button>
      </Form.Item>
    </Form>
  );
};

TaskForm.propTypes = {
  mode: PropTypes.string,
  initForm: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default TaskForm;
