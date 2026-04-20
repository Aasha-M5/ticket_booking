import React from 'react';
import { formatCurrency } from '../utils/currency';

const EventDetails = ({ event }) => {
  if (!event) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading event details...</h2>
      </div>
    );
  }

  return (
    <div className="event-details-card">
      <h2 className="event-title">{event.name}</h2>
      
      <div className="event-info">
        <div className="info-item">
          <span className="info-label">Department:</span>
          <span className="info-value">{event.department}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Date:</span>
          <span className="info-value">{event.date}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Time:</span>
          <span className="info-value">{event.time}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Venue:</span>
          <span className="info-value">{event.venue}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Ticket Price:</span>
          <span className="info-value">{formatCurrency(event.ticketPrice, 'INR')}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Available Tickets:</span>
          <span className="info-value">{event.availableTickets} / {event.totalTickets}</span>
        </div>
      </div>
      
      <div className="ticket-info">
        <div className="ticket-count">
          {event.availableTickets > 0 ? (
            <span style={{ color: '#28a745' }}>
              ✅ {event.availableTickets} tickets available
            </span>
          ) : (
            <span style={{ color: '#dc3545' }}>
              ❌ Sold Out
            </span>
          )}
        </div>
        
        <div className="ticket-price">
          {formatCurrency(event.ticketPrice, 'INR')} per ticket
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
