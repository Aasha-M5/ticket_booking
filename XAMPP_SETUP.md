# XAMPP Database Setup Guide

## Prerequisites
- XAMPP installed on your system
- MySQL module enabled in XAMPP

## Step 1: Start XAMPP MySQL
1. Open XAMPP Control Panel
2. Start MySQL module (click "Start" button next to MySQL)
3. Verify MySQL is running (should show green status)

## Step 2: Create Database
1. Open your web browser
2. Go to: http://localhost/phpmyadmin/
3. Login with:
   - Username: root
   - Password: (leave blank for XAMPP default)
4. Click "Go" button

## Step 3: Import Database Schema
1. In phpMyAdmin, click on "Import" tab
2. Click "Choose file" button
3. Select the `database.sql` file from your project
4. Click "Go" button at bottom right

## Step 4: Verify Database Creation
1. You should see `ticket_booking_system` database in left panel
2. Click on `ticket_booking_system` to expand
3. Verify tables are created:
   - users
   - events  
   - bookings

## Step 5: Update Application for Database Connection
The application is currently using mock data. To connect to your MySQL database:

### Option A: Quick Setup (Recommended)
1. Update the App.js file to use MySQL instead of mock data
2. Install MySQL connector: `npm install mysql2`
3. Update database configuration in App.js

### Option B: Manual Configuration
1. Create a new file `src/config/database.js`
2. Add database connection configuration
3. Update App.js to import and use database configuration

## Database Connection Code Example
```javascript
// src/config/database.js
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Leave empty for XAMPP default
  database: 'ticket_booking_system',
  waitForConnections: true,
  connectionLimit: 10
};

const pool = mysql.createPool(dbConfig);

export { pool, dbConfig };
```

## Step 6: Test Database Connection
After setting up the database, test the connection by running the application and checking if:
- Events load from database
- Bookings are saved to database
- Admin dashboard shows real statistics

## Troubleshooting

### MySQL Not Starting
- Check if MySQL module is enabled in XAMPP
- Try restarting XAMPP completely
- Check if port 3306 is available (netstat -ano | findstr :3306)

### Connection Issues
- Verify MySQL credentials in XAMPP config
- Check firewall settings
- Ensure MySQL service is running

### Common XAMPP Issues
- Port conflicts (Apache/IIS using port 80)
- Antivirus blocking MySQL
- Insufficient permissions

## Next Steps After Database Setup
1. Implement user authentication with database
2. Add real-time event updates
3. Implement booking history from database
4. Add admin analytics from database
5. Implement data export from database

## Support
If you encounter issues:
1. Check XAMPP logs: C:\xampp\apache\logs\error.log
2. Check MySQL logs: C:\xampp\mysql\data\mysql_error.log
3. Restart XAMPP services from Control Panel

---

**Your React application is ready to work with a real MySQL database!**
