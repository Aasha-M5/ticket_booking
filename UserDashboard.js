import React, { useState, useEffect } from 'react';
import EventDetails from './EventDetails';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';
import BookingHistory from './BookingHistory';

const UserDashboard = ({ currentUser, events, onLogout }) => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'history'

  useEffect(() => {
    if (currentUser) {
      // Simulate loading user's bookings
      const userBookings = [
        {
          id: 'BK1001',
          eventName: 'TechFest 2024',
          name: currentUser.name,
          email: currentUser.email,
          department: currentUser.department,
          numberOfTickets: 2,
          totalAmount: 100,
          createdAt: new Date().toISOString()
        }
      ];
      setBookings(userBookings);
    }
  }, [currentUser]);

  const handleBookingSubmit = (bookingData) => {
    setCurrentBooking(bookingData);
    setBookings(prev => [bookingData, ...prev]);
  };

  const handleNewBooking = () => {
    setCurrentBooking(null);
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setCurrentBooking(null);
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.name}!</h1>
        <p>Book tickets for upcoming department events</p>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        {currentView === 'history' ? (
          <BookingHistory
            currentUser={currentUser}
            onBackToDashboard={handleBackToDashboard}
          />
        ) : (
          <>
            {currentBooking ? (
              <BookingConfirmation
                booking={currentBooking}
                onNewBooking={handleNewBooking}
                onViewHistory={handleViewHistory}
              />
            ) : (
              <>
                <div className="event-selection">
                  <h3>Select Event</h3>
                  <div className="event-tabs">
                    {events.map(event => (
                      <button
                        key={event.id}
                        className={`event-tab ${selectedEvent.id === event.id ? 'active' : ''}`}
                        onClick={() => handleEventSelect(event)}
                      >
                        {event.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="main-content">
                  <EventDetails event={selectedEvent} />
                  <BookingForm
                    event={selectedEvent}
                    onBookingSubmit={handleBookingSubmit}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
