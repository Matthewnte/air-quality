import axios from 'axios';
import AppError from './appError';
import getErrorMessage from './getErrorMessage';

const api = {
  get: async <T>(url: string): Promise<T> => {
    try {
      const { data } = await axios.get(url);
      return data as T;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AppError(getErrorMessage(error), error.status ?? 400);
      }
      throw new AppError(getErrorMessage(error), 500);
    }
  }
};

export default api;
