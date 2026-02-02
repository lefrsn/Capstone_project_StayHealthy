import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Reviews.css';

export default function Reviews() {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => onStarClick(i) : undefined}
        >
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      const appointmentsData = JSON.parse(savedAppointments);
      
      // Load existing reviews
      const savedReviews = localStorage.getItem('appointmentReviews');
      const reviews = savedReviews ? JSON.parse(savedReviews) : {};
      
      // Merge appointments with their reviews
      const appointmentsWithReviews = appointmentsData.map(apt => ({
        ...apt,
        reviewGiven: reviews[apt.id] || null
      }));
      
      setAppointments(appointmentsWithReviews);
    }
  }, []);

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setReviewForm({
      name: appointment.patientName || '',
      review: '',
      rating: 0
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setReviewForm({ name: '', review: '', rating: 0 });
  };

  const handleFormChange = (field, value) => {
    setReviewForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!reviewForm.name || !reviewForm.review) {
      alert('Please fill in all fields');
      return;
    }

    if (reviewForm.rating === 0) {
      alert('Please provide a star rating');
      return;
    }

    // Save review to localStorage
    const savedReviews = localStorage.getItem('appointmentReviews');
    const reviews = savedReviews ? JSON.parse(savedReviews) : {};
    
    reviews[selectedAppointment.id] = {
      name: reviewForm.name,
      review: reviewForm.review,
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString()
    };
    
    localStorage.setItem('appointmentReviews', JSON.stringify(reviews));
    
    // Update appointments state
    const updatedAppointments = appointments.map(apt => 
      apt.id === selectedAppointment.id 
        ? { ...apt, reviewGiven: reviews[selectedAppointment.id] }
        : apt
    );
    setAppointments(updatedAppointments);
    
    alert('Thank you for your review!');
    handleCloseModal();
  };

  return (
    <section className="reviews-section">
      <div className="container">
        <h2>Reviews</h2>
        <p className="subtitle">Provide feedback for your appointments</p>
        
        {appointments.length === 0 ? (
          <div className="no-appointments">
            <p>You don't have any appointments to review yet.</p>
            <a href="/instant-consultation" className="btn btn-primary">Book an Appointment</a>
          </div>
        ) : (
          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Specialty</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Review Given</th>
                  <th>Provide Feedback</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.specialty}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td className="review-preview">
                      {appointment.reviewGiven 
                        ? (
                          <div>
                            <div className="rating-stars">
                              {renderStars(appointment.reviewGiven.rating)}
                            </div>
                            <div className="review-text">
                              {appointment.reviewGiven.review.substring(0, 50) + (appointment.reviewGiven.review.length > 50 ? '...' : '')}
                            </div>
                          </div>
                        )
                        : '-'
                      }
                    </td>
                    <td>
                      <button 
                        className="btn btn-feedback"
                        onClick={() => handleOpenModal(appointment)}
                        disabled={appointment.reviewGiven !== null}
                      >
                        {appointment.reviewGiven ? 'Reviewed' : 'Click Here'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Popup open={showModal} onClose={handleCloseModal} modal nested>
          <div className="review-modal">
            <button className="close-modal" onClick={handleCloseModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            <h3>Give Your Review</h3>
            
            {selectedAppointment && (
              <div className="appointment-info">
                <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
                <p><strong>Specialty:</strong> {selectedAppointment.specialty}</p>
                <p><strong>Date:</strong> {selectedAppointment.date}</p>
              </div>
            )}
            
            <form className="review-form" onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="form-control"
                  value={reviewForm.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Rating:</label>
                <div className="star-rating">
                  {renderStars(reviewForm.rating, true, (rating) => handleFormChange('rating', rating))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="review">Review:</label>
                <textarea
                  id="review"
                  placeholder="Share your experience..."
                  className="form-control"
                  rows="5"
                  value={reviewForm.review}
                  onChange={(e) => handleFormChange('review', e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-submit">
                Submit
              </button>
            </form>
          </div>
        </Popup>
      </div>
    </section>
  );
}
