import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

// Campo de formulario reutilizable: etiqueta + caja de texto
const FormField = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => {
    const { colors } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
            <TextInput
                style={[styles.input, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text }]}
                placeholder={placeholder}
                placeholderTextColor={colors.subtext}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
    },
});

export default FormField;
