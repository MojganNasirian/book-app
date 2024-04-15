import React, { useState } from 'react';
import './MyBooks.css'; 

const MyBooks = () => {
  const [bookId, setBookId] = useState('');
  const [searchedBook, setSearchedBook] = useState({ book: null, status: null }); 
  const [error, setError] = useState(null);

  // Function to add book to shelf
  const addToShelf = (status) => {
    if (searchedBook.book) {
      fetch(`https://devies-reads-be.onrender.com/users/Bearer/shelf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({
          bookId: searchedBook.book.id,
          status: status
        })
      })
      .then(response => {
        if (response.ok) {
          // Optionally, display a success message or update the UI
          alert('Book added to shelf successfully!');
        } else {
          throw new Error('Failed to add book to shelf');
        }
      })
      .catch(error => {
        setError(error.message);
        // Optionally, display an error message
      });
    }
  };

  const handleSearch = () => {
    if (bookId.trim() !== '') {
      fetch(`https://devies-reads-be.onrender.com/books/${bookId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Book not found');
          }
        })
        .then(data => setSearchedBook({ book: data, status: null })) 
        .catch(error => setError(error.message));
    }
  };

  return (
    <div className="my-books-container"> 
      <h2>My Books</h2>
      <div className="search-container"> 
        <input
          type="text"
          value={bookId}
          onChange={e => setBookId(e.target.value)}
          placeholder="Enter book ID"
          className="search-input" 
        />
        <button onClick={handleSearch} className="search-button">Search</button> 
      </div>
      {error && <p className="error-message">{error}</p>} 
      {searchedBook.book && (
        <div className="book-details"> 
          <h3>{searchedBook.book.name}</h3>
          <p>Genre: {searchedBook.book.genre}</p>
          <p>Description: {searchedBook.book.description}</p>
          <div className="shelf-buttons">
            <button onClick={() => addToShelf('haveRead')}>Have Read</button>
            <button onClick={() => addToShelf('currentlyReading')}>Currently Reading</button>
            <button onClick={() => addToShelf('wantToRead')}>Want to Read</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBooks;
