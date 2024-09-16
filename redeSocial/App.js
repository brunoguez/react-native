import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { PaperProvider } from 'react-native-paper';
import Navigation from './components/Navigation';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
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
        <Navigation />
    </PaperProvider>
  );
}


// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView, Text } from 'react-native';
// import { PaperProvider } from 'react-native-paper';
// import { styles } from './src/assets/styles';

// export default function App() {

//   return (
//     <PaperProvider>
//       <SafeAreaView style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <StatusBar style="auto" />
//       </SafeAreaView>
//     </PaperProvider>
//   );
// }

