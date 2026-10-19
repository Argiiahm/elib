import { BookOpen, Clock } from 'lucide-react';
import { formatDate } from '../../../utils/FormatDate';

const AttedanceBorrowBook = ({ book }) => {
  return (
    <div
      key={book.id}
      className="w-[450px] h-[200px] my-6 border border-gray-100 p-4 rounded-md"
    >
      <div className="flex items-center gap-6">
        {book.coverBook ? (
          <img
            className="w-40 h-40 object-contain rounded-md"
            draggable={false}
            loading="lazy"
            src={book.book.coverBook}
            alt={book.book.title}
          />
        ) : (
          <div className="w-40 h-40 flex justify-center items-center object-contain rounded-md text-gray-300">
            <BookOpen size={80} strokeWidth={1.2} />
          </div>
        )}
        <div>
          <div>
            <h1 className="text-2xl">{book.book.title}</h1>
            <span className="text-gray-500">{book.book.author}</span>
          </div>
          <div className="my-2">
            <span className="text-gray-400">{formatDate(book.dueDate)}</span>
            <div className="flex items-center gap-2 text-orange-500 font-medium">
              <Clock size={16} />
              <span>
                {Math.max(
                  0,
                  Math.ceil(
                    (new Date(book.dueDate).getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24)
                  )
                )}{' '}
                Days left
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttedanceBorrowBook;
