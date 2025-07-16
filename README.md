# Habit Tracker Backend

Contains the backend logic related to Habit Tracker.

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
