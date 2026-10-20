import { useEffect, useState } from 'react';
import { getCategories } from '../services/category.service';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const keyword = searchParams.get('search') || '';

  const [pagination, setPagination] = useState({
    page,
    limit: 10,
    count: 0,
    countPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  })

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCategories({
        page,
        limit: 10,
        search: keyword
      });
      setCategories(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, keyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData, keyword]);

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

  return { categories, fetchData, search, setSearch, page, pagination, handlePageChange, handleSearch, loading };
};

export default useCategories;
