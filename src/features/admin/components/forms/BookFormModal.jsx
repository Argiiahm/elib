import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookSchema } from '../../../../schemas/book.schema';
import { createBook } from '../../../../services/book.service';
import { useState } from 'react';
import FormModal from '../../../../components/FormModal';
import InputForm from '../../../../components/ui/input';
import Label from '../../../../components/ui/input/Label';
import useCategories from '../../../../hooks/useCategories';

const BookFormModal = ({ isOpen, setIsOpen, fetchBooks }) => {
  const categories = useCategories();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BookSchema),
  });

  const handleClose = () => {
    reset();
    setError(null);
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createBook(data);
      await fetchBooks();
      handleClose();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      mode="create"
      isOpen={isOpen}
      title="New Book"
      description="Create a new book"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      onClose={handleClose}
    >
      <div className="grid grid-cols-2 gap-2">
        <InputForm
          error={errors.bookCode}
          {...register('bookCode')}
          name="bookCode"
          type="text"
          placeholder="BookCode Example: BOOK001"
        />
        <InputForm
          error={errors.author}
          {...register('author')}
          name="author"
          type="text"
          placeholder="author Example: John Doe"
        />
      </div>
      <InputForm
        error={errors.title}
        {...register('title')}
        name="title"
        type="text"
        placeholder="title Example: Spiderman"
      />
      <div className="mb-4">
        <Label name="genre">Category*</Label>
        <select
          {...register('categoryId')}
          id="categoryId"
          className="border border-gray-200 focus:outline-0 px-2 py-1 w-full placeholder:text-gray-300"
        >
          <option value="" disabled selected>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <Label name="synopsis">Synopsis*</Label>
        <textarea
          error={errors.synopsis}
          {...register('synopsis')}
          name="synopsis"
          placeholder="Fill Synopsis"
          className="border border-gray-200 focus:outline-0 px-2 py-1 w-full placeholder:text-gray-300"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <InputForm
          error={errors.stockBuku}
          {...register('stockBuku', { valueAsNumber: true })}
          name="stockBuku"
          type="number"
          placeholder="stockBook Example: 10"
        />
        <InputForm
          error={errors.publicationYear}
          {...register('publicationYear')}
          name="publicationYear"
          type="date"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </FormModal>
  );
};

export default BookFormModal;
