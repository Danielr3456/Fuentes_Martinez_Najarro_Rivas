import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';

const SettingsScreen = () => {
    const { darkMode, toggleDarkMode, colors } = useContext(UserContext);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.cardSectionTitle, { color: colors.accent }]}>Apariencia</Text>

                    <View style={styles.optionRow}>
                        <View style={[styles.iconCircle, { backgroundColor: colors.soft }]}>
                            <Ionicons name="moon-outline" size={20} color={colors.primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.optionTitle, { color: colors.text }]}>Modo oscuro</Text>
                            <Text style={[styles.optionSubtitle, { color: colors.subtext }]}>Se guarda en AsyncStorage</Text>
                        </View>
                        {/* La preferencia se persiste en AsyncStorage (ver UserContext) */}
                        <Switch
                            trackColor={{ false: '#CCCACC', true: colors.accent }}
                            thumbColor="#FFFFFF"
                            onValueChange={toggleDarkMode}
                            value={darkMode}
                        />
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.cardSectionTitle, { color: colors.accent }]}>Acerca de</Text>
                    <Text style={[styles.optionTitle, { color: colors.text }]}>Moda Store</Text>
                    <Text style={[styles.optionSubtitle, { color: colors.subtext }]}>Versión 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 20, paddingTop: 30 },
    card: {
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
        color: '#893172',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    optionRow: { flexDirection: 'row', alignItems: 'center' },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#E3D3C3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    optionTitle: { fontSize: 16, fontWeight: '600' },
    optionSubtitle: { fontSize: 13, marginTop: 2 },
});

export default SettingsScreen;
