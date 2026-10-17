import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { getAllBorrows } from '../services/borrow.service';
import { useSearchParams } from 'react-router';

const useBorrows = () => {
  const [borrows, setBorrows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const keyword = searchParams.get('search');

  const fetchBorrows = useCallback(async () => {
    try {
      const response = await getAllBorrows({ search: keyword });
      setBorrows(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [keyword]);

  useEffect(() => {
    fetchBorrows();
  }, [fetchBorrows]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = search.trim();

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return {
    borrows,
    fetchBorrows,
    search,
    setSearch,
    handleSearch,
  };
};

export default useBorrows;
