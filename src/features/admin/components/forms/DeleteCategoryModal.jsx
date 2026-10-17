import { useState } from 'react';
import FormModal from '../../../../components/FormModal';
import { deleteCategory } from '../../../../services/category.service';

const DeleteCategoryModal = ({
  isOpen,
  setIsOpen,
  selectedCategory,
  fetchData,
  mode,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteCategory(selectedCategory.id);
      await fetchData();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormModal
      onSubmit={handleDelete}
      title="Delete Category"
      description="Are you sure you want to delete this category?"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => setIsOpen(false)}
      loading={loading}
      mode={mode}
    />
  );
};

export default DeleteCategoryModal;
