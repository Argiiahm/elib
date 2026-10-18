import DashboardStats from '../../../components/DashboardStats';
import useBorrows from '../../../hooks/useBorrows';
import AdminLayouts from '../components/AdminLayouts';

const ReturnedBorrowsAdminPage = () => {
  const { borrows } = useBorrows();

  const requestsBorrow = borrows.filter(
    (borrow) => borrow.status === 'returned'
  );

  const stats = [
    { title: 'Active Borrows', value: 5000 },
    { title: 'Pending Today', value: 200 },
    { title: 'Total Requests', value: 450 },
  ];

  return (
    <AdminLayouts>
      <div className="flex items-center border-b border-gray-200">
        {stats.map((stat) => (
          <DashboardStats stat={stat} />
        ))}
      </div>
      <div className="overflow-x-auto border-b border-gray-200">
        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-bold">Returned Borrows Table</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view your recent Returned Borrows.
          </p>
        </div>

        <table className="w-full table-fixed text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-4 py-4 text-left">Borrow ID</th>
              <th className="px-4 py-4 text-left">Book</th>
              <th className="px-4 py-4 text-left">Borrow Date</th>
              <th className="px-4 py-4 text-left">Libary Location</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {requestsBorrow.map((borrow) => (
              <tr className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-5">
                  <p className="whitespace-nowrap font-semibold">
                    {borrow.id.substring(0, 20)}...
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Loan Date · {new Date(borrow.loanDate).toLocaleDateString()}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">{borrow.book.title}</p>
                  <p className="text-xs text-gray-400">
                    {borrow.book.bookCode}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">
                    {new Date(borrow.loanDate).toLocaleDateString()}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">Wanareja</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Htpps://maps.com..
                  </p>
                </td>

                <td className="px-4 py-5">
                  <span className="font-semibold text-orange-500">
                    {borrow.status}
                  </span>
                </td>

                <td className="px-4 py-5">
                  <div>
                    <button className="flex items-center gap-2 bg-gray-500 text-white font-medium cursor-pointer px-6 py-2 rounded-md">
                      <span>Returned</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-gray-200 px-6 py-4 text-xs text-gray-500">
          Showing 1 orders
        </div>
      </div>
    </AdminLayouts>
  );
};

export default ReturnedBorrowsAdminPage;
