import FormModal from '../../../../components/FormModal';
import { cancelBorrow } from '../../../../services/borrow.service';

const CanceledFormModal = ({
  isOpen,
  setIsOpen,
  selectedBorrow,
  fetchBorrow,
  mode,
}) => {
  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      await cancelBorrow(selectedBorrow?.id);
      await fetchBorrow();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
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
    />
  );
};

export default CanceledFormModal;
