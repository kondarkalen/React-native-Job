import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Job } from '../types';
import useFetchJobDetails from '../hooks/useFetchJobDetails';

type JobDetailScreenRouteProp = RouteProp<{ params: { jobId: string } }, 'params'>;

const JobDetailScreen = () => {
  const route = useRoute<JobDetailScreenRouteProp>();
  const { jobId } = route.params;
  const { job, loading, error } = useFetchJobDetails(jobId);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading job details.</Text>;
  }

  if (!job) {
    return <Text>Job not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{job.title}</Text>
      <Text>{job.primary_details?.Place}</Text>
      <Text>{`₹${job.salary_min} - ₹${job.salary_max}`}</Text>
      <Text>{job.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default JobDetailScreen;
