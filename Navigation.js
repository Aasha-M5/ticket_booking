import React from 'react';

const Navigation = ({ currentUser, currentPage, onLogout }) => {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>Event Booking</h2>
      </div>
      
      <div className="nav-menu">
        <button className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}>
          Dashboard
        </button>
        {currentUser?.role === 'admin' && (
          <button className={`nav-item ${currentPage === 'manage' ? 'active' : ''}`}>
            Manage Events
          </button>
        )}
      </div>

      {currentUser && (
        <div className="user-section">
          <div className="user-info">
            <div className="user-avatar">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">{currentUser.role}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
