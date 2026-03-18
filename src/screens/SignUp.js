import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import React, { useState } from 'react';
import { Box, Button, Input, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { TextInput, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [buffer, setBuffer] = React.useState(false);
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  const handleSubmit = async () => {
    if (username == '' || email === '' || number === '' || password === '') {
      setError(true);
    } else {
      const userData = {
        username,
        email,
        number,
        password
      }
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      navigation.navigate("Login");
    }
  };
  return (
    <LinearGradient
      colors={['black', '#36454F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, padding: 10 }}
    >
      <Box mt={5}>
        <Box alignItems={'center'} justifyContent={'center'} mt={rh(9)}>
          <Text color={'white'} fontSize={20}>
            SIGNUP HERE
          </Text>
        </Box>
        {error && (
          <Text color="red.500" textAlign="center" mt={rh(1)}>
            Something went's wrong
          </Text>
        )}
        <Box mt={rh(2)}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter Username"
            placeholderTextColor={'gray'}
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: rw(2),
              paddingVertical: rh(1.6),
              paddingHorizontal: rw(3),
              borderColor: '#96DED1',
              color: 'white',
              fontSize: rf(2),
            }}
          />
        </Box>
        <Box mt={rh(2)}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            keyboardType="email-address"
            placeholderTextColor={'gray'}
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: rw(2),
              paddingVertical: rh(1.6),
              paddingHorizontal: rw(3),
              borderColor: '#96DED1',
              color: 'white',
              fontSize: rf(2),
            }}
          />
        </Box>
        <Box mt={rh(2)}>
          <TextInput
            value={number}
            onChangeText={setNumber}
            placeholder="Enter Phone Number"
            keyboardType="number-pad"
            placeholderTextColor={'gray'}
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: rw(2),
              paddingVertical: rh(1.6),
              paddingHorizontal: rw(3),
              borderColor: '#96DED1',
              color: 'white',
              fontSize: rf(2),
            }}
          />
        </Box>
        <Box mt={rh(2)}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry
            placeholderTextColor={'gray'}
            style={{
              width: '100%',
              borderWidth: 1,
              borderRadius: rw(2),
              paddingVertical: rh(1.6),
              paddingHorizontal: rw(3),
              borderColor: '#96DED1',
              color: 'white',
              fontSize: rf(2),
            }}
          />
        </Box>
        <Box py={rh(2)}>
          <Button rounded={'full'} onPress={handleSubmit}>
            SUBMIT
          </Button>
        </Box>
        <Box alignItems={'center'} justifyContent={'center'} py={rh(5)}>
          <Pressable onPress={navigateToLogin}>
            <Text color={'white'}>Already have an account?</Text>
          </Pressable>
        </Box>
      </Box>
    </LinearGradient>
  );
};

export default SignUp;
