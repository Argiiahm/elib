import { useForm } from "react-hook-form";
import FormModal from "../../../../components/FormModal";
import InputForm from "../../../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "../../../../schemas/category.schema";
import { useState } from "react";
import { updateCategory } from "../../../../services/category.service";

const CategoryEditFormModal = ({ isEditOpen, setIsEditOpen, selectedCategory, fetchData }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: selectedCategory?.name,
    },
  });

  const handleClose = () => {
    setIsEditOpen(false);
    setError(null);
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateCategory(selectedCategory.id, data);
      await fetchData();
      handleClose();
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  }


  return (
    <FormModal onSubmit={handleSubmit(onSubmit)} title="Edit Category" description="Edit a category" isOpen={isEditOpen} onClose={handleClose} loading={loading}>
      <InputForm
        error={errors.name}
        {...register('name')}
        name="name"
        type="text"
        placeholder="name Example: Adventure"
      />
      {error && <p className="text-red-500">{error?.message}</p>}
    </FormModal>
  )
};

export default CategoryEditFormModal;
