import React, { useEffect, useState } from 'react';
import { getUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        console.log('User data:', response.data.data);
        setUser(response.data.data); // Store only the 'data' field from api response 
      } catch (err) {
        console.error('Fetch user error:', err.response?.status, err.response?.data || err.message);
        navigate('/'); 
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container-fluid">
    <div className="row">
    <h1>Welcome, {user.username}!</h1>
      {/* Sidebar */}
      <div className="col-md-3 col-lg-2 bg-light vh-100 p-3">
        <h4 className="mb-4">Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/transactions">Transactions</Link>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="col-md-9 col-lg-10 p-4">
        <h2>Dashboard</h2>
        <p>Welcome to your financial overview. Check your transactions or add new ones from the menu.</p>
        {/* dashboard content here */}
      </div>
    </div>
  </div>
  );
}

export default Dashboard;