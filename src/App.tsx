import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './containers/admin/admin';
import Home from './containers/home/home';
import Courses from './containers/course/course';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/courses' element={<Courses />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
