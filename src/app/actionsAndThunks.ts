import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetTasksResponse, INewTask, ITask } from "../types";
import tasksAxios from "./tasksAxios";

// actions
export const startEditingTask = createAction<number>('START_EDIT_TASK');
export const deleteTask = createAction<number>('DELETE_TASK');

// thunks
export const getTasksList = createAsyncThunk(
  'GET_TASKS_ASYNC',
  async (): Promise<GetTasksResponse> => {
    const response = await tasksAxios.get('/');
    return response.data.data;
  }
);

export const searchTasks = createAsyncThunk(
  'SEARCH_TASKS_ASYNC',
  async (query: string, thunkAPI): Promise<GetTasksResponse> => {
    const response = await tasksAxios.get('/', {
      params: { q: query },
    });
    return response.data.data;
  }
);

export const addNewTask = createAsyncThunk(
  'ADD_NEW_TASK_ASYNC',
  async (newTask: INewTask, thunkAPI): Promise<ITask> => {
    const response = await tasksAxios.post('/', newTask);
    return {
      ...newTask,
      id: response.data.data as number,
    };
  }
);

export const updateTask = createAsyncThunk(
  'UPDATE_TASK_ASYNC',
  async (updatedTask: ITask, thunkAPI): Promise<ITask> => {
    const response = await tasksAxios.put(`/${updatedTask.id}`, updatedTask);
    return {
      ...updatedTask,
      id: response.data.data as number,
    };
  }
);
