import { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused1, setIsFocused1] = useState();
    const [isFocused2, setIsFocused2] = useState();
    const {setUser} = useContext(UserContext);
    const navigation = useNavigation();

    const handleLogin = () => {
        if(!username || !password) {
            //si falta algun campo
            alert("Completa todos los campos");
            return;
        }

        setUser({username});
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.jpg')} style={styles.logo}/>
            <Text style={styles.title}>
                Iniciar Sesión
            </Text>

            <TextInput
                style={[styles.input, {
                        borderWidth: isFocused1 ? 3 : 1
                }]}
                onChangeText={setUsername}
                value={username}
                placeholder="Nombre de usuario"
                onFocus={()=> setIsFocused1(true)}//se pone enfoque sobre la caja de texto
                onBlur={() => setIsFocused1(false)}//no se pone en enfoque al no estar en la caja de texto

            />

            <TextInput
                style={[styles.input, {
                    borderWidth: isFocused2 ? 3 : 1
                }]}
                onChangeText={setPassword}
                value={password}
                placeholder="Contraseña"
                secureTextEntry
                onFocus={()=> setIsFocused2(true)}//se pone enfoque sobre la caja de texto
                onBlur={() => setIsFocused2(false)}//no se pone en enfoque al no estar en la caja de texto
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 150,
        backgroundColor: '#fff'

    },

    title: {
        fontSize: 30,
        margin: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#A3D9C9'
    },

    input: {
    height: 50,
    borderColor: '#A3D9C9',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    fontSize: 18,
    alignSelf: 'center'
    },
    logo:{
        width: 120,
        height: 120,
        borderRadius: 160,
        alignSelf: 'center'
    },
    button: {
    width: '100%',
    backgroundColor: '#C9E4A6',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
},
buttonText: {
    color: '#1b1b1b',
    fontSize: 18,
    fontWeight: 'bold',
},
});

export default LoginScreen;