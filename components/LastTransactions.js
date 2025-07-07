import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Últimos gastos" />
                <Card.Content>
                    {/* Cabeceras de la tabla */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>Fecha</Text>
                        <Text style={styles.headerText}>Descripción</Text>
                        <Text style={styles.headerText}>Monto</Text>
                    </View>

                    {/* Contenido desplazable */}
                    <ScrollView style={styles.scrollContainer}>
                        {gastos.map((gasto, id) => (
                            <View key={id} style={styles.tableRow}>
                                <Text style={styles.rowText}>
                                    {new Date(gasto.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                </Text>
                                <Text style={styles.rowText}>{gasto.descripcion}</Text>
                                <Text style={styles.rowText}>
                                    {gasto.monto?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Mensaje si no hay gastos */}
                    {gastos.length === 0 && (
                        <Text style={styles.empty}>No hay gastos registrados.</Text>
                    )}
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
        padding: 16,
    },
    card: {
        borderRadius: 16,
        elevation: 2,
        minWidth: 320,
        maxWidth: 500,
        alignSelf: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    scrollContainer: {
        maxHeight: 400, // Limita la altura para habilitar el scroll
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    rowText: {
        flex: 1,
        textAlign: 'center',
    },
    empty: {
        textAlign: 'center',
        marginTop: 16,
        color: '#888',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8, 
        maxHeight: 400, 
        overflow: 'hidden'
    },
});

export default LastTransactions;