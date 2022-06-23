import React from 'react'

type Props = {}

const Header = ({}: Props): JSX.Element => {
  return (
    <header>
      <h1>
        Tasks Management App
      </h1>
      <button title='Add Task'>
        + New Task
      </button>
    </header>
  )
}

export default Header;