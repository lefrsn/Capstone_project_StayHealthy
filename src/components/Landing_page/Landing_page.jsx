import './Landing_page.css';

export default function LandingPage() {
  return (
    <header className="masthead" id="home">
      <div className="container">
        <div className="content">
          <h1>Your Health</h1>
          <h1 className="mb-3">Our Responsibility</h1>
          <p className="lead mb-5">
            Our mission is to provide quality healthcare for everyone. Sign up today to get started.
          </p>
          <a href="/signup" className="btn btn-primary btn-lg">Get Started</a>
        </div>
      </div>
    </header>
  );
}
