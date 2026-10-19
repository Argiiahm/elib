import { useEffect, useState } from 'react';
import { getCategories } from '../services/category.service';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const keyword = searchParams.get('search') || '';
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCategories({ search: keyword });
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = search.trim();

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return { categories, fetchData, search, setSearch, handleSearch, loading };
};

export default useCategories;
