import React from 'react'
import { useAppSelector } from '../app/hooks';
import { selectTasks } from '../app/store';
import TaskItem from './TaskItem';

const TasksList = (): JSX.Element => {
  const tasks = useAppSelector(selectTasks);
  return (
    <div>
      <ul>
        {
          tasks.map(task => (
            <TaskItem
              key={task.id}
              taskId={task.id as number}
              taskTitle={task.title} 
              taskDescription={task.description} 
            />
          ))
        }
      </ul>
    </div>
  )
}

export default TasksList;