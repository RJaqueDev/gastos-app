import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const Fab = ({ onPress }) => (
  <FAB
    style={styles.fab}
    icon="plus"
    onPress={onPress}
    color="#fff"
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#7db4f0',
  },
});

export default Fab;