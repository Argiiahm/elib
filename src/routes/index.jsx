import { createBrowserRouter } from 'react-router';
import HomePage from '../pages/home';
import LoginPage from '../features/auth/pages/login';
import RegisterPage from '../features/auth/pages/register';
import UserDashboardPage from '../features/user/pages/dashboard';
import CategoriesPage from '../features/user/pages/categories';
import BooksPage from '../features/user/pages/books';
import BookDetail from '../features/user/pages/book';
import CategoryDetailPage from '../features/user/pages/category';
import MyBorrowPage from '../features/user/pages/myBorrow';
import HistoryPage from '../features/user/pages/history';
import ProtectedRoute from './protectedRoute';
import AdminDashboardPage from '../features/admin/pages/dashboard';
import AdminBooksPage from '../features/admin/pages/books';
import AdminCategoriesPage from '../features/admin/pages/categories';
import BorrowsAdminPage from '../features/admin/pages/borrows';
import ReturnedBorrowsAdminPage from '../features/admin/pages/returnedBorrows';
import UsersAdminPage from '../features/admin/pages/users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute allowedRoles={['user']} />,
    children: [
      {
        path: '/elib/dashboard',
        element: <UserDashboardPage />,
      },
      {
        path: '/elib/books',
        element: <BooksPage />,
      },
      {
        path: '/elib/books/:id',
        element: <BookDetail />,
      },
      {
        path: '/elib/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/elib/categories/:id',
        element: <CategoryDetailPage />,
      },
      {
        path: '/elib/my-borrows',
        element: <MyBorrowPage />,
      },
      {
        path: '/elib/history',
        element: <HistoryPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '/elib/admin/dashboard',
        element: <AdminDashboardPage />,
      },
      {
        path: '/elib/admin/books',
        element: <AdminBooksPage />,
      },
      {
        path: '/elib/admin/categories',
        element: <AdminCategoriesPage />,
      },
      {
        path: '/elib/admin/borrows',
        element: <BorrowsAdminPage />,
      },
      {
        path: '/elib/admin/borrow-returned',
        element: <ReturnedBorrowsAdminPage />,
      },
      {
        path: '/elib/admin/users',
        element: <UsersAdminPage />,
      },
    ],
  },
  {
    path: '*',
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;
