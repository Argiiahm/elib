import Chart from '../../../components/Chart';
import DashboardStats from '../../../components/DashboardStats';
import useUsers from '../../../hooks/useUsers';
import useBooks from '../../../hooks/useBooks';
import useBorrows from '../../../hooks/useBorrows';
import AdminLayouts from '../components/AdminLayouts';

const AdminDashboardPage = () => {
  const { users } = useUsers();
  const { books } = useBooks();
  const { borrows } = useBorrows();
  const includeStatusBorrow = ['accepted', 'returned'];

  const stats = [
    { title: 'Active Users', value: users.length },
    { title: 'Total Books', value: books.length },
    {
      title: 'Borrow All Times',
      value: borrows.filter((borrow) =>
        includeStatusBorrow.includes(borrow.status)
      ).length,
    },
  ];
  return (
    <AdminLayouts>
      {/* Stats */}
      <div className="flex items-center border-b border-gray-200">
        {stats.map((stat) => (
          <DashboardStats stat={stat} />
        ))}
      </div>
      <Chart />
    </AdminLayouts>
  );
};

export default AdminDashboardPage;
