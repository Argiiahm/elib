import { useCallback, useEffect, useState } from 'react';
import { getBooks } from '../services/book.service';
import { useSearchParams } from 'react-router';

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(false);
  const keyword = searchParams.get('search') || '';

  // Dengan useCallback, fetchBooks cuma dibuat ulang kalau keyword berubah. Loop berhenti.
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBooks({
        page: 1,
        limit: 10,
        search: keyword,
        sortBy: 'createdAt',
        orderBy: 'desc',
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = search.trim();

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return { fetchBooks, books, search, setSearch, handleSearch, loading };
};

export default useBooks;
