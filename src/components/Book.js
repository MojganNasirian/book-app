import React, { useState, useEffect } from 'react';

const Book = () => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details
    fetch('https://devies-reads-be.onrender.com/books') 
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, []);

  return (
    <div>
      <h2>Book Detail</h2>
      {book && (
        <div>
          <h3>{book.name}</h3>
          <p>Genre: {book.genre}</p>
          <p>Description: {book.description}</p>
        </div>
      )}
    </div>
  );
}

export default Book;
