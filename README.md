# ETL Processing Test | 2023
The following test will demonstrate experience with requirements gathering, JavaScript, ETL, data structures, code/repo structure, code readability, naming conventions, and unit testing.

### Input & Output Folders
- root_directory/input: This folder includes .gz files for json input
- root_director/output: Json files for ETL Processing result will go into this folder. Initially we should have at least empty folder.

### Features

- TypeScript v4
- Testing with Jest
- Linting with Eslint and Prettier
- Local development with Nodemon

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.
