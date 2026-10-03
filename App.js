import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { UserProvider, UserContext } from './frontend/src/context/UserContext';
import LoginScreen from './frontend/src/screens/LoginScreen';
import RegisterScreen from './frontend/src/screens/RegisterScreen'; // <--- Importado correctamente como RegisterScreen
import HomeScreen from './frontend/src/screens/HomeScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import ProductListScreen from './frontend/src/screens/ProductListScreen';
import ProductFormScreen from './frontend/src/screens/ProductFormScreen';
import SettingsScreen from './frontend/src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const { user, loading, colors } = useContext(UserContext);

    if (loading) return null; // esperando a leer la sesión de AsyncStorage

    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: colors.primary },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                {user ? (
                    // PANTALLAS EXCLUSIVAS PARA USUARIOS LOGUEADOS
                    <>
                        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Moda Store' }} />
                        <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Mi Perfil' }} />
                        <Stack.Screen name='ProductList' component={ProductListScreen} options={{ title: 'Catálogo' }} />
                        <Stack.Screen name='ProductForm' component={ProductFormScreen} />
                        <Stack.Screen name='Settings' component={SettingsScreen} options={{ title: 'Configuración' }} />
                    </>
                ) : (
                    // PANTALLAS ACCESIBLES SIN INICIAR SESIÓN (Grupo de Autenticación)
                    <>
                        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                        
                        {/* Movido aquí afuera para que el Login sí pueda navegar al Registro */}
                        <Stack.Screen 
                            name="Register" 
                            component={RegisterScreen} // <--- Corregido el nombre de la variable importada arriba
                            options={{ headerShown: false }} 
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <UserProvider>
            <Routes />
        </UserProvider>
    );
};

export default App;
