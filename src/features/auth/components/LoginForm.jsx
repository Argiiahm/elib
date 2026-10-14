import { getMe, login as LoginUser } from '../services/auth.service';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchemaLogin } from '../../../schemas/auth.schema';
import { useState } from 'react';
import Button from '../../../components/ui/button/Button';
import InputForm from '../../../components/ui/input';
import { useAuth } from '../../../context/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { setIsAuthenticated, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AuthSchemaLogin),
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      // Login
      await LoginUser(data);

      // get CurrentUser
      const currentUser = await getMe();

      // set AuthContext
      setUser(currentUser);
      setIsAuthenticated(true);

      // Check role and navigate
      switch (currentUser.role) {
        case 'admin':
          navigate('/elib/admin/dashboard');
          break;
        case 'user':
          navigate('/elib/dashboard');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-400 text-sm mb-1">{error}</p>}
      <InputForm
        {...register('email')}
        error={errors.email}
        name="email"
        type="email"
        placeholder="example@email.com"
      />
      <InputForm
        {...register('password')}
        error={errors.password}
        name="password"
        type="password"
        placeholder="****"
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Please Wait...' : 'Sign in'}
      </Button>
    </form>
  );
};

export default LoginForm;
