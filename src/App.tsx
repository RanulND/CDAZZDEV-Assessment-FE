import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './containers/admin/admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
