import { Book, Hash, History, LayoutGridCircles } from 'lucide-react';

const Menus = [
  {
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
];

export default Menus;
