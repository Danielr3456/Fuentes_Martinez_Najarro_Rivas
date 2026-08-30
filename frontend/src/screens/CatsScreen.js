import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CATS_DATA = [
    {
        id: '1',
        name: 'Milo',
        breed: 'Común Europeo',
        age: '4 meses',
        gender: 'Macho',
        status: 'Vacunado y Desparasitado',
        description: 'Juguetón, curioso y le encanta dormir en cajas.',
        image: require('../../../assets/Gato1.jpg'),
    },
    {
        id: '2',
        name: 'Luna',
        breed: 'Siamés Mix',
        age: '1 año',
        gender: 'Hembra',
        status: 'Esterilizada',
        description: 'Muy cariñosa, tranquila y ronronea mucho.',
        image: require('../../../assets/Gato2.jpg'),
    },
    {
        id: '3',
        name: 'Simba',
        breed: 'Atigrado Naranja',
        age: '2 años',
        gender: 'Macho',
        status: 'Vacunado y Esterilizado',
        description: 'Sociable, comilón y convive bien con otros gatos.',
        iimage: require('../../../assets/Gato3.jpg'),
    },
    {
        id: '4',
        name: 'Bella',
        breed: 'Calicó Tricolor',
        age: '6 meses',
        gender: 'Hembra',
        status: 'Vacunada',
        description: 'Enérgica, dulce y le gusta trepar rascadores.',
        image: require('../../../assets/Gato4.jpg'),
    },
    {
        id: '5',
        name: 'Oliver',
        breed: 'Azul Ruso Mix',
        age: '3 años',
        gender: 'Macho',
        status: 'Esterilizado y Vacunado',
        description: 'Amoroso, tranquilo e ideal para departamento.',
        image: require('../../../assets/Gato5.jpg'),
    },
    {
        id: '6',
        name: 'Nube',
        breed: 'Persa Blanco Mix',
        age: '8 meses',
        gender: 'Hembra',
        status: 'Desparasitada',
        description: 'Pelaje suave, muy dócil y de mirada tierna.',
        image: require('../../../assets/Gato6.jpg'),
    }
];

const CatsScreen = () => {
    const navigation = useNavigation();

    const renderCatItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.catImage} />

            <View style={styles.infoContainer}>
                <View style={styles.nameRow}>
                    <Text style={styles.catName}>{item.name}</Text>
                    <Ionicons 
                        name={item.gender === 'Macho' ? 'male' : 'female'} 
                        size={16} 
                        color={item.gender === 'Macho' ? '#7FB4E0' : '#F7B7C4'} 
                    />
                </View>

                <Text style={styles.subText}>(Gato · {item.breed})</Text>

                <Text style={styles.highlightText}>{item.age} • {item.status}</Text>

                <Text style={styles.descriptionText} numberOfLines={2}>
                    {item.description}
                </Text>

                <TouchableOpacity 
                    style={styles.adoptButton}
                    onPress={() => navigation.navigate('Adoption', { cat: item })}
                    activeOpacity={0.7}
                >
                    <FontAwesome5 name="paw" size={12} color="#1b1b1b" style={{ marginRight: 6 }} />
                    <Text style={styles.adoptButtonText}>Adoptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.sectionHeader}>Gatitos en adopción disponibles</Text>

            <FlatList
                data={CATS_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderCatItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3C9',
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A5568',
        marginHorizontal: 16,
        marginTop: 14,
        marginBottom: 10,
    },
    listContent: {
        paddingHorizontal: 14,
        paddingBottom: 25,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 12,
        marginBottom: 14,
        alignItems: 'center',
        // Sombras
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    catImage: {
        width: 105,
        height: 115,
        borderRadius: 14,
        backgroundColor: '#F0F0F0',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 4,
    },
    catName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1b1b1b',
    },
    subText: {
        fontSize: 13,
        color: '#718096',
        marginTop: 1,
    },
    highlightText: {
        fontSize: 12,
        color: '#E07A5F',
        fontWeight: '600',
        marginTop: 3,
    },
    descriptionText: {
        fontSize: 12,
        color: '#4A5568',
        marginTop: 3,
        lineHeight: 16,
    },
    adoptButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C9E4A6',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    adoptButtonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1b1b1b',
    },
});

export default CatsScreen;