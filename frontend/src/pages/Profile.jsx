import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useFetchProfile from '../Hooks/usefetchProfile';

const Profile = () => {
  const { data: user, loading, error } = useFetchProfile('/api/users/profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add API call to update user details here
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center text-slate-300">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-500">
        Error loading profile
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-8">Profile</h1>

        {!isEditing ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="h-32 w-32 rounded-full overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.userName}`}
                  alt={user?.userName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-slate-300">
                <span className="font-semibold">Name:</span> {user?.userName}
              </p>
              <p className="text-slate-300">
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-slate-700 text-slate-100"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-slate-700 text-slate-100"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-slate-700 text-slate-100"
                placeholder="Enter new password"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
