import { useEffect, useState } from 'react';
import { BookOpen, Hash, RefreshCcw, ShoppingBagIcon } from 'lucide-react';
import { Link } from 'react-router';
import useMyBorrows from '../features/user/hooks/useMyBorrows';
import BorrowBookFormModal from '../features/user/components/form/BorrowBookFormModal';

const CardDetailBook = ({ book }) => {
  const { borrows, fetchMyBorrows } = useMyBorrows();
  const [borrowStatus, setBorrowStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const excludedStatuses = ['rejected', 'returned', 'accepted'];
    const borrow = borrows?.find(
      (borrow) =>
        borrow.book.id === book?.id && !excludedStatuses.includes(borrow.status)
    );
    setBorrowStatus(borrow?.status);
  }, [borrows, book]);

  const handleBtnBorrow = (borrowStatus) => {
    if (borrowStatus === 'pending') {
      return (
        <div className="mt-6">
          <button
            type="button"
            className="w-full md:w-auto flex items-center gap-2  hover:opacity-80 transition duration-300 ease-in-out px-8 py-3 rounded-lg bg-gray-300 text-white text-sm font-medium cursor-no-drop"
          >
            <ShoppingBagIcon />
            <span>Process Request</span>
          </button>
        </div>
      );
    } else if (borrowStatus === 'accepted') {
      return (
        <div className="mt-6">
          <button
            type="button"
            className="w-full md:w-auto flex items-center gap-2 cursor-pointer hover:opacity-80 transition duration-300 ease-in-out px-8 py-3 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-zinc-800"
          >
            <RefreshCcw />
            <span>Return Book</span>
          </button>
        </div>
      );
    } else {
      return (
        <div className="mt-6">
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="w-full md:w-auto flex items-center gap-2 cursor-pointer hover:opacity-80 transition duration-300 ease-in-out px-8 py-3 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800"
          >
            <ShoppingBagIcon />
            <span>Borrow Book</span>
          </button>
          <BorrowBookFormModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedBook={book}
            fetchBorrow={fetchMyBorrows}
          />
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10">
      <div className="w-full flex items-center justify-center border border-gray-100">
        <div className="overflow-hidden">
          {book?.coverBook ? (
            <img
              loading="lazy"
              draggable="false"
              src={book?.coverBook}
              alt={book?.title}
              className="w-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <BookOpen size={80} strokeWidth={1.2} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-zinc-900">{book?.title}</h1>
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="flex items-center cursor-pointer hover:underline hover:text-gray-600 transition duration-300 ease-in-out"
          >
            <Hash size={16} />
            {book?.category.name}
          </Link>
          <p className="text-sm text-zinc-500">
            Written by{' '}
            <span className="font-semibold text-orange-500 underline">
              {book?.author}
            </span>
          </p>
        </div>
        <div className="mt-6 space-y-2 w-[800px]">
          <h2 className="text-lg font-semibold text-zinc-900">Synopsis</h2>
          <p className="text-sm text-justify text-zinc-600">{book?.synopsis}</p>
        </div>
        {handleBtnBorrow(borrowStatus)}
      </div>
    </div>
  );
};

export default CardDetailBook;
