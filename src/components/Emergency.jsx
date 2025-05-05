import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../assets/styles/emergency.css'; // Import the CSS file

const Emergency = () => {
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
      <header>
        <nav>
          <Link to="/" className="logo">Crime Portal</Link>
          <ul>
            <li><Link to="/home" className="nav-link">Home</Link></li> {/* Updated to /home */}
            <li><Link to="/contact" className="nav-link">Contact</Link></li> {/* Updated to /contact */}
            <li>
              <button className="theme-toggle" onClick={toggleTheme}>🌓</button>
            </li>
            <li>
              <Link to="/profile" className="profile-icon">👤</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container">
        {/* Emergency Contacts Section */}
        <div class="section">
          <h2>Emergency Contacts</h2>
          <div class="emergency-contacts">
            <div class="contact-card">
              <h3>Police</h3>
              <p>📞 100</p>
            </div>
            <div class="contact-card">
              <h3>Ambulance</h3>
              <p>📞 102</p>
            </div>
            <div class="contact-card">
              <h3>Fire Brigade</h3>
              <p>📞 101</p>
            </div>
            <div class="contact-card">
              <h3>Women Helpline</h3>
              <p>📞 1091</p>
            </div>
            <div class="contact-card">
              <h3>Cyber Crime</h3>
              <p>📞 155620</p>
            </div>
            <div class="contact-card">
              <h3>Child Helpline</h3>
              <p>📞 1098</p>
            </div>
          </div>
        </div>

        {/* Crime Prevention Tips */}
        <div class="section">
          <h2>Crime Prevention Tips</h2>
          <ul>
            <li>Always be aware of your surroundings, especially in unfamiliar areas.</li>
            <li>Avoid walking alone at night; use well-lit and populated routes.</li>
            <li>Keep your valuables secure and out of sight in public places.</li>
            <li>Lock your doors and windows at home and in your vehicle.</li>
            <li>Report suspicious activities to local authorities immediately.</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2023 Crime Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Emergency;