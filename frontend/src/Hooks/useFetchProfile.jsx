import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchProfile = (url) => {
  const [data, setData] = useState(null); // Stores user and channel data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(url); // Fetch data from the API
        setData(response.data); // Set the data
        setError(null); // Clear errors
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProfile(); // Fetch profile on component mount
  }, []); // Empty dependency array ensures it runs only once

  return { data, loading, error };
};

export default useFetchProfile;
