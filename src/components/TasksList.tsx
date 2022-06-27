import React, { useEffect } from 'react'
import { getTasksList } from '../app/actionsAndThunks';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { 
  selectTasks,
  selectSearchResults,
  selectIsSearching,
  selectStatus,
} from '../app/store';
import { Status } from '../types';
import TaskItem from './TaskItem';

const TasksList = (): JSX.Element => {
  const storeStatus = useAppSelector(selectStatus);
  const tasks = useAppSelector(selectTasks);
  const isSearching = useAppSelector(selectIsSearching);
  const searchResults = useAppSelector(selectSearchResults);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storeStatus === Status.Idle) {
      dispatch(getTasksList(''));
    }
  }, [storeStatus, dispatch]);

  const displaySearchResults = () => {
    if (searchResults.length) {
      return (
        searchResults.map((task) => (
        <TaskItem
          key={task?.id}
          taskId={task?.id as number}
          taskTitle={task?.title as string}
          taskDescription={task?.description as string}
        />
      ))
      );
    }
    return (
      <p>No Results Found</p>
    )
  }
  return (
    <div className='tasks-list'>
      <h2>Tasks List</h2>
      { storeStatus === Status.Loading
        ? <h3>LOADING</h3> : (
          <ul>
            { isSearching ? displaySearchResults() : (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  taskId={task.id as number}
                  taskTitle={task.title}
                  taskDescription={task.description}
                />
              ))
            )}
          </ul>
        )
      }
    </div>
  )
}

export default TasksList;