import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'
import Navigation from './components/Navigation';
import Login from './components/Login';
import Perfil from './components/Perfil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { AppProvider } from './components/AppProvider';
import { Create, Existe } from './src/file';


SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const existe = await Existe()
        if (!existe)
          await Create()
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider>
      <AppProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="#b2ddee"
            />
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                <Stack.Screen options={{ headerShown: false }} name="Principal" component={Navigation} />
                <Stack.Screen options={{ headerShown: false }} name="Perfil" component={Perfil} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </AppProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2ddee',
  },
});