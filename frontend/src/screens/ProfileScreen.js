import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView, TextInput } from 'react-native';
import { UserContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const InfoRow = ({ icon, label, value, onChangeText, isEditableField, keyboardType, isEditing, colors }) => (
    <View style={styles.infoRow}>
        <Ionicons name={icon} size={24} color={colors.primary} style={styles.cleanIcon} />
        <View style={{ flex: 1 }}>
            <Text style={[styles.infoLabel, { color: colors.subtext }]}>{label}</Text>
            {isEditing && isEditableField ? (
                <TextInput
                    style={[
                        styles.inputField, 
                        { 
                            color: colors.text, 
                            borderColor: colors.accent, 
                            backgroundColor: colors.input 
                        }
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType || 'default'}
                />
            ) : (
                <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
            )}
        </View>
    </View>
);

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { user, logout, colors } = useContext(UserContext);

    const displayUsername = user?.username || 'Usuario';
    const emailData = `${displayUsername.toLowerCase().replace(/\s+/g, '')}@gmail.com`;

    const [phone, setPhone] = useState('7458-9210');
    const [location, setLocation] = useState('San Salvador, El Salvador');
    const [isEditing, setIsEditing] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    onPress={() => setIsEditing((prev) => !prev)} 
                    style={styles.headerButton}
                    activeOpacity={0.7}
                >
                    <Ionicons 
                        name={isEditing ? "save" : "create-outline"} 
                        size={24} 
                        color="#FFFFFF" 
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isEditing]);

    const handleLogout = () => {
        Alert.alert('Cerrar Sesión', '¿Deseas salir de tu cuenta?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Cerrar Sesión',
                style: 'destructive',
                onPress: () => logout(),
            },
        ]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <View style={[styles.profileHeader, { backgroundColor: colors.card, shadowColor: colors.text }]}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary, borderColor: colors.accent }]}>
                        <Ionicons name="person" size={60} color="#FFFFFF" />
                    </View>
                    <Text style={[styles.usernameText, { color: colors.text }]}>{displayUsername}</Text>
                    <Text style={[styles.roleText, { color: colors.accent }]}>Administrador de la tienda</Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Información de Contacto</Text>
                    
                    <InfoRow 
                        icon="mail-outline" 
                        label="Correo Electrónico" 
                        value={emailData} 
                        isEditableField={false} 
                        isEditing={isEditing}
                        colors={colors}
                    />
                    
                    <InfoRow 
                        icon="call-outline" 
                        label="Teléfono / WhatsApp" 
                        value={phone} 
                        onChangeText={setPhone} 
                        isEditableField={true}
                        keyboardType="phone-pad"
                        isEditing={isEditing}
                        colors={colors}
                    />
                    
                    <InfoRow 
                        icon="location-outline" 
                        label="Ubicación" 
                        value={location} 
                        onChangeText={setLocation} 
                        isEditableField={true} 
                        isEditing={isEditing}
                        colors={colors}
                    />
                </View>

                <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.accent }]} onPress={handleLogout} activeOpacity={0.8}>
                    <Ionicons name="log-out-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 20, paddingTop: 30, paddingBottom: 40 },
    headerButton: {
        padding: 8,
        marginRight: 8,
    },
    profileHeader: {
        borderRadius: 24,
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginBottom: 20,
        elevation: 3,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    usernameText: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
    roleText: { fontSize: 15, fontWeight: '600' },
    card: {
        borderRadius: 24,
        padding: 22,
        marginBottom: 24,
        elevation: 3,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
    cleanIcon: {
        marginRight: 16, 
    },
    infoLabel: { fontSize: 13, marginBottom: 3 },
    infoValue: { fontSize: 15, fontWeight: '600' },
    inputField: {
        height: 36,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 15,
        fontWeight: '600',
        width: '100%',
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        elevation: 2,
    },
    logoutButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
});

export default ProfileScreen;
