import { useEffect, useState } from 'react';
import { myBorrow } from '../../../services/borrow.service';
import { useCallback } from 'react';

const useMyBorrows = () => {
  const [borrows, setBorrows] = useState([]);

  const fetchMyBorrows = useCallback(async () => {
    try {
      const response = await myBorrow();
      setBorrows(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchMyBorrows();
  }, [fetchMyBorrows]);

  return { borrows, fetchMyBorrows };
};

export default useMyBorrows;
