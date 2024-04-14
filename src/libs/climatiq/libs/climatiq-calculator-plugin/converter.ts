import {PluginParams} from './interfaces';
import {
  CPURequestBody,
  MemoryRequestBody,
  StorageRequestBody,
  VMInstanceRequestBody,
} from './types';

// Convert input plugin params to Climatiq batch requests
export const Converter = () => {
  const toRegion = (location: string): string => {
    return location.split('-').join('_');
  };

  const toVMInstanceBatch = (
    inputs: PluginParams[]
  ): VMInstanceRequestBody[] => {
    return inputs.map(toVMInstance);
  };

  const toVMInstance = (input: PluginParams): VMInstanceRequestBody => {
    return {
      instance: input['cloud/instance-type'],
      region: toRegion(input['location']),
      average_vcpu_utilization: input['cpu/utilization'],
      year: new Date(input['timestamp']).getUTCFullYear(),
      duration: input['duration'],
      duration_unit: 's',
    };
  };

  const toCPUBatch = (inputs: PluginParams[]): CPURequestBody[] => {
    return inputs.map(toCPU);
  };

  const toCPU = (input: PluginParams): CPURequestBody => {
    return {
      region: toRegion(input['location']),
      cpu_count: 2,
      average_vcpu_utilization: input['cpu/utilization'],
      year: new Date(input['timestamp']).getUTCFullYear(),
      duration: input['duration'],
      duration_unit: 's',
    };
  };

  const toMemoryBatch = (inputs: PluginParams[]): MemoryRequestBody[] => {
    return inputs.map(toMemory);
  };

  const toMemory = (input: PluginParams): MemoryRequestBody => {
    return {
      region: toRegion(input['location']),
      data: 256,
      year: new Date(input['timestamp']).getUTCFullYear(),
      duration: input['duration'],
      duration_unit: 's',
      data_unit: 'GB',
    };
  };

  const toStorageBatch = (inputs: PluginParams[]): StorageRequestBody[] => {
    return inputs.map(toStorage);
  };

  const toStorage = (input: PluginParams): StorageRequestBody => {
    return {
      region: toRegion(input['location']),
      data: input['storage/capacity'],
      storage_type: input['storage/type'],
      year: new Date(input['timestamp']).getUTCFullYear(),
      duration: input['duration'],
      duration_unit: 's',
      data_unit: 'GB',
    };
  };

  return {
    toVMInstanceBatch,
    toCPUBatch,
    toMemoryBatch,
    toStorageBatch,
  };
};
