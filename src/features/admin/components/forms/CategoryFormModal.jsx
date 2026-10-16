import { createCategory } from "../../../../services/category.service";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import FormModal from "../../../../components/FormModal";
import InputForm from "../../../../components/ui/input";
import { CategorySchema } from "../../../../schemas/category.schema";


const CategoryFormModal = ({ isOpen, setIsOpen, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset ,formState: { errors } } = useForm({
    resolver: zodResolver(CategorySchema),
  });

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    reset();
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createCategory(data);
      await fetchData();
      handleClose();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormModal onSubmit={handleSubmit(onSubmit)} title="New Category" description="create a new category" isOpen={isOpen} onClose={handleClose} loading={loading}>
      <InputForm
        error={errors.name}
        {...register('name')}
        name="name"
        type="text"
        placeholder="name Example: Adventure"
      />
      {error && <p className="text-red-500">{error?.message}</p>}
    </FormModal>
  );
};

export default CategoryFormModal;
