import React, { useState } from 'react';

const LoginPage = ({ onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const validateLoginForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Simulate API call
      setTimeout(() => {
        // Simple authentication for demo
        if (formData.email === 'admin@ticketbooking.com' && formData.password === 'admin123') {
          setMessage('Login successful! Redirecting to admin dashboard...');
          setTimeout(() => {
            onLoginSuccess({ 
              name: 'Admin User',
              email: formData.email,
              role: 'admin',
              department: 'System Administration'
            });
          }, 1000);
        } else if (formData.email === 'john@example.com' && formData.password === 'user123') {
          setMessage('Login successful! Redirecting to user dashboard...');
          setTimeout(() => {
            onLoginSuccess({ 
              name: 'John Doe',
              email: formData.email,
              role: 'user',
              department: 'Computer Science'
            });
          }, 1000);
        } else {
          setMessage('Invalid email or password');
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Simulate API call
      setTimeout(() => {
        setMessage('Registration successful! You can now login.');
        setTimeout(() => {
          setIsLoginMode(true);
          setFormData({
            email: formData.email,
            password: '',
            name: '',
            department: ''
          });
        }, 2000);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
    setMessage('');
    setFormData({
      email: '',
      password: '',
      name: '',
      department: ''
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>{isLoginMode ? 'Welcome Back' : 'Create Account'}</h1>
          <p>
            {isLoginMode 
              ? 'Login to access the ticket booking system' 
              : 'Register to start booking tickets for events'
            }
          </p>
        </div>

        <div className="login-form">
          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
            {!isLoginMode && (
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
            )}

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

            {!isLoginMode && (
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
            )}

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLoginMode ? 'Login' : 'Register')}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                className="link-btn"
                onClick={switchMode}
              >
                {isLoginMode ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>

          {isLoginMode && (
            <div className="demo-accounts">
              <h4>Demo Accounts:</h4>
              <div className="demo-account">
                <strong>User:</strong> john@example.com / user123
              </div>
              <div className="demo-account">
                <strong>Admin:</strong> admin@ticketbooking.com / admin123
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
