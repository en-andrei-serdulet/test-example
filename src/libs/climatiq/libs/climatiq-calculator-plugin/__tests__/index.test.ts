/* eslint-disable node/no-extraneous-import */
// import {z, ZodError} from 'zod';
import {ClimatiqCalculator} from '../index';
import {mockGlobalConfig, mockInputs, mockOutputs} from '../__mocks__';
/* eslint-disable node/no-extraneous-import */

jest.mock('../index', () => {
  return {
    ClimatiqCalculator: jest.fn().mockImplementation(() => ({
      metadata: 'some metadata',
      execute: jest.fn(() => {
        return Promise.resolve(mockOutputs);
      }),
    })),
  };
});

describe('libs/climatiq-calculator-plugin', () => {
  describe('Climatiq', () => {
    describe('init', () => {
      it('successfully initalized', () => {
        const awsImporter = ClimatiqCalculator(mockGlobalConfig);
        expect(awsImporter).toHaveProperty('metadata');
        expect(awsImporter).toHaveProperty('execute');
      });
    });

    describe('execute():', () => {
      it('returns a result with valid inputs.', async () => {
        const climatiq = ClimatiqCalculator(mockGlobalConfig);
        const result = await climatiq.execute(mockInputs);

        expect(result).toStrictEqual(mockOutputs);
      });
    });
  });
});
