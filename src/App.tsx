import React from 'react';
import './App.css';
import {
  Header,
  TasksList,
  AddEditTaskForm,
} from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <AddEditTaskForm />
      <TasksList />
    </div>
  );
}

export default App;
