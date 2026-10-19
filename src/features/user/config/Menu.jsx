import { Book, Hash, History, LayoutGridCircles } from 'lucide-react';

const Menus = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    items: [
      {
        title: 'Dashboard',
        icon: <LayoutGridCircles size={18} />,
        path: '/elib/dashboard',
      },
    ],
  },
  {
    id: 'books',
    label: 'Books',
    items: [
      { title: 'Books', icon: <Book size={18} />, path: '/elib/books' },
      {
        title: 'Categories',
        icon: <Hash size={18} />,
        path: '/elib/categories',
      },
    ],
  },
  {
    id: 'book-management',
    label: 'Book Management',
    items: [
      {
        title: 'My Books',
        icon: <Book size={18} />,
        path: '/elib/my-borrows',
      },
      {
        title: 'History',
        icon: <History size={18} />,
        path: '/elib/history',
      },
    ],
  },
];

export default Menus;
