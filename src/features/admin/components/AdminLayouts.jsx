import Sidebar from './Sidebar';

const AdminLayouts = ({ children }) => {
  return (
    <section className="flex">
      <Sidebar />
      <main className="w-full ml-64">{children}</main>
    </section>
  );
};

export default AdminLayouts;
