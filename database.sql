-- Ticket Booking System Database Schema
-- Created for XAMPP MySQL Setup

-- Create database
CREATE DATABASE IF NOT EXISTS ticket_booking_system;
USE ticket_booking_system;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    department VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    venue VARCHAR(255) NOT NULL,
    ticket_price DECIMAL(10,2) NOT NULL,
    available_tickets INT NOT NULL,
    total_tickets INT NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'cancelled') DEFAULT 'active'
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_department VARCHAR(255) NOT NULL,
    number_of_tickets INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'confirmed',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO users (name, email, password, role, department) VALUES
('Admin User', 'admin@ticketbooking.com', 'admin123', 'admin', 'System Administration'),
('John Doe', 'john@example.com', 'user123', 'user', 'Computer Science'),
('Jane Smith', 'jane@example.com', 'user123', 'user', 'Information Technology');

INSERT INTO events (name, department, event_date, event_time, venue, ticket_price, available_tickets, total_tickets, description, image_url, status) VALUES
('TechFest 2024', 'Computer Science & Engineering', '2024-04-25', '10:00:00', 'Main Auditorium, Engineering Block', 50.00, 85, 100, 'Annual technical festival featuring workshops, competitions, and guest lectures from industry experts.', 'https://via.placeholder.com/400x200/667eea/ffffff?text=TechFest+2024', 'active'),
('AI Workshop', 'Information Technology', '2024-04-28', '14:00:00', 'Computer Lab, IT Building', 25.00, 42, 50, 'Hands-on workshop on Artificial Intelligence and Machine Learning fundamentals with practical exercises.', 'https://via.placeholder.com/400x200/764ba2/ffffff?text=AI+Workshop', 'active'),
('Web Development Seminar', 'Computer Science & Engineering', '2024-04-30', '11:00:00', 'Seminar Hall, Main Block', 20.00, 63, 75, 'Modern web development trends and best practices with React, Node.js, and latest technologies.', 'https://via.placeholder.com/400x200/28a745/ffffff?text=Web+Dev+Seminar', 'active');

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_events_department ON events(department);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_event_id ON bookings(event_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_booking_date ON bookings(booking_date);

-- Create view for booking statistics
CREATE VIEW booking_stats AS
SELECT 
    COUNT(*) as total_bookings,
    SUM(number_of_tickets) as total_tickets_sold,
    SUM(total_amount) as total_revenue,
    COUNT(DISTINCT user_id) as unique_users
FROM bookings
WHERE status = 'confirmed';

-- Grant permissions
CREATE USER IF NOT EXISTS 'ticket_app'@'localhost' IDENTIFIED BY 'ticket_booking_system';
GRANT ALL PRIVILEGES ON ticket_booking_system.* TO 'ticket_app'@'localhost';
FLUSH PRIVILEGES;

-- Sample queries for testing
-- Get all events
SELECT * FROM events WHERE status = 'active' ORDER BY event_date;

-- Get user bookings
SELECT b.*, e.name as event_name, e.event_date 
FROM bookings b
JOIN events e ON b.event_id = e.id
WHERE b.user_id = [user_id] AND b.status = 'confirmed'
ORDER BY b.booking_date DESC;

-- Get dashboard statistics
SELECT * FROM booking_stats;

-- Check ticket availability
SELECT available_tickets FROM events WHERE id = [event_id] AND status = 'active';

-- Create new booking
INSERT INTO bookings (user_id, event_id, event_name, user_name, user_email, user_department, number_of_tickets, total_amount, status)
VALUES ([user_id], [event_id], [event_name], [user_name], [user_email], [user_department], [number_of_tickets], [total_amount], 'confirmed');

-- Update available tickets after booking
UPDATE events SET available_tickets = available_tickets - [number_of_tickets] 
WHERE id = [event_id];
