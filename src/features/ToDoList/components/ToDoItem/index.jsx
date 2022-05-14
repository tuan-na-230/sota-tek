import React from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Typography } from "antd";

const ToDoItem = ({
  data,
  onChangeSelectedPanel,
  onToggleCheckBox,
  onRemove,
}) => {
  const handleClickDetail = () => {
    onChangeSelectedPanel(data?.id);
  };
  const handleClickRemove = () => {
    onRemove(data?.id);
  };
  const handleToggleCheckbox = (e) => {
    onToggleCheckBox(data?.id, e.target.checked);
  };
  return (
    <div className="w-100 flex-space-between-align-center">
      <div>
        <Checkbox onChange={handleToggleCheckbox} />
        <Typography.Text strong className="ml-24">
          {data?.title}
        </Typography.Text>
      </div>
      <div>
        <Button className="mr-8" type="primary" onClick={handleClickDetail}>
          Detail
        </Button>
        {!data?.isDone && (
          <Button type="danger" onClick={handleClickRemove}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

ToDoItem.propTypes = {
  data: PropTypes.object,
};

export default ToDoItem;
