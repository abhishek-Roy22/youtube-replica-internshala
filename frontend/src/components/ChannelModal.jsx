import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ChannelModal = ({ isOpen, onClose }) => {
  const [channelBanner, setChannelBanner] = useState('');
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelBanner || !channelName || !description) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const formData = {
        channelBanner,
        channelName,
        description,
      };

      await axios.post('/api/channel', formData);
      toast.success('Channel Created Successfully');
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error creating channel';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }

    setChannelBanner('');
    setChannelName('');
    setDescription('');
  };

  const handleCancel = () => {
    setChannelBanner('');
    setChannelName('');
    setDescription('');
    onClose();
  };

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleCancel}
      />
      <div className="bg-slate-700 rounded-lg p-6 w-full max-w-lg z-10 relative">
        <h2
          className="text-2xl text-slate-300 font-bold mb-4"
          id="add-channel-title"
        >
          Add Channel
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-slate-300 text-sm font-bold mb-2"
              htmlFor="channelBanner"
            >
              Channel Banner URL
            </label>
            <input
              type="url"
              id="channelBanner"
              value={channelBanner}
              onChange={(e) => setChannelBanner(e.target.value)}
              placeholder="https://example.com/thumbnail.jpg"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-slate-300 text-sm font-bold mb-2"
              htmlFor="channelName"
            >
              Channel Name
            </label>
            <input
              type="text"
              id="channelName"
              placeholder="Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-slate-300 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="About your channel"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChannelModal;
