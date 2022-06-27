import axios from 'axios';

const setBaseURL = (): string => {
  const baseURL = 'http://localhost:5000';
  const apiParams = 'api/tasks'
  return `${baseURL}/${apiParams}`;
};

const createTasksAxios = () => {
  const tasksAxios = axios.create({
    baseURL: setBaseURL(),
    timeout: 10000,
    timeoutErrorMessage: 'TIMEOUT! Server is taking too long to respond',
    responseType: 'json',
  });
  return tasksAxios
};

export default createTasksAxios();
