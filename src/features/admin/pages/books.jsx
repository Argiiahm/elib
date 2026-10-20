import DashboardStats from '../../../components/DashboardStats';
import AdminLayouts from '../components/AdminLayouts';
import useBooks from '../../../hooks/useBooks';
import { Pen, Plus, Trash } from 'lucide-react';
import InputSearch from '../../../components/ui/input/search/InputSearch';
import Button from '../../../components/ui/button/Button';
import { useState } from 'react';
import BookFormModal from '../components/forms/BookFormModal';
import EditBookFormModal from '../components/forms/EditBookFormModal';
import DeleteBookModal from '../components/forms/DeleteBookModal';
import { formatDate } from '../../../utils/FormatDate';
import Pagination from '../../../components/Pagination';

const AdminBooksPage = () => {
  const { books, search, setSearch, page, pagination, handlePageChange , handleSearch, fetchBooks, loading } = useBooks();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const lowStock = books.filter((book) => book.stockBuku < 5);
  const outStock = books.filter((book) => book.stockBuku === 0);

  const stats = [
    { title: 'Total Books', value: Number(books.length) },
    { title: 'Low Stock', value: Number(lowStock.length) },
    { title: 'Out Stock', value: Number(outStock.length) },
  ];

  return (
    <AdminLayouts>
      <div className="flex items-center border-b border-gray-200">
        {stats.map((stat) => (
          <DashboardStats key={stat.title} stat={stat} />
        ))}
      </div>
      <div className="overflow-x-auto border-b border-gray-200">
        <div className="grid grid-cols-2 border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-2xl font-bold">Data Books Table</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and view Books.
              </p>
            </div>
            <Button
              onClick={() => setIsOpen(true)}
              customStyle="flex items-center gap-2 text-orange-500 font-medium px-6 hover:opacity-60 transition duration-300 easy-in-out"
            >
              <Plus />
              <span>Add Book</span>
            </Button>
          </div>
          <InputSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            handleSearch={handleSearch}
            placeholder="Search Books"
          />
        </div>

        <table className="w-full table-fixed text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-4 py-4 text-left">BookCode</th>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">Realese Date</th>
              <th className="px-4 py-4 text-left">Synopsis</th>
              <th className="px-4 py-4 text-left">Stock</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-5">
                  <p className="whitespace-nowrap font-semibold">
                    {book.bookCode}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {book.id.substring(0, 16)}....
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-xs text-gray-400">{book.category.name}</p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">
                    {formatDate(book.publicationYear)}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="text-gray-400">
                    {book.synopsis.substring(0, 60)}...
                  </p>
                </td>

                <td className="px-4 py-5">
                  <span className="font-semibold">{book.stockBuku} Stock</span>
                </td>

                <td className="px-4 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setIsDeleteOpen(true);
                      }}
                      className="rounded-md bg-red-400 p-2 text-white transition hover:bg-red-500"
                    >
                      <Trash size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setIsEditOpen(true);
                      }}
                      className="rounded-md bg-orange-400 p-2 text-white transition hover:bg-orange-500"
                    >
                      <Pen size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-gray-200 px-6 py-4 text-xs text-gray-500">
          <Pagination
            page={page}
            pagination={pagination}
            handlePageChange={handlePageChange}
            loading={loading}
          />
        </div>

        {/* BookFormModal */}
        <BookFormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          fetchBooks={fetchBooks}
        />

        {/* EditBookFormModal */}
        {selectedBook && (
          <EditBookFormModal
            key={selectedBook.id}
            isEditOpen={isEditOpen}
            setIsEditOpen={setIsEditOpen}
            selectedBook={selectedBook}
            fetchBooks={fetchBooks}
          />
        )}

        {/* isDeleteOpen */}
        <DeleteBookModal
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          selectedBook={selectedBook}
          fetchBooks={fetchBooks}
        />
      </div>
    </AdminLayouts>
  );
};

export default AdminBooksPage;
