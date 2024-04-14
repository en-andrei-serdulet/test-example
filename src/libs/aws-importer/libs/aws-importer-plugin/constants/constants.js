"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METRICS_CONFIG = exports.VOLUME_CONFIG = exports.DIMENSIONS = void 0;
exports.DIMENSIONS = {
    INSTANCE_ID: 'InstanceId',
};
exports.VOLUME_CONFIG = {
    GP3_ID: 'gp3',
    SSD_ID: 'ssd',
    SC1_ID: 'sc1',
    HDD_ID: 'hdd',
    UNDEFINED: undefined,
};
exports.METRICS_CONFIG = {
    MEM_TOTAL: 'mem_total',
    MEM_UTILIZATION: 'memory/utilization',
    CPU_UTILIZATION_EC2: 'CPUUtilization',
    CPU_UTILIZATION: 'cpu/utilization',
};
