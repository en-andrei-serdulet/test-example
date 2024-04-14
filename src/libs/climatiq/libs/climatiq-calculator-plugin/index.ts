// import {z} from 'zod';
import {PluginInterface, PluginParams} from './interfaces';
// import {YourGlobalConfig} from './types';
// import {ClimatiqApi} from './climatiq-api';
// import {Converter} from './converter';
/* eslint-disable node/no-extraneous-import */
// import * as dotenv from 'dotenv';
// import {log} from 'console';

export const ClimatiqCalculator = (
  // globalConfig: YourGlobalConfig
): PluginInterface => {
  const metadata = {
    kind: 'execute',
  };

  // let useEnergySum = false;
  // let useCarbonSum = false;
  // let includeCarbonEmissions = false;
  // let includeCarbonIntensity = false;

  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {
    console.log('climatiq', inputs)
  //   dotenv.config();

  //   useEnergySum = globalConfig['use-energy-sum'] ?? false;
  //   useCarbonSum = globalConfig['use-carbon-sum'] ?? false;
  //   includeCarbonEmissions = globalConfig['include-carbon-emissions'] ?? false;
  //   includeCarbonIntensity = globalConfig['include-carbon-intensity'] ?? false;

  //   let outputs: PluginParams[] = inputs;
  //   const climatiqApi = ClimatiqApi(String(process.env.CLIMATIQ_API_KEY));
  //   const cloudVendor = String(inputs[0]['cloud/vendor']);
  //   const converter = Converter();

  //   if (isValidVMRequest(inputs)) {
  //     console.log('VM Request');
  //     const climatiqData = await climatiqApi.fetchVMInstanceBatch(
  //       cloudVendor,
  //       converter.toVMInstanceBatch(inputs)
  //     );
  //     outputs = getVMInstanceOutputs(inputs, climatiqData.results);
  //   } else if (isValidCPURequest(inputs)) {
  //     console.log('CPU Request');
  //     const climatiqData = await climatiqApi.fetchCPUBatch(
  //       cloudVendor,
  //       converter.toCPUBatch(inputs)
  //     );
  //     outputs = getCPUOutputs(inputs, climatiqData.results);
  //   } else if (isValidStorageRequest(inputs)) {
  //     console.log('Storage Request');
  //     const climatiqData = await climatiqApi.fetchStorageBatch(
  //       cloudVendor,
  //       converter.toStorageBatch(inputs)
  //     );
  //     outputs = getStorageOutputs(inputs, climatiqData.results);
  //   } else if (isValidMemoryRequest(inputs)) {
  //     console.log('Memory Request');
  //     const climatiqData = await climatiqApi.fetchMemoryBatch(
  //       cloudVendor,
  //       converter.toMemoryBatch(inputs)
  //     );

  //     outputs = getMemoryOutputs(inputs, climatiqData.results);
  //   }

  //   return Promise.all(outputs);
  // };

  // // validates all inputs against required vm instance params
  // const isValidVMRequest = (inputs: PluginParams[]): boolean => {
  //   const schema = z.object({
  //     timestamp: z.coerce.date(),
  //     duration: z.number().gt(0),
  //     location: z.string(),
  //     'cloud/vendor': z.string(),
  //     'cloud/instance-type': z.string(),
  //     'cpu/utilization': z.number(),
  //   });

  //   for (const input of inputs) {
  //     const result = schema.safeParse(input);
  //     if (!result.success) return false;
  //   }

  //   return true;
  // };

  // const isValidCPURequest = (inputs: PluginParams[]): boolean => {
  //   const schema = z.object({
  //     timestamp: z.coerce.date(),
  //     duration: z.number().gt(0),
  //     location: z.string(),
  //     'cloud/vendor': z.string(),
  //     'vcpus-allocated': z.number(),
  //     'cpu/utilization': z.number(),
  //   });

  //   for (const input of inputs) {
  //     const result = schema.safeParse(input);
  //     if (!result.success) return false;
  //   }

  //   return true;
  // };

  // const isValidMemoryRequest = (inputs: PluginParams[]): boolean => {
  //   const schema = z.object({
  //     timestamp: z.coerce.date(),
  //     duration: z.number().gt(0),
  //     location: z.string(),
  //     'cloud/vendor': z.string(),
  //     'ram-alloc': z.number(),
  //   });

  //   for (const input of inputs) {
  //     const result = schema.safeParse(input);
  //     if (!result.success) return false;
  //   }

  //   return true;
  // };

  // const isValidStorageRequest = (inputs: PluginParams[]): boolean => {
  //   const schema = z.object({
  //     timestamp: z.coerce.date(),
  //     duration: z.number().gt(0),
  //     location: z.string(),
  //     'storage/type': z.enum(['ssd', 'hdd']),
  //     'storage/capacity': z.number(),
  //   });

  //   for (const input of inputs) {
  //     const result = schema.safeParse(input);
  //     if (!result.success) return false;
  //   }
  //   return true;
  // };

  // const getGridCarbonIntensity = (kgCO2e: number, energyKW: number): number => {
  //   return (kgCO2e / energyKW) * 1000;
  // };

  // // Returns enriched output array based on input plugin params and VMInstance batch results
  // const getVMInstanceOutputs = (
  //   inputs: PluginParams[],
  //   results: any
  // ): PluginParams[] => {
  //   return inputs.map(async (input, index) => {
  //     const result = results[index];
  //     const cpu_energy: number = result.calculation_details.energy_used_cpu;
  //     const memory_energy: number =
  //       result.calculation_details.energy_used_memory;
  //     const energy: number = cpu_energy + memory_energy;
  //     const operatingEmissions =
  //       result.memory_estimate.co2e + result.cpu_estimate.co2e;
  //     const carbonIntensity = getGridCarbonIntensity(
  //       operatingEmissions,
  //       energy
  //     );

  //     return {
  //       ...input,
  //       ...(useEnergySum
  //         ? {energy: energy}
  //         : {'cpu/energy': cpu_energy, 'memory/energy': memory_energy}),
  //       ...(includeCarbonEmissions
  //         ? useCarbonSum
  //           ? {carbon: operatingEmissions}
  //           : {
  //               'carbon-operational': operatingEmissions,
  //               'carbon-embodied': result.embodied_cpu_estimate.co2e,
  //             }
  //         : {}),
  //       ...(includeCarbonIntensity
  //         ? {'carbon-intensity': carbonIntensity}
  //         : {}),
  //     };
  //   });
  // };

  // // Returns enriched output array based on input plugin params and cpu batch results
  // const getCPUOutputs = (
  //   inputs: PluginParams[],
  //   results: any
  // ): PluginParams[] => {
  //   return inputs.map(async (input, index) => {
  //     const result = results[index];
  //     const cpu_energy: number = result.activity_data.activity_value;
  //     const energy: number = cpu_energy;
  //     const operatingEmissions = result.co2e;
  //     const carbonIntensity = getGridCarbonIntensity(
  //       operatingEmissions,
  //       energy
  //     );

  //     return {
  //       ...input,
  //       ...(useEnergySum ? {energy: energy} : {'cpu/energy': energy}),
  //       ...(includeCarbonEmissions
  //         ? useCarbonSum
  //           ? {carbon: operatingEmissions}
  //           : {'carbon-operational': operatingEmissions}
  //         : {}),
  //       ...(includeCarbonIntensity
  //         ? {'carbon-intensity': carbonIntensity}
  //         : {}),
  //     };
  //   });
  // };

  // // Returns enriched output array based on input plugin params and memory batch results
  // const getMemoryOutputs = (
  //   inputs: PluginParams[],
  //   results: any
  // ): PluginParams[] => {
  //   return inputs.map(async (input, index) => {
  //     const result = results[index];
  //     const memory_energy: number = result.activity_data.activity_value;
  //     const energy: number = memory_energy;
  //     const operatingEmissions = result.co2e;
  //     const carbonIntensity = getGridCarbonIntensity(
  //       operatingEmissions,
  //       energy
  //     );

  //     return {
  //       ...input,
  //       ...(useEnergySum ? {energy: energy} : {'memory/energy': memory_energy}),
  //       ...(includeCarbonEmissions
  //         ? useCarbonSum
  //           ? {carbon: operatingEmissions}
  //           : {'carbon-operational': operatingEmissions}
  //         : {}),
  //       ...(includeCarbonIntensity
  //         ? {'carbon-intensity': carbonIntensity}
  //         : {}),
  //     };
  //   });
  // };

  // // Returns enriched output array based on input plugin params and storage batch results
  // const getStorageOutputs = (
  //   inputs: PluginParams[],
  //   results: any
  // ): PluginParams[] => {
  //   return inputs.map(async (input, index) => {
  //     const result = results[index];
  //     const energy: number = result.activity_data.activity_value;
  //     const operatingEmissions = result.co2e;
  //     const carbonIntensity = getGridCarbonIntensity(
  //       operatingEmissions,
  //       energy
  //     );

      return {
        ...inputs,
        // energy: energy,
        // ...(includeCarbonEmissions
        //   ? useCarbonSum
        //     ? {carbon: operatingEmissions}
        //     : {'carbon-operational': operatingEmissions}
        //   : {}),
        // ...(includeCarbonIntensity
        //   ? {'carbon-intensity': carbonIntensity}
        //   : {}),
      };
    }
  // );
  // };

  return {
    metadata,
    execute,
  };
};
