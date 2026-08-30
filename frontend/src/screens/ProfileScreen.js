import React, { useContext } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, SafeAreaView} from 'react-native';
import { UserContext } from '../context/UserContext';
import { Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const { user, setUser } = useContext(UserContext);
    const navigation = useNavigation();

    const displayUsername = user?.username || 'Usuario Invitado';

    const STATIC_DATA = {
        email: `${displayUsername.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        phone: '7458-9210',
        location: 'San Salvador, El Salvador',
    };

    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Deseas salir de tu cuenta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    style: 'destructive',
                    onPress: () => {
                        setUser(null); // Limpiamos el usuario
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.profileHeader}>
                    <View style={styles.avatarWrapper}>
                        <Image source={require('../../../assets/PerfilGatos.png')} style={styles.avatar} />
                        <View style={styles.onlineBadge} />
                    </View>

                    {/* Nombre obtenido del Login */}
                    <Text style={styles.usernameText}>{displayUsername}</Text>
                    <Text style={styles.roleText}>Miembro Adoptante Activo</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Información de Contacto</Text>

                    <View style={styles.infoRow}>
                        <View style={[styles.iconCircle, { backgroundColor: '#C9E4A6' }]}>
                            <Ionicons name="mail" size={18} color="#1b1b1b" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Correo Electrónico</Text>
                            <Text style={styles.infoValue}>{STATIC_DATA.email}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={[styles.iconCircle, { backgroundColor: '#F7B7C4' }]}>
                            <Ionicons name="call" size={18} color="#1b1b1b" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Teléfono / WhatsApp</Text>
                            <Text style={styles.infoValue}>{STATIC_DATA.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={[styles.iconCircle, { backgroundColor: '#7FB4E0' }]}>
                            <Ionicons name="location" size={18} color="#1b1b1b" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Ubicación</Text>
                            <Text style={styles.infoValue}>{STATIC_DATA.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Botón de Cerrar Sesión */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3C9', // Amarillo suave de la paleta
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    profileHeader: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: '#A3D9C9', // Menta
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#A3D9C9',
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 2,
        right: 4,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#C9E4A6', // Verde
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    usernameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1b1b1b',
    },
    roleText: {
        fontSize: 14,
        color: '#7FB4E0', // Azul
        fontWeight: '600',
        marginTop: 2,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1b1b1b',
        marginBottom: 14,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#888',
    },
    infoValue: {
        fontSize: 15,
        color: '#1b1b1b',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#E53E3E',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 6,
        elevation: 2,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;