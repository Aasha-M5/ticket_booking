import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminPortal from './components/AdminPortal';
import Navigation from './components/Navigation';
import { formatCurrency } from './utils/currency';

// Sample events data
const events = [
  {
    id: 1,
    name: "TechFest 2024",
    department: "Computer Science & Engineering",
    date: "25th April 2024",
    time: "10:00 AM - 6:00 PM",
    venue: "Main Auditorium, Engineering Block",
    ticketPrice: 50,
    availableTickets: 85,
    totalTickets: 100,
    description: "Annual technical festival featuring workshops, competitions, and guest lectures from industry experts."
  },
  {
    id: 2,
    name: "AI Workshop",
    department: "Information Technology",
    date: "28th April 2024",
    time: "2:00 PM - 5:00 PM",
    venue: "Computer Lab, IT Building",
    ticketPrice: 25,
    availableTickets: 42,
    totalTickets: 50,
    description: "Hands-on workshop on Artificial Intelligence and Machine Learning fundamentals with practical exercises."
  },
  {
    id: 3,
    name: "Web Development Seminar",
    department: "Computer Science & Engineering",
    date: "30th April 2024",
    time: "11:00 AM - 1:00 PM",
    venue: "Seminar Hall, Main Block",
    ticketPrice: 20,
    availableTickets: 63,
    totalTickets: 75,
    description: "Modern web development trends and best practices with React, Node.js, and latest technologies."
  }
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleBookingSubmit = (bookingData) => {
    // Update available tickets for the event
    const eventIndex = events.findIndex(e => e.id === bookingData.eventId);
    if (eventIndex !== -1) {
      events[eventIndex].availableTickets -= bookingData.numberOfTickets;
    }
    
    // Show confirmation
    setCurrentPage('confirmation');
  };

  const renderConfirmation = () => {
    const booking = {
      id: Date.now(),
      eventName: events[0].name,
      ...JSON.parse(localStorage.getItem('lastBooking') || '{}')
    };
    
    return (
      <div className="app-container">
        <div className="booking-confirmation">
          <div className="confirmation-title">
            🎉 Your tickets have been booked successfully!
          </div>
          
          <div className="confirmation-details">
            <div className="confirmation-item">
              <span>Booking ID:</span>
              <span>#{booking.id}</span>
            </div>
            
            <div className="confirmation-item">
              <span>Name:</span>
              <span>{booking.name}</span>
            </div>
            
            <div className="confirmation-item">
              <span>Email:</span>
              <span>{booking.email}</span>
            </div>
            
            <div className="confirmation-item">
              <span>Department:</span>
              <span>{booking.department}</span>
            </div>
            
            <div className="confirmation-item">
              <span>Event:</span>
              <span>{booking.eventName}</span>
            </div>
            
            <div className="confirmation-item">
              <span>Tickets Booked:</span>
              <span>{booking.numberOfTickets}</span>
            </div>
            
            <div className="confirmation-item">
              <span>Price per Ticket:</span>
              <span>{formatCurrency(booking.totalAmount / booking.numberOfTickets, 'INR')}</span>
            </div>
            
            <div className="confirmation-item total-amount">
              <span>Total Amount:</span>
              <span>{formatCurrency(booking.totalAmount, 'INR')}</span>
            </div>
            
            <div className="confirmation-item">
              <span>Booking Time:</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
          </div>
          
          <div className="button-group">
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentPage('dashboard')}
            >
              Book Another Ticket
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={() => {
                // In a real app, this would navigate to history page
                console.log('View booking history');
              }}
            >
              View Booking History
            </button>
          </div>
        </div>
      </div>
    );
  };

  // If not logged in, show login page
  if (!currentUser) {
    return (
      <div className="app">
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // If logged in, show appropriate dashboard
  return (
    <div className="app">
      <Navigation 
        currentUser={currentUser} 
        currentPage={currentPage}
        onLogout={handleLogout}
      />
      
      <div className="app-container">
        {currentPage === 'dashboard' && (
          <>
            {currentUser?.role === 'admin' ? (
              <AdminPortal 
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            ) : (
              <UserDashboard 
                currentUser={currentUser}
                events={events}
                onLogout={handleLogout}
                onBookingSubmit={handleBookingSubmit}
              />
            )}
          </>
        )}
        
        {currentPage === 'confirmation' && renderConfirmation()}
      </div>
    </div>
  );
}

export default App;
