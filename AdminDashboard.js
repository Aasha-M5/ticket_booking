import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/currency';

const AdminDashboard = ({ currentUser, onLogout }) => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalTicketsSold: 0
  });

  useEffect(() => {
    // Simulate loading admin stats
    const mockStats = {
      totalEvents: 3,
      totalBookings: 25,
      totalRevenue: 1250,
      totalTicketsSold: 45
    };
    setStats(mockStats);
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage events and view booking statistics</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Overview Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Events</h4>
              <div className="stat-number">{stats.totalEvents}</div>
            </div>
            <div className="stat-card">
              <h4>Total Bookings</h4>
              <div className="stat-number">{stats.totalBookings}</div>
            </div>
            <div className="stat-card">
              <h4>Total Revenue</h4>
              <div className="stat-number">{formatCurrency(stats.totalRevenue, 'INR')}</div>
            </div>
            <div className="stat-card">
              <h4>Tickets Sold</h4>
              <div className="stat-number">{stats.totalTicketsSold}</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Event Management</h3>
          <div className="events-grid">
            <div className="event-summary-card">
              <h4>TechFest 2024</h4>
              <p><strong>Department:</strong> Computer Science & Engineering</p>
              <p><strong>Date:</strong> 25th April 2024</p>
              <p><strong>Venue:</strong> Main Auditorium, Engineering Block</p>
              <p><strong>Price:</strong> {formatCurrency(50, 'INR')}</p>
              <p><strong>Available:</strong> 85/100</p>
              <div className="availability-status">
                <span className="status-available">Available</span>
              </div>
            </div>
            <div className="event-summary-card">
              <h4>AI Workshop</h4>
              <p><strong>Department:</strong> Information Technology</p>
              <p><strong>Date:</strong> 28th April 2024</p>
              <p><strong>Venue:</strong> Computer Lab, IT Building</p>
              <p><strong>Price:</strong> {formatCurrency(25, 'INR')}</p>
              <p><strong>Available:</strong> 42/50</p>
              <div className="availability-status">
                <span className="status-available">Available</span>
              </div>
            </div>
            <div className="event-summary-card">
              <h4>Web Development Seminar</h4>
              <p><strong>Department:</strong> Computer Science & Engineering</p>
              <p><strong>Date:</strong> 30th April 2024</p>
              <p><strong>Venue:</strong> Seminar Hall, Main Block</p>
              <p><strong>Price:</strong> {formatCurrency(20, 'INR')}</p>
              <p><strong>Available:</strong> 63/75</p>
              <div className="availability-status">
                <span className="status-available">Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Recent Bookings</h3>
          <div className="bookings-table">
            <div className="table-header">
              <div>Booking ID</div>
              <div>Name</div>
              <div>Email</div>
              <div>Event</div>
              <div>Tickets</div>
              <div>Amount</div>
              <div>Date</div>
            </div>
            <div className="table-body">
              <div className="table-row">
                <div>#BK1001</div>
                <div>John Doe</div>
                <div>john@example.com</div>
                <div>TechFest 2024</div>
                <div>2</div>
                <div>{formatCurrency(100, 'INR')}</div>
                <div>2024-04-18</div>
              </div>
              <div className="table-row">
                <div>#BK1002</div>
                <div>Jane Smith</div>
                <div>jane@example.com</div>
                <div>AI Workshop</div>
                <div>1</div>
                <div>{formatCurrency(25, 'INR')}</div>
                <div>2024-04-19</div>
              </div>
              <div className="table-row">
                <div>#BK1003</div>
                <div>Mike Johnson</div>
                <div>mike@example.com</div>
                <div>Web Development Seminar</div>
                <div>3</div>
                <div>{formatCurrency(60, 'INR')}</div>
                <div>2024-04-20</div>
              </div>
            </div>
          </div>
          <div className="export-section">
            <button className="btn btn-primary">
              Export All Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
