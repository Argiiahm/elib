import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { register as RegisterUser } from '../services/auth.service';
import { useNavigate } from 'react-router';
import { AuthSchemaRegister } from '../../../schemas/auth.schema';
import Button from '../../../components/ui/button/Button';
import InputForm from '../../../components/ui/input';
import { useState } from 'react';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AuthSchemaRegister),
  });

  const onSubmit = async (data) => {
    try {
      await RegisterUser(data);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-400 text-sm mb-1">{error}</p>}
      <InputForm
        {...register('fullname')}
        error={errors.fullname}
        name="fullname"
        type="text"
        placeholder="Jhon Doe"
      />
      <InputForm
        {...register('no_telp')}
        error={errors.no_telp}
        name="no_telp"
        type="text"
        placeholder="+62 xxx"
      />
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
        {isSubmitting ? 'Please Wait...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default RegisterForm;
