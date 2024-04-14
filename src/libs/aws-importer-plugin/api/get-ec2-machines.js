"use strict";
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
exports.getEC2Machines = void 0;
/* eslint-disable node/no-extraneous-import */
var client_ec2_1 = require("@aws-sdk/client-ec2");
var getEC2Machines = function (_a) {
    var region = _a.region, credentials = _a.credentials, tag = _a.tag;
    return __awaiter(void 0, void 0, void 0, function () {
        var ec2Client, command, ec2Machines, ec2MachinesData;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ec2Client = new client_ec2_1.EC2Client({
                        region: region,
                        credentials: credentials,
                    });
                    command = new client_ec2_1.DescribeInstancesCommand({
                        Filters: [
                            {
                                Name: 'tag:Project',
                                Values: [tag],
                            },
                            {
                                Name: 'instance-state-name',
                                Values: ['running'],
                            },
                        ],
                    });
                    return [4 /*yield*/, ec2Client.send(command)];
                case 1:
                    ec2Machines = _c.sent();
                    ec2MachinesData = (_b = ec2Machines.Reservations) === null || _b === void 0 ? void 0 : _b.flatMap(function (instances) { return instances.Instances; }).map(function (instance) {
                        var _a;
                        return ({
                            InstanceId: instance === null || instance === void 0 ? void 0 : instance.InstanceId,
                            ImageId: instance === null || instance === void 0 ? void 0 : instance.ImageId,
                            InstanceType: instance === null || instance === void 0 ? void 0 : instance.InstanceType,
                            RootDeviceName: instance === null || instance === void 0 ? void 0 : instance.RootDeviceName,
                            BlockDevices: (_a = instance === null || instance === void 0 ? void 0 : instance.BlockDeviceMappings) === null || _a === void 0 ? void 0 : _a.map(function (bdm) {
                                var _a;
                                return ({
                                    DeviceName: bdm.DeviceName,
                                    VolumeId: (_a = bdm.Ebs) === null || _a === void 0 ? void 0 : _a.VolumeId,
                                });
                            }),
                        });
                    });
                    /**
                     * The formatted data is necessary for the usage in calls such as CloudWatch or by getting the volumes, if there are no instances found
                     * it will return an empty array
                     */
                    // @ts-ignore
                    console.log('ec2MachinesData', ec2MachinesData);
                    return [2 /*return*/, ec2MachinesData !== null && ec2MachinesData !== void 0 ? ec2MachinesData : []];
            }
        });
    });
};
exports.getEC2Machines = getEC2Machines;
