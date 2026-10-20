import { Pen, Plus, Trash } from 'lucide-react';
import Button from '../../../components/ui/button/Button';
import AdminLayouts from '../components/AdminLayouts';
import InputSearch from '../../../components/ui/input/search/InputSearch';
import DashboardStats from '../../../components/DashboardStats';
import useUsers from '../../../hooks/useUsers';
import { formatDate } from '../../../utils/FormatDate';
import { useState } from 'react';
import AddUserFormModal from '../components/forms/AddUserFormModal';
import EditUserFormModal from '../components/forms/EditUserFormModal';
import DeleteUserFormModal from '../components/forms/DeleteUserFormModal';

const UsersAdminPage = () => {
  const { users, search, setSearch, handleSearch, fetchUsers } = useUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const stats = [
    { title: 'Total Users', value: users.length },
    {
      title: 'Role User',
      value: users.filter((user) => user.role === 'user').length,
    },
    {
      title: 'Role Admin',
      value: users.filter((user) => user.role === 'admin').length,
    },
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
              <h1 className="text-2xl font-bold">Data Users Table</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and view Users.
              </p>
            </div>
            <Button
              onClick={() => setIsOpen(true)}
              customStyle="flex items-center gap-2 text-orange-500 font-medium px-6 hover:opacity-60 transition duration-300 easy-in-out"
            >
              <Plus />
              <span>Add User</span>
            </Button>
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
              <th className="px-4 py-4 text-left">Id</th>
              <th className="px-4 py-4 text-left">Fullname</th>
              <th className="px-4 py-4 text-left">Email</th>
              <th className="px-4 py-4 text-left">No Telp</th>
              <th className="px-4 py-4 text-left">Role</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-5">
                  <p className="whitespace-nowrap font-semibold">
                    {user.id.substring(0, 20)}...
                  </p>
                  <p className="text-gray-400">
                    Join on {formatDate(user.createdAt)}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">{user.fullname}</p>
                </td>

                <td className="px-4 py-5">
                  <p className="font-semibold">{user.email}</p>
                </td>

                <td className="px-4 py-5">
                  <p className="text-gray-400">{user.no_telp}</p>
                </td>

                <td className="px-4 py-5">
                  <span className="font-semibold">{user.role}</span>
                </td>

                <td className="px-4 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        (setSelectedUser(user), setIsDeleteOpen(true));
                      }}
                      className="rounded-md bg-red-400 p-2 text-white transition hover:bg-red-500"
                    >
                      <Trash size={18} />
                    </button>

                    <button
                      onClick={() => {
                        (setSelectedUser(user), setIsEditOpen(true));
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
          Showing 1 orders
        </div>
      </div>

      <AddUserFormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fetchUsers={fetchUsers}
      />

      <EditUserFormModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
      />

      <DeleteUserFormModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
      />
    </AdminLayouts>
  );
};

export default UsersAdminPage;
