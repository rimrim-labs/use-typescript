import axios, { AxiosError } from 'axios';
import { ServeErrorResponse } from '../../../types/response/ServerResponse';
import { BaseError } from '../../../types/error/BaseError';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://localhost:9000/api',
});

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError<ServeErrorResponse>) => {
  const code = error.response?.data?.code;
  let serverError = new BaseError('문제가 생겼습니다. 다시 시도해주세요.');

  if (code === 'InvalidRequest' || code === 'IllegalState') {
    serverError = new BaseError(error.response?.data?.message!);
  }

  return Promise.reject(serverError);
};

instance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
);
