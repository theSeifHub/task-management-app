import React from 'react'
import TaskItem from './TaskItem';

type Props = {}

const TasksList = ({}: Props): JSX.Element => {
  return (
    <div>
      <ul>
        <TaskItem taskId={1}></TaskItem>
        <TaskItem taskId={3}></TaskItem>
        <TaskItem taskId={5}></TaskItem>
        <TaskItem taskId={7}></TaskItem>
      </ul>
    </div>
  )
}

export default TasksList;