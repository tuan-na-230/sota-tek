import moment from "moment";

const sortToDoList = (array) => {
  const newArray = [...array];
  const sortedArray = newArray.sort(
    (a, b) =>
      new moment(a.dueDate).format("YYYYMMDD") -
      new moment(b.dueDate).format("YYYYMMDD")
  );
  return sortedArray;
};

export { sortToDoList };
