import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getBook } from '../../../services/book.service';
import UserLayouts from '../components/UserLayouts';
import CardDetailBook from '../../../components/CardDetailBook';
import ButtonBack from '../../../components/ui/button/ButtonBack';
import CardBook from '../../../components/CardBook';
import useBooks from '../../../hooks/useBooks';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { books } = useBooks();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(id);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [id]);

  const RecomendBookAuthor = books
    .filter(
      (item) =>
        item.author.toLowerCase() === book?.author.toLowerCase() &&
        item.id !== book.id
    )
    .slice(0, 5);

  return (
    <UserLayouts>
      <div className="m-10">
        <ButtonBack />
        <CardDetailBook book={book} />
        <div className="my-10">
          {RecomendBookAuthor.length > 0 && (
            <h1 className="text-2xl text-gray-500">
              Recommended Books By{' '}
              <span className="text-orange-500 font-bold underline">
                {book?.author}
              </span>
            </h1>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {RecomendBookAuthor.map((BookAuthor) => (
              <Link to={`/elib/books/${BookAuthor.id}`} key={BookAuthor.id}>
                <CardBook>
                  <CardBook.Header image={BookAuthor.coverBook} />
                  <CardBook.Body
                    title={BookAuthor.title}
                    author={BookAuthor.author}
                    synopsis={BookAuthor.synopsis}
                  />
                </CardBook>
              </Link>
            ))}
          </div>
        </div>

        <div className="my-10">
          <h1 className="text-2xl text-gray-500">Recommended For You</h1>
          <div className="flex flex-wrap items-center gap-2">
            {books.slice(0, 10).map((book) => (
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
      </div>
    </UserLayouts>
  );
};

export default BookDetail;
