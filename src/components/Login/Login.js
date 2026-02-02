// Login Component JavaScript

// Password visibility toggle for Log In
document.addEventListener('DOMContentLoaded', () => {
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

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('#login-email').value;
            alert(`Logged in successfully with ${email}`);
            this.reset();
        });
    }
});
