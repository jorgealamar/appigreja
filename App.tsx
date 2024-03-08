import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import 'react-native-gesture-handler';

import Routes from './src/routes';

import { styles } from './styles';

export default function App() {
  const [isAuthenticated, setIsAuthentecated] = useState(false);

  async function verifyAvaiableAuthentication(){
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication. supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
  }

  async function handleAuthentication (){
     const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
     console.log(isBiometricEnrolled);
     if (!isBiometricEnrolled){
      return Alert.alert('Logim', 'Nenhuma biometria encontrada. Por favor cadastre uma biometria');
     }

     const auth = await LocalAuthentication.authenticateAsync({
       promptMessage:'Login com Biometria',
       fallbackLabel:'Biometria não reconhecida'
     });

     setIsAuthentecated(auth.success);
  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  }, []);
  return (
    <View style={styles.container}>
    <Text>
      Usuário conectado: { isAuthenticated ? 'Sim' : 'não'}
    </Text>

    <Button 
    title='Entrar'
    onPress={handleAuthentication}
    />
      
  </View>   
  );
}
