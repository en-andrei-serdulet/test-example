import axios from 'axios';
import {ComponentSSDBody} from './types';

const BASE_URL = 'https://api.boavizta.org';

export const BoavistaStorageApi = () => {
  const fetchHDDComponentData = async (): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/v1/component/hdd`, {});
    return response.data;
  };
  const fetchSSDComponentData = async (
    payload: ComponentSSDBody
  ): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/v1/component/ssd`, payload);
    return response.data;
  };

  return {
    fetchHDDComponentData,
    fetchSSDComponentData,
  };
};
