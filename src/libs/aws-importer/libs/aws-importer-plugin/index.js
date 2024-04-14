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
exports.AwsImporter = void 0;
/* eslint-disable node/no-extraneous-import */
var dotenv = require("dotenv");
var get_ec2_machines_1 = require("./api/get-ec2-machines");
var utils_1 = require("./utils/utils");
var get_ec2_volumes_1 = require("./api/get-ec2-volumes");
var get_cloudwatch_data_1 = require("./api/get-cloudwatch-data");
var zod_1 = require("zod");
/* eslint-disable node/no-extraneous-import */
var AwsImporter = function (globalConfig) {
    var metadata = {
        kind: 'execute',
    };
    /**
     * Execute's strategy description here.
     */
    var execute = function (inputs, config) { return __awaiter(void 0, void 0, void 0, function () {
        var inputsSchema, tag, region, credentials, instances, volumeIds, volumesData, outputs, resolvedOutputs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputsSchema = zod_1.z.array(utils_1.inputSchema);
                    try {
                        utils_1.globalConfigSchema.parse(config ? config : globalConfig);
                        inputsSchema.parse(inputs);
                    }
                    catch (error) {
                        if (error instanceof zod_1.ZodError) {
                            error.errors.map(function (e) {
                                throw new Error(e.message);
                            });
                        }
                        else {
                            throw error;
                        }
                    }
                    dotenv.config();
                    tag = globalConfig['aws-importer'].tag;
                    region = globalConfig['aws-importer'].location;
                    credentials = {
                        accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
                        secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
                    };
                    return [4 /*yield*/, (0, get_ec2_machines_1.getEC2Machines)({ region: region, credentials: credentials, tag: tag })];
                case 1:
                    instances = _a.sent();
                    volumeIds = (0, utils_1.getVolumeIds)(instances);
                    return [4 /*yield*/, (0, get_ec2_volumes_1.getEc2Volumes)({
                            tag: tag,
                            region: region,
                            volumeIds: volumeIds,
                            credentials: credentials,
                        })];
                case 2:
                    volumesData = _a.sent();
                    outputs = inputs.map(function (input) { return __awaiter(void 0, void 0, void 0, function () {
                        var cloudWatchData, allCloudWatchData, diskData, awsService;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, get_cloudwatch_data_1.getCloudWatchData)(input, globalConfig, instances, region, credentials)];
                                case 1:
                                    cloudWatchData = _a.sent();
                                    allCloudWatchData = cloudWatchData.groupedItemsArray.map(function (value) {
                                        return __assign(__assign(__assign({}, input), { location: region, geolocation: (0, utils_1.getGeolocation)(region), 'cloud/vendor': 'aws', 'cloud/service': 'ec2', 'cloud/instance-type': cloudWatchData.instanceTypes[0] }), value);
                                    });
                                    diskData = volumesData.flatMap(function (value) {
                                        return __assign(__assign(__assign({}, input), { location: region, geolocation: (0, utils_1.getGeolocation)(region), 'cloud/vendor': 'aws', 'cloud/service': 'ebs' }), value);
                                    });
                                    awsService = globalConfig['aws-importer']['aws-services'].split(', ');
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    // We're using the aws-services to determine the output data if it will contain based on the ec2, ebs or both
                                    return [2 /*return*/, (0, utils_1.getFinalData)(awsService, allCloudWatchData, diskData)];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(outputs)];
                case 3:
                    resolvedOutputs = _a.sent();
                    return [2 /*return*/, resolvedOutputs.flat()];
            }
        });
    }); };
    return {
        metadata: metadata,
        execute: execute,
    };
};
exports.AwsImporter = AwsImporter;
