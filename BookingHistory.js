import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/currency';

const BookingHistory = ({ currentUser, onBackToDashboard }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user's booking history
    const mockBookings = [
      {
        id: 'BK1001',
        eventName: 'TechFest 2024',
        userName: currentUser?.name || 'John Doe',
        userEmail: currentUser?.email || 'john@example.com',
        userDepartment: currentUser?.department || 'Computer Science',
        numberOfTickets: 2,
        totalAmount: 4156.00,
        bookingDate: '2024-04-18T10:30:00Z',
        status: 'confirmed'
      },
      {
        id: 'BK1002',
        eventName: 'AI Workshop',
        userName: currentUser?.name || 'John Doe',
        userEmail: currentUser?.email || 'john@example.com',
        userDepartment: currentUser?.department || 'Computer Science',
        numberOfTickets: 1,
        totalAmount: 2078.00,
        bookingDate: '2024-04-19T14:15:00Z',
        status: 'confirmed'
      },
      {
        id: 'BK1003',
        eventName: 'Web Development Seminar',
        userName: currentUser?.name || 'John Doe',
        userEmail: currentUser?.email || 'john@example.com',
        userDepartment: currentUser?.department || 'Computer Science',
        numberOfTickets: 3,
        totalAmount: 4986.00,
        bookingDate: '2024-04-20T11:45:00Z',
        status: 'confirmed'
      }
    ];
    
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, [currentUser]);

  const handleExportBookings = () => {
    // Create CSV content
    const csvContent = [
      ['Booking ID', 'Event Name', 'User Name', 'Email', 'Department', 'Tickets', 'Total Amount', 'Booking Date'],
      ...bookings.map(booking => [
        booking.id,
        booking.eventName,
        booking.userName,
        booking.userEmail,
        booking.userDepartment,
        booking.numberOfTickets,
        formatCurrency(booking.totalAmount, 'INR'),
        new Date(booking.bookingDate).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `booking_history_${currentUser?.name}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading booking history...</h2>
      </div>
    );
  }

  return (
    <div className="booking-history">
      <div className="dashboard-header">
        <h1>My Booking History</h1>
        <p>View and manage your past bookings</p>
        <button className="logout-btn" onClick={onBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <div className="history-header">
            <h3>Booking Records</h3>
            <div className="history-actions">
              <button 
                className="btn btn-primary"
                onClick={handleExportBookings}
                disabled={bookings.length === 0}
              >
                Export to CSV
              </button>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="no-bookings">
              <div className="no-bookings-icon">📋</div>
              <h3>No Bookings Found</h3>
              <p>You haven't made any bookings yet. Start booking events to see your history here!</p>
              <button 
                className="btn btn-primary"
                onClick={onBackToDashboard}
              >
                Book Your First Event
              </button>
            </div>
          ) : (
            <div className="bookings-table">
              <div className="table-header">
                <div>Booking ID</div>
                <div>Event Name</div>
                <div>Tickets</div>
                <div>Total Amount</div>
                <div>Status</div>
                <div>Date</div>
              </div>
              
              <div className="table-body">
                {bookings.map((booking, index) => (
                  <div key={booking.id} className={`table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                    <div className="booking-id">#{booking.id}</div>
                    <div className="event-name">{booking.eventName}</div>
                    <div className="tickets-count">{booking.numberOfTickets}</div>
                    <div className="amount">{formatCurrency(booking.totalAmount, 'INR')}</div>
                    <div className="status">
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status === 'confirmed' ? '✅ Confirmed' : 
                         booking.status === 'pending' ? '⏳ Pending' : '❌ Cancelled'}
                      </span>
                    </div>
                    <div className="booking-date">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {bookings.length > 0 && (
            <div className="history-summary">
              <h4>Booking Summary</h4>
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-label">Total Bookings:</span>
                  <span className="summary-value">{bookings.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Total Tickets:</span>
                  <span className="summary-value">
                    {bookings.reduce((sum, booking) => sum + booking.numberOfTickets, 0)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Total Spent:</span>
                  <span className="summary-value">
                    {formatCurrency(
                      bookings.reduce((sum, booking) => sum + booking.totalAmount, 0), 
                      'INR'
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
