# Habit Tracker Backend

Contains the backend logic related to Habit Tracker.

## Start Local Test

1. Start MongoDB

```bash
brew services start mongodb/brew/mongodb-community
```

2. Run the server
```bash
node index.js
```

3. Use Postman to test service calls. Use MongoDB Compass to verify database entries.

## Stop Local Test

1. Kill server by doing Ctrl + C

2. Stop MongoDB
```bash
brew services stop mongodb/brew/mongodb-community
```

