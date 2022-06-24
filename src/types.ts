export interface ITask {
  id?: number;
  title: string;
  description: string;
}

export interface TasksState {
  tasks: ITask[];
  isSearching: boolean;
  searchResults: (ITask | undefined)[];
  // status: 'idle' | 'loading' | 'failed';
}
