import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './FindDoctorSearch.css';

export default function FindDoctorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: ''
  });
  const navigate = useNavigate();

  const exampleSearches = [
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Orthopedic',
    'Neurologist',
    'Gynecologist',
    'Psychiatrist',
    'Dentist'
  ];

  const allDoctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', experience: 15, rating: 4.8, available: true},
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', experience: 10, rating: 4.9, available: true},
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', experience: 12, rating: 4.7, available: true},
    { id: 4, name: 'Dr. James Williams', specialty: 'Orthopedic', experience: 20, rating: 4.6, available: false},
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Cardiologist', experience: 18, rating: 4.9, available: true},
    { id: 6, name: 'Dr. David Brown', specialty: 'Neurologist', experience: 14, rating: 4.8, available: true},
    { id: 7, name: 'Dr. Jennifer Lee', specialty: 'Gynecologist', experience: 16, rating: 4.7, available: true},
    { id: 8, name: 'Dr. Robert Taylor', specialty: 'Psychiatrist', experience: 22, rating: 4.9, available: true},
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  const handleSearch = (specialty) => {
    setSearchTerm(specialty);
    const results = allDoctors.filter(doctor => 
      doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
    setFilteredDoctors(results);
    setShowExamples(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setFilteredDoctors([]);
    } else {
      const results = allDoctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDoctors(results);
    }
  };

  const handleInputFocus = () => {
    setShowExamples(true);
  };

  const handleInputBlur = () => {
    // Delay to allow clicking on examples
    setTimeout(() => setShowExamples(false), 200);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill star-icon"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half star-icon"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star star-icon"></i>);
    }
    return stars;
  };

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAppointmentForm({ name: '', phone: '', date: '', time: '' });
  };

  const handleFormChange = (field, value) => {
    setAppointmentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookAppointment = () => {
    if (!appointmentForm.name || !appointmentForm.phone || !appointmentForm.date || !appointmentForm.time) {
      alert('Please fill in all fields: name, phone number, date, and time slot');
      return;
    }
    
    // Save appointment to localStorage
    const appointment = {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      experience: selectedDoctor.experience,
      rating: selectedDoctor.rating,
      patientName: appointmentForm.name,
      phone: appointmentForm.phone,
      date: appointmentForm.date,
      time: appointmentForm.time
    };
    
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    existingAppointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));
    
    alert(`Appointment booked with ${selectedDoctor.name}!\nName: ${appointmentForm.name}\nPhone: ${appointmentForm.phone}\nDate: ${appointmentForm.date}\nTime: ${appointmentForm.time}`);
    
    handleCloseModal();
  };

  return (
    <section className="find-doctor-section">
      <div className="container">
        <h2>Find a Doctor</h2>
        <p className="subtitle">Search for doctors by their specialty</p>
        
        <div className="search-container">
          <div className="search-box">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search by specialty (e.g., Cardiologist, Dermatologist)"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {searchTerm && (
              <button 
                className="clear-button"
                onClick={() => {
                  setSearchTerm('');
                  setFilteredDoctors([]);
                }}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            )}
          </div>
          
          {showExamples && (
            <div className="examples-dropdown">
              <p className="examples-title">Example Searches:</p>
              <div className="examples-list">
                {exampleSearches.map((example, index) => (
                  <button
                    key={index}
                    className="example-item"
                    onClick={() => handleSearch(example)}
                  >
                    <i className="bi bi-stethoscope"></i>
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {searchTerm && filteredDoctors.length === 0 && (
          <div className="no-results">
            <i className="bi bi-search"></i>
            <p>No doctors found for "{searchTerm}"</p>
            <p className="suggestion">Try searching for: Cardiologist, Dermatologist, or Pediatrician</p>
          </div>
        )}

        {filteredDoctors.length > 0 && (
          <div className="results-section">
            <h3>Search Results ({filteredDoctors.length})</h3>
            <div className="doctors-grid">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-info">
                    <h4>{doctor.name}</h4>
                    <p className="specialty">
                      <i className="bi bi-heart-pulse"></i>
                      {doctor.specialty}
                    </p>
                    <div className="doctor-details">
                      <p className="experience">
                        <i className="bi bi-briefcase"></i>
                        {doctor.experience} years experience
                      </p>
                      <div className="rating">
                        {renderStars(doctor.rating)}
                        <span className="rating-value">{doctor.rating}</span>
                      </div>
                    </div>
                    <span className={`status ${doctor.available ? 'available' : 'unavailable'}`}>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleOpenModal(doctor)}
                    disabled={!doctor.available}
                  >
                    {doctor.available ? (
                      <>
                        <span className="btn-main-text">Book Appointment</span>
                        <span className="btn-sub-text">No booking fee</span>
                      </>
                    ) : (
                      'Not Available'
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Popup open={showModal} onClose={handleCloseModal} modal nested>
          <div className="appointment-modal">
            <button className="close-modal" onClick={handleCloseModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            {selectedDoctor && (
              <>
                <h3>Book Appointment</h3>
                <div className="modal-doctor-info">
                  <h4>{selectedDoctor.name}</h4>
                  <p className="specialty">
                    <i className="bi bi-heart-pulse"></i>
                    {selectedDoctor.specialty}
                  </p>
                  <div className="doctor-details">
                    <p className="experience">
                      <i className="bi bi-briefcase"></i> {selectedDoctor.experience} years experience
                    </p>
                    <div className="rating">
                      {renderStars(selectedDoctor.rating)}
                      <span className="rating-value">{selectedDoctor.rating}</span>
                    </div>
                  </div>
                </div>

                <form className="appointment-form" onSubmit={(e) => { e.preventDefault(); handleBookAppointment(); }}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      className="form-control"
                      value={appointmentForm.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Phone Number"
                      className="form-control"
                      value={appointmentForm.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="date">Date of Appointment</label>
                    <input
                      type="date"
                      id="date"
                      className="form-control"
                      value={appointmentForm.date}
                      onChange={(e) => handleFormChange('date', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">Book Time Slot</label>
                    <select
                      id="time"
                      className="form-control"
                      value={appointmentForm.time}
                      onChange={(e) => handleFormChange('time', e.target.value)}
                    >
                      <option value="">Select Time Slot</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary btn-book-now">
                    Book Now
                  </button>
                </form>
              </>
            )}
          </div>
        </Popup>
      </div>
    </section>
  );
}
