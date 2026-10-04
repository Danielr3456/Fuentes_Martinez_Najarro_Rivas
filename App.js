import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // <-- Nuevo import
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons'; // <-- Para los iconos de las pestañas

import { UserProvider, UserContext } from './frontend/src/context/UserContext';
import LoginScreen from './frontend/src/screens/LoginScreen';
import RegisterScreen from './frontend/src/screens/RegisterScreen';
import HomeScreen from './frontend/src/screens/HomeScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import ProductListScreen from './frontend/src/screens/ProductListScreen';
import ProductFormScreen from './frontend/src/screens/ProductFormScreen';
import SettingsScreen from './frontend/src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // <-- Creamos el Tab Navigator

// --- NUEVO: NAVEGACIÓN ANIDADA (TABS) ---
// Este Tab Navigator contendrá las pantallas principales a las que accedes con botones abajo
function MainTabs() {
    const { colors } = useContext(UserContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: '#FFFFFF',
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'HomeTab') iconName = 'home';
                    else if (route.name === 'ProfileTab') iconName = 'person';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            {/* Pantalla Home con el nombre de ruta 'HomeTab' */}
            <Tab.Screen 
                name="HomeTab" 
                component={HomeScreen} 
                options={{ title: 'Inicio' }} 
            />
            {/* Pantalla Perfil en otra pestaña */}
            <Tab.Screen 
                name="ProfileTab" 
                component={ProfileScreen} 
                options={{ title: 'Mi Perfil' }} 
            />
        </Tab.Navigator>
    );
}

// --- STACK PRINCIPAL ---
const Routes = () => {
    const { user, loading, colors } = useContext(UserContext);

    if (loading) return null;

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
                    // PANTALLAS PARA USUARIOS LOGUEADOS
                    <>
                        {/* 1. NAVEGACIÓN ANIDADA: Insertamos los Tabs dentro del Stack */}
                        <Stack.Screen 
                            name='Main' 
                            component={MainTabs} 
                            options={{ headerShown: false }} // Ocultamos el header del Stack porque el Tab ya tiene el suyo
                        />
                        {/* Las demás pantallas se abren "encima" de las pestañas (Stack normal) */}
                        <Stack.Screen name='ProductList' component={ProductListScreen} options={{ title: 'Catálogo' }} />
                        <Stack.Screen name='ProductForm' component={ProductFormScreen} options={{ title: 'Prenda' }}/>
                        <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Mi Perfil' }} />
                        <Stack.Screen name='Settings' component={SettingsScreen} options={{ title: 'Configuración' }} />

                    </>
                ) : (
                    // PANTALLAS DE AUTENTICACIÓN
                    <>
                        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
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