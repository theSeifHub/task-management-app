import { createAction } from "@reduxjs/toolkit";
import { ITask } from "../types";

// actions
export const addTask = createAction<ITask>('ADD_NEW_TASK');
export const startEditingTask = createAction<number>('START_EDIT_TASK');
export const saveEditedTask = createAction<ITask>('SAVE_EDIT_TASK');
export const deleteTask = createAction<number>('DELETE_TASK');
export const searchTasks = createAction<string>('SEARCH_TASKS');
export const clearSearchResults = createAction('CLEAR_SEARCH_TASKS');
