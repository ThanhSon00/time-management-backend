import { beforeAll, beforeEach, afterAll } from '@jest/globals';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/database/data-source';

let testDataSource: DataSource;

const setupTestDB = () => {
  beforeAll(async () => {
    testDataSource = AppDataSource;
    if (!testDataSource.isInitialized) {
      await testDataSource.initialize();
    }
  });

  beforeEach(async () => {
    if (testDataSource.isInitialized) {
      await testDataSource.synchronize(true);
    }
  });

  afterAll(async () => {
    if (testDataSource.isInitialized) {
      await testDataSource.destroy();
    }
  });
};

export default setupTestDB;
