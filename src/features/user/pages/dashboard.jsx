import UserLayouts from '../components/UserLayouts';
import DashboardStats from '../../../components/DashboardStats';
import AttedanceBorrowBook from '../components/AttedanceBorrowBook';
import CategoryCard from '../../../components/CategoryCard';
import CardBook from '../../../components/CardBook';
import Books from '../../../data/books';
import categories from '../../../data/categories';

const UserDashboardPage = () => {
  const stats = [
    { title: 'Pending Borrow', value: 2 },
    { title: 'Active Books', value: 32 },
    { title: 'Returning Books', value: 32 },
    { title: 'Borrow All Times', value: 27 },
    { title: 'Your Fine', value: 'Rp. 20.000' },
  ];

  return (
    <UserLayouts>
      {/* Stats */}
      <div className="flex items-center border-b border-gray-200">
        {stats.map((stat) => (
          <DashboardStats stat={stat} />
        ))}
      </div>
      {/* Main Content Dashboard */}
      <div className="m-10">
        {/*  Active Books  */}
        <h1 className="text-2xl text-gray-500 font-medium">
          Your Active Books
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {Books.slice(0, 3).map((book) => (
            <AttedanceBorrowBook book={book} />
          ))}
        </div>

        {/* Top Categories */}
        <h1 className="text-2xl text-gray-500 font-medium">Top Categories</h1>
        <div className="flex flex-wrap items-center gap-2">
          {categories.slice(0, 5).map((category) => (
            <CategoryCard category={category} />
          ))}
        </div>

        {/* Recomended Books */}
        <h1 className="text-2xl text-gray-500 font-medium">
          Recommended Books
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {Books.map((book) => (
            <CardBook>
              <CardBook.Header image={book.image} />
              <CardBook.Body
                title={book.title}
                author={book.author}
                synopsis={book.synopsis}
              />
            </CardBook>
          ))}
        </div>
      </div>
    </UserLayouts>
  );
};

export default UserDashboardPage;
