import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARKS_KEY = "bookmarked_jobs";

export const saveJobBookmark = async (job: any) => {
  const existing = await getBookmarkedJobs();
  await AsyncStorage.setItem(
    BOOKMARKS_KEY,
    JSON.stringify([...existing, job])
  );
};

export const getBookmarkedJobs = async () => {
  const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return data ? JSON.parse(data) : [];
};
