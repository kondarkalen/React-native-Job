import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobsScreen from '../screens/JobsScreen';
import JobDetailScreen from '../screens/JobDetailScreen';

const Stack = createStackNavigator();

const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Jobs" component={JobsScreen} />
    <Stack.Screen name="JobDetail" component={JobDetailScreen} />
  </Stack.Navigator>
);

export default JobsStack;
