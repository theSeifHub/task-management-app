import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetTasksResponse, ITask } from "../types";
import tasksAxios from "./tasksAxios";

// actions
export const addTask = createAction<ITask>('ADD_NEW_TASK');
export const startEditingTask = createAction<number>('START_EDIT_TASK');
export const saveEditedTask = createAction<ITask>('SAVE_EDIT_TASK');
export const deleteTask = createAction<number>('DELETE_TASK');
export const searchTasks = createAction<string>('SEARCH_TASKS');
export const clearSearchResults = createAction('CLEAR_SEARCH_TASKS');

// thunks
export const getTasksList = createAsyncThunk(
  'GET_TASKS_ASYNC',
  async (query: string, thunkAPI): Promise<GetTasksResponse> => {
    let response = await tasksAxios.get('/', {
      params: {q: query},
    });
    return response.data.data;
  }
)