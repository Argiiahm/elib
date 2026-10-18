import { useState } from 'react';
import FormModal from '../../../../components/FormModal';
import { returnBook } from '../../../../services/returned.service';

const ReturnedFormModal = ({
  isOpen,
  setIsOpen,
  selectedBorrow,
  fetchBorrow,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReturn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await returnBook(selectedBorrow.id);
      await fetchBorrow();
      setIsOpen(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      onSubmit={handleReturn}
      title="Returned Book"
      description={`Returned a book ${selectedBorrow?.book.title}`}
      isOpen={isOpen}
      loading={loading}
    >
      <div>{error && <div>{error}</div>}</div>
    </FormModal>
  );
};

export default ReturnedFormModal;
