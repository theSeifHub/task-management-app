import React from 'react';
import './App.css';
import {
  Header,
  TasksList,
  AddEditTaskForm,
} from './components';

function App() {
  return (
    <div className="app">
      <Header />
      <main className='tasks-board'>
        <AddEditTaskForm />
        <TasksList />
      </main>
    </div>
  );
}

export default App;
