import AuthLayouts from '../components/AuthLayouts';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayouts type="register">
      <RegisterForm />
    </AuthLayouts>
  );
};

export default RegisterPage;
