import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootContainer from './components/root/RootContainer';
import { Provider } from "react-redux"
import { store } from './redux/store';
export default function App() {
  return (
    <View style={styles.container}>
      
      <StatusBar style="light" />
     <Provider store={store}>
       <RootContainer/>
     </Provider>
        
     
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
