import React from 'react'
import { useAppSelector } from '../app/hooks';
import { 
  selectTasks,
  selectSearchResults,
} from '../app/store';
import TaskItem from './TaskItem';

const TasksList = (): JSX.Element => {
  const tasks = useAppSelector(selectTasks);
  const searchResults = useAppSelector(selectSearchResults);
  return (
    <main>
      <ul>
        { searchResults.length ? (
          searchResults.map(task => (
            <TaskItem
              key={task?.id}
              taskId={task?.id as number}
              taskTitle={task?.title as string}
              taskDescription={task?.description as string}
            />
          ))
        ) : (
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
    </main>
  )
}

export default TasksList;