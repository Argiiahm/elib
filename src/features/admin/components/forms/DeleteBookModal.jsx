import { useState } from 'react';
import FormModal from '../../../../components/FormModal';
import { deleteBook } from '../../../../services/book.service';

const DeleteBookModal = ({ isOpen, setIsOpen, selectedBook, fetchBooks }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteBook(selectedBook.id);
      await fetchBooks();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      mode="delete"
      title="Confirm Delete"
      description="Are you sure you want to delete this item?"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleDelete}
      isLoading={loading}
    />
  );
};

export default DeleteBookModal;
