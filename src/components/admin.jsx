import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../assets/styles/admin.css';

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Theme toggle function
  const toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('dark-theme');

    // Save theme preference in localStorage
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDarkTheme);
  };

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const response = await fetch('/api/admin/complaints', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setComplaints(data);
        } else {
          console.error('Error fetching complaints:', data.error);
          setError(data.error || 'Failed to fetch complaints');
        }
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('An error occurred while fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Update complaint status
  const updateComplaintStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/complaints/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedComplaint = await response.json();
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === id ? updatedComplaint : complaint
          )
        );
        alert('Complaint status updated successfully');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update complaint status');
      }
    } catch (err) {
      alert('An error occurred while updating the complaint status');
    }
  };

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-container">
      {/* Navbar */}
      <header className="gradient-bg shadow-lg">
        <nav>
          <Link to="/" className="logo">Crime Portal</Link>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/type">Report Crime</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
            <li>
              <button className="theme-toggle" onClick={toggleTheme}>🌓</button>
            </li>
            <li>
              <Link to="/profile" className="profile-icon">👤</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className='space'></div>

      {/* Admin Dashboard */}
      <h1>Admin Dashboard</h1>
      <p>Manage user complaints below:</p>

      <div className="complaints-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Complaint Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.name || 'Unknown User'}</td>
                <td>{complaint.complaintType}</td>
                <td>{complaint.complaint}</td>
                <td className={`status ${complaint.status.toLowerCase()}`}>
                  {complaint.status}
                </td>
                <td>
                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      updateComplaintStatus(complaint._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;