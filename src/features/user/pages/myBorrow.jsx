import { RotateCcw, Trash } from 'lucide-react';
import UserLayouts from '../components/UserLayouts';
import useMyBorrows from '../hooks/useMyBorrows';
import ReturnedFormModal from '../components/form/ReturnedFormModal';
import { useState } from 'react';
import CanceledFormModal from '../components/form/CanceledFormModal';

const MyBorrowPage = () => {
  const { borrows, fetchMyBorrows } = useMyBorrows();
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);


  const myBorrows = borrows.filter(
    (borrow) => borrow.status === 'pending' || borrow.status === 'accepted'
  );

  return (
    <UserLayouts>
      <div className="overflow-x-auto border-b border-gray-200">
        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-bold">Your Borrows Table</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view your recent borrows.
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
            {myBorrows.map((borrow) => (
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
                  <span className={`font-bold ${borrow.status === 'pending' ? 'text-orange-500' : 'text-green-500'}`}>
                    {borrow.status}
                  </span>
                </td>

                <td className="px-4 py-5">
                  {borrow.status === 'pending' ? (
                    <div>
                      <button
                        onClick={() => { setSelectedBorrow(borrow); setIsCancelOpen(true) }}
                        className="flex items-center gap-2 bg-red-500 text-white font-medium cursor-pointer px-6 py-2 rounded-md"
                      >
                        <Trash size={16} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => { setSelectedBorrow(borrow); setIsOpen(true) }} className="flex items-center gap-2 bg-orange-500 text-white font-medium cursor-pointer px-6 py-2 rounded-md">
                        <RotateCcw size={16} />
                        <span>Return</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-gray-200 px-6 py-4 text-xs text-gray-500">
          Showing 1 orders
        </div>
      </div>

      <ReturnedFormModal isOpen={isOpen} setIsOpen={setIsOpen} selectedBorrow={selectedBorrow} />
      <CanceledFormModal isOpen={isCancelOpen} setIsOpen={setIsCancelOpen} selectedBorrow={selectedBorrow} mode="delete" fetchBorrow={fetchMyBorrows} />

    </UserLayouts>
  );
};

export default MyBorrowPage;
