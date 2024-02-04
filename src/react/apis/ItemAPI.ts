import { AxiosPromise } from 'axios';
import { instance } from './configs/axiosConfig';
import { FetchItemResponse } from '../types/response/Item';

export const fetchItem = (id: number): AxiosPromise<FetchItemResponse> => {
  return instance.get(`/items/${id}`);
};
