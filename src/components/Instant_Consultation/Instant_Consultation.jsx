import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Instant_Consultation.css';

export default function InstantConsultation() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: ''
  });
  const [doctorForms, setDoctorForms] = useState({});

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', experience: 15, rating: 4.8, available: true },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', experience: 10, rating: 4.9, available: true },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', experience: 12, rating: 4.7, available: true },
    { id: 4, name: 'Dr. James Williams', specialty: 'Orthopedic', experience: 20, rating: 4.6, available: false },
  ];

  const handleDoctorFormChange = (doctorId, field, value) => {
    setDoctorForms(prev => ({
      ...prev,
      [doctorId]: {
        ...(prev[doctorId] || {}),
        [field]: value
      }
    }));
  };

  const handleBookAppointment = (doctor) => {
    const form = doctorForms[doctor.id];
    if (!form?.name || !form?.phone) {
      alert('Please enter your name and phone number');
      return;
    }
    setSelectedDoctor({ 
      ...doctor, 
      patientName: form.name,
      patientPhone: form.phone
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save appointment to localStorage
    const appointment = {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      experience: selectedDoctor.experience,
      rating: selectedDoctor.rating,
      patientName: selectedDoctor.patientName,
      phone: selectedDoctor.patientPhone,
      date: appointmentDetails.date,
      time: appointmentDetails.time
    };
    
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    existingAppointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));
    
    alert(`Appointment booked with ${selectedDoctor.name}!\nName: ${selectedDoctor.patientName}\nPhone: ${selectedDoctor.patientPhone}\nDate: ${appointmentDetails.date}\nTime: ${appointmentDetails.time}`);
    setShowModal(false);
    setAppointmentDetails({ date: '', time: '' });
    
    // Clear the form for this doctor
    setDoctorForms(prev => ({
      ...prev,
      [selectedDoctor.id]: { name: '', phone: '' }
    }));
  };

  const handleCancel = () => {
    setShowModal(false);
    setAppointmentDetails({ date: '', time: '' });
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

  return (
    <section className="instant-consultation-section">
      <div className="container">
        <h2>Instant Consultation</h2>
        <p className="subtitle">Book an appointment with our available doctors</p>
        
        <div className="doctors-grid">
          {doctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="specialty">{doctor.specialty}</p>
                <div className="doctor-details">
                  <p className="experience">
                    <i className="bi bi-briefcase"></i> {doctor.experience} years experience
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
              
              {doctor.available && (
                <div className="booking-form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="form-control"
                      value={doctorForms[doctor.id]?.name || ''}
                      onChange={(e) => handleDoctorFormChange(doctor.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="form-control"
                      value={doctorForms[doctor.id]?.phone || ''}
                      onChange={(e) => handleDoctorFormChange(doctor.id, 'phone', e.target.value)}
                    />
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <Popup open={showModal} onClose={handleCancel} modal nested>
          <div className="appointment-modal">
            <h3>Book Appointment with {selectedDoctor?.name}</h3>
            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-group">
                <label htmlFor="date">Appointment Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={appointmentDetails.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Appointment Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="form-control"
                  value={appointmentDetails.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </Popup>
      </div>
    </section>
  );
}
