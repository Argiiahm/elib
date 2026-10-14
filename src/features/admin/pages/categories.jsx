import { Pen, Plus, Trash } from 'lucide-react';
import useCategories from '../../../hooks/useCategories';
import AdminLayouts from '../components/AdminLayouts';
import Button from '../../../components/ui/button/Button';
import { useState } from 'react';
import FormModal from '../../../components/FormModal';

const AdminCategoriesPage = () => {
  const categories = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AdminLayouts>
      <div className="overflow-x-auto border-b border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
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
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="w-[80%] px-6 py-4 text-left">Category</th>
              <th className="w-[20%] px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-5">
                  <p className="font-medium text-2xl text-gray-800">
                    {category.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {category.id.substring(0, 16)}...
                  </p>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button className="rounded-md bg-red-400 p-2 text-white transition hover:bg-red-500">
                      <Trash size={18} />
                    </button>

                    <button className="rounded-md bg-orange-400 p-2 text-white transition hover:bg-orange-500">
                      <Pen size={18} />
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

        <FormModal
          title="Added New Book"
          description="Fill the input for create new book"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </AdminLayouts>
  );
};

export default AdminCategoriesPage;
