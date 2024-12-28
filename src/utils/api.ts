const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch('https://testapi.getlokalapp.com/common/jobs?page=1');
    const data = await response.json();
    return data.results;  // Returning job data
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch jobs');
  }
};

export default { fetchJobs };
