import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  
  const navigate = useNavigate();
  const { user, login } = useAuth();
  
  // Fetch user profile data when component mounts
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [user, navigate]);

  // Function to fetch user profile data from localStorage
  const fetchUserProfile = () => {
    try {
      if (!user) {
        navigate('/login');
      } else {
        setUserDetails(user);
        setUpdatedDetails(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to enable edit mode
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to cancel edit mode
  const handleCancel = () => {
    setUpdatedDetails(userDetails);
    setEditMode(false);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        navigate('/login');
        return;
      }

      // Get all users from localStorage
      const usersData = localStorage.getItem('users');
      if (!usersData) {
        throw new Error('No users found');
      }

      const users = JSON.parse(usersData);
      
      // Find and update the current user
      const updatedUsers = users.map(u => 
        u.email === user.email 
          ? { ...u, name: updatedDetails.name, phone: updatedDetails.phone }
          : u
      );

      // Save updated users array back to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Update current user in localStorage
      const updatedCurrentUser = {
        ...user,
        name: updatedDetails.name,
        phone: updatedDetails.phone
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));

      // Update context - login with updated credentials
      login(user.email, user.password);

      setUserDetails(updatedCurrentUser);
      setEditMode(false);
      
      alert('Profile Updated Successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="profile-section">
      <div className="profile-container">
        <h2>Your Profile</h2>
        {editMode ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={userDetails.email || ''}
                disabled
              />
            </label>

            <label>
              Name
              <input
                type="text"
                name="name"
                value={updatedDetails.name || ''}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={updatedDetails.phone || ''}
                onChange={handleInputChange}
                required
                pattern="^\d{10}$"
                title="Phone number must be 10 digits"
              />
            </label>

            <label>
              Role
              <input
                type="text"
                name="role"
                value={userDetails.role || 'patient'}
                disabled
              />
            </label>

            <div className="button-group">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" onClick={handleCancel} className="btn-secondary">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <h1>Welcome, {userDetails.name}</h1>
            
            <label>Email</label>
            <p>{userDetails.email}</p>

            <label>Phone Number</label>
            <p>{userDetails.phone}</p>

            <label>Role</label>
            <p>{userDetails.role || 'patient'}</p>

            <button onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}
