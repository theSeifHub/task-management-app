import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from './reducer';

export const store = configureStore({
  reducer: tasksReducer,
});

export const selectTaskToEdit = (state: RootState) => state.taskToEdit;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
