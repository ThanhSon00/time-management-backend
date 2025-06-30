# Test Database Setup

This directory contains utilities for setting up and managing test databases using TypeORM.

## Files

- `setupTestDB.ts` - Main utility for database connection, data clearing, and disconnection
- `test-database.config.ts` - Configuration for test database connection
- `README.md` - This documentation file

## Usage

### 1. Import the setup utility in your test file

```typescript
import setupTestDB from '../utils/setupTestDB';

describe('Your Test Suite', () => {
  setupTestDB(); // This will handle database setup/teardown

  it('should test something', async () => {
    // Your test code here
    // The database will be automatically cleared before this test runs
  });
});
```

### 2. Environment Configuration

Create a `.env.test` file in the backend root directory based on `env-example-test`:

```bash
# Copy the example file
cp env-example-test .env.test

# Edit the file with your test database settings
```

### 3. Required Environment Variables

The following environment variables are used for test database configuration:

- `DATABASE_TYPE` - Database type (e.g., 'postgres', 'mysql')
- `DATABASE_HOST` - Database host
- `DATABASE_PORT` - Database port
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password
- `TEST_DATABASE_NAME` - Test database name (defaults to 'test_api')
- `DATABASE_SYNCHRONIZE` - Whether to synchronize schema (set to 'true' for tests)
- `DATABASE_MAX_CONNECTIONS` - Maximum connection pool size
- `DATABASE_SSL_ENABLED` - Whether SSL is enabled
- `DATABASE_REJECT_UNAUTHORIZED` - Whether to reject unauthorized SSL connections

### 4. Features

#### Automatic Database Connection
- Creates a dedicated test database connection
- Uses separate database name to avoid conflicts with development data
- Enables schema synchronization for tests

#### Data Clearing
- Automatically clears all data from all tables before each test
- Ensures test isolation
- Uses TypeORM's `repository.clear()` method for efficient clearing

#### Proper Cleanup
- Closes database connection after all tests complete
- Prevents connection leaks
- Ensures clean test environment

### 5. Example Test

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import setupTestDB from '../utils/setupTestDB';

describe('User Service', () => {
  let module: TestingModule;
  let userRepository: any;

  setupTestDB();

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            // ... other repository methods
          },
        },
      ],
    }).compile();

    userRepository = module.get(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    // Test implementation
    // Database is automatically cleared before this test
  });
});
```

### 6. Running Tests

```bash
# Run all tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with database setup
npm run test:e2e:relational:docker
```

## Notes

- The test database setup uses a separate database name to avoid conflicts
- Schema synchronization is enabled for tests to ensure tables are created
- All data is cleared before each test to ensure test isolation
- The setup is compatible with Jest's lifecycle hooks
- SSL configuration is supported for secure database connections 