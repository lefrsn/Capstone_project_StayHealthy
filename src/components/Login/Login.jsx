import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleReset = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        login(formData.email, formData.password);
        alert(`Logged in successfully!`);
        navigate('/');
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="login-page-section">
      <div className="container">
        <div className="login-form-wrapper login-page-wrapper">
          <a href="/" className="back-link"><i className="bi bi-arrow-left"></i> Back to Home</a>
          <h2>Log In</h2>
          <p className="new-member">Are you a new member? <a href="/signup" className="signup-link">Sign Up</a></p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {errors.general && <div className="error-alert">{errors.general}</div>}
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input 
                type="email" 
                id="login-email" 
                name="email" 
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group password-group">
              <label htmlFor="login-password">Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="login-password" 
                  name="password" 
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password" 
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
              <button type="submit" className="btn btn-primary btn-submit">Log In</button>
              <button type="button" onClick={handleReset} className="btn btn-secondary btn-reset">Reset</button>
            </div>

            <div className="forgot-password">
              <a href="#!" className="forgot-password-link">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
