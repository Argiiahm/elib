import { BookAudio } from 'lucide-react';
import { Link } from 'react-router';
import useBooks from '../hooks/useBooks';

const CategoryCard = ({ category }) => {
  const { books } = useBooks();
  const totalBooks = books.filter(
    (item) => item.category.name === category.name
  );

  return (
    <Link
      key={category.id}
      to={`/elib/categories/${category.id}`}
      className="w-[300px] h-[125px] my-6 border border-gray-100 p-4 rounded-md flex items-center gap-2"
    >
      <BookAudio className="text-gray-400" size={40} />
      <div>
        <h1 className="text-2xl text-gray-400">{category.name}</h1>
        <span className="text-gray-300">{totalBooks.length} Books</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
