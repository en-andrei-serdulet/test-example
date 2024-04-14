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
exports.getCloudWatchData = void 0;
var utils_1 = require("../utils/utils");
var client_cloudwatch_1 = require("@aws-sdk/client-cloudwatch");
var get_cloudwatch_metrics_1 = require("./get-cloudwatch-metrics");
var constants_1 = require("../constants/constants");
var getCloudWatchData = function (input, globalConfig, instances, region, credentials) { return __awaiter(void 0, void 0, void 0, function () {
    // Generates an array of GetMetricStatisticsCommandInput objects for a specific metric type
    // (e.g., total memory or CPU utilization) from the list of metrics fetched.
    function combineCommands(metricType, list) {
        var commands = [];
        list.forEach(function (instance) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            instance.Metrics.forEach(function (metric) {
                if (metric.MetricName === metricType) {
                    commands.push({
                        Dimensions: metric.Dimensions,
                        MetricName: metric.MetricName,
                        Namespace: metric.Namespace,
                        Period: globalConfig['aws-importer']['aws-observation'],
                        Unit: metricType.includes('mem') ? 'Bytes' : 'Percent',
                        Statistics: ['Average'],
                        StartTime: new Date(timestamp),
                        EndTime: new Date(new Date(timestamp).getTime() + duration),
                    });
                }
            });
        });
        return commands;
    }
    var _a, timestamp, duration, cloudWatch, listMetricsCloudWatch, listMetricsEc2, getTotalMemoryCommands, getCpuUsageCommands, totalMemoryPromises, cpuUsagePromises, metricDataPromises, resolvedMetricData, groupedItemsArray, instanceTypes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = __assign(__assign({}, input), { duration: (0, utils_1.convertSecondsToMS)(input.duration) }), timestamp = _a.timestamp, duration = _a.duration;
                cloudWatch = new client_cloudwatch_1.CloudWatchClient({
                    region: region,
                    credentials: credentials,
                });
                return [4 /*yield*/, Promise.all((0, get_cloudwatch_metrics_1.getCloudwatchMetrics)(instances, cloudWatch, globalConfig.metric['cloudwatch-namespace']))];
            case 1:
                listMetricsCloudWatch = _b.sent();
                return [4 /*yield*/, Promise.all((0, get_cloudwatch_metrics_1.getCloudwatchMetrics)(instances, cloudWatch, globalConfig.metric['client-namespace']))];
            case 2:
                listMetricsEc2 = _b.sent();
                getTotalMemoryCommands = combineCommands(constants_1.METRICS_CONFIG.MEM_TOTAL, listMetricsCloudWatch);
                getCpuUsageCommands = combineCommands(constants_1.METRICS_CONFIG.CPU_UTILIZATION_EC2, listMetricsEc2);
                totalMemoryPromises = getTotalMemoryCommands.map(function (command) {
                    return cloudWatch.send(new client_cloudwatch_1.GetMetricStatisticsCommand(command));
                });
                cpuUsagePromises = getCpuUsageCommands.map(function (command) {
                    return cloudWatch.send(new client_cloudwatch_1.GetMetricStatisticsCommand(command));
                });
                return [4 /*yield*/, Promise.all([
                        totalMemoryPromises,
                        cpuUsagePromises,
                    ])];
            case 3:
                metricDataPromises = _b.sent();
                return [4 /*yield*/, Promise.all(metricDataPromises.map(function (innerPromises) { return Promise.all(innerPromises); }))];
            case 4:
                resolvedMetricData = _b.sent();
                groupedItemsArray = (0, utils_1.getFinalGroupedItems)(resolvedMetricData);
                instanceTypes = (0, utils_1.getInstanceTypes)(listMetricsCloudWatch);
                return [2 /*return*/, { groupedItemsArray: groupedItemsArray, instanceTypes: instanceTypes }];
        }
    });
}); };
exports.getCloudWatchData = getCloudWatchData;
