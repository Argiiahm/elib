import { useCallback, useEffect, useState } from 'react';
import { getBooks } from '../services/book.service';
import { useSearchParams } from 'react-router';

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(false);

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const keyword = searchParams.get('search') || '';

  // Meta Data Pagination Dari Backend
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    count: 0,
    countPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Dengan useCallback, fetchBooks cuma dibuat ulang kalau keyword berubah. Loop berhenti.
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBooks({
        page,
        limit: 10,
        search: keyword,
        sortBy: 'createdAt',
        orderBy: 'desc',
      });
      setBooks(response.data);
      setPagination(response.pagination)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page,keyword]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = search.trim();
    const params = new URLSearchParams();

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.countPage) return;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', page.toString());
      return params;
    });
  }

  return { fetchBooks, books, search, setSearch, handleSearch, page, pagination, handlePageChange, loading };
};

export default useBooks;
