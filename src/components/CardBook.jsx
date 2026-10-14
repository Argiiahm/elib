// Nested Component
import { ArrowRight, BookOpen } from 'lucide-react';

const CardBook = ({ children }) => {
  return (
    <div className="w-[250px] h-[400px] my-6 border border-gray-100 p-4 rounded-md gap-2">
      {children}
    </div>
  );
};

const Header = ({ image }) => {
  return (
    <div
      className="h-[200px] w-full  flex items-center justify-center overflow-hidden"
      href="#"
    >
      {image ? (
        <img
          draggable={false}
          loading="lazy"
          src={image}
          alt="Book cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300">
          <BookOpen size={56} strokeWidth={1.2} />
        </div>
      )}
    </div>
  );
};

const Body = ({ title, author, synopsis }) => {
  return (
    <div className="px-2 h-full">
      <h1 className="font-medium py-2">{title.substring(0, 10)}...</h1>
      <div className="flex flex-col gap-2">
        <span className="text-gray-400">{author}</span>
        <span className="font-semibold text-gray-500">
          {synopsis.substring(0, 40)}...
        </span>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="px-2 py-3">
      <button>
        <div className="flex items-center gap-2 justify-center">
          <ArrowRight size={20} />
          <span>To Details</span>
        </div>
      </button>
    </div>
  );
};

CardBook.Header = Header;
CardBook.Body = Body;
CardBook.Footer = Footer;

export default CardBook;
