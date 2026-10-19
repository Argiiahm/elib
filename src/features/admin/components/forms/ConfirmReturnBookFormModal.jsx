import { useState } from 'react';
import FormModal from '../../../../components/FormModal';
import { confirmReturnBook } from '../../../../services/returned.service';

const ConfirmReturnBookFormModal = ({
  isOpen,
  setIsOpen,
  selectedReturn,
  fetchReturnedBorrows,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
    setLoading(false);
    setError(null);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await confirmReturnBook(selectedReturn.borrowId);
      await fetchReturnedBorrows();
      handleClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      onSubmit={handleConfirm}
      title="Confirm Return Book"
      description="Confirm the return of the book to the library"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={handleClose}
      loading={loading}
    >
      <div className="space-y-5">
        <div className="divide-y divide-gray-100">
          <div className="flex justify-between gap-4 py-3">
            <span className="text-sm text-gray-500">Borrower</span>
            <span className="text-right text-sm font-medium text-gray-900">
              {selectedReturn?.borrow.user.fullname ?? '-'}
            </span>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <span className="text-sm text-gray-500">Book</span>
            <span className="text-right text-sm font-medium text-gray-900">
              {selectedReturn?.borrow.book.title ?? '-'}
            </span>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <span className="text-sm text-gray-500">Borrow Date</span>
            <span className="text-right text-sm text-gray-700">
              {selectedReturn?.borrow.loanDate
                ? new Date(selectedReturn.borrow.loanDate).toLocaleDateString(
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
          <div className="flex justify-between gap-4 py-3">
            <span className="text-sm text-gray-500">Due Date</span>
            <span className="text-right text-sm text-gray-700">
              {selectedReturn?.borrow.dueDate
                ? new Date(selectedReturn.borrow.dueDate).toLocaleDateString(
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
          <div className="py-3">
            <div className="space-x-2">
              <span className=" text-gray-500">Late:</span>
              <span className="font-semibold text-red-500">
                {Math.max(
                  0,
                  Math.floor(
                    (new Date(selectedReturn?.returnDate) -
                      new Date(selectedReturn?.borrow.dueDate)) /
                      (1000 * 60 * 60 * 24)
                  )
                )}{' '}
                Day
              </span>
            </div>
            <div className="space-x-2">
              <span className=" text-gray-500">Total Fine:</span>
              <span className="font-semibold">
                {selectedReturn?.fineAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </FormModal>
  );
};

export default ConfirmReturnBookFormModal;
