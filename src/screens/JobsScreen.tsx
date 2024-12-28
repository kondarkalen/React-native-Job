import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Job } from '../types'; // Define Job type in your app for type safety.
import useFetchJobs from '../hooks/useFetchJobs'; // Custom hook to fetch jobs.
import { useBookmarkJob } from '../hooks/useBookmarkJob'; // Custom hook to handle bookmarks.

const JobsScreen = () => {
  const navigation = useNavigation();
  const { jobs, loading, error } = useFetchJobs();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkJob();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading jobs. Please try again.</Text>
      </View>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No jobs available at the moment.</Text>
      </View>
    );
  }

  const handleBookmarkPress = (job: Job) => {
    if (isBookmarked(job.id)) {
      removeBookmark(job.id);
    } else {
      addBookmark(job);
    }
  };

  const handleJobPress = (job: Job) => {
    navigation.navigate('JobDetail', { jobId: job.id }); // Replace 'JobDetail' with your detailed screen route name.
  };

  const renderJobItem = ({ item }: { item: Job }) => (
    <View style={styles.jobItem}>
      <Text style={styles.title}>{item.title || 'No Title'}</Text>
      <Text style={styles.location}>
        {item.primary_details?.Place || 'Location not available'}
      </Text>
      <Text style={styles.salary}>
        {`₹${item.salary_min || 0} - ₹${item.salary_max || 0}`}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleJobPress(item)}>
          <Text style={styles.detailsButton}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleBookmarkPress(item)}>
          <Icon
            name={isBookmarked(item.id) ? 'bookmark' : 'bookmark-border'}
            size={30}
            color={isBookmarked(item.id) ? 'blue' : 'grey'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id?.toString() || 'no-id'}
        renderItem={renderJobItem}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  jobItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  salary: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsButton: {
    fontSize: 16,
    color: '#007BFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
});

export default JobsScreen;
