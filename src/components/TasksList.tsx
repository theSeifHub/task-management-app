import React, { useEffect } from 'react'
import { FiLoader } from "react-icons/fi";
import { MdSentimentDissatisfied } from "react-icons/md";
import { getTasksList } from '../app/actionsAndThunks';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { 
  selectTasks,
  selectIsSearching,
  selectStatus,
} from '../app/store';
import { Status } from '../types';
import TaskItem from './TaskItem';

const TasksList = (): JSX.Element => {
  const storeStatus = useAppSelector(selectStatus);
  const tasksList = useAppSelector(selectTasks);
  const isSearching = useAppSelector(selectIsSearching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storeStatus === Status.Idle) {
      dispatch(getTasksList());
    }
  }, []);

  return (
    <div className='tasks-list'>
      <h2>Tasks List</h2>
      { storeStatus === Status.Loading
        ? <FiLoader className='loader-icon' /> : (
          isSearching && !tasksList.length ? (
            <div className='no-results'>
              <h3>
                No Tasks Found
              </h3>
              <br />
              <MdSentimentDissatisfied
                fontSize='50'
                color='#ed0'
              />
            </div>
          ) : (
            <ul>
              { tasksList.map(task => (
                <TaskItem
                  key={task.id}
                  taskId={task.id as number}
                  taskTitle={task.title}
                  taskDescription={task.description}
                />
              ))}
            </ul>
          )
        )
      }
    </div>
  )
}

export default TasksList;