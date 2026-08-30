import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; 

const AdoptionFormScreen = () => {
    const navigation = useNavigation();
    const route = useRoute(); 
    const cat = route.params?.cat; 

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        reason: ''
    });
    
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleAdopt = () => {
        if (!formData.fullName || !formData.phone || !formData.address || !formData.reason) {
            Alert.alert('Formulario incompleto', 'Por favor, llena todos los campos para continuar.');
            return;
        }

        if (!termsAccepted) {
            Alert.alert('Términos y condiciones', 'Debes aceptar los términos y condiciones para adoptar.');
            return;
        }

        Alert.alert(
            '¡Felicidades!',
            'Tu solicitud de adopción ha sido enviada con éxito. Nos pondremos en contacto contigo pronto.',
            [
                {
                    text: 'Volver al Inicio',
                    onPress: () => navigation.navigate('Home')
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.screenTitle}>Solicitud de Adopción</Text>
                {cat ? (
                    <View style={styles.catCard}>
                        <Image source={cat.image} style={styles.catImageReal} />
                        <View style={styles.catInfo}>
                            <Text style={styles.catName}>{cat.name}</Text>
                            <Text style={styles.catDetail}>{cat.gender} • {cat.age} • {cat.breed}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.catCard}>
                        <View style={styles.catImagePlaceholder}>
                            <Ionicons name="paw" size={32} color="#7FB4E0" />
                        </View>
                        <View style={styles.catInfo}>
                            <Text style={styles.catName}>Adopción General</Text>
                            <Text style={styles.catDetail}>Te ayudaremos a buscar a tu compañero ideal</Text>
                        </View>
                    </View>
                )}

                <View style={styles.formCard}>
                    <Text style={styles.formTitle}>Tus Datos</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nombre Completo</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Ej. Juan Pérez"
                            placeholderTextColor="#9CA3AF"
                            value={formData.fullName}
                            onChangeText={(text) => setFormData({...formData, fullName: text})}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Teléfono</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Ej. 7000-0000"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="phone-pad"
                            value={formData.phone}
                            onChangeText={(text) => setFormData({...formData, phone: text})}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Dirección</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Ingresa tu dirección completa"
                            placeholderTextColor="#9CA3AF"
                            value={formData.address}
                            onChangeText={(text) => setFormData({...formData, address: text})}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>¿Por qué deseas adoptar?</Text>
                        <TextInput 
                            style={[styles.input, styles.textArea]}
                            placeholder="Cuéntanos un poco..."
                            placeholderTextColor="#9CA3AF"
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={formData.reason}
                            onChangeText={(text) => setFormData({...formData, reason: text})}
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.termsContainer} 
                    onPress={() => setTermsAccepted(!termsAccepted)}
                    activeOpacity={0.7}
                >
                    <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                        {termsAccepted && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                    </View>
                    <Text style={styles.termsText}>Acepto los términos y condiciones de adopción responsable.</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.submitButton, (!termsAccepted || !formData.fullName) && styles.submitButtonDisabled]} 
                    onPress={handleAdopt}
                    activeOpacity={0.8}
                >
                    <Ionicons name="heart" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.submitButtonText}>¡Listo para adoptar!</Text>
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
    screenTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
        textAlign: 'center',
    },
    catCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },
    catImageReal: {
        width: 60,
        height: 60,
        borderRadius: 16,
        marginRight: 16,
        backgroundColor: '#F0F0F0',
    },
    catImagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#E6F4F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    catInfo: {
        flex: 1,
    },
    catName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    catDetail: {
        fontSize: 13,
        color: '#73BCA6',
        marginTop: 4,
        fontWeight: '600',
    },
    formCard: {
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
    textArea: {
        minHeight: 100,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#A3D9C9',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#A3D9C9',
    },
    termsText: {
        flex: 1,
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },
    submitButton: {
        backgroundColor: '#A3D9C9', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#A3D9C9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    submitButtonDisabled: {
        backgroundColor: '#9CA3AF',
        shadowOpacity: 0,
        elevation: 0,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AdoptionFormScreen;