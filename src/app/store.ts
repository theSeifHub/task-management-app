import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from './reducer';

export const store = configureStore({
  reducer: tasksReducer,
});

export const selectTasks = (state: RootState) => state.tasks;
export const selectTaskToEdit = (state: RootState) => state.taskToEdit;
export const selectSearchResults = (state: RootState) => state.searchResults;
export const selectIsSearching = (state: RootState) => state.isSearching;
export const selectStatus = (state: RootState) => state.status;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
