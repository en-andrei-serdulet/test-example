"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
// Convert input plugin params to Climatiq batch requests
var Converter = function () {
    var toRegion = function (location) {
        return location.split('-').join('_');
    };
    var toVMInstanceBatch = function (inputs) {
        return inputs.map(toVMInstance);
    };
    var toVMInstance = function (input) {
        return {
            instance: input['cloud/instance-type'],
            region: toRegion(input['location']),
            average_vcpu_utilization: input['cpu/utilization'],
            year: new Date(input['timestamp']).getUTCFullYear(),
            duration: input['duration'],
            duration_unit: 's',
        };
    };
    var toCPUBatch = function (inputs) {
        return inputs.map(toCPU);
    };
    var toCPU = function (input) {
        return {
            region: toRegion(input['location']),
            cpu_count: 2,
            average_vcpu_utilization: input['cpu/utilization'],
            year: new Date(input['timestamp']).getUTCFullYear(),
            duration: input['duration'],
            duration_unit: 's',
        };
    };
    var toMemoryBatch = function (inputs) {
        return inputs.map(toMemory);
    };
    var toMemory = function (input) {
        return {
            region: toRegion(input['location']),
            data: 256,
            year: new Date(input['timestamp']).getUTCFullYear(),
            duration: input['duration'],
            duration_unit: 's',
            data_unit: 'GB',
        };
    };
    var toStorageBatch = function (inputs) {
        return inputs.map(toStorage);
    };
    var toStorage = function (input) {
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
        toVMInstanceBatch: toVMInstanceBatch,
        toCPUBatch: toCPUBatch,
        toMemoryBatch: toMemoryBatch,
        toStorageBatch: toStorageBatch,
    };
};
exports.Converter = Converter;
