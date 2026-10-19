import { useState } from 'react';
import { deleteUser } from '../../../../services/user.service';
import FormModal from '../../../../components/FormModal';

const DeleteUserFormModal = ({ isOpen, setIsOpen, selectedUser, fetchUsers }) => {
  if (!selectedUser) return null;

  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteUser(selectedUser.id);
      await fetchUsers();
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
      description={`Are you sure you want to delete user ${selectedUser.fullname}?`}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleDelete}
      isLoading={loading}
    />
  );
};

export default DeleteUserFormModal;
