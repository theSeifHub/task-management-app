export interface ITask {
  id?: number;
  title: string;
  description: string;
}

export enum Status{
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export interface TasksState {
  tasks: ITask[];
  taskToEdit: ITask | null,
  isSearching: boolean;
  searchResults: (ITask | undefined)[];
  status: Status;
}

export interface GetTasksResponse {
  tasks: ITask[];
  count: number;
}