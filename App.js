import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider as PaperProvider, DefaultTheme } from 'react-native-paper'; 

import Login from './components/Login';
import Signup from './components/Signup';
import Output from './components/Output';
import LoginSuccess from './components/LoginSuccess';


import {Provider} from 'react-redux';
import store from './src/redux/store';



const Stack = createNativeStackNavigator();
export default function App() {

  
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2490ef',
      secondary: '#2490ef',
    }
  };

  return (

    <Provider store={store}>

    <PaperProvider theme={theme} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Output" component={Output} />
          <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </Provider>
  );
}
