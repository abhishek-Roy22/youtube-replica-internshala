import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ChannelModal = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState('');
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !channelName || !description) {
      toast.error('Please fill in all fields.');
      return;
    }
    const formData = { url, channelName, description };

    try {
      await axios.post('/api/channel/', { ...formData });
      toast.success('Channel Created Successful');
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }

    // Reset form and close modal
    setUrl('');
    setChannelName('');
    setDescription('');
    onClose();
  };

  const handleCancel = () => {
    setUrl('');
    setChannelName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="absolute top-2/4 left-1/3 right-0">
      <div className="fixed -z-10 -inset-1 bg-black bg-opacity-50 flex items-center justify-center" />
      <div className="bg-slate-700 rounded-lg p-6 w-full max-w-lg z-10">
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
              htmlFor="url"
            >
              URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Banner url"
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
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
