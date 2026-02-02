// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle form submission
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you! We'll contact you at ${email}`);
    this.reset();
});

// Password visibility toggle for Sign Up
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle icon
        const icon = this.querySelector('i');
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
    });
}

// Password visibility toggle for Log In
const toggleLoginPasswordBtn = document.getElementById('toggleLoginPassword');
const loginPasswordInput = document.getElementById('login-password');

if (toggleLoginPasswordBtn && loginPasswordInput) {
    toggleLoginPasswordBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPasswordInput.setAttribute('type', type);
        
        // Toggle icon
        const icon = this.querySelector('i');
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
    });
}

// Handle sign up form submission
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    
    alert(`Welcome ${name}! Your account has been created with the ${role} role. A confirmation email will be sent to ${email}.`);
    this.reset();
    
    // Reset password input type to password
    if (passwordInput && passwordInput.getAttribute('type') === 'text') {
        passwordInput.setAttribute('type', 'password');
        const icon = togglePasswordBtn.querySelector('i');
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
});

// Handle log in form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    
    alert(`Welcome back! You have successfully logged in with ${email}.`);
    this.reset();
    
    // Reset password input type to password
    if (loginPasswordInput && loginPasswordInput.getAttribute('type') === 'text') {
        loginPasswordInput.setAttribute('type', 'password');
        const icon = toggleLoginPasswordBtn.querySelector('i');
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
});

// Appointments Search Functionality
const specialtySearch = document.getElementById('specialtySearch');
const searchBtn = document.querySelector('.search-btn');
const doctorsGrid = document.getElementById('doctorsGrid');
const noResults = document.getElementById('noResults');
const doctorCards = document.querySelectorAll('.doctor-card');

function filterDoctors() {
    const searchTerm = specialtySearch?.value.toLowerCase() || '';
    let visibleCount = 0;

    doctorCards.forEach(card => {
        const specialty = card.getAttribute('data-specialty').toLowerCase();
        const doctorName = card.querySelector('.doctor-name').textContent.toLowerCase();
        const doctorSpecialty = card.querySelector('.doctor-specialty').textContent.toLowerCase();

        if (
            specialty.includes(searchTerm) ||
            doctorName.includes(searchTerm) ||
            doctorSpecialty.includes(searchTerm) ||
            searchTerm === ''
        ) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// Search on input change
if (specialtySearch) {
    specialtySearch.addEventListener('input', filterDoctors);
    specialtySearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterDoctors();
        }
    });
}

// Search button click
if (searchBtn) {
    searchBtn.addEventListener('click', filterDoctors);
}

// Book Now button functionality
const bookButtons = document.querySelectorAll('.btn-book');
bookButtons.forEach(button => {
    button.addEventListener('click', function() {
        const doctorName = this.closest('.doctor-card').querySelector('.doctor-name').textContent;
        const specialty = this.closest('.doctor-card').querySelector('.doctor-specialty').textContent;
        
        alert(`Appointment request submitted for ${doctorName}!\n\nWe will confirm your appointment shortly.`);
    });
});

// Review Modal Functionality
const writeReviewBtns = document.querySelectorAll('.write-review-btn');
const reviewModal = document.getElementById('reviewModal');
const closeReviewModal = document.querySelector('.review-modal-content .close-modal');
const cancelReviewBtn = document.getElementById('cancelReview');
const reviewForm = document.getElementById('reviewForm');
const starsInput = document.getElementById('starsInput');
const ratingValue = document.getElementById('ratingValue');
const ratingFeedback = document.getElementById('ratingFeedback');

// Open review modal
writeReviewBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const doctorName = this.getAttribute('data-doctor');
        const specialty = this.getAttribute('data-specialty');
        
        document.getElementById('modalDoctorName').textContent = doctorName;
        document.getElementById('modalDoctorSpecialty').textContent = specialty;
        
        reviewModal.classList.add('active');
    });
});

// Close review modal
if (closeReviewModal) {
    closeReviewModal.addEventListener('click', function() {
        reviewModal.classList.remove('active');
        reviewForm?.reset();
        ratingValue.value = 0;
        document.querySelectorAll('.stars-input i').forEach(star => {
            star.classList.remove('active');
        });
    });
}

if (cancelReviewBtn) {
    cancelReviewBtn.addEventListener('click', function() {
        reviewModal.classList.remove('active');
        reviewForm?.reset();
        ratingValue.value = 0;
        document.querySelectorAll('.stars-input i').forEach(star => {
            star.classList.remove('active');
        });
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === reviewModal) {
        reviewModal.classList.remove('active');
        reviewForm?.reset();
        ratingValue.value = 0;
        document.querySelectorAll('.stars-input i').forEach(star => {
            star.classList.remove('active');
        });
    }
});

// Star rating input
const stars = document.querySelectorAll('.stars-input i');
stars.forEach(star => {
    star.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        ratingValue.value = value;
        
        // Update visual feedback
        const feedbackTexts = {
            '1': 'Poor',
            '2': 'Fair',
            '3': 'Good',
            '4': 'Very Good',
            '5': 'Excellent'
        };
        ratingFeedback.textContent = feedbackTexts[value];
        
        // Update active stars
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });

    // Hover effect
    star.addEventListener('mouseover', function() {
        const hoverValue = this.getAttribute('data-value');
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= hoverValue) {
                s.style.color = '#ffc107';
            } else {
                s.style.color = '#ddd';
            }
        });
    });
});

// Reset star colors on mouse leave
if (starsInput) {
    starsInput.addEventListener('mouseleave', function() {
        stars.forEach(star => {
            if (star.classList.contains('active')) {
                star.style.color = '#ffc107';
            } else {
                star.style.color = '#ddd';
            }
        });
    });
}

// Handle review form submission
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const patientName = document.getElementById('patientName').value;
        const rating = ratingValue.value;
        const feedback = document.getElementById('feedbackText').value;
        
        if (rating === '0') {
            alert('Please select a rating before submitting.');
            return;
        }
        
        alert(`Thank you ${patientName}! Your review has been submitted successfully.\n\nRating: ${rating} stars`);
        
        // Reset form and close modal
        reviewForm.reset();
        ratingValue.value = 0;
        stars.forEach(star => {
            star.classList.remove('active');
            star.style.color = '#ddd';
        });
        ratingFeedback.textContent = '';
        reviewModal.classList.remove('active');
    });
}