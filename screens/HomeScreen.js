import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Saldo from '../components/Saldo';
import Fab from '../components/Fab';
import Transaction from '../components/Transaction';
import LastTransactions from '../components/LastTransactions';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleFabPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleGastoAgregado = () => {
    setRefresh(prev => !prev); // Cambia el valor para forzar el refresh
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Saldo refresh={refresh} />
        <LastTransactions refresh={refresh} />
      </View>
      <Transaction
        visible={modalVisible}
        onClose={handleCloseModal}
        onGastoAgregado={handleGastoAgregado}
      />
      <Fab onPress={handleFabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, // Aumenta el margen superior
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export { HomeScreen };