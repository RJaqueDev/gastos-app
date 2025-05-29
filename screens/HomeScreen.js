import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Saldo from '../components/Saldo';
import Fab from '../components/Fab';
import Transaction from '../components/Transaction';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleFabPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Saldo />
      <Fab onPress={handleFabPress} />
      <Transaction visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
});

export { HomeScreen };