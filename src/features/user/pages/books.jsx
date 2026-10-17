import { Hash } from 'lucide-react';
import { Link } from 'react-router';
import CardBook from '../../../components/CardBook';
import UserLayouts from '../components/UserLayouts';
import useBooks from '../../../hooks/useBooks';
import useCategories from '../../../hooks/useCategories';
import InputSearch from '../../../components/ui/input/search/InputSearch';

const BooksPage = () => {
  const { books, search, setSearch, handleSearch, loading } = useBooks();
  const { categories } = useCategories();

  return (
    <UserLayouts>
      <div className="m-10">
        <h1 className="text-3xl font-medium">
          Explore Your <span className="font-bold text-orange-500">Books</span>
        </h1>
        <p className="text-gray-500">
          Every book has a story to tell, and we're here to help you find the
          ones that match your interests.
        </p>
        <div className="mt-10 flex flex-col">
          <InputSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            handleSearch={handleSearch}
            placeholder="Search title, author, and more."
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {categories.slice(0, 8).map((category) => (
              <button className="px-4 py-1 cursor-pointer text-gray-500 font-medium flex items-center gap-1 hover:text-gray-400 transition duration-300 ease-in-out">
                <Hash size={16} />
                <span>{category.name}</span>
              </button>
            ))}
            <Link className="font-medium" to="/elib/categories">
              See All
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {loading && <div>Please Wait...</div>}
          {books.map((book) => (
            <Link to={`/elib/books/${book.id}`} key={book.id}>
              <CardBook>
                <CardBook.Header image={book.coverBook} />
                <CardBook.Body
                  title={book.title}
                  author={book.author}
                  synopsis={book.synopsis}
                />
              </CardBook>
            </Link>
          ))}
        </div>
      </div>
    </UserLayouts>
  );
};

export default BooksPage;
