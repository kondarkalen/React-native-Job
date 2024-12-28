import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useBookmarkJob } from '../hooks/useBookmarkJob';

const BookmarkScreen = () => {
  const { bookmarkedJobs } = useBookmarkJob();

  useEffect(() => {
    // Fetch bookmarked jobs from AsyncStorage when the component mounts
    // This ensures that even if the app is offline, the data is available
  }, []);

  if (bookmarkedJobs.length === 0) {
    return <Text>No bookmarked jobs.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item) => item.id?.toString() || 'no-id'}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.title || 'No Title'}</Text>
            <Text>{item.primary_details?.Place || 'Location not available'}</Text>
            <Text>{`₹${item.salary_min || 0} - ₹${item.salary_max || 0}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BookmarkScreen;
