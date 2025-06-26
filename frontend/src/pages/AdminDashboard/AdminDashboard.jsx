// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';
// // import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const { setToken, setRole } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setToken("");
//     setRole("");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (
//     <div className="admin-dashboard">
//       <header className="admin-header">
//         <h1>Admin Dashboard</h1>
//         <button onClick={handleLogout} className="logout-btn">
//           Logout
//         </button>
//       </header>
      
//       <div className="admin-content">
//         <nav className="admin-sidebar">
//           <ul>
//             <li><a href="#users">Manage Users</a></li>
//             <li><a href="#orders">Manage Orders</a></li>
//             <li><a href="#products">Manage Products</a></li>
//             <li><a href="#analytics">Analytics</a></li>
//             <li><a href="#settings">Settings</a></li>
//           </ul>
//         </nav>
        
//         <main className="admin-main">
//           <div className="dashboard-cards">
//             <div className="card">
//               <h3>Total Users</h3>
//               <p className="card-number">1,234</p>
//             </div>
//             <div className="card">
//               <h3>Total Orders</h3>
//               <p className="card-number">567</p>
//             </div>
//             <div className="card">
//               <h3>Revenue</h3>
//               <p className="card-number">$12,345</p>
//             </div>
//             <div className="card">
//               <h3>Products</h3>
//               <p className="card-number">89</p>
//             </div>
//           </div>
          
//           <div className="recent-activity">
//             <h3>Recent Activity</h3>
//             <div className="activity-list">
//               <div className="activity-item">
//                 <span>New user registered</span>
//                 <span className="activity-time">2 hours ago</span>
//               </div>
//               <div className="activity-item">
//                 <span>Order #1234 completed</span>
//                 <span className="activity-time">4 hours ago</span>
//               </div>
//               <div className="activity-item">
//                 <span>Product updated</span>
//                 <span className="activity-time">6 hours ago</span>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;