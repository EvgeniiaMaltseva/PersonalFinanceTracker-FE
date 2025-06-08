import React, { useEffect, useState } from 'react';
import { getUser, getTransactions } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import RecentTransactions from '../components/RecentTransactions';
import TransactionPieChart from '../components/TransactionPieChart';


function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        const userResponse = await getUser();
        setUser(userResponse.data.data);

        const transactionsResponse = await getTransactions();
        setTransactions(transactionsResponse.data);

      } catch (err) {
        console.error('Fetch error:', err.response?.status, err.response?.data || err.message);
        navigate('/');
      }
    };
    fetchUserAndTransactions();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <h1>Welcome, {user.username}!</h1>
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-light vh-100 p-3">
          <h4 className="mb-4">Overview</h4>
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
          <div className="row mt-4">
            <div className="col-lg-12">
              <h3>Financial Overview</h3>
              <div className="card card-body d-flex justify-content-center">
                {transactions.length > 0 ? (
                  <TransactionPieChart transactions={transactions}/>
                ) : (
                  <p>No transactions available to display chart.</p>
                )}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12">
              <h3>Recent Transactions</h3>
              <div className="card card-body">
                <RecentTransactions transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;