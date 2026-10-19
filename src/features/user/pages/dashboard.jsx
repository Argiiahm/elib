import UserLayouts from '../components/UserLayouts';
import DashboardStats from '../../../components/DashboardStats';
import AttedanceBorrowBook from '../components/AttedanceBorrowBook';
import CategoryCard from '../../../components/CategoryCard';
import CardBook from '../../../components/CardBook';
import useBooks from '../../../hooks/useBooks';
import useMyBorrows from '../hooks/useMyBorrows';
import useCategories from '../../../hooks/useCategories';
import { Link } from 'react-router';

const UserDashboardPage = () => {
  const { books } = useBooks();
  const { borrows } = useMyBorrows();
  const { categories } = useCategories();
  const activeBooks = borrows.filter((borrowBook) => borrowBook.status === 'accepted');
  const stats = [
    { title: 'Pending Borrow', value: borrows.filter((borrowBook) => borrowBook.status === 'pending').length },
    { title: 'Active Books', value: activeBooks.length },
    { title: 'Returning Books', value: borrows.filter((borrowBook) => borrowBook.status === 'returning').length },
    { title: 'Borrow All Times', value: borrows.length },
  ];

  return (
    <UserLayouts>
      {/* Stats */}
      <div className="flex items-center border-b border-gray-200">
        {stats.map((stat) => (
          <DashboardStats key={stat.title} stat={stat} />
        ))}
      </div>
      {/* Main Content Dashboard */}
      <div className="m-10">
        {/*  Active Books  */}
        <h1 className="text-2xl text-gray-500 font-medium">
          Your Active Books
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {activeBooks.slice(0, 3).map((book) => (
            <AttedanceBorrowBook key={book.id} book={book} />
          ))}
        </div>

        {/* Top Categories */}
        <h1 className="text-2xl text-gray-500 font-medium">Top Categories</h1>
        <div className="flex flex-wrap items-center gap-2">
          {categories.slice(0, 5).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Recomended Books */}
        <h1 className="text-2xl text-gray-500 font-medium">
          Recommended Top Books
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {books.slice(0, 5).map((book) => (
            <Link to={`/elib/books/${book.id}`}>
              <CardBook key={book.id}>
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

export default UserDashboardPage;
