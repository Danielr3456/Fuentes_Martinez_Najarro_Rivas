import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const SettingOption = ({ icon, title, subtitle, onPress }) => (
        <TouchableOpacity style={styles.optionRow} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
                <Ionicons name={icon} size={20} color="#1F2937" />
            </View>
            <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{title}</Text>
                {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
    );

    const SettingSwitch = ({ icon, title, subtitle, value, onValueChange }) => (
        <View style={styles.optionRow}>
            <View style={styles.iconCircle}>
                <Ionicons name={icon} size={20} color="#1F2937" />
            </View>
            <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{title}</Text>
                {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
            </View>
            <Switch
                trackColor={{ false: '#E5E7EB', true: '#A3D9C9' }}
                thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E5E7EB"
                onValueChange={onValueChange}
                value={value}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Tarjeta de Preferencias */}
                <View style={styles.card}>
                    <Text style={styles.cardSectionTitle}>General</Text>

                    {/* Botón para ver el perfil */}
                    <SettingOption
                        icon="person-outline"
                        title="Ver Perfil"
                        subtitle="Gestionar tu información personal"
                        onPress={() => navigation.navigate('Profile')}
                    />

                    <View style={styles.divider} />

                    <SettingSwitch
                        icon="notifications-outline"
                        title="Notificaciones"
                        subtitle="Avisos de adopción y mensajes"
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                    />
                </View>

                {/* Tarjeta de Cuenta */}
                <View style={styles.card}>
                    <Text style={styles.cardSectionTitle}>Cuenta y Seguridad</Text>

                    <SettingOption
                        icon="lock-closed-outline"
                        title="Cambiar Contraseña"
                        onPress={() => { }}
                    />

                    <View style={styles.divider} />

                    <SettingOption
                        icon="shield-checkmark-outline"
                        title="Privacidad y Datos"
                        onPress={() => { }}
                    />
                </View>

                {/* Tarjeta de Soporte */}
                <View style={styles.card}>
                    <Text style={styles.cardSectionTitle}>Soporte</Text>

                    <SettingOption
                        icon="help-buoy-outline"
                        title="Centro de Ayuda"
                        onPress={() => { }}
                    />

                    <View style={styles.divider} />

                    <SettingOption
                        icon="information-circle-outline"
                        title="Acerca de Huellitas"
                        subtitle="Versión 1.0.0"
                        onPress={() => { }}
                    />
                </View>

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
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 22,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    cardSectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#73BCA6',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#E6F4F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    optionTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    optionSubtitle: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 12,
        marginLeft: 58,
    },
});

export default SettingsScreen;