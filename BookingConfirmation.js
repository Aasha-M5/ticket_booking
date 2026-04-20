import React from 'react';
import { formatCurrency } from '../utils/currency';

const BookingConfirmation = ({ booking, onNewBooking, onViewHistory }) => {
  return (
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
          <span>{new Date(booking.createdAt).toLocaleString()}</span>
        </div>
      </div>
      
      <div className="button-group">
        <button 
          className="btn btn-primary"
          onClick={onNewBooking}
        >
          Book Another Ticket
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={onViewHistory}
        >
          View Booking History
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
