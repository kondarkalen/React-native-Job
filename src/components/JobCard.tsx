import React from 'react';
import { View, Text, Image } from 'react-native';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <View style={{ padding: 10, borderColor: '#ddd', borderWidth: 1, marginBottom: 10 }}>
      {job.creatives?.length > 0 && (
        <Image 
          source={{ uri: job.creatives[0]?.file }} 
          style={{ width: '100%', height: 200, borderRadius: 10 }}
        />
      )}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 5 }}>{job.title}</Text>
      <Text style={{ color: '#555' }}>{job.company_name}</Text>
      <Text style={{ color: '#555' }}>{job.primary_details?.Place || 'Location not available'}</Text> {/* Handle undefined case */}
      <Text style={{ color: '#555' }}>{`₹${job.salary_min} - ₹${job.salary_max}`}</Text>
      <Text style={{ color: '#555' }}>{job.primary_details?.Job_Type}</Text> {/* Handle undefined case */}
    </View>
  );
};

export default JobCard;
