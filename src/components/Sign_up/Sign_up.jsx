import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sign_up.css';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate role
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData({ role: '', name: '', phone: '', email: '', password: '' });
    setErrors({});
  };

  const handleChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted, form data:', formData);
    if (validateForm()) {
      try {
        signup(formData);
        alert(`Welcome ${formData.name}! Your account has been created.`);
        navigate('/');
      } catch (error) {
        setErrors({ general: error.message });
      }
    } else {
      console.log('Validation failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="signup-page-section">
      <div className="container">
        <div className="signup-form-wrapper signup-page-wrapper">
          <a href="/" className="back-link"><i className="bi bi-arrow-left"></i> Back to Home</a>
          <h2>Sign Up</h2>
          <p className="already-member">Already a member? <a href="/login" className="login-link">Log In</a></p>
          
          <form className="signup-form" onSubmit={handleSubmit}>
            {errors.general && <div className="error-alert">{errors.general}</div>}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select 
                id="role" 
                name="role" 
                className={`form-control ${errors.role ? 'error' : ''}`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <span className="error-message">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className={`form-control ${errors.name ? 'error' : ''}`}
                placeholder="Enter name" 
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className={`form-control ${errors.phone ? 'error' : ''}`}
                placeholder="Enter 10-digit phone number" 
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="Enter Email" 
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="password" 
                  name="password" 
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  placeholder="Enter password (min 6 characters)" 
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary btn-submit">Submit</button>
              <button type="button" onClick={handleReset} className="btn btn-secondary btn-reset">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
