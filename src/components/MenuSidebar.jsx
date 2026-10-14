import { NavLink } from 'react-router';

const MenuSidebar = ({ label, items }) => {
  return (
    <ul className="flex flex-col">
      <li className="px-4 py-2 uppercase font-medium text-slate-400">
        {label}
      </li>
      {items.map((item) => (
        <li key={item.title} className="px-8">
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `relative py-2 text-[18px] text-gray-500 flex items-center gap-2
                ${
                  isActive
                    ? 'text-orange-500 font-medium before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-orange-500 before:rounded-r-full'
                    : 'hover:text-gray-400 transition duration-300 ease-in-out'
                }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuSidebar;
