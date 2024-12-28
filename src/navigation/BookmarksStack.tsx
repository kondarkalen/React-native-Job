import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookmarksScreen from '../screens/BookmarksScreen';
import JobDetailScreen from '../screens/JobDetailScreen';

const Stack = createStackNavigator();

const BookmarksStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
    <Stack.Screen name="JobDetail" component={JobDetailScreen} />
  </Stack.Navigator>
);

export default BookmarksStack;
