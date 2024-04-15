import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRatings, setUserRatings] = useState({});

  useEffect(() => {
    // Fetch books based on search query
    const url = searchQuery ? `https://devies-reads-be.onrender.com/books?search=${searchQuery}` : 'https://devies-reads-be.onrender.com/books';
    fetch(url)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, [searchQuery]);

  const handleSearch = () => {
    // Trigger search when the button is clicked
    fetch(`https://devies-reads-be.onrender.com/books?search=${searchQuery}`)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  };

  const handleAddToShelf = (bookId) => {
    // Send request to add book to user's shelf
    fetch(`https://devies-reads-be.onrender.com/users/Bearer/shelf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify({
        bookId: bookId,
        status: 'wantToRead' 
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Book added to shelf successfully!');
      } else {
        throw new Error('Error adding book to shelf');
      }
    })
    .catch(error => console.error('Error adding book to shelf:', error));
  };

  const handleRateBook = (bookId, rating) => {
    // Send request to rate the book
    fetch(`https://devies-reads-be.onrender.com/books/${bookId}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        rating: rating
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Book rated successfully!');
        // Update the user's rating in the state
        setUserRatings(prevState => ({
          ...prevState,
          [bookId]: rating
        }));
      } else {
        throw new Error('Error rating book');
      }
    })
    .catch(error => console.error('Error rating book:', error));
  };

  return (
    <div>
      <h2>Book List</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search books..."
        />
        <button onClick={handleSearch}>Search</button> 
      </div>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.name}</strong> by {book.author} 
            {userRatings[book.id] && (
              <span>Your Rating: {userRatings[book.id]}</span>
            )}
            <FaPlus onClick={() => handleAddToShelf(book.id)} style={{ marginLeft: '5px', cursor: 'pointer' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
