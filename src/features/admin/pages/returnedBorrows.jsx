import { useEffect } from 'react';
import DashboardStats from '../../../components/DashboardStats';
import { getReturnedBorrows } from '../../../services/returned.service';
import AdminLayouts from '../components/AdminLayouts';
import { useState } from 'react';
import ConfirmReturnBookFormModal from '../components/forms/ConfirmReturnBookFormModal';
import { formatDate } from '../../../utils/FormatDate';
import { useSearchParams } from 'react-router';
import { useCallback } from 'react';
import InputSearch from '../../../components/ui/input/search/InputSearch';

const ReturnedBorrowsAdminPage = () => {
  const [returnedBorrows, setReturnedBorrows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const keyword = searchParams.get('keyword') || '';
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const fetchReturnedBorrows = useCallback(async () => {
    const response = await getReturnedBorrows({ search: keyword });
    setReturnedBorrows(response.data.returnBook);
  }, [keyword]);

  useEffect(() => {
    fetchReturnedBorrows();
  }, [fetchReturnedBorrows, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = search.trim();
    if (value) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }
  };

  const stats = [
    { title: 'Total Returned Borrows', value: returnedBorrows.length },
    {
      title: 'Total Requests',
      value: returnedBorrows.filter((borrow) => borrow.status === 'accepted')
        .length,
    },
  ];

  return (
    <AdminLayouts>
      <div className="flex items-center border-b border-gray-200">
        {stats.map((stat) => (
          <DashboardStats stat={stat} />
        ))}
      </div>
      <div className="overflow-x-auto border-b border-gray-200">
        <div className="grid grid-cols-2 border-b border-gray-200 px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Requests Returned Table</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and view your recent returned requests.
            </p>
          </div>
          <InputSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            handleSearch={handleSearch}
            placeholder="Search fullname, email, more..."
          />
        </div>
        <table className="w-full table-fixed text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-4 py-4 text-left">Borrow ID</th>
              <th className="px-4 py-4 text-left">User</th>
              <th className="px-4 py-4 text-left">Return Date</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Days Late</th>
              <th className="px-4 py-4 text-left">Fine Amount</th>
              <th className="px-4 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {returnedBorrows
              .filter((item) => item.borrow.status === 'accepted')
              .map((borrow) => (
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-5">
                    <p className="whitespace-nowrap font-semibold">
                      {borrow.borrowId.substring(0, 20)}...
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Loan Date · {formatDate(borrow.borrow.loanDate)}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Due Date · {formatDate(borrow.borrow.dueDate)}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="font-semibold">
                      {borrow.borrow.user.fullname}
                    </p>
                    <p className="text-xs text-gray-400">
                      {borrow.borrow.user.email}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="font-semibold">
                      {formatDate(borrow.returnDate)}
                    </p>
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`${borrow.status === 'duedate' ? 'text-red-500' : ''} font-bold capitalize`}
                    >
                      {borrow.status}
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <span className="font-semibold">
                      {Math.max(
                        0,
                        Math.floor(
                          (new Date(borrow.returnDate) -
                            new Date(borrow.borrow.dueDate)) /
                            (1000 * 60 * 60 * 24)
                        )
                      )}{' '}
                      Day
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <span className="font-semibold">{borrow.fineAmount}</span>
                  </td>

                  <td className="px-4 py-5">
                    <button
                      onClick={() => {
                        (setSelectedReturn(borrow), setIsOpen(true));
                      }}
                      className="flex items-center gap-2 bg-orange-500 text-white font-medium cursor-pointer px-6 py-2 rounded-md"
                    >
                      <span>Confirmed</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="border-t border-gray-200 px-6 py-4 text-xs text-gray-500">
          Showing 1 orders
        </div>
      </div>

      <ConfirmReturnBookFormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedReturn={selectedReturn}
        fetchReturnedBorrows={fetchReturnedBorrows}
      />
    </AdminLayouts>
  );
};

export default ReturnedBorrowsAdminPage;
