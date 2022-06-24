import React, { useState } from 'react';
import { selectTaskToEdit } from "../app/store";
import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  addTask,
  saveEditedTask,
} from '../app/reducer';

const AddEditTaskForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const taskToEdit = useAppSelector(selectTaskToEdit);
  const [taskTitle, setTaskTitle] = useState(taskToEdit? taskToEdit.title : '');
  const [taskDescription, setTaskDescription] = useState(taskToEdit? taskToEdit.description : '');
  const [errorMsg, setErrorMsg] = useState('');

  const handleBtnClick = (newTitle: string , newDescription: string) => {
    if (newTitle) {
      setErrorMsg('');
      if (taskToEdit) {
        dispatch(saveEditedTask({
          id: taskToEdit!.id,
          title: newTitle,
          description: newDescription,
        }));
      } else {
        dispatch(addTask({
          title: newTitle,
          description: newDescription,
        }));
      }
    } else {
      setErrorMsg('Must Provide Title!');
    }
  }
  return (
    <form>
      <label htmlFor='task-title'>Title</label>
      <input
        type='text'
        name='task-title'
        id='task-title'
        placeholder='e.g.: Buy Milk'
        value={taskTitle}
        onChange={(e) => {setTaskTitle(e.target.value)}}
      />
      <label htmlFor='task-description'>Description</label>
      <input
        type='text'
        name='task-description'
        id='task-description'
        placeholder='e.g.: 2 bottles, skimmed '
        value={taskDescription}
        onChange={(e) => {setTaskDescription(e.target.value)}}
      />
      <button
        title={taskToEdit ? 'Save Changes' : 'Add New Task'}
        aria-label={taskToEdit ? 'Save Changes' : 'Add New Task'}
        onClick={(e) => {
          e.preventDefault();
          handleBtnClick(taskTitle, taskDescription);
        }}
      >
        {taskToEdit ? 'Save Changes' : 'Add New Task'}
      </button>
      {errorMsg && <div style={{color: 'red'}}>{errorMsg}</div>}
    </form>
  )
}

export default AddEditTaskForm;
