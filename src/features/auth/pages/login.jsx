import AuthLayouts from '../components/AuthLayouts';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayouts type="login">
      <LoginForm />
    </AuthLayouts>
  );
};

export default LoginPage;
