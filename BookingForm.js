import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';

const BookingForm = ({ event, onBookingSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    numberOfTickets: 1
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For number of tickets, ensure it's a positive number
    if (name === 'numberOfTickets') {
      const numValue = parseInt(value) || 0;
      if (numValue >= 0 && numValue <= event.availableTickets) {
        setFormData(prev => ({
          ...prev,
          [name]: numValue
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    // Number of tickets validation
    if (!formData.numberOfTickets || formData.numberOfTickets <= 0) {
      newErrors.numberOfTickets = 'Number of tickets must be a positive number';
    } else if (formData.numberOfTickets > event.availableTickets) {
      newErrors.numberOfTickets = `Only ${event.availableTickets} tickets available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const bookingData = {
        ...formData,
        eventId: event.id,
        eventName: event.name,
        totalAmount: formData.numberOfTickets * event.ticketPrice
      };

      onBookingSubmit(bookingData);
      
      // Reset form after successful booking
      setFormData({
        name: '',
        email: '',
        department: '',
        numberOfTickets: 1
      });
      
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors({ submit: 'Booking failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      department: '',
      numberOfTickets: 1
    });
    setErrors({});
  };

  return (
    <div className="booking-card">
      <h2 className="section-title">Book Your Tickets</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email address"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Department *</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className={`form-select ${errors.department ? 'error' : ''}`}
          >
            <option value="">Select your department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics & Communication">Electronics & Communication</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Number of Tickets * 
            <span style={{ fontSize: '0.9rem', color: '#666' }}>
              (Available: {event.availableTickets})
            </span>
          </label>
          <input
            type="number"
            name="numberOfTickets"
            value={formData.numberOfTickets}
            onChange={handleInputChange}
            className={`form-input ${errors.numberOfTickets ? 'error' : ''}`}
            placeholder="Enter number of tickets"
            min="1"
            max={event.availableTickets}
          />
          {errors.numberOfTickets && <span className="error-message">{errors.numberOfTickets}</span>}
        </div>

        {errors.submit && <span className="error-message">{errors.submit}</span>}

        <div className="button-group">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting || event.availableTickets === 0}
          >
            {isSubmitting ? 'Booking...' : `Book ${formData.numberOfTickets} Ticket${formData.numberOfTickets > 1 ? 's' : ''}`}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset Form
          </button>
        </div>

        {event.availableTickets === 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: '#dc3545', 
            fontWeight: '600',
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8d7da',
            borderRadius: '8px'
          }}>
            Sorry, this event is fully booked!
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
