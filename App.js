import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WaterTracker from './WaterTracker';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WaterTracker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4286f4',
    alignItems: 'center',
    justifyContent: 'center',
  }
});