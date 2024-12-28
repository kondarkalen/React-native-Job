import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../types';

export const useBookmarkJob = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarkedJobs');
        if (storedBookmarks) {
          setBookmarkedJobs(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error('Error fetching bookmarks', error);
      }
    };

    fetchBookmarkedJobs();
  }, []);

  const addBookmark = async (job: Job) => {
    try {
      const updatedBookmarks = [...bookmarkedJobs, job];
      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
      setBookmarkedJobs(updatedBookmarks);
    } catch (error) {
      console.error('Error adding bookmark', error);
    }
  };

  const removeBookmark = async (jobId: number) => {
    try {
      const updatedBookmarks = bookmarkedJobs.filter((job) => job.id !== jobId);
      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
      setBookmarkedJobs(updatedBookmarks);
    } catch (error) {
      console.error('Error removing bookmark', error);
    }
  };

  const isBookmarked = (jobId: number) => {
    return bookmarkedJobs.some((job) => job.id === jobId);
  };

  return { addBookmark, removeBookmark, isBookmarked, bookmarkedJobs };
};
