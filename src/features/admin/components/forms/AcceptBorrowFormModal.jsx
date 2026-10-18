import FormModal from '../../../../components/FormModal';
import InputForm from '../../../../components/ui/input/index';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { AcceptBorrowSchmea } from '../../../../schemas/borrow.schema';
import { acceptBorrow } from '../../../../services/borrow.service';

const AcceptBorrowFormModal = ({
  isOpen,
  setIsOpen,
  selectedBorrow,
  fetchBorrows,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AcceptBorrowSchmea),
  });

  const handleClose = () => {
    setLoading(false);
    setError(null);
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await acceptBorrow(selectedBorrow.id, data);
      await fetchBorrows();
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
      title="Accept Borrow"
      description="Confirm the borrowing details."
      loading={loading}
      onClose={handleClose}
    >
      <div className="space-y-5">
        <div className="divide-y divide-gray-100">
          <div className="flex justify-between gap-4 py-3">
            <span className="text-sm text-gray-500">Borrower</span>
            <span className="text-right text-sm font-medium text-gray-900">
              {selectedBorrow?.user.fullname ?? '-'}
            </span>
          </div>

          <div className="flex justify-between gap-4 py-3">
            <span className="text-sm text-gray-500">Book</span>
            <span className="text-right text-sm font-medium text-gray-900">
              {selectedBorrow?.book.title ?? '-'}
            </span>
          </div>

          <div className="flex justify-between gap-4 py-3">
            <span className="text-sm text-gray-500">Book Code</span>
            <span className="text-right text-sm text-gray-700">
              {selectedBorrow?.book.bookCode ?? '-'}
            </span>
          </div>

          <div className="flex justify-between gap-4 py-3">
            <span className="text-sm text-gray-500">Borrow Date</span>
            <span className="text-right text-sm text-gray-700">
              {selectedBorrow?.loanDate
                ? new Date(selectedBorrow.loanDate).toLocaleDateString(
                    'id-ID',
                    {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }
                  )
                : '-'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <InputForm
            error={errors.dueDate}
            {...register('dueDate')}
            name="dueDate"
            type="date"
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </FormModal>
  );
};

export default AcceptBorrowFormModal;
