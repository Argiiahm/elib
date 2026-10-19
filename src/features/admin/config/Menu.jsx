import { Book, Hash, History, LayoutGridCircles, User } from 'lucide-react';

const Menus = [
  {
    id: 'dashboard',
    // label: 'Dashboard',
    items: [
      {
        title: 'Dashboard',
        icon: <LayoutGridCircles size={18} />,
        path: '/elib/admin/dashboard',
      },
    ],
  },
  {
    id: 'data-book',
    label: 'DATA BOOK',
    items: [
      { title: 'Books', icon: <Book size={18} />, path: '/elib/admin/books' },
      {
        title: 'Categories',
        icon: <Hash size={18} />,
        path: '/elib/admin/categories',
      },
    ],
  },
  {
    id: 'borrow-management',
    label: 'Borrow Management',
    items: [
      {
        title: 'Request Borrows',
        icon: <Book size={18} />,
        path: '/elib/admin/borrows',
      },
      {
        title: 'Request Returned',
        icon: <History size={18} />,
        path: '/elib/admin/borrow-returned',
      },
    ],
  },
  {
    id: 'user-management',
    label: 'User Management',
    items: [
      {
        title: 'Users',
        icon: <User size={18} />,
        path: '/elib/admin/users',
      },
    ],
  },
];

export default Menus;
