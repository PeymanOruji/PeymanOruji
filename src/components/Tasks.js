import React from "react";
import Task from "./Task";
const Tasks = ({ tasks, deleteTask, toggleReminder }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            toggleReminder={toggleReminder}
            deleteTask={deleteTask}
            key={task.id}
            task={task}
          />
        );
      })}
    </>
  );
};

export default Tasks;
