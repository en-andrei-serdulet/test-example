import axios from 'axios';
import {
  CPURequestBody,
  MemoryRequestBody,
  StorageRequestBody,
  VMInstanceRequestBody,
} from './types';

const BASE_URL = 'https://api.climatiq.io';

export const ClimatiqApi = (climatiqApiKey: string) => {
  const apiKey: string = climatiqApiKey;

  const fetchVMInstanceBatch = async (
    cloudProvider: string,
    batchPayload: VMInstanceRequestBody[]
  ): Promise<any> => {
    const response = await axios.post(
      `${BASE_URL}/compute/v1/${cloudProvider}/instance/batch`,
      batchPayload,
      {headers: {Authorization: `Bearer ${apiKey}`}}
    );
    return response.data;
  };

  const fetchCPUBatch = async (
    cloudProvider: string,
    batchPayload: CPURequestBody[]
  ): Promise<any> => {
    const response = await axios.post(
      `${BASE_URL}/compute/v1/${cloudProvider}/cpu/batch`,
      batchPayload,
      {headers: {Authorization: `Bearer ${apiKey}`}}
    );

    return response.data;
  };

  const fetchMemoryBatch = async (
    cloudProvider: string,
    batchPayload: MemoryRequestBody[]
  ): Promise<any> => {
    const response = await axios.post(
      `${BASE_URL}/compute/v1/${cloudProvider}/memory/batch`,
      batchPayload,
      {headers: {Authorization: `Bearer ${apiKey}`}}
    );
    return response.data;
  };

  const fetchStorageBatch = async (
    cloudProvider: string,
    batchPayload: StorageRequestBody[]
  ): Promise<any> => {
    const response = await axios.post(
      `${BASE_URL}/compute/v1/${cloudProvider}/storage/batch`,
      batchPayload,
      {headers: {Authorization: `Bearer ${apiKey}`}}
    );
    return response.data;
  };

  return {
    fetchVMInstanceBatch,
    fetchCPUBatch,
    fetchMemoryBatch,
    fetchStorageBatch,
  };
};
