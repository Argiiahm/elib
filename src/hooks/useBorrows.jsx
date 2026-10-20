import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { getAllBorrows } from '../services/borrow.service';
import { useSearchParams } from 'react-router';

const useBorrows = () => {
  const [borrows, setBorrows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const keyword = searchParams.get('search');

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    count: 0,
    countPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  })

  const fetchBorrows = useCallback(async () => {
    try {
      const response = await getAllBorrows({
        page,
        limit: 10,
        search: keyword
      });
      setBorrows(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    }
  }, [page,keyword]);

  useEffect(() => {
    fetchBorrows();
  }, [fetchBorrows]);

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

  return {
    borrows,
    fetchBorrows,
    search,
    setSearch,
    page,
    pagination,
    handlePageChange,
    handleSearch,
  };
};

export default useBorrows;
