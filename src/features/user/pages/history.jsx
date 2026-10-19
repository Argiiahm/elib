import { formatDate } from '../../../utils/FormatDate';
import { formatRupiah } from '../../../utils/FormatRupiah';
import UserLayouts from '../components/UserLayouts';
import useMyBorrows from '../hooks/useMyBorrows';

const HistoryPage = () => {
  const { borrows } = useMyBorrows();
  const HistoriesBorrows = borrows.filter(
    (borrow) => borrow.status === 'returned' || borrow.status === 'rejected'
  );
  return (
    <UserLayouts>
      <div className="overflow-x-auto border-b border-gray-200">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-bold">Your Histories Table</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view your histories.
          </p>
        </div>

        <table className="w-full table-fixed text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-4 py-4 text-left">Borrow ID</th>
              <th className="px-4 py-4 text-left">Book</th>
              <th className="px-4 py-4 text-left">Borrow Date</th>
              <th className="px-4 py-4 text-left">Libary Location</th>
              <th className="px-4 py-4 text-left">Detail Returned</th>
              <th className="px-4 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {HistoriesBorrows.map((borrow) => (
              <tr className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-5">
                  <p className="whitespace-nowrap font-semibold">
                    {borrow.id.substring(0, 20)}...
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Loan Date · {formatDate(borrow.loanDate)}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">{borrow.book.title}</p>
                  <p className="text-xs text-gray-400">
                    {borrow.book.bookCode}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">{formatDate(borrow.dueDate)}</p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">Wanareja</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Htpps://maps.com..
                  </p>
                </td>

                <td className="px-4 py-5">
                  <div className="space-y-4">
                    {borrow.returnBooks?.map((returnBook) => {
                      const lateDays = Math.max(
                        0,
                        Math.floor(
                          (new Date(returnBook.returnDate) -
                            new Date(borrow.dueDate)) /
                            (1000 * 60 * 60 * 24)
                        )
                      );

                      return (
                        <div key={returnBook.id}>
                          <p className="text-base font-semibold text-gray-900">
                            {formatRupiah(returnBook.fineAmount)}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Returned on{' '}
                            <span className="text-gray-700">
                              {formatDate(returnBook.returnDate)}
                            </span>
                          </p>

                          <p
                            className={`mt-1 text-xs ${
                              lateDays > 0 ? 'text-red-500' : 'text-emerald-600'
                            }`}
                          >
                            {lateDays > 0
                              ? `${lateDays} day${lateDays > 1 ? 's' : ''} late`
                              : 'Returned on time'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </td>

                <td className="px-4 py-5">
                  <span
                    className={`font-bold ${borrow.status === 'returned' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {borrow.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-gray-200 px-6 py-4 text-xs text-gray-500">
          Showing 1 orders
        </div>
      </div>
    </UserLayouts>
  );
};

export default HistoryPage;
