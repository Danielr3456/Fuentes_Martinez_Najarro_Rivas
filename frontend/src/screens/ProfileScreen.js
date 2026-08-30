import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { UserContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
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
                        setUser(null); 
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

                    <Text style={styles.usernameText}>{displayUsername}</Text>
                    <Text style={styles.roleText}>Miembro Adoptante Activo</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Información de Contacto</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="mail-outline" size={20} color="#1F2937" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Correo Electrónico</Text>
                            <Text style={styles.infoValue}>{STATIC_DATA.email}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="call-outline" size={20} color="#1F2937" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Teléfono / WhatsApp</Text>
                            <Text style={styles.infoValue}>{STATIC_DATA.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="location-outline" size={20} color="#1F2937" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Ubicación</Text>
                            <Text style={styles.infoValue}>{STATIC_DATA.location}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
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
        backgroundColor: '#FFF3C9', 
    },
    scrollContent: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
    profileHeader: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24, 
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginBottom: 20,
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: '#A3D9C9', 
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 2,
        right: 6,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#A3D9C9', 
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    usernameText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1F2937', 
        marginBottom: 4,
    },
    roleText: {
        fontSize: 15,
        color: '#73BCA6', 
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 22,
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    iconCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#E6F4F1', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    infoLabel: {
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 3,
    },
    infoValue: {
        fontSize: 15,
        color: '#374151',
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#EF4444', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;