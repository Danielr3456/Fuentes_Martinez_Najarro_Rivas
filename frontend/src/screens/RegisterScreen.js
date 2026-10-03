import { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { UserContext } from '../context/UserContext';

const RegisterScreen = () => {
    const navigation = useNavigation(); 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [focused, setFocused] = useState(null); 
    const { login, colors } = useContext(UserContext);

    // LÓGICA DE REGISTRO INTEGRADA
    const handleRegister = async () => {
        if (!username || !password || !confirmPassword) {
            alert("Debe completar todos los campos");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            await AsyncStorage.setItem('user', username);
            await AsyncStorage.setItem('token', 'fake-token-12345');
            await login(username);

            navigation.replace('Main');
        } catch (error) {
            alert("Hubo un error al registrar el usuario");
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
            <Text style={[styles.title, { color: colors.accent }]}>Crear Cuenta</Text>

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

            <TextInput
                style={inputStyle('confirmPass')}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirmar contraseña"
                placeholderTextColor={colors.subtext}
                secureTextEntry
                onFocus={() => setFocused('confirmPass')}
                onBlur={() => setFocused(null)}
            />

            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.linkText, { color: colors.primary }]}>¿Ya tienes cuenta? Inicia sesión</Text>
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
        alignSelf: 'center',
    },
    linkText: {
        fontSize: 16,
        fontWeight: '500',
        
    }
});

export default RegisterScreen;
