import { useState } from 'react';
import FormModal from '../../../../components/FormModal';
import { cancelBorrow } from '../../../../services/borrow.service';

const CanceledFormModal = ({
  isOpen,
  setIsOpen,
  selectedBorrow,
  fetchBorrow,
  mode,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await cancelBorrow(selectedBorrow?.id);
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
      onSubmit={handleCancel}
      title="Canceled Borrow"
      description={`You have canceled the borrow request for ${selectedBorrow?.book.title}.`}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      mode={mode}
      loading={loading}
    >
      {error && <div>{error}</div>}
    </FormModal>
  );
};

export default CanceledFormModal;
