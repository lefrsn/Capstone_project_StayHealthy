import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Notification from './components/Notification/Notification.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import LandingPage from './components/Landing_page/Landing_page.jsx';
import SignUp from './components/Sign_up/Sign_up.jsx';
import Login from './components/Login/Login.jsx';
import InstantConsultation from './components/Instant_Consultation/Instant_Consultation.jsx';
import Appointments from './components/Appointments/Appointments.jsx';
import FindDoctorSearch from './components/FindDoctorSearch/FindDoctorSearch.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import Profile from './components/Profile/Profile.jsx';
import Reports from './components/Reports/Reports.jsx';
import './components/app.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Notification>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/instant-consultation" element={<InstantConsultation />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/find-doctors" element={<FindDoctorSearch />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
            <Footer />
          </div>
        </Notification>
      </Router>
    </AuthProvider>
  );
}

export default App;
