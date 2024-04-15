import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import Book from './components/Book';
import Login from './components/Login';
import Signup from './components/Signup';
import MyBooks from './components/MyBooks';
import Search from './components/Search';
import './App.css';

function App() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mybooks" element={isLoggedIn ? <MyBooks /> : <Navigate to="/login" />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        {isLoggedIn && <BookList />} 
      </div>
    </Router>
  );
}

export default App;
