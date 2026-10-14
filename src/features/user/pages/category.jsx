import { Link, useParams } from 'react-router';
import useBooks from '../../../hooks/useBooks';
import UserLayouts from '../components/UserLayouts';
import CardBook from '../../../components/CardBook';
import { useEffect, useState } from 'react';
import { getCategory } from '../../../services/category.service';
import InputSearch from '../../../components/ui/input/search/InputSearch';

const CategoryDetailPage = () => {
  const { id } = useParams();
  const { books } = useBooks();
  const [category, setCategory] = useState(null);
  const [bookCategory, setBookCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategory(id);
        setCategory(response.data);
        const booksByCategory = books.filter(
          (item) => item.category.name === category.name
        );
        setBookCategory(booksByCategory);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, category]);

  return (
    <UserLayouts>
      <div className="m-10">
        <h1 className="text-3xl font-medium">
          Explore Your{' '}
          <span className="font-bold text-orange-500">{category?.name}</span>
        </h1>
        <p className="text-gray-500">
          Every book has a story to tell, and we're here to help you find the
          ones that match your interests.
        </p>
        <div className="mt-10 flex flex-col">
          <InputSearch placeholder="Search title, author, and more." />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {bookCategory.length > 0 &&
            bookCategory.map((book) => (
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

export default CategoryDetailPage;
