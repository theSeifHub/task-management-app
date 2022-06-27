import {
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  addTask,
  startEditingTask,
  saveEditedTask,
  searchTasks,
  clearSearchResults,
  deleteTask,
  getTasksList,
} from "./actionsAndThunks";
import { TasksState, ITask, Status } from "../types";
import { generateId } from "./helpers";

const initialState: TasksState = {
  tasks: [],
  taskToEdit: null,
  isSearching: false,
  searchResults: [],
  status: Status.Idle,
};

const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getTasksList.pending, (state) => {
      console.log('pending...');
      state.status = Status.Loading;
    }).addCase(getTasksList.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      state.status = Status.Success;
      console.log('tasks list fulfilled', action);
    }).addCase(getTasksList.rejected, (state, action) => {
      state.status = Status.Failed; // TODO handle rejection and req failure
    }).addCase(addTask, (state, action: PayloadAction<ITask>) => {
      const newTask: ITask = {
        ...action.payload,
        id: generateId(state.tasks.length),
      };
      state.tasks.push(newTask);
    }).addCase(startEditingTask, (state, action: PayloadAction<number>) => {
      state.taskToEdit = state.tasks.find(task => task.id === action.payload)!;
    }).addCase(saveEditedTask, (state, action: PayloadAction<ITask>) => {
      if (action.payload.id) {
        state.tasks = state.tasks.map((task) => (
         task.id === action.payload.id ? action.payload : task
        ));
        state.taskToEdit = null
      }
    }).addCase(deleteTask, (state, action: PayloadAction<number>) => {
      if (action.payload) {
        const indexToDelete = state.tasks.findIndex((task) => task.id === action.payload);
        if (indexToDelete > -1) {
          state.tasks.splice(indexToDelete, 1);
        }
        state.taskToEdit = null
      }
    }).addCase(searchTasks, (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.isSearching = true;
        state.searchResults = state.tasks.filter((task) => {
          const indexInTitle = task.title.toLowerCase().search(action.payload.toLowerCase());
          const indexInDesc = task.description.toLowerCase().search(action.payload.toLowerCase());
          return (indexInTitle > -1) || (indexInDesc > -1);
        });
      } else {
        state.isSearching = false;
      }
    }).addCase(clearSearchResults, (state) => {
      state.searchResults = [];
      state.isSearching = false;
    }).addDefaultCase(state => state);
})

export default tasksReducer;
