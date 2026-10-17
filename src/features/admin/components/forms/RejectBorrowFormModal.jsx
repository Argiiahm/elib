import FormModal from '../../../../components/FormModal';
import { useState } from 'react';
import { rejectBorrow } from '../../../../services/borrow.service';

const RejectBorrowFormModal = ({ isOpen, setIsOpen, selectedBorrow, fetchBorrows, mode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setLoading(false);
    setError(null);
    setIsOpen(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await rejectBorrow(selectedBorrow.id);
      await fetchBorrows();
      handleClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormModal
      onSubmit={onSubmit}
      isOpen={isOpen}
      title="Reject Borrow"
      description="Are You Sure Reject This Borrow?"
      loading={loading}
      onClose={handleClose}
      mode={mode}
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
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </FormModal>
  );
};

export default RejectBorrowFormModal;
