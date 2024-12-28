export interface Job {
  id: number;
  title: string;
  primary_details: {
    Place: string;
  };
  salary_min: number;
  salary_max: number;
  job_role: string;
  // Add other fields as necessary
}
