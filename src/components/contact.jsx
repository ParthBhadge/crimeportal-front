import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../assets/styles/about.css'; // Reuse the CSS file for consistent styling

const Contact = () => {
  // Theme toggle function
  const toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('dark-theme');

    // Save theme preference in localStorage
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDarkTheme);
  };

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('dark-theme');
    if (savedTheme === 'true') {
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <header className="gradient-bg shadow-lg">
        <nav>
          <Link to="/" className="logo">Crime Portal</Link>
          <ul>
            <li><Link to="/home" className="nav-link">Home</Link></li> {/* Updated to /home */}
            <li><Link to="/about" className="nav-link">About</Link></li> {/* Updated to /about */}
            <li>
              <button className="theme-toggle" onClick={toggleTheme}>🌓</button>
            </li>
            <li>
              <Link to="/profile" className="profile-icon">👤</Link> {/* Updated to /profile */}
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <div className="container">
          <div className="about-section">
            <h1>Contact Us</h1>
            <p>
              If you have any questions, concerns, or need assistance, feel free to reach out to us. We are here to help!
            </p>
            <div className="creators-grid">
              {/* Contact 1 */}
              <div className="creator-card">
                <img src="https://via.placeholder.com/150" alt="Support Team" />
                <h3>Support Team</h3>
                <p>Email: support@crimeportal.com</p>
                <p>Phone: +1 234 567 890</p>
              </div>
              {/* Contact 2 */}
              <div className="creator-card">
                <img src="https://via.placeholder.com/150" alt="Emergency Contact" />
                <h3>Emergency Contact</h3>
                <p>Email: emergency@crimeportal.com</p>
                <p>Phone: +1 987 654 321</p>
              </div>
              {/* Contact 3 */}
              <div className="creator-card">
                <img src="https://via.placeholder.com/150" alt="General Inquiry" />
                <h3>General Inquiry</h3>
                <p>Email: info@crimeportal.com</p>
                <p>Phone: +1 555 123 456</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="gradient-bg shadow-lg">
        <div className="container">
          <p>&copy; 2023 Crime Portal. All rights reserved.</p>
          <ul>
            <li><Link to="/terms" className="nav-link">Terms of Service</Link></li> {/* Updated to /terms */}
            <li><Link to="/privacy" className="nav-link">Privacy Policy</Link></li> {/* Updated to /privacy */}
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Contact;