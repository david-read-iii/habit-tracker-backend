# Habit Tracker Backend

A RESTful backend API for the Habit Tracker application, built with Express.js and MongoDB. This server handles user authentication, habit management, and check-in tracking with timezone support.

## Overview

The Habit Tracker Backend provides a complete REST API for managing daily habits with the following capabilities:
- 👤 **User Management**: Sign up, login, and JWT-based authentication
- 📋 **Habit Management**: Create, read, update, and delete habits
- ✅ **Check-ins**: Track daily habit completions with timezone support
- 📚 **API Documentation**: Interactive Swagger UI for testing endpoints

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework for REST API |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT (jsonwebtoken)** | Secure token-based authentication |
| **bcryptjs** | Password hashing and security |
| **moment-timezone** | Timezone handling for check-ins |
| **Swagger/OpenAPI** | API documentation and testing UI |
| **Jest** | Unit testing framework |

## Project Structure

```
src/
├── index.js                    # Application entry point
├── config/
│   ├── loadRoutes.js          # Route registration
│   └── swagger.js             # Swagger/OpenAPI configuration
├── controller/                # Request handlers
│   ├── addCheckInController.js
│   ├── addHabitController.js
│   ├── deleteHabitController.js
│   ├── editHabitController.js
│   ├── getHabitsController.js
│   ├── loginController.js
│   ├── signupController.js
│   └── timezoneController.js
├── middleware/                # Express middleware
│   └── authentication.js       # JWT verification
├── model/                     # Mongoose schemas
│   ├── User.js               # User model
│   ├── Habit.js              # Habit model
│   └── CheckIn.js            # Check-in model
├── route/                     # API route definitions
│   ├── login.js
│   ├── signup.js
│   ├── addHabit.js
│   ├── editHabit.js
│   ├── deleteHabit.js
│   ├── getHabits.js
│   ├── addCheckIn.js
│   └── timezone.js
└── util/                      # Utility functions
    ├── signJwt.js            # JWT token generation
    ├── toCleanHabit.js       # Habit response formatting
    └── toCleanCheckIn.js     # Check-in response formatting

test/                          # Unit tests
├── controller/
├── middleware/
└── util/

coverage/                      # Test coverage reports
```

## API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| **POST** | `/auth/signup` | Register a new user | ❌ |
| **POST** | `/auth/login` | Authenticate and receive JWT | ❌ |
| **GET** | `/habits` | Retrieve all habits for user | ✅ |
| **POST** | `/habits/add` | Create a new habit | ✅ |
| **PUT** | `/habits/edit` | Update an existing habit | ✅ |
| **DELETE** | `/habits/:id` | Delete a habit | ✅ |
| **POST** | `/check-in/add` | Record a habit check-in | ✅ |
| **GET** | `/timezone` | Get current server timezone | ✅ |

For interactive API testing and detailed endpoint documentation, visit the **Swagger UI** at `http://localhost:3000/api-docs` after starting the server.

## Architecture Overview

### Authentication Flow
```
User Signup/Login
    ↓
Password hashed with bcryptjs
    ↓
JWT token generated and returned
    ↓
Client includes token in Authorization header
    ↓
Express middleware verifies token
    ↓
Authenticated routes process request
```

### Data Flow
```
Request → Route → Middleware (Auth) → Controller → Model → MongoDB
    ↑________________________________________________________________↓
                       Response with formatted data
```

### Timezone Support

The `/timezone` endpoint provides timezone information to the client:
- Helps ensure check-ins are recorded with correct timezone
- Client can validate user's timezone settings
- Prevents check-in timestamp discrepancies

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
# Database Configuration
MONGO_URI="mongodb://localhost:27017/habit-tracker"

# Server Configuration
NODE_ENV="development"
PORT="3000"

# Security
JWT_SECRET="test_secret"
```

**Environment Variables Reference:**

| Variable | Purpose | Example | Notes |
|----------|---------|---------|-------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/habit-tracker` | For production, use MongoDB Atlas or a managed service |
| `NODE_ENV` | Environment mode | `development` or `production` | Controls Swagger UI availability (disabled in production) |
| `PORT` | Server listening port | `3000` | Ensure port is not in use on your machine |
| `JWT_SECRET` | Secret key for JWT tokens | Strong random string | ⚠️ **In production, use a strong, randomly generated secret** |

**Security Best Practices:**
- Never commit `.env` files to version control
- Use strong, randomly generated `JWT_SECRET` in production
- Rotate secrets periodically
- Use environment-specific configurations for different deployments

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



## Mobile App Integration

### Android App Configuration

To connect the Android app to this backend server:

1. In your Android project's Retrofit configuration, set the base URL:
   ```
   http://10.0.2.2:3000/
   ```
   
   **⚠️ Important:** Use `10.0.2.2` instead of `localhost` because the Android emulator runs in a virtual machine. This special address allows the emulator to access your development machine's localhost.

2. **For physical Android devices on same network:**
   ```
   http://<YOUR_MACHINE_IP>:3000/
   ```
   
   Find your machine IP:
   ```bash
   ipconfig getifaddr en0  # macOS
   ```

3. **Include JWT token** in request headers:
   ```
   Authorization: Bearer <jwt_token_from_login>
   ```

### Testing Android Integration

1. Start backend server and MongoDB
2. Deploy/run Android app in emulator or device
3. Test signup and login flows
4. Verify requests appear in MongoDB Compass
5. Monitor network requests in Android Logcat

## Contributing

### Code Style
- Follow existing code patterns in the project
- Use meaningful variable and function names
- Add comments for complex logic

### Adding New Routes

1. Create route file in `src/route/`
2. Create corresponding controller in `src/controller/`
3. Add middleware as needed in `src/middleware/`
4. Register route in `src/config/loadRoutes.js`
5. Add Swagger documentation comments
6. Write unit tests in `test/`

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and test
npm run test

# Commit with descriptive messages
git commit -m "Add feature: description"

# Push and create pull request
git push origin feature/feature-name
```

## Start Local Development

### Prerequisites Checklist
- ✅ Node.js and npm installed
- ✅ MongoDB installed and MongoDB Community Edition accessible
- ✅ `.env` file created with required variables
- ✅ Dependencies installed (`npm install`)

### 1. Start MongoDB

```bash
brew services start mongodb/brew/mongodb-community
```

**Verify MongoDB is running:**
```bash
# Check if MongoDB is listening
lsof -i :27017

# Or use MongoDB shell (if installed)
mongosh
```

### 2. Run the Server

```bash
node src/index.js
```

**Expected output:**
```
Connected to MongoDB
Server listening on 0.0.0.0:3000
```

### 3. Setup MongoDB Compass (Optional but Recommended)

MongoDB Compass is a GUI tool for viewing and managing your database.

1. Download MongoDB Compass from [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)
2. Once installed, open MongoDB Compass and create a new connection:
   - **Connection String (URI):** `mongodb://localhost:27017`
   - **Connection Name:** `habit-tracker`
3. Click "Save & Connect" to establish the connection
4. You can now browse your habit-tracker database and collections

### 4. Verify API is Running

- **Swagger UI Documentation**: Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser to test endpoints interactively
- **Test with Postman**: Import the Swagger spec or create requests manually
- **Verify with MongoDB Compass**: Browse collections in your `habit-tracker` database

## Development Workflow

### Using Postman for API Testing

1. **Test authentication flow:**
   ```
   POST http://localhost:3000/auth/signup
   Body (JSON): { "username": "testuser", "password": "testpass" }
   ```

2. **Get JWT token and use it:**
   - Copy the `token` from signup or login response
   - For authenticated endpoints, add header: `Authorization: Bearer <your_token>`

3. **Test other endpoints** using the token

### Using MongoDB Compass

1. Create connection to `mongodb://localhost:27017`
2. Connection name: `habit-tracker`
3. Browse collections:
   - `users` - User accounts
   - `habits` - Habit definitions
   - `checkins` - Check-in records

### Using Swagger UI

Navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to test endpoints interactively:
1. Endpoints are grouped by feature
2. Click "Try it out" to test any endpoint directly
3. For protected endpoints, use the "Authorize" button to add your JWT token

## Testing

### Run Unit Tests

```bash
npm run test
```

This runs all tests in the `test/` directory using Jest and displays results in your terminal.

### Generate Test Coverage Report

```bash
npx jest --coverage
```

**View coverage report:**
1. Open `coverage/lcov-report/index.html` in your browser
2. Check coverage percentage for controllers, middleware, models, and utilities
3. Identify untested code and add tests as needed

**Coverage files generated:**
- `coverage/lcov.info` - LCOV format (for CI/CD integration)
- `coverage/clover.xml` - Clover format (for SonarQube integration)
- `coverage/lcov-report/` - HTML report (browser-viewable)

### Run Tests in Watch Mode

```bash
npm run test -- --watch
```

Automatically reruns tests when files are modified. Useful during development.

### Run Specific Test File

```bash
npm run test -- test/controller/addHabitController.test.js
```

## Stop Local Development

### 1. Kill Server
```bash
# Press Ctrl + C in the terminal where the server is running
```

### 2. Stop MongoDB
```bash
brew services stop mongodb/brew/mongodb-community
```

### Optional: Verify Services are Stopped
```bash
# Check if MongoDB is still running
lsof -i :27017

# Check if Node.js server is still running
lsof -i :3000
```

## Troubleshooting

### MongoDB Connection Issues

**Problem:** `MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
```bash
# 1. Verify MongoDB is installed
brew ls mongodb-community

# 2. Start MongoDB service
brew services start mongodb/brew/mongodb-community

# 3. Verify it's running
brew services list | grep mongodb

# 4. Check if port 27017 is available
lsof -i :27017
```

### MongoDB Already in Use

**Problem:** `Address already in use` when starting MongoDB

**Solution:**
```bash
# Find process using port 27017
lsof -i :27017

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or stop the service
brew services stop mongodb/brew/mongodb-community
```

### Port 3000 Already in Use

**Problem:** `listen EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change PORT in .env file to an available port (e.g., 3001)
```

### Swagger UI Not Loading

**Problem:** Swagger UI not available at `http://localhost:3000/api-docs`

**Causes & Solutions:**
1. **Check `NODE_ENV`**: Swagger UI is disabled in production
   ```bash
   # Verify in .env
   NODE_ENV="development"
   ```

2. **Verify server started successfully**: Check console for errors

3. **Clear browser cache**: Hard refresh (Cmd+Shift+R on Mac)

### JWT Authentication Failures

**Problem:** `401 Unauthorized` or `Invalid token` errors

**Solutions:**
1. **Verify token format**: Include `Bearer ` prefix in Authorization header
   ```
   Authorization: Bearer <your_jwt_token>
   ```

2. **Check token expiration**: Tokens may have expiration claims

3. **Verify `JWT_SECRET` matches**: Ensure same secret in `.env` and `signJwt.js`

4. **Test with Swagger UI**: Use the "Authorize" button to add token

### MongoDB Atlas / Remote Database Issues

**Problem:** Connection fails when using MongoDB Atlas URI

**Solutions:**
```bash
# Verify MONGO_URI format
mongodb+srv://username:password@cluster.mongodb.net/habit-tracker?retryWrites=true&w=majority

# Common issues:
# 1. Check username/password (URL encode special characters like @ → %40)
# 2. Whitelist your IP address in MongoDB Atlas Network Access
# 3. Verify database name exists
# 4. Check network connectivity
```

### Tests Failing or Hanging

**Problem:** Jest tests timeout or fail unexpectedly

**Solutions:**
```bash
# 1. Increase Jest timeout (add to jest.config.js)
jest.setTimeout(10000);

# 2. Clear Jest cache
npx jest --clearCache

# 3. Run tests with verbose output
npx jest --verbose

# 4. Run single test to isolate issue
npx jest test/controller/addHabitController.test.js
```

## Support & Resources

### Documentation
- **Swagger/OpenAPI Docs**: Available at `http://localhost:3000/api-docs` when running
- **MongoDB Docs**: [mongodb.com/docs](https://www.mongodb.com/docs)
- **Express.js Docs**: [expressjs.com](https://expressjs.com)
- **Mongoose Docs**: [mongoosejs.com](https://mongoosejs.com)
- **JWT Docs**: [jwt.io](https://jwt.io)

### Tools
- **MongoDB Compass**: GUI for database management
- **Postman**: API testing and documentation
- **Node Inspector**: Browser-based debugging

## Additional Commands & Tips

### Check Node and npm Versions

```bash
node --version
npm --version
```

### Reinstall Dependencies

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### View MongoDB Data in Command Line

```bash
# Start MongoDB shell
mongosh

# Use habit-tracker database
use habit-tracker

# View collections
show collections

# Query users
db.users.find()

# Query habits
db.habits.find()

# Exit
exit
```

### Debug with Node Inspector

```bash
# Start server with debugging enabled
node --inspect src/index.js

# Open Chrome DevTools: chrome://inspect
# Click "inspect" under Node processes
```

### Enable Debug Logging

Add debug statements in code:
```javascript
console.log("Debug info:", variable);
```

Or use `NODE_DEBUG` environment variable:
```bash
NODE_DEBUG=http node src/index.js
```

