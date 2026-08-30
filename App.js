import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './frontend/src/context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './frontend/src/screens/LoginScreen';
import HomeScreen from './frontend/src/screens/HomeScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import CatsScreen from './frontend/src/screens/CatsScreen';
import SettingsScreen from './frontend/src/screens/SettingsScreen';
import AdoptionFormScreen from './frontend/src/screens/AdoptionFormScreen';
import InformationScreen from './frontend/src/screens/InformationScreen';
const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen name='Login' component={LoginScreen}/>
                    <Stack.Screen name='Home' component={HomeScreen}/>
                    <Stack.Screen name='Profile' component={ProfileScreen}/>
                    <Stack.Screen name='Cats' component={CatsScreen}/>
                    <Stack.Screen name='Settings' component={SettingsScreen}/>
                    <Stack.Screen name='AdoptionForm' component={AdoptionFormScreen}/>
                    <Stack.Screen name='Information' component={InformationScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
        
};

export default App;