"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinalData = exports.getGeolocation = exports.getVolumeIds = exports.getFinalGroupedItems = exports.getMetricAverages = exports.groupItemsByKeys = exports.groupItems = exports.getInstanceTypes = exports.convertSecondsToMS = exports.convertBytesToGB = exports.calculateAverage = exports.inputSchema = exports.globalConfigSchema = exports.metricSchema = exports.awsImporterSchema = void 0;
var constants_1 = require("../constants/constants");
// eslint-disable-next-line node/no-extraneous-import
var zod_1 = require("zod");
/**
 * Methods for validations
 */
exports.awsImporterSchema = zod_1.z.object({
    tag: zod_1.z.string({
        required_error: "The 'tag' field is required for aws-importer.",
        invalid_type_error: "The 'tag' field must be a string.",
    }),
    location: zod_1.z.string({
        required_error: "The 'location' field is required for aws-importer.",
        invalid_type_error: "The 'location' field must be a string.",
    }),
    'aws-services': zod_1.z.string({
        required_error: "The 'aws-services' field is required for aws-services.",
        invalid_type_error: "The 'tag' field must be a string.",
    }),
    'aws-observation': zod_1.z
        .number({
        required_error: "The 'aws-observation' field is required for aws-importer.",
        invalid_type_error: "The 'aws-observation' field must be a number.",
    })
        .refine(function (n) { return n % 60 === 0; }, {
        message: 'aws-observation must be a multiple of 60.',
    }),
});
exports.metricSchema = zod_1.z.object({
    'cloudwatch-namespace': zod_1.z.string({
        required_error: "The 'cloudwatch-namespace' field is required for metric.",
        invalid_type_error: "The 'cloudwatch-namespace' field must be a string.",
    }),
    'client-namespace': zod_1.z.string({
        required_error: "The 'client-namespace' field is required for metric.",
        invalid_type_error: "The 'client-namespace' field must be a string.",
    }),
});
exports.globalConfigSchema = zod_1.z.object({
    'aws-importer': exports.awsImporterSchema.optional().refine(Boolean, {
        message: 'The aws-importer configuration is required.',
    }),
    metric: exports.metricSchema.optional().refine(Boolean, {
        message: 'The metric configuration is required.',
    }),
});
exports.inputSchema = zod_1.z.object({
    timestamp: zod_1.z
        .string({
        required_error: "The 'timestamp' field is required.",
        invalid_type_error: "The 'timestamp' field must be a string.",
    })
        .refine(function (val) { return !isNaN(Date.parse(val)); }, {
        message: 'Invalid timestamp; must be a valid ISO date string.',
    }),
    duration: zod_1.z
        .number({
        required_error: "The 'duration' field is required.",
        invalid_type_error: "The 'duration' field must be a number.",
    })
        .positive('Invalid duration; must be a positive number.'),
});
/**
 *   Methods for CloudWatch data
 */
function calculateAverage(datapoints, isPercentValue) {
    if (!datapoints || datapoints.length === 0) {
        return 0;
    }
    if (isPercentValue) {
        var sum = 0;
        for (var _i = 0, datapoints_1 = datapoints; _i < datapoints_1.length; _i++) {
            var datapoint = datapoints_1[_i];
            sum += datapoint.Average;
        }
        return sum / datapoints.length;
    }
    else {
        var sum = 0;
        for (var _a = 0, datapoints_2 = datapoints; _a < datapoints_2.length; _a++) {
            var datapoint = datapoints_2[_a];
            sum += (0, exports.convertBytesToGB)(datapoint.Average)
                ? (0, exports.convertBytesToGB)(datapoint.Average)
                : 0;
        }
        return sum / datapoints.length;
    }
}
exports.calculateAverage = calculateAverage;
var convertBytesToGB = function (value) {
    return value / Math.pow(1024, 3);
};
exports.convertBytesToGB = convertBytesToGB;
var convertSecondsToMS = function (value) {
    return value * 1000;
};
exports.convertSecondsToMS = convertSecondsToMS;
var getInstanceTypes = function (data) {
    var instanceTypes = new Set();
    data.forEach(function (item) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        item.Metrics.forEach(function (metric) {
            metric.Dimensions.forEach(function (dimension) {
                if (dimension.Name === 'InstanceType') {
                    instanceTypes.add(dimension.Value);
                }
            });
        });
    });
    return Array.from(instanceTypes);
};
exports.getInstanceTypes = getInstanceTypes;
var groupItems = function (items) {
    var groupedArray = [];
    for (var i = 0; i < items[constants_1.METRICS_CONFIG.MEM_TOTAL].length; i++) {
        var groupedObject = {};
        groupedObject[constants_1.METRICS_CONFIG.MEM_UTILIZATION] =
            items[constants_1.METRICS_CONFIG.MEM_TOTAL][i];
        groupedObject[constants_1.METRICS_CONFIG.CPU_UTILIZATION] =
            items[constants_1.METRICS_CONFIG.CPU_UTILIZATION_EC2][i];
        groupedArray.push(groupedObject);
    }
    return groupedArray;
};
exports.groupItems = groupItems;
var groupItemsByKeys = function (items) {
    return items.reduce(function (groups, item) {
        var key = Object.keys(item)[0];
        var value = item[key];
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(value);
        return groups;
    }, {});
};
exports.groupItemsByKeys = groupItemsByKeys;
var getMetricAverages = function (resolvedMetricData) {
    return resolvedMetricData
        .map(function (values) {
        return values.reduce(function (acc, value) {
            var _a;
            if (value.Datapoints &&
                (value.Label === constants_1.METRICS_CONFIG.MEM_TOTAL ||
                    value.Label === constants_1.METRICS_CONFIG.CPU_UTILIZATION_EC2)) {
                var isPercentValue = false;
                if (value.Label === constants_1.METRICS_CONFIG.CPU_UTILIZATION_EC2) {
                    isPercentValue = true;
                }
                var key = value.Label;
                var average = calculateAverage(value.Datapoints, isPercentValue);
                acc.push((_a = {}, _a[key] = average, _a));
            }
            return acc;
        }, []);
    })
        .flat();
};
exports.getMetricAverages = getMetricAverages;
var getFinalGroupedItems = function (resolvedMetricData) {
    var metricAverages = (0, exports.getMetricAverages)(resolvedMetricData);
    console.log('metricAverages', metricAverages);
    var groupedItems = (0, exports.groupItemsByKeys)(metricAverages);
    console.log('groupedItems', groupedItems);
    return (0, exports.groupItems)(groupedItems);
};
exports.getFinalGroupedItems = getFinalGroupedItems;
/**
 * Methods for EC2 volumes
 */
var getVolumeIds = function (instances) {
    if (!instances) {
        return [];
    }
    return instances.flatMap(function (_a) {
        var BlockDevices = _a.BlockDevices;
        if (BlockDevices) {
            return BlockDevices.map(function (device) { return device.VolumeId; });
        }
        else {
            return [];
        }
    });
};
exports.getVolumeIds = getVolumeIds;
/**
 * Method to get the geolocation
 */
var getGeolocation = function (region) {
    switch (region) {
        case 'us-east-2':
            return '40.3375813,-85.3089691';
        case 'us-east-1':
            return '38.8809212,-77.1845565';
        case 'us-west-1':
            return '37.757807,-122.5200005';
        case 'us-west-2':
            return '44.0316884,-125.8648088';
        case 'af-south-1':
            return '-33.9145291,18.3264237';
        case 'ap-east-1':
            return '22.3530259,113.8097542';
        case 'ap-south-2':
            return '17.4127332,78.078398';
        case 'ap-southeast-3':
            return '-6.2287349,106.2386631';
        case 'ap-southeast-4':
            return '-37.9715652,144.7235026';
        case 'ap-south-1':
            return '19.082502,72.7163771';
        case 'ap-northeast-3':
            return '34.6777115,135.4036368';
        case 'ap-northeast-2':
            return '37.5639487,126.3833576';
        case 'ap-southeast-1':
            return '1.3146649,103.5146006';
        case 'ap-southeast-2':
            return '-33.8472349,150.602339';
        case 'ap-northeast-1':
            return '35.5042974,138.4506645';
        case 'ca-central-1':
            return '53.0194946,-124.4588843';
        case 'ca-west-1':
            return '52.9399159,-106.4508639';
        case 'eu-central-1':
            return '50.1213155,8.471759';
        case 'eu-west-1':
            return '53.0136462,-17.6787131';
        case 'eu-west-2':
            return '51.528607,-0.431226';
        case 'eu-south-1':
            return '51.5285378,-0.4312275';
        case 'eu-west-3':
            return '48.8589633,2.18223';
        case 'eu-south-2':
            return '35.3445091,-17.5680782';
        case 'eu-north-1':
            return '59.3262131,17.8172496';
        case 'eu-central-2':
            return '47.377295,8.2414212';
        case 'il-central-1':
            return '32.0879976,34.7560465';
        case 'me-south-1':
            return '25.9411945,50.2579319';
        case 'me-central-1':
            return '24.0651122,44.398553';
        case 'sa-east-1':
            return '-23.6814347,-46.9249413';
        default:
            return 'Unknown region';
    }
};
exports.getGeolocation = getGeolocation;
var getFinalData = function (servicesArray, allCloudWatchData, diskData) {
    var finalData = [];
    if (servicesArray.includes('ec2')) {
        finalData = __spreadArray(__spreadArray([], finalData, true), allCloudWatchData, true);
    }
    if (servicesArray.includes('ebs')) {
        finalData = __spreadArray(__spreadArray([], finalData, true), diskData, true);
    }
    return finalData;
};
exports.getFinalData = getFinalData;
