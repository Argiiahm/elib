import { Link } from 'react-router';

const AuthLayouts = ({ type, children }) => {
  return (
    <section className="flex items-center justify-center min-h-screen border border-gray-200">
      <div className="flex">
        <div className="w-full max-w-md border border-gray-200 p-10 rounded-l-lg">
          <div className="flex flex-col items-center mb-8">
            <img className="w-20 mb-2" src="/icons/elib-logo.png" alt="logo" />

            {type === 'login' ? (
              <>
                <h1 className="text-2xl">Welcome Back, Eliber!</h1>
                <p>Sign in to continue.</p>
              </>
            ) : (
              <>
                <h1 className="text-2xl">Create Your Account</h1>
                <p>Sign up to get started.</p>
              </>
            )}
          </div>

          {children}

          {type === 'login' ? (
            <span className="flex items-center justify-center gap-1 my-2">
              Don't Have an Account?
              <Link className="font-medium hover:underline" to="/register">
                Register
              </Link>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1 my-2">
              Already Have an Account?
              <Link className="font-medium hover:underline" to="/login">
                Login
              </Link>
            </span>
          )}
        </div>
        <div className="hidden md:block w-[500px] overflow-hidden rounded-r-lg">
          <img
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
            src="/images/background-login.jpg"
            alt="background image"
          />
        </div>
      </div>
    </section>
  );
};

export default AuthLayouts;
