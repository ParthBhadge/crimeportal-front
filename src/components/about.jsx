import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../assets/styles/about.css'; // Import the CSS file
import Parth from '../assets/Parth3.jpg'; // Import the image for Parth
import Chetna from '../assets/Chetna.jpg'; // Import the image for Chetna
import Prena from '../assets/Prena.jpg'; // Import the image for Prena
import Akash from '../assets/Akash.jpg'; // Import the image for Akash
import Rishi from '../assets/Rishi.jpg'; // Import the image for Rishi



const About = () => {
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
          <Link to="/" className="logo">Crime Portal</Link> {/* Updated to use Link */}
          <ul>
            <li><Link to="/home" className="nav-link">Home</Link></li> {/* Updated to /home */}
            <li><Link to="/contact" className="nav-link">Contact</Link></li> {/* Updated to /contact */}
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
            <h1>About Us</h1>
            <p>
              Welcome to the Crime Portal, a platform dedicated to enhancing community safety and awareness.
              Our mission is to provide a secure and user-friendly way to report crimes, track their status,
              and access valuable resources for crime prevention. We are committed to making our communities
              safer and more connected.
            </p>
            <div className="creators-grid">
              {/* Creator 1: Akash Gupta */}
              <div className="creator-card">
                <img src={Akash} alt="Akash Gupta" />
                <h3>Akash </h3>
                <p>Developer</p>
              </div>
              {/* Creator 3: Chetna */}
              <div className="creator-card">
                <img src={Chetna} alt="Chetna" />
                <h3>Chetna</h3>
                <p>Developer</p>
              </div>
              {/* Creator 4: Parth */}
              <div className="creator-card">
                <img className='imgt' src={Parth} alt="Parth" />

                <h3>Parth</h3>
                <p>Developer</p>
                
              </div>
              {/* Creator 5: Pratiskha */}
              <div className="creator-card">
                <img src={Prena} alt="Pratiskha" />
                <h3>Pratiskha</h3>
                <p>Developer</p>
              </div>
              {/* Creator 2: Rishi Raj */}
              <div className="creator-card">
                <img className='imgt' src={Rishi} alt="Parth" />

                <h3>Rishiraj</h3>
                <p>Developer</p>
                
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

export default About;