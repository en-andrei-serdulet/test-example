import {z} from 'zod';
import {PluginInterface, PluginParams} from './interfaces';
import {YourGlobalConfig, ComponentSSDBody} from './types';
import {BoavistaStorageApi} from './boavista-api';
import {log} from 'console';

/* eslint-disable node/no-extraneous-import */
export const BoavistaStorage = (
  globalConfig: YourGlobalConfig
): PluginInterface => {
  const metadata = {
    kind: 'execute',
  };

  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {
    const lifespan: number = globalConfig['expected-lifespan'];

    const boavistApi = BoavistaStorageApi();
    const outputs: PluginParams[] = inputs.map(async input => {
      if (isValidStorageRequest(input)) {
        let result: any;
        let payload: ComponentSSDBody;
        switch (input['storage/type'].toLowerCase()) {
          case 'ssd':
            payload = {
              capacity: input['storage/capacity'],
            };
            result = await boavistApi.fetchSSDComponentData(payload);
            break;
          case 'hdd':
            result = await boavistApi.fetchHDDComponentData();
            break;
        }

        const carbonEmbodied = calculateEmbodiedCarbon(
          result.impacts.gwp.embedded.value,
          input['duration'],
          lifespan,
          input['storage/capacity'],
          input['storage/capacity']
        );

        return result
          ? {
              ...input,
              'carbon-embodied': carbonEmbodied,
            }
          : input;
      }

      return input;
    });

    return Promise.all(outputs);
  };

  const calculateEmbodiedCarbon = (
    totalEmissions: number,
    duration: number,
    expectedLifespan: number,
    resourcesReserved: number,
    totalResources: number
  ) => {
    return (
      totalEmissions *
      (duration / expectedLifespan) *
      (resourcesReserved / totalResources)
    );
  };

  const isValidStorageRequest = (input: PluginParams): boolean => {
    const schema = z.object({
      'storage/type': z.enum(['ssd', 'hdd']),
      'storage/capacity': z.number(),
      duration: z.number(),
    });

    return schema.safeParse(input).success;
  };

  return {
    metadata,
    execute,
  };
};
