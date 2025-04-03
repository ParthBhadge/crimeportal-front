import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile and complaints
  useEffect(() => {
    const fetchProfileAndComplaints = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch user profile
        const profileResponse = await fetch('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileResult = await profileResponse.json();
        if (profileResponse.ok) {
          setUser(profileResult);
          setProfilePic(profileResult.profilePic || ''); // Load profile picture from backend
        } else {
          alert('Error: ' + profileResult.error);
          navigate('/login');
        }

        // Fetch user complaints
        const complaintsResponse = await fetch('/api/complaints', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const complaintsResult = await complaintsResponse.json();
        if (complaintsResponse.ok) {
          setComplaints(complaintsResult);
        } else {
          alert('Error: ' + complaintsResult.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/login');
      }
    };

    fetchProfileAndComplaints();
  }, [navigate]);

  // Handle profile picture upload
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        setProfilePic(base64Image);

        // Save the profile picture to the backend
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('/api/auth/profile-pic', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ profilePic: base64Image }),
          });

          if (!response.ok) {
            alert('Failed to save profile picture.');
          }
        } catch (error) {
          console.error('Error saving profile picture:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove profile picture
  const removeProfilePicture = async () => {
    setProfilePic('');

    // Remove the profile picture from the backend
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/auth/profile-pic', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        alert('Failed to remove profile picture.');
      }
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('dark-theme', !isDarkTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    alert('You have been logged out.');
    navigate('/login'); // Redirect to the login page
  };

  // Check for saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('dark-theme') === 'true';
    setIsDarkTheme(savedTheme);
    if (savedTheme) {
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <div className="profile-container">
      <header className="gradient-bg shadow-lg">
        <nav>
          <a href="#" className="logo">Crime Portal</a>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li>
              <button className="theme-toggle" onClick={toggleTheme}>🌓</button>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <div className='space'></div>

      <div className="container">
        <h2>Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>

        {/* Profile Image with Camera Icon */}
        <div
          className="profile-image"
          onClick={() => document.getElementById('upload-pic').click()}
        >
          {profilePic ? (
            <img id="profile-pic" src={profilePic} alt="Profile" />
          ) : (
            <img
              id="camera-icon"
              className="camera-icon"
              src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/camera-512.png"
              alt="Camera Icon"
            />
          )}
        </div>

        {/* Remove Profile Picture Button */}
        {profilePic && (
          <div style={{ textAlign: 'center' }}>
            <button
              id="remove-button"
              className="remove-button"
              onClick={removeProfilePicture}
            >
              Remove Profile Picture
            </button>
          </div>
        )}

        {/* Hidden File Input for Uploading Profile Picture */}
        <div className="file-input">
          <input
            type="file"
            id="upload-pic"
            accept="image/*"
            onChange={handleProfilePictureUpload}
          />
        </div>

        <div className='container-status'>

        <h3>Your Complaints</h3>
        <div className="complaints-table">
          <table>
          <thead>
            <tr>
              <th>Complaint Type</th>
              <th>Description</th>
              <th>Status</th> {/* Fixed unclosed tag */}
              <th>Date</th>
              </tr>
              </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.complaintType}</td>
                  <td>{complaint.complaint}</td>
                  <td className={`status ${complaint.status.toLowerCase()}`}>
                    {complaint.status}
                  </td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
              </div>

      <footer className="gradient-bg shadow-lg">
        <p>&copy; 2023 Crime Portal. All rights reserved.</p>
        <ul>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Profile;