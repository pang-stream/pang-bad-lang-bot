import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.spec.ts'], // '<rootDir>' 추가
    moduleFileExtensions: ['ts', 'js'],
};
export default config;