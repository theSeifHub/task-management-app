import React from 'react';
import {
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { useAppDispatch } from "../app/hooks";
import {
  startEditingTask,
  deleteTask,
} from "../app/actionsAndThunks";

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
    <li className='task-item'>
      <div className='task-details'>
        <h3 className='task-title'>{taskTitle}</h3>
        <p>{taskDescription}</p>
      </div>
      <div className='task-actions'>
        <button
          title='Edit Task'
          aria-label='Edit Task'
          onClick={(e) => {
            e.preventDefault();
            handleEditClick();
          }}
        >
          <FiEdit className='btn-icon'/>
        </button>
        <button
        title='Delete Task'
          aria-label='Delete Task'
          onClick={(e) => {
            e.preventDefault();
            handleDeleteClick();
          }}
        >
          <FiTrash2
            className='btn-icon'
            color='#c00'
          />
        </button>
      </div>
    </li>
  )
}

export default TaskItem;