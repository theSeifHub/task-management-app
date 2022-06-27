import React, { useEffect, useState } from 'react';
import { selectTaskToEdit } from "../app/store";
import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  addNewTask,
  updateTask,
} from '../app/actionsAndThunks';

const AddEditTaskForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const taskToEdit = useAppSelector(selectTaskToEdit);
  const [taskTitle, setTaskTitle] = useState(taskToEdit? taskToEdit.title : '');
  const [taskDescription, setTaskDescription] = useState(taskToEdit? taskToEdit.description : '');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setTaskTitle(taskToEdit?.title as string);
    setTaskDescription(taskToEdit?.description as string);
  }, [taskToEdit]);

  const handleAddEditClick = (newTitle: string , newDescription: string) => {
    if (newTitle) {
      if (taskToEdit) {
        dispatch(updateTask({
          id: taskToEdit!.id,
          title: newTitle,
          description: newDescription,
        }));
      } else {
        dispatch(addNewTask({
          title: newTitle,
          description: newDescription,
        }));
      }
      setErrorMsg('');
      setTaskTitle('');
      setTaskDescription('');
    } else {
      setErrorMsg('Task title is missing!');
    }
  }
  return (
    <form className='task-form' autoComplete='off'>
      <label htmlFor='task-title'>Title</label>
      <input
        type='text'
        name='task-title'
        id='task-title'
        placeholder='Buy Milk'
        value={taskTitle}
        onChange={(e) => {setTaskTitle(e.target.value)}}
      />
      <label htmlFor='task-description'>Description</label>
      <input
        type='text'
        name='task-description'
        id='task-description'
        placeholder='2 bottles, skimmed '
        value={taskDescription}
        onChange={(e) => {setTaskDescription(e.target.value)}}
      />
      <button
        title={taskToEdit ? 'Save Changes' : 'Add New Task'}
        aria-label={taskToEdit ? 'Save Changes' : 'Add New Task'}
        onClick={(e) => {
          e.preventDefault();
          handleAddEditClick(taskTitle, taskDescription);
        }}
      >
        {taskToEdit ? 'Save Changes' : 'New Task'}
      </button>
      {errorMsg && <div className='error-msg'>{errorMsg}</div>}
    </form>
  )
}

export default AddEditTaskForm;
