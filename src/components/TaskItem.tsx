import React from 'react'
import { useAppDispatch } from "../app/hooks";
import {
  startEditingTask,
  deleteTask,
} from "../app/reducer";

type Props = {
  taskId: number;
  taskTitle: string;
  taskDescription: string;
}

const TaskItem = ({
  taskId, taskTitle, taskDescription,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleEditClick = () => {
    dispatch(startEditingTask(taskId));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTask(taskId))
  };

  return (
    <li>
      <h3>{taskTitle}</h3>
      <p>{taskDescription}</p>
      <button
        title='Edit Task'
        aria-label='Edit Task'
        onClick={(e) => {
          e.preventDefault();
          handleEditClick();
        }}
      >
        Edit
      </button>
      <button
      title='Delete Task'
        aria-label='Delete Task'
        onClick={(e) => {
          e.preventDefault();
          handleDeleteClick();
        }}
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem;