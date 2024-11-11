import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

function BookFinder() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setLoading(true);
    try {
      if(!query){
        return;
      }
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}&page=${page}&limit=10`
      );
      console.log('Books', typeof response.data.docs, response.data.docs);
      setBooks(response.data.docs);
    } catch (error) {
      console.error("Error fetching book data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };
  
  useEffect(() => {
    if (query) handleSearch();
  }, [page]);

  return (
    <div className='container'>
      <h1>Book Finder</h1>
      <input
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='book-container'>
          {books.map((book) => (
            <div key={book.key} className='book'>
              <h3>{book.title}</h3>
              {book.author_name && (
                <p>Author: {book.author_name.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1 || loading}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={loading || books.length == 0}>
          Next
        </button>
      </div>
    </div>
  )
}

export default BookFinder;