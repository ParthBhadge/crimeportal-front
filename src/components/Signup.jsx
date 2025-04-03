import React, { useState, useEffect } from 'react';
import '../assets/styles/signup.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Function to generate a random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newCaptcha = '';
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(newCaptcha);
  };

  // Function to validate captcha
  const validateCaptcha = () => {
    return userInput === captcha;
  };

  // Function to validate password
  const validatePassword = (password) => {
    const requirements = [
      /[A-Z]/, // Uppercase
      /[a-z]/, // Lowercase
      /[0-9]/, // Number
      /[^A-Za-z0-9]/, // Special character
    ];
    return requirements.every((regex) => regex.test(password));
  };

  // Function to clear the form
  const clearForm = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', password: '' });
    setPassword('');
    setUserInput('');
  };

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert('Password does not meet requirements.');
      return;
    }

    if (!validateCaptcha()) {
      alert('Invalid captcha. Please try again.');
      generateCaptcha();
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Signup successful!');
        navigate('/login');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <Link to="/" className="logo">Crime Portal</Link>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          required
          onFocus={() => setShowPasswordRequirements(false)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          onFocus={() => setShowPasswordRequirements(false)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
          required
          onFocus={() => setShowPasswordRequirements(false)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange(e);
          }}
          onFocus={() => setShowPasswordRequirements(true)}
          required
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          required
          onFocus={() => setShowPasswordRequirements(false)}
        />
        {showPasswordRequirements && (
          <div className="password-requirements">
            <strong>Password must contain:</strong>
            <ul>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>
        )}
        {showPasswordRequirements && (
          <div className="sample-password">
            <strong>Sample Password:</strong> Pass@123
          </div>
        )}
        <div className="captcha-container">
          <input
            type="text"
            placeholder="Enter Captcha"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />
          <div
            className="captcha-code"
            onClick={generateCaptcha}
            title="Click to refresh captcha"
          >
            {captcha}
          </div>
        </div>
        <button type="submit">Signup</button>
        <button className="cancel" onClick={clearForm}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Signup;