import { Clock } from 'lucide-react';

const AttedanceBorrowBook = ({ book }) => {
  return (
    <div
      key={book.id}
      className="w-[450px] h-[200px] my-6 border border-gray-100 p-4 rounded-md"
    >
      <div className="flex items-center gap-6">
        <img
          className="w-40 h-40 object-contain rounded-md"
          draggable={false}
          loading="lazy"
          src={book.image}
          alt={book.title}
        />
        <div>
          <div>
            <h1 className="text-2xl">{book.title}</h1>
            <span className="text-gray-500">{book.author}</span>
          </div>
          <div className="my-2">
            <span className="text-gray-400">{book.dueDate}</span>
            <div className="flex items-center gap-2 text-orange-500 font-medium">
              <Clock size={16} />
              <span>{book.daysLeft} Day left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttedanceBorrowBook;
