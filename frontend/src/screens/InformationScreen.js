import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const InformationScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerSection}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="paw" size={45} color="#A3D9C9" />
                    </View>
                    <Text style={styles.mainTitle}>Acerca de Huellitas</Text>
                    <Text style={styles.subtitle}>Uniendo corazones, salvando vidas</Text>
                </View>

                {/* Tarjeta: ¿Quiénes somos? */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="information-circle" size={24} color="#7FB4E0" />
                        <Text style={styles.cardTitle}>Nuestra Finalidad</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Huellitas nace de la convicción de que cada animal merece un hogar lleno de amor y respeto.
                        Somos una plataforma digital integral diseñada para facilitar el proceso de adopción responsable,
                        conectando a refugios y rescatistas con familias dispuestas a brindar una segunda oportunidad.
                    </Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons name="target" size={24} color="#F7B7C4" />
                        <Text style={styles.cardTitle}>Nuestra Misión</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Simplificar y transparentar el proceso de adopción a través de la tecnología,
                        educando a la comunidad sobre la tenencia responsable y reduciendo el abandono
                        animal en nuestra sociedad.
                    </Text>
                </View>

                {/* Tarjeta: Visión */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="eye" size={24} color="#C9E4A6" />
                        <Text style={styles.cardTitle}>Nuestra Visión</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Convertirnos en la red de apoyo animal más grande y confiable, donde ninguna
                        mascota se quede sin la oportunidad de encontrar el calor de un hogar definitivo.
                    </Text>
                </View>

                <Text style={styles.footerText}>Huellitas App • Versión 1.0.0</Text>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3C9',
    },
    scrollContent: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#73BCA6',
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 22,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginLeft: 10,
    },
    paragraph: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 24,
        textAlign: 'justify',
    },
    footerText: {
        textAlign: 'center',
        color: '#9CA3AF',
        fontSize: 13,
        marginTop: 10,
    },
});

export default InformationScreen;