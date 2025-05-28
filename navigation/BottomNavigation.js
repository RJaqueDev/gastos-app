import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Importacion de screens
import {HomeScreen} from '../screens/HomeScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {SettingsScreen}  from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{headerShown: false}}
        />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{headerShown: false}}
        />
        <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{headerShown: false}}
        />
    </Tab.Navigator>
  );
}

export {BottomNavigation};