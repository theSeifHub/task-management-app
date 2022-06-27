import {
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  addNewTask,
  startEditingTask,
  updateTask,
  searchTasks,
  deleteTask,
  getTasksList,
} from "./actionsAndThunks";
import { TasksState, ITask, Status } from "../types";
import { generateId } from "./helpers";

const initialState: TasksState = {
  tasks: [],
  taskToEdit: null,
  isSearching: false,
  status: Status.Idle,
};

const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getTasksList.pending, (state) => {
      console.log('pending...');
      state.status = Status.Loading;
      state.isSearching = false;
    }).addCase(getTasksList.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      state.status = Status.Idle;
      console.log('tasks list fulfilled', action);
    }).addCase(getTasksList.rejected, (state, action) => {
      state.status = Status.Failed; // TODO handle rejection and req failure
    }).addCase(addNewTask.pending, (state) => {
      state.status = Status.Loading;
    }).addCase(addNewTask.fulfilled, (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
      state.status = Status.Idle;
    }).addCase(addNewTask.rejected, (state, action) => {
      state.status = Status.Failed; // TODO handle rejection and req failure
    }).addCase(startEditingTask, (state, action: PayloadAction<number>) => {
      state.taskToEdit = state.tasks.find(task => task.id === action.payload)!;
    }).addCase(updateTask.pending, (state) => {
      state.status = Status.Loading;
    }).addCase(updateTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.map((task) => (
        task.id === action.payload.id ? action.payload : task
      ));
      state.taskToEdit = null
      state.status = Status.Idle;
    }).addCase(updateTask.rejected, (state, action) => {
      state.status = Status.Failed; // TODO handle rejection and req failure
    }).addCase(deleteTask, (state, action: PayloadAction<number>) => {
      if (action.payload) {
        const indexToDelete = state.tasks.findIndex((task) => task.id === action.payload);
        if (indexToDelete > -1) {
          state.tasks.splice(indexToDelete, 1);
        }
        state.taskToEdit = null
      }
    }).addCase(searchTasks.pending, (state) => {
      console.log('pending...');
      state.status = Status.Loading;
      state.isSearching = true;
    }).addCase(searchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      state.status = Status.Idle;
      console.log('tasks list fulfilled', action);
    }).addCase(searchTasks.rejected, (state, action) => {
      state.status = Status.Failed; // TODO handle rejection and req failure
    }).addDefaultCase(state => state);
})

export default tasksReducer;
