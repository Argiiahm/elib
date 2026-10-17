import { LogOut } from 'lucide-react';
import MenuSidebar from '../../../components/MenuSidebar';
import Menus from '../config/Menu';
import useLogout from '../../../hooks/useLogout';

const Sidebar = () => {
  const { handleLogout } = useLogout();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 shrink-0 border-r border-gray-200 bg-white md:block">
      <div className="px-4 py-3 border-b border-gray-100">
        <h1 className="text-2xl font-semibold">E - Library</h1>
      </div>
      <div className="flex items-center flex-col my-6 border-b border-gray-200 pb-4">
        <div className="w-40 h-40 bg-orange-500 rounded-full">
          <img
            loading="lazy"
            draggable={false}
            className="pt-4"
            src="https://api.dicebear.com/10.x/lorelei/svg?seed=Argiiahm"
            alt="logo"
          />
        </div>
        <span className="font-medium">@Argiiahm</span>
      </div>
      <div>
        {Menus.map((menu) => (
          <MenuSidebar key={menu.label} label={menu.label} items={menu.items} />
        ))}
      </div>
      <footer className="absolute bottom-0 left-0 px-5 py-4">
        <button onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
