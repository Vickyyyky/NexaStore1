import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000"; // API base URL

  return (
    <div>
      {/* Toast notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Navbar */}
      <Navbar />
      <hr />

      {/* Sidebar + Main Content */}
      <div className="app-content" style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
        <Sidebar />
        
        {/* Main content area */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/list" />} />
            
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
