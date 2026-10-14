import { useEffect, useState } from 'react';
import { getCategories } from '../services/category.service';

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return categories;
};

export default useCategories;
