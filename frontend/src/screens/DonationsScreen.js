import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const DonationsScreen = () => {
    const navigation = useNavigation();

    const [donorName, setDonorName] = useState('');
    const [donationAmount, setDonationAmount] = useState('');
    
    // lista de donaciones
    const [donationsList, setDonationsList] = useState([
        { id: '1', name: 'María López', amount: '25.00' },
        { id: '2', name: 'Carlos Fuentes', amount: '10.00' }
    ]);

    const handleDonate = () => {
        if (!donorName.trim() || !donationAmount.trim()) {
            Alert.alert('Campos vacíos', 'Por favor, ingresa tu nombre y la cantidad a donar.');
            return;
        }

        const newDonation = {
            id: Date.now().toString(),
            name: donorName,
            amount: parseFloat(donationAmount).toFixed(2)
        };

        setDonationsList([newDonation, ...donationsList]);
        
        // Limpiar el formulario
        setDonorName('');
        setDonationAmount('');

        Alert.alert(
            '¡Gracias por tu apoyo!',
            'Tu donación ayudará a cambiar la vida de muchas mascotas.',
            [{ text: 'Aceptar' }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.header}>
                    <Text style={styles.screenTitle}>Apoya nuestra causa</Text>
                    <View style={{ width: 24 }} /> 
                </View>

                <View style={styles.infoCard}>
                    <MaterialCommunityIcons name="hand-heart" size={40} color="#C9E4A6" />
                    <Text style={styles.infoText}>
                        Cada contribución nos permite brindar alimento, refugio y atención médica a los animalitos rescatados.
                    </Text>
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.formTitle}>Realizar Donación</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nombre del Donante</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="..."
                            placeholderTextColor="#9CA3AF"
                            value={donorName}
                            onChangeText={setDonorName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Cantidad a donar ($)</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="..."
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={donationAmount}
                            onChangeText={setDonationAmount}
                        />
                    </View>

                    <TouchableOpacity 
                        style={[styles.submitButton, (!donorName || !donationAmount) && styles.submitButtonDisabled]} 
                        onPress={handleDonate}
                        activeOpacity={0.8}
                    >
                        <MaterialCommunityIcons name="gift" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                        <Text style={styles.submitButtonText}>Donar ahora</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.listContainer}>
                    <Text style={styles.listTitle}>Donantes Recientes</Text>
                    {donationsList.map((item) => (
                        <View key={item.id} style={styles.donationItem}>
                            <View style={styles.donationAvatar}>
                                <Ionicons name="person" size={20} color="#C9E4A6" />
                            </View>
                            <View style={styles.donationDetails}>
                                <Text style={styles.donationName}>{item.name}</Text>
                                <Text style={styles.donationTime}>Aportación</Text>
                            </View>
                            <Text style={styles.donationAmount}>${item.amount}</Text>
                        </View>
                    ))}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        elevation: 2,
    },
    screenTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
    },
    infoText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 22,
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 22,
        marginBottom: 25,
        elevation: 3,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1F2937',
    },
    submitButton: {
        backgroundColor: '#C9E4A6', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        marginTop: 10,
        elevation: 3,
    },
    submitButtonDisabled: {
        backgroundColor: '#D1D5DB',
        elevation: 0,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContainer: {
        marginTop: 10,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 15,
    },
    donationItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 1,
    },
    donationAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    donationDetails: {
        flex: 1,
    },
    donationName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    donationTime: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 2,
    },
    donationAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7FB4E0',
    }
});

export default DonationsScreen;