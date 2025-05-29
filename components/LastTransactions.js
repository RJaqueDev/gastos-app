import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, DataTable, ActivityIndicator } from 'react-native-paper';
import { getGastos } from '../api/gasto';

const LastTransactions = ({ refresh }) => {
    const [gastos, setGastos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGastos = async () => {
            setLoading(true);
            try {
                const data = await getGastos();
                // Ordena por fecha descendente y toma los 10 últimos
                const sorted = data
                    .filter(g => g.fecha)
                    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                    .slice(0, 10);
                setGastos(sorted);
            } catch (error) {
                setGastos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGastos();
    }, [refresh]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#7db4f0" />
            </View>
        );
    }

    return (
        <View style={styles.centered}>
            <Card style={styles.card}>
                <Card.Title title="Últimos gastos" />
                <Card.Content>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Monto</DataTable.Title>
                            <DataTable.Title>Descripción</DataTable.Title>
                            <DataTable.Title>Cuotizado</DataTable.Title>
                        </DataTable.Header>
                        {gastos.map((gasto, idx) => (
                            <DataTable.Row key={idx}>
                                <DataTable.Cell>
                                    {gasto.monto?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}
                                </DataTable.Cell>
                                <DataTable.Cell>{gasto.descripcion}</DataTable.Cell>
                                <DataTable.Cell>{gasto.cuotizado ? 'Sí' : 'No'}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                    {gastos.length === 0 && (
                        <Text style={styles.empty}>No hay gastos registrados.</Text>
                    )}
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        elevation: 2,
        minWidth: 320,
        maxWidth: 500,
        alignSelf: 'center',
    },
    centered: {
        // Elimina flex: 1 para evitar que ocupe todo el alto
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8, // Reduce el espacio vertical
    },
    empty: {
        textAlign: 'center',
        marginTop: 16,
        color: '#888',
    },
});

export default LastTransactions;