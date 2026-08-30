import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './frontend/src/context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './frontend/src/screens/LoginScreen';
import HomeScreen from './frontend/src/screens/HomeScreen';

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen name='Login' component={LoginScreen}/>
                    <Stack.Screen name='Home' component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
        
};

export default App;