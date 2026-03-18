import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Pressable, Spinner, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [emailOrPassErr, setEmailOrPassErr] = React.useState(false);
  const [buffer, setBuffer] = React.useState(false);
  const [loginBuffer, setLoginBuffer] = React.useState(false);
  const [number, setNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log('Clicked Login');
    if (number === '' || password === '') {
      setEmailOrPassErr(true);
    } else {
      try {
        setLoginBuffer(true);

        const storedUser = await AsyncStorage.getItem('user');

        if (!storedUser) {
          setEmailOrPassErr(true);
          setLoginBuffer(false);
          return;
        }

        const userData = JSON.parse(storedUser);

        if (
          (userData.email === number.trim() ||
            userData.number === number.trim()) &&
          userData.password === password.trim()
        ) {
          setEmailOrPassErr(false);

          navigation.navigate('Home');
        } else {
          setEmailOrPassErr(true);
        }

        setLoginBuffer(false);
      } catch (e) {
        console.log('Login error:', e);
        setLoginBuffer(false);
      }
    }
  };

  const handleClick = () => {
    setBuffer(true);
    setTimeout(() => {
      navigation.navigate('SignUp');
      setBuffer(false);
    }, 1000);
  };

  return (
    <LinearGradient
      colors={['black', '#36454F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, padding: rw(3) }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box
          flex={1}
          mt={rh(5)}
          py={rh(4)}
          justifyContent="center"
          alignItems="center"
        >
          <Text color={'white'} fontWeight={'bold'} fontSize={rf(3)}>
            UNIVERSITY WORLD
          </Text>
        </Box>

        {emailOrPassErr && (
          <Box flex={1} justifyContent="flex-start" alignItems="center">
            <Text color={'red.600'} fontWeight={'bold'} fontSize={rf(1.8)}>
              Email or Password are incorrect!
            </Text>
          </Box>
        )}

        <Box w={'100%'} p={rw(1)} mt={rh(1.5)} position="relative">
          <TextInput
            keyboardType="email-address"
            value={number}
            onChangeText={setNumber}
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
            placeholder={'Enter email or number'}
          />

          <Box mt={rh(2)}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor={'gray'}
              style={{
                borderWidth: 1,
                borderRadius: rw(2),
                paddingVertical: rh(1.6),
                paddingHorizontal: rw(3),
                borderColor: '#96DED1',
                color: 'white',
                fontSize: rf(2),
              }}
              placeholder={'Password'}
            />
            <Box position={'absolute'} right={rw(4)} top={rh(2)}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={rf(3)}
                  color="gray"
                />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>

        <Box w={'100%'} mt={rh(2)}>
          <Button
            onPress={handleLogin}
            rounded={'full'}
            bg={'blue.500'}
            py={rh(1.6)}
          >
            {loginBuffer ? (
              <Spinner color={'blue.300'} size={'sm'} />
            ) : (
              <Text fontSize={rf(2)} color="white">
                Log in
              </Text>
            )}
          </Button>
        </Box>

        <Box width={'100%'} alignItems={'center'} mt={rh(2)}>
          <Text color={'white'} fontSize={rf(1.8)}>
            Forgot password?
          </Text>
        </Box>

        <Box width={'100%'} py={rh(6)}>
          <Pressable
            onPress={handleClick}
            p={rw(3)}
            rounded={'full'}
            alignItems={'center'}
            justifyContent={'center'}
            borderColor={'blue.400'}
            borderWidth={2}
          >
            {buffer ? (
              <Spinner color={'blue.400'} size={'sm'} />
            ) : (
              <Text color="white" fontSize={rf(2)}>
                Create new account
              </Text>
            )}
          </Pressable>
        </Box>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;
