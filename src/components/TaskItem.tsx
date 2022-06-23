import React from 'react'

type Props = {
  taskId: number;
}

const TaskItem = ({taskId}: Props): JSX.Element => {
  return (
    <li>
      Task {taskId}
    </li>
  )
}

export default TaskItem;