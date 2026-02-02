import { useState, useEffect } from 'react';
import './Appointments.css';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  const handleCancelAppointment = (appointmentId, doctorName) => {
    if (window.confirm(`Are you sure you want to cancel your appointment with ${doctorName}?`)) {
      const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      alert(`Your appointment with ${doctorName} has been cancelled successfully.`);
    }
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
    <section className="appointments-section">
      <div className="container">
        <h2>Your Appointments</h2>
        <p className="subtitle">Manage your booked appointments</p>
        
        {appointments.length === 0 ? (
          <div className="no-appointments">
            <p>You don't have any appointments booked yet.</p>
            <a href="/instant-consultation" className="btn btn-primary">Book an Appointment</a>
          </div>
        ) : (
          <div className="appointments-grid">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="doctor-info">
                  <h3>{appointment.doctorName}</h3>
                  <p className="specialty">{appointment.specialty}</p>
                  <div className="doctor-details">
                    <p className="experience">
                      <i className="bi bi-briefcase"></i> {appointment.experience} years experience
                    </p>
                    <div className="rating">
                      {renderStars(appointment.rating)}
                      <span className="rating-value">{appointment.rating}</span>
                    </div>
                  </div>
                  <div className="appointment-status">
                    <p className="booked-status">Appointment Booked!</p>
                  </div>
                  <div className="appointment-details">
                    <p><strong>Name:</strong> {appointment.patientName}</p>
                    <p><strong>Phone Number:</strong> {appointment.phone}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                  </div>
                </div>
                <button 
                  className="btn btn-cancel"
                  onClick={() => handleCancelAppointment(appointment.id, appointment.doctorName)}
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
