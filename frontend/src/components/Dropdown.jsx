import { Link } from 'react-router-dom';
import { logoutUser, logout } from '../features/user/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Dropdown = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser());

      // Check if logoutUser was successful
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(logout()); // Clear local state
        toast.success('Logout successful');
      } else {
        // Handle specific error from logoutUser
        throw res.payload || { error: 'Failed to log out' };
      }
    } catch (err) {
      // Display error message to the user
      toast.error(err?.message || err?.error || 'Something went wrong');
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg py-1 z-20 overflow-hidden px-2">
      <Link
        to="/profile"
        className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-400 rounded-md"
      >
        Profile
      </Link>
      <button
        onClick={() => handleLogout()}
        className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-400 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
