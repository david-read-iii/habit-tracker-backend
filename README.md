# Habit Tracker Backend

Contains the backend logic related to Habit Tracker.

## Project Setup

### 1. Install Homebrew

Homebrew is a package manager for macOS that will help you install the necessary dependencies.

1. Visit [https://brew.sh/](https://brew.sh/) and follow the installation instructions
2. After installation, Homebrew should be automatically added to your PATH
3. Verify the installation by running:
   ```bash
   brew --version
   ```

### 2. Install Node.js via NVM

Node Version Manager (NVM) allows you to manage multiple Node.js versions on your machine.

1. Install NVM using Homebrew:
   ```bash
   brew install nvm
   ```

2. Install the latest LTS (Long Term Support) version of Node.js:
   ```bash
   nvm install --lts
   ```

3. Activate the LTS version:
   ```bash
   nvm use --lts
   ```

4. Verify Node.js and npm are correctly installed:
   ```bash
   node --version
   npm --version
   ```

### 3. Install Project Dependencies

In the project root directory, install all npm dependencies:

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in the project root directory with the following variables:

```env
MONGO_URI="mongodb://localhost:27017/habit-tracker"
NODE_ENV="development"
PORT="3000"
JWT_SECRET="test_secret"
```

**Note:** For development purposes, the `JWT_SECRET` can be any string. In production, use a strong, randomly generated secret.

### 5. Install and Configure MongoDB

MongoDB is the database used by this backend.

1. Tap the MongoDB Homebrew tap:
   ```bash
   brew tap mongodb/brew
   ```

2. Install MongoDB Community Edition:
   ```bash
   brew install mongodb-community
   ```

3. Verify the installation:
   ```bash
   mongod --version
   ```

### 6. Setup MongoDB Compass (Optional but Recommended)

MongoDB Compass is a GUI tool for viewing and managing your database.

1. Download MongoDB Compass from [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)
2. Once installed, open MongoDB Compass and create a new connection:
   - **Connection String (URI):** `mongodb://localhost:27017`
   - **Connection Name:** `habit-tracker`
3. Click "Save & Connect" to establish the connection
4. You can now browse your habit-tracker database and collections

## Link with Android App

To connect the Android app to this backend server:

1. In your Android project's Retrofit configuration, ensure the base URL is set to:
   ```
   http://10.0.2.2:3000/
   ```
   
   **Note:** Use `10.0.2.2` instead of `localhost` because the Android emulator runs in a virtual machine. This special address allows the emulator to access your machine's localhost.

## Start Local Test

1. Start MongoDB

```bash
brew services start mongodb/brew/mongodb-community
```

2. Run the server
```bash
node src/index.js
```

3. Start testing!
   - Use Postman to mimic service calls.
   - Use MongoDB Compass to verify database entries.
   - Use Swagger to view API documentation. Open [this link](http://localhost:3000/api-docs) in browser.

## Stop Local Test

1. Kill server by doing Ctrl + C

2. Stop MongoDB
```bash
brew services stop mongodb/brew/mongodb-community
```

## Run Unit Tests

```bash
npm run test
```

## Run Unit Test Coverage

```bash
npx jest --coverage
```
