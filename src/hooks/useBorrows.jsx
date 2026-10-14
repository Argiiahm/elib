import { useEffect, useState } from 'react';
import { myBorrow } from '../services/borrow.service';

const useBorrows = () => {
  const [borrows, setBorrows] = useState([]);

  const fetchBorrow = async () => {
    try {
      const response = await myBorrow();
      setBorrows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBorrow();
  }, [fetchBorrow]);

  return { borrows, fetchBorrow };
};

export default useBorrows;
