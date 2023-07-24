import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

type LoginProps = {
    navigation:{
        navigate: (screenName: string, params: object) => void
    }
}

const Login = (props: LoginProps) => {
    const handleNavigateHomeScreen = () =>{
        props.navigation.navigate('Home', {
            user_name: 'Dai Pham'
        });
    }

  return (
    <View>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={handleNavigateHomeScreen} style={{marginTop: 20}}>
        <Text>Navigate to Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
