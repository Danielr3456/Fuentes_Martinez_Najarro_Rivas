import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            
            <Text style={styles.mainTitle}>Huellitas</Text>

            <View style={styles.card}>
                <Image 
                    source={require('../../../assets/logo.jpg')} 
                    style={styles.cardImage} 
                />
                <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: '#7FB4E0' }]}>BIENVENIDO!</Text>
                    <Text style={styles.cardText}> ¿Buscas un nuevo compañero?</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#7FB4E0' }]}>
                        <MaterialCommunityIcons name="magnify" size={20} color="#fff" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Explorar Mascotas</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Image 
                    source={require('../../../assets/adopcion.jpg')} 
                    style={styles.cardImage} 
                />
                <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: '#F7B7C4' }]}>ADOPCIÓN</Text>
                    <Text style={styles.cardText}> Adopta y cambia una vida: información esencial</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#F7B7C4' }]}>
                        <MaterialCommunityIcons name="heart-outline" size={20} color="#fff" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Conocer más</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                
                <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: '#C9E4A6' }]}>DONACIONES</Text>
                    <Text style={styles.cardText}> Haz una diferencia: Apoya a las mascotas sin hogar</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#C9E4A6' }]}>
                        <MaterialCommunityIcons name="gift-outline" size={20} color="#fff" style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Deseo apoyar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3C9', 
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60, 
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#7FB4E0', 
        marginBottom: 25,
    },
    card: {
        backgroundColor: '#fff', 
        borderRadius: 15,
        marginBottom: 25,
        overflow: 'hidden', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 160,        
        resizeMode: 'contain', 
        backgroundColor: '#fff', 
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 15,
        color: '#555',
        marginBottom: 15,
        lineHeight: 20,
    },
    button: {
        borderRadius: 10,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start', 
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
