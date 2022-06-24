import React from 'react'
import { useAppSelector } from '../app/hooks';
import { 
  selectTasks,
  selectSearchResults,
  selectIsSearching,
} from '../app/store';
import TaskItem from './TaskItem';

const TasksList = (): JSX.Element => {
  const tasks = useAppSelector(selectTasks);
  const isSearching = useAppSelector(selectIsSearching);
  const searchResults = useAppSelector(selectSearchResults);

  const displaySearchResults = () => {
    if (searchResults.length) {
      return (
        searchResults.map(task => (
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
    </div>
  )
}

export default TasksList;