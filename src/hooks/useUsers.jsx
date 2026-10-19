import { useState } from 'react';
import { getUsers } from '../services/user.service';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useCallback } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const keyword = searchParams.get('search') || '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers({
        search: keyword,
      });
      setUsers(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = search.trim();

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return { users, search, setSearch, handleSearch, loading, error, fetchUsers };
};

export default useUsers;
