import axios, { AxiosError } from 'axios';
import { ServeErrorResponse } from 'types/response/ServerResponse';
import { BaseError } from 'types/error/BaseError';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://localhost:9000/api',
});

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError<ServeErrorResponse>) => {
  let serverError = new BaseError('문제가 생겼습니다. 다시 시도해주세요.');

  if (error.response) {
    const { code, message } = error.response.data;

    if (code === 'InvalidRequest' || code === 'IllegalState') {
      serverError = new BaseError(message);
    }
  }

  return Promise.reject(serverError);
};

instance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
);
