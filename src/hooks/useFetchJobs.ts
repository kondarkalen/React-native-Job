import { useState, useEffect } from 'react';
import axios from 'axios';
import { Job } from '../types';

const useFetchJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://testapi.getlokalapp.com/common/jobs?page=1');

        // Check if response.data exists and results are in an array
        if (response.data && Array.isArray(response.data.results)) {
          const filteredJobs = response.data.results.filter((job: Job | null) => job !== null && job !== undefined);
          setJobs(filteredJobs);
        } else {
          setJobs([]);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Error: ${err.message}`);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};

export default useFetchJobs;
