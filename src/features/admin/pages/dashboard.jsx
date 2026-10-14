import Chart from '../../../components/Chart';
import DashboardStats from '../../../components/DashboardStats';
import AdminLayouts from '../components/AdminLayouts';

const AdminDashboardPage = () => {
  const stats = [
    { title: 'Active Users', value: 200 },
    { title: 'Total Books', value: 5000 },
    { title: 'Borrow All Times', value: 450 },
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
