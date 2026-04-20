# Event Ticket Booking System

A comprehensive React JS based web application for booking tickets to internal department events such as technical fests, seminars, and workshops.

## Features

### 🔐 Authentication System
- **User Login**: Secure login for students and faculty
- **Admin Login**: Separate admin access for event management
- **User Registration**: New user registration with validation
- **Role-Based Access**: Different interfaces for users and admins
- **Session Management**: Persistent user sessions

### 🎫 Event Management
- **Event Details Display**: Complete event information
  - Event name and department
  - Date, time, and venue
  - Ticket price and availability
  - Event descriptions
- **Multiple Events**: Support for multiple concurrent events
- **Real-time Updates**: Live ticket availability updates

### 📝 Booking System
- **Smart Booking Form**: Intuitive form with validation
  - Auto-populate user data for logged-in users
  - Real-time ticket availability checking
  - Prevent overbooking
- **Comprehensive Validation**:
  - Email format validation
  - Required field checking
  - Positive ticket number validation
  - User-friendly error messages

### 📊 Dashboard Features
- **User Dashboard**: Personalized booking experience
- **Admin Dashboard**: Complete event management
  - Booking statistics and analytics
  - Event overview and management
  - Revenue tracking
  - Export functionality

### 🎨 User Experience
- **Modern UI**: Clean, responsive design
- **Mobile Friendly**: Works on all devices
- **Smooth Animations**: Professional transitions
- **Loading States**: User-friendly loading indicators

## React Concepts Implemented

### ✅ Core React Features
- **Functional Components**: All components use functional programming
- **useState Hook**: Comprehensive state management
- **Event Handling**: Robust event processing
- **Conditional Rendering**: Dynamic UI based on state
- **Component Composition**: Modular, reusable components

### 🏗️ Component Architecture
```
src/
├── components/
│   ├── LoginPage.js          # Authentication interface
│   ├── UserDashboard.js      # User booking interface
│   ├── AdminDashboard.js     # Admin management interface
│   ├── EventDetails.js       # Event information display
│   ├── BookingForm.js        # Booking form with validation
│   ├── BookingConfirmation.js # Booking success display
│   └── Navigation.js         # Navigation component
├── App.js                  # Main application component
├── App.css                 # Complete styling
├── index.js                # Application entry point
└── database.sql            # MySQL database schema
```

## Database Setup

### 🗄️ MySQL Database Schema
The application includes a complete MySQL database setup for XAMPP:

```sql
-- Database: ticket_booking_system
-- Tables: users, events, bookings
-- Features: User management, event management, booking tracking
-- Relationships: Foreign keys for data integrity
-- Indexes: Optimized for performance
-- Views: Statistics and reporting
```

### **Database Tables**
- **users**: User authentication and roles
- **events**: Event information and management
- **bookings**: Booking records and tracking

### **Database Features**
- **User Management**: Registration, authentication, role-based access
- **Event Management**: Create, update, delete events
- **Booking System**: Complete booking lifecycle
- **Statistics**: Real-time booking analytics
- **Data Integrity**: Foreign keys and constraints

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- XAMPP with MySQL server

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Database Setup
1. Start XAMPP MySQL server
2. Create database:
   ```bash
   mysql -u root -p
   CREATE DATABASE ticket_booking_system;
   ```
3. Import schema:
   ```bash
   mysql -u root -p ticket_booking_system < database.sql
   ```

### Running the Application
1. Start development server:
   ```bash
   npm start
   ```
2. Open http://localhost:3000 in your browser

### Database Connection
The application will connect to MySQL database at:
- Host: localhost
- Port: 3306
- Database: ticket_booking_system
- User: ticket_app@localhost
- Password: [your_mysql_password]

## Application Flow

### 🔄 User Journey
1. **Login/Registration** → Authentication
2. **Dashboard** → Event selection and booking
3. **Booking Form** → Ticket reservation
4. **Confirmation** → Success message and summary
5. **History** → View past bookings

### 🛡️ Admin Journey
1. **Admin Login** → Authentication
2. **Admin Dashboard** → Management interface
3. **Statistics** → View booking analytics
4. **Event Management** → Monitor and manage events
5. **Export Data** → Download booking reports

## Validation Features

### ✅ Input Validation
- **Email**: RFC 5322 compliant validation
- **Required Fields**: All mandatory fields checked
- **Ticket Numbers**: Positive integer validation
- **Character Limits**: Minimum length requirements
- **Database Constraints**: Server-side validation

### 🚫 Error Handling
- **Graceful Degradation**: User-friendly error messages
- **Form State Preservation**: Data retained on errors
- **Real-time Validation**: Immediate feedback
- **Database Error Handling**: Proper error logging
- **Accessibility**: Screen reader compatible errors

## Technical Specifications

### 🎯 Core Requirements Met
- ✅ Event Details Module with all required fields
- ✅ Ticket Booking Module with validation
- ✅ Booking confirmation and summary display
- ✅ Updated ticket counts after booking
- ✅ Comprehensive error handling
- ✅ React functional components and hooks
- ✅ Responsive design and styling
- ✅ MySQL database integration

### 🔧 Additional Features
- ✅ Authentication system with roles
- ✅ User and admin dashboards
- ✅ Multiple event support
- ✅ Booking history tracking
- ✅ Data export functionality
- ✅ Mobile responsive design
- ✅ MySQL database with XAMPP setup

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Performance Features

- ⚡ Optimized database queries
- 🎯 Efficient state management
- 📱 Mobile-optimized performance
- 🔄 Smooth animations and transitions
- 🗄️ Indexed database tables

## Security Considerations

- 🔒 Input sanitization
- 🛡️ XSS prevention
- 🔐 Secure authentication flow
- 📊 Database validation at multiple layers
- 🔑 Password hashing (implement in production)
- 🌐 SQL injection prevention with prepared statements

## XAMPP Setup Instructions

### 1. Install XAMPP
Download and install XAMPP from https://www.apachefriends.org/

### 2. Start MySQL
- Open XAMPP Control Panel
- Start MySQL module

### 3. Create Database
```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE ticket_booking_system;
USE ticket_booking_system;

# Import the schema
SOURCE /path/to/your/project/database.sql;
```

### 4. Update Application Configuration
Update your application to connect to MySQL instead of using mock data.

## Future Enhancements

- 🌐 Real-time updates with WebSockets
- 💳 Payment gateway integration
- 📧 Email notifications
- 📱 Mobile app development
- 🔍 Advanced search and filtering
- 📊 Advanced analytics and reporting
- 🌍 Multi-language support

---

**Built with ❤️ using React JS and MySQL**

This application demonstrates professional React development with modern best practices, comprehensive validation, and complete database integration for event ticket booking. Perfect for educational institutions and internal event management.
