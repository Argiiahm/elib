import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../../../../components/FormModal';
import InputForm from '../../../../components/ui/input';
import Label from '../../../../components/ui/input/Label';
import { UserSchema } from '../../../../schemas/user.schema';
import { updateUser } from '../../../../services/user.service';

const EditUserFormModal = ({ isOpen, setIsOpen, selectedUser, fetchUsers }) => {
  if (!selectedUser) return null;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullname: selectedUser.fullname,
      email: selectedUser.email,
      no_telp: selectedUser.no_telp,
      role: selectedUser.role,
    }
  });

  const handleClose = () => {
    setIsOpen(false);
    reset();
    setError(null);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUser(selectedUser.id, data);
      await fetchUsers();
      handleClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      onSubmit={handleSubmit(onSubmit)}
      isOpen={isOpen}
      title="Added User"
      description="Added a new user."
      onClose={handleClose}
      loading={loading}
    >
      <div className="grid grid-cols-2 gap-2">
        <InputForm
          error={errors.fullname}
          {...register('fullname')}
          name="fullname"
          type="text"
          placeholder="fullname Example: Jhon Doe"
        />
        <InputForm
          error={errors.email}
          {...register('email')}
          name="email"
          type="text"
          placeholder="email Example: jhon@example.com"
        />
      </div>
      <InputForm
        error={errors.no_telp}
        {...register('no_telp')}
        name="no_telp"
        type="text"
        placeholder="no_telp Example: 0821xxx"
      />
      <InputForm
        error={errors.password}
        {...register('password')}
        name="password"
        type="password"
        placeholder="******"
      />
      <div className="mb-4">
        <Label name="genre">Roles*</Label>
        <select
          {...register('role')}
          id="role"
          className="border border-gray-200 focus:outline-0 px-2 py-1 w-full placeholder:text-gray-300"
        >
          <option value="" disabled>
            Select Roles
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </FormModal>
  );
};

export default EditUserFormModal;
