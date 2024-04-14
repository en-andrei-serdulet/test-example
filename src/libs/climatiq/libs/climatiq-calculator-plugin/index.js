"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClimatiqCalculator = void 0;
// import {YourGlobalConfig} from './types';
// import {ClimatiqApi} from './climatiq-api';
// import {Converter} from './converter';
/* eslint-disable node/no-extraneous-import */
// import * as dotenv from 'dotenv';
// import {log} from 'console';
var ClimatiqCalculator = function (
// globalConfig: YourGlobalConfig
) {
    var metadata = {
        kind: 'execute',
    };
    // let useEnergySum = false;
    // let useCarbonSum = false;
    // let includeCarbonEmissions = false;
    // let includeCarbonIntensity = false;
    var execute = function (inputs) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('climatiq', inputs);
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
            return [2 /*return*/, __assign({}, inputs)];
        });
    }); };
    // );
    // };
    return {
        metadata: metadata,
        execute: execute,
    };
};
exports.ClimatiqCalculator = ClimatiqCalculator;
