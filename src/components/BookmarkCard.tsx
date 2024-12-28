import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BookmarkCardProps {
  job: {
    id: number;
    title: string;
    location: string;
    salary: string;
    phone: string;
  };
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ job }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.location}</Text>
      <Text>{job.salary}</Text>
      <Text>{job.phone}</Text>
    </View>
  );
};

export default BookmarkCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
