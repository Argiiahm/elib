import { useEffect, useState } from 'react';
import { getCategories } from '../services/category.service';
import { useCallback } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

  return { categories, fetchData };
};

export default useCategories;
