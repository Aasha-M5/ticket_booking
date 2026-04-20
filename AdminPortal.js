import React, { useState, useEffect } from 'react';
import { convertToINR, formatCurrency } from '../utils/currency';

const AdminPortal = ({ currentUser, onLogout }) => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    date: '',
    time: '',
    venue: '',
    ticketPrice: '',
    totalTickets: '',
    description: '',
    imageUrl: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load events from database or API
    const mockEvents = [
      {
        id: 1,
        name: "TechFest 2024",
        department: "Computer Science & Engineering",
        date: "2024-04-25",
        time: "10:00:00",
        venue: "Main Auditorium, Engineering Block",
        ticketPrice: 50,
        availableTickets: 85,
        totalTickets: 100,
        description: "Annual technical festival featuring workshops, competitions, and guest lectures from industry experts.",
        imageUrl: "https://via.placeholder.com/400x200/667eea/ffffff?text=TechFest+2024",
        status: "active"
      },
      {
        id: 2,
        name: "AI Workshop",
        department: "Information Technology",
        date: "2024-04-28",
        time: "14:00:00",
        venue: "Computer Lab, IT Building",
        ticketPrice: 25,
        availableTickets: 42,
        totalTickets: 50,
        description: "Hands-on workshop on Artificial Intelligence and Machine Learning fundamentals with practical exercises.",
        imageUrl: "https://via.placeholder.com/400x200/764ba2/ffffff?text=AI+Workshop",
        status: "active"
      },
      {
        id: 3,
        name: "Web Development Seminar",
        department: "Computer Science & Engineering",
        date: "2024-04-30",
        time: "11:00:00",
        venue: "Seminar Hall, Main Block",
        ticketPrice: 20,
        availableTickets: 63,
        totalTickets: 75,
        description: "Modern web development trends and best practices with React, Node.js, and latest technologies.",
        imageUrl: "https://via.placeholder.com/400x200/28a745/ffffff?text=Web+Dev+Seminar",
        status: "active"
      }
    ];
    setEvents(mockEvents);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Event date is required';
    }

    if (!formData.time.trim()) {
      newErrors.time = 'Event time is required';
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    }

    if (!formData.ticketPrice || formData.ticketPrice <= 0) {
      newErrors.ticketPrice = 'Ticket price must be a positive number';
    }

    if (!formData.totalTickets || formData.totalTickets <= 0) {
      newErrors.totalTickets = 'Total tickets must be a positive number';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const eventData = {
        id: editingEvent ? editingEvent.id : Date.now(),
        ...formData,
        ticketPrice: parseFloat(formData.ticketPrice),
        totalTickets: parseInt(formData.totalTickets),
        availableTickets: parseInt(formData.totalTickets),
        description: formData.description,
        imageUrl: formData.imageUrl,
        status: 'active'
      };

      if (editingEvent) {
        // Update existing event
        setEvents(prev => prev.map(event => 
          event.id === editingEvent.id ? eventData : event
        ));
        setEditingEvent(null);
      } else {
        // Create new event
        setEvents(prev => [...prev, eventData]);
      }

      // Reset form
      setFormData({
        name: '',
        department: '',
        date: '',
        time: '',
        venue: '',
        ticketPrice: '',
        totalTickets: '',
        description: '',
        imageUrl: ''
      });
      
    } catch (error) {
      console.error('Event operation failed:', error);
      setErrors({ submit: 'Operation failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      department: event.department,
      date: event.date,
      time: event.time,
      venue: event.venue,
      ticketPrice: event.ticketPrice,
      totalTickets: event.totalTickets,
      description: event.description,
      imageUrl: event.imageUrl
    });
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setEvents(prev => prev.filter(event => event.id !== eventId));
        
        if (editingEvent?.id === eventId) {
          setEditingEvent(null);
          setFormData({
            name: '',
            department: '',
            date: '',
            time: '',
            venue: '',
            ticketPrice: '',
            totalTickets: '',
            description: '',
            imageUrl: ''
          });
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
    setFormData({
      name: '',
      department: '',
      date: '',
      time: '',
      venue: '',
      ticketPrice: '',
      totalTickets: '',
      description: '',
      imageUrl: ''
    });
    setErrors({});
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Portal</h1>
        <p>Create and manage events</p>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Event Management</h3>
          
          {editingEvent ? (
            <h4>Editing Event</h4>
          ) : (
            <h4>Create New Event</h4>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Event Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter event name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`form-input ${errors.department ? 'error' : ''}`}
                placeholder="Enter department"
              />
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Event Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`form-input ${errors.date ? 'error' : ''}`}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Event Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`form-input ${errors.time ? 'error' : ''}`}
              />
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Venue *</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                className={`form-input ${errors.venue ? 'error' : ''}`}
                placeholder="Enter venue"
              />
              {errors.venue && <span className="error-message">{errors.venue}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Ticket Price (₹) *</label>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className={`form-input ${errors.ticketPrice ? 'error' : ''}`}
                placeholder="Enter ticket price in INR"
                step="0.01"
              />
              {errors.ticketPrice && <span className="error-message">{errors.ticketPrice}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Total Tickets *</label>
              <input
                type="number"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleInputChange}
                className={`form-input ${errors.totalTickets ? 'error' : ''}`}
                placeholder="Enter total tickets"
              />
              {errors.totalTickets && <span className="error-message">{errors.totalTickets}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Event Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`form-input ${errors.description ? 'error' : ''}`}
                placeholder="Enter event description"
                rows="4"
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Event Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className={`form-input ${errors.imageUrl ? 'error' : ''}`}
                placeholder="Enter image URL (optional)"
              />
              {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
            </div>

            {errors.submit && <span className="error-message">{errors.submit}</span>}

            <div className="button-group">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Processing...' : (editingEvent ? 'Update Event' : 'Create Event')}
              </button>
              
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="dashboard-card">
          <h3>Current Events</h3>
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-summary-card">
                <h4>{event.name}</h4>
                <p><strong>Department:</strong> {event.department}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Price:</strong> {formatCurrency(event.ticketPrice, 'INR').formatted}</p>
                <p><strong>Available:</strong> {event.availableTickets}/{event.totalTickets}</p>
                <p><strong>Status:</strong> 
                  <span className={event.status === 'active' ? 'status-available' : 'status-full'}>
                    {event.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </p>
                
                <div className="event-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleDelete(event.id)}
                    disabled={event.availableTickets < event.totalTickets}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
