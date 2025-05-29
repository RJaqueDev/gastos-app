import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { getGastos } from '../api/gasto';

const Saldo = ({ refresh }) => {
    const [saldo, setSaldo] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGastos = async () => {
            try {
                const gastos = await getGastos();
                const total = gastos.reduce((acc, gasto) => acc + (gasto.monto || 0), 0);
                setSaldo(total);
            } catch (error) {
                console.log('Error al obtener gastos:', error);
                setSaldo(0);
            } finally {
                setLoading(false);
            }
        };

        fetchGastos();
    }, [refresh]);

    const formatCLP = (value) => {
        return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#7db4f0" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.saldo}>{formatCLP(saldo)}</Text>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8, // Reduce el espacio vertical
        alignItems: 'flex-start',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        elevation: 4,
        minWidth: 200,
        alignItems: 'center',
    },
    saldo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#7db4f0',
        textAlign: 'center',
    },
});

export default Saldo;