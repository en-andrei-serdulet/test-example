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
exports.AwsImporter = void 0;
// import {AWSCredentials, YourGlobalConfig} from './types';
/* eslint-disable node/no-extraneous-import */
// import * as dotenv from 'dotenv';
// import {getEC2Machines} from './api/get-ec2-machines';
// import {
//   getFinalData,
//   getGeolocation,
//   getVolumeIds,
//   globalConfigSchema,
//   inputSchema,
// } from './utils/utils';
// import {getEc2Volumes} from './api/get-ec2-volumes';
// import {getCloudWatchData} from './api/get-cloudwatch-data';
// import {z, ZodError} from 'zod';
/* eslint-disable node/no-extraneous-import */
var AwsImporter = function (
// globalConfig: YourGlobalConfig
) {
    var metadata = {
        kind: 'execute',
    };
    /**
     * Execute's strategy description here.
     */
    var execute = function (inputs) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('aws-importer', inputs);
            return [2 /*return*/, inputs
                // /**
                //  * Validations
                //  */
                // const inputsSchema = z.array(inputSchema);
                // try {
                //   globalConfigSchema.parse(config ? config : globalConfig);
                //   inputsSchema.parse(inputs);
                // } catch (error) {
                //   if (error instanceof ZodError) {
                //     error.errors.map(e => {
                //       throw new Error(e.message);
                //     });
                //   } else {
                //     throw error;
                //   }
                // }
                // dotenv.config();
                // const {tag} = globalConfig['aws-importer'];
                // const {location: region} = globalConfig['aws-importer'];
                // const credentials: AWSCredentials = {
                //   accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
                //   secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
                // };
                // /**
                //  * Async function to get EC2 Machines based on the tag and region
                //  */
                // const instances = await getEC2Machines({region, credentials, tag});
                // /**
                //  * Filters the BlockDevices from each instance and creates an array of volume IDs used to receive the EC2 Volumes
                //  */
                // const volumeIds = getVolumeIds(instances);
                // /**
                //  * Async function to get EC2 Volumes based on the tag, region and specific volumes IDs
                //  */
                // const volumesData = await getEc2Volumes({
                //   tag,
                //   region,
                //   volumeIds,
                //   credentials,
                // });
                // const outputs = inputs.map(async input => {
                //   const cloudWatchData = await getCloudWatchData(
                //     input,
                //     globalConfig,
                //     instances,
                //     region,
                //     credentials
                //   );
                //   const allCloudWatchData = cloudWatchData.groupedItemsArray.map(value => {
                //     return {
                //       ...input,
                //       location: region,
                //       geolocation: getGeolocation(region),
                //       'cloud/vendor': 'aws',
                //       'cloud/service': 'ec2',
                //       'cloud/instance-type': cloudWatchData.instanceTypes[0],
                //       ...value,
                //     };
                //   });
                //   const diskData = volumesData.flatMap(value => {
                //     return {
                //       ...input,
                //       location: region,
                //       geolocation: getGeolocation(region),
                //       'cloud/vendor': 'aws',
                //       'cloud/service': 'ebs',
                //       ...value,
                //     };
                //   });
                //   const awsService: string[] =
                //     globalConfig['aws-importer']['aws-services'].split(', ');
                //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //   // @ts-ignore
                //   // We're using the aws-services to determine the output data if it will contain based on the ec2, ebs or both
                //   return getFinalData(awsService, allCloudWatchData, diskData);
                // });
                // const resolvedOutputs = await Promise.all(outputs);
                // return resolvedOutputs.flat();
            ];
        });
    }); };
    return {
        metadata: metadata,
        execute: execute,
    };
};
exports.AwsImporter = AwsImporter;
