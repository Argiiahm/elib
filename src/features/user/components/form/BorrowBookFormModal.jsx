import { useState } from 'react';
import FormModal from '../../../../components/FormModal';
import { borrowBook } from '../../../../services/borrow.service';

const BorrowBookFormModal = ({
  isOpen,
  setIsOpen,
  selectedBook,
  fetchBorrow,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setError(null);
    setIsOpen(false);
    setLoading(false);
  };

  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await borrowBook(selectedBook.id);
      await fetchBorrow();
      handleClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      onSubmit={handleBorrow}
      title="Borrow Book"
      description="Borrow a book from the library."
      isOpen={isOpen}
      onClose={handleClose}
      setIsOpen={setIsOpen}
      loading={loading}
    >
      {error && <div>{error}</div>}
    </FormModal>
  );
};

export default BorrowBookFormModal;
