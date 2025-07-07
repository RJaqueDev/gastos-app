import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { TextInput, Button, Switch, Text, Card, Snackbar } from 'react-native-paper'; // <-- Agrega Snackbar
import { addGasto } from '../api/gasto';

const Transaction = ({ visible, onClose, onGastoAgregado }) => {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cuotizado, setCuotizado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false); // <-- Nuevo estado

  const handleSave = async () => {
    setLoading(true);
    try {
      await addGasto({
        monto,
        descripcion,
        cuotizado,
        cantidad
      });
      // Limpia los campos y cierra el modal
      setMonto('');
      setDescripcion('');
      setCuotizado(false);
      setCantidad(0);
      setShowSnackbar(true); // <-- Muestra el Snackbar
      if (onGastoAgregado) onGastoAgregado(); // Notifica que se agregó un gasto
      onClose();
    } catch (error) {
      console.log('Error al guardar gasto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Nuevo Gasto</Text>
            <TextInput
              label="Monto"
              value={monto}
              onChangeText={text => setMonto(text.replace(/[^0-9.]/g, ''))}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              style={styles.input}
            />
            <View style={styles.switchContainer}>
              <Text>Cuotizado</Text>
              <Switch
                value={cuotizado}
                onValueChange={setCuotizado}
                color="#7db4f0"
              />
              {cuotizado && (
                <TextInput
                  label="Cantidad de cuotas"
                  value={cantidad ? cantidad.toString() : ''}
                  onChangeText={text => setCantidad(Number(text.replace(/[^0-9]/g, '')))}
                  keyboardType="numeric"
                  style={[styles.input, { width: 140 }]}
                />
              )}
            </View>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              loading={loading}
              disabled={loading || !monto || !descripcion}
            >
              Guardar
            </Button>
            <Button onPress={onClose} style={styles.button} textColor="#7db4f0">
              Cancelar
            </Button>
          </Card.Content>
        </Card>
        <Snackbar
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          duration={2000}
        >
          Gasto agregado correctamente
        </Snackbar>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 16,
    padding: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#7db4f0',
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 8,
  },
});

export default Transaction;