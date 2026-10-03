import { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';

const LoginScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [focused, setFocused] = useState(null); // campo con foco: 'user' | 'pass'
    const { login, colors } = useContext(UserContext);

    const handleLogin = () => {
        if (!username || !password) {
            // si falta algun campo
            alert("Completa todos los campos");
            return;
        }

        // Guarda la sesión en AsyncStorage; la guarda de ruta en App.js muestra Home
        login(username);
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
});

export default LoginScreen;
