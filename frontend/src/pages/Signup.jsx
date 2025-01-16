import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser, setCredentials } from '../features/user/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  function formValidation() {
    const newError = {};

    if (!formData.userName) {
      newError.username = 'Username is required';
    }

    if (!formData.email) {
      newError.email = 'Email is required';
    }

    if (!formData.password) {
      newError.password = 'Password is required';
    }

    if (!formData.confirm_password) {
      newError.confirm_password = 'Confirm password is required';
    } else if (formData.password !== formData.confirm_password) {
      newError.confirm_password = 'Password is not match';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear the error when user start typing
    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formValidation()) {
      toast.error('Add required inputs');
      return;
    }

    try {
      const res = await dispatch(createUser(formData)).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Signup successful');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[88vh] bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Register
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              UserName
            </label>
            <input
              value={formData.userName}
              onChange={handleChange}
              id="userName"
              name="userName"
              type="text"
              placeholder="Enter your username"
              className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                error.userName && 'ring-1 ring-rose-800'
              }`}
            />
            {error.userName && (
              <p className="text-xs text-rose-800">{error.userName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                error.email && 'ring-1 ring-rose-800'
              }`}
            />
            {error.email && (
              <p className="text-xs text-rose-800">{error.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                error.password && 'ring-1 ring-rose-800'
              }`}
            />
            {error.password && (
              <p className="text-xs text-rose-800">{error.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              value={formData.confirm_password}
              onChange={handleChange}
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password again"
              className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                error.confirm_password && 'ring-1 ring-rose-800'
              }`}
            />
            {error.confirm_password && (
              <p className="text-xs text-rose-800">{error.confirm_password}</p>
            )}
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Signing in..' : 'Signup'}
            </button>
          </div>
          <div className="text-center">
            <Link
              to="/login"
              className="inline-block px-4 py-2 mt-4 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Already have an account ? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
