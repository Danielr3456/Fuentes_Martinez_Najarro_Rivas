import { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { UserContext } from '../context/UserContext';

const LoginScreen = () => {
    const navigation = useNavigation(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [focused, setFocused] = useState(null); 
    const { login, colors } = useContext(UserContext);


    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            //if (token) {
                // Si ya existe sesión previa, salta automáticamente al Main
                //navigation.replace('Main');
            //}
        };
        checkToken();
    }, []);

   
    const handleLogin = async () => {
        if (!username || !password) {
            alert("Debe ingresar usuario y contraseña");
            return;
        }

        try {
            await AsyncStorage.setItem('user', username);
            await AsyncStorage.setItem('token', 'fake-token-12345');
            await login(username); 
            
            // Redirección directa y segura a la ruta principal
            //navigation.replace('Main');
        } catch (error) {
            alert("Hubo un error al procesar el inicio de sesión");
        }
    };

    const inputStyle = (name) => [
        styles.input,
        {
            backgroundColor: colors.input,
            color: colors.text,
            borderColor: focused === name ? colors.accent : colors.border,
            borderWidth: focused === name ? 2 : 1,
        },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
                <Ionicons name="shirt" size={56} color="#FFFFFF" />
            </View>
            <Text style={[styles.brand, { color: colors.text }]}>Moda Store</Text>
            <Text style={[styles.title, { color: colors.accent }]}>Iniciar Sesión</Text>

            <TextInput
                style={inputStyle('user')}
                onChangeText={setUsername}
                value={username}
                placeholder="Nombre de usuario"
                placeholderTextColor={colors.subtext}
                autoCapitalize="none"
                onFocus={() => setFocused('user')}
                onBlur={() => setFocused(null)}
            />

            <TextInput
                style={inputStyle('pass')}
                onChangeText={setPassword}
                value={password}
                placeholder="Contraseña"
                placeholderTextColor={colors.subtext}
                secureTextEntry
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused(null)}
            />

            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}> 
                <Text style={[styles.linkText, { color: colors.primary }]}>¿No tienes cuenta? Regístrate aquí</Text> 
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    logoCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    brand: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        height: 50,
        borderRadius: 12,
        marginVertical: 8,
        paddingHorizontal: 14,
        fontSize: 17,
        width: '100%',
    },
    button: {
        width: '100%',
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 20,
        alignSelf: 'center'
    },
    linkText: {
        fontSize: 16,
        
        fontWeight: '500'
    }
});

export default LoginScreen;
