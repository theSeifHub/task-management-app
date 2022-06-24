import {
  createAction,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TasksState, ITask } from "../types";
import { generateId } from "./helpers";

const initialState: TasksState = {
  tasks: [],
  isSearching: false,
  searchResults: [],
};

const addTask = createAction<ITask>('ADD_TASK');
const editTask = createAction<ITask>('EDIT_TASK');
const deleteTask = createAction<number>('DELETE_TASK');
const searchTasks = createAction<string>('SEARCH_TASKS');
const clearSearchResults = createAction('CLEAR_SEARCH_TASKS');
  

const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTask, (state, action: PayloadAction<ITask>) => {
      const newTask: ITask = {
        ...action.payload,
        id: generateId(state.tasks.length),
      };
      state.tasks.push(newTask);
    }).addCase(editTask, (state, action: PayloadAction<ITask>) => {
      if (action.payload.id) {
        state.tasks = state.tasks.map((task) => (
         task.id === action.payload.id ? action.payload : task
        ));
      }
    }).addCase(deleteTask, (state, action: PayloadAction<number>) => {
      if (action.payload) {
        const indexToDelete = state.tasks.findIndex((task) => task.id === action.payload);
        if (indexToDelete > -1) {
          state.tasks.splice(indexToDelete, 1);
        }
      }
    }).addCase(searchTasks, (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.isSearching = true;
        state.searchResults = state.tasks.map((task) => {
          const hasQuery = (task.title.toLowerCase().search(action.payload.toLowerCase()) > -1)
            || (task.description.toLowerCase().search(action.payload.toLowerCase()) > -1);
          if (hasQuery) {
            return task;
          }
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
