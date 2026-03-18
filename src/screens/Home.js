import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import { Box, Text } from 'native-base';
import { universities } from './data';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { item })}
      activeOpacity={0.8}
    >
      <Box
        mb={rh(2)}
        borderWidth={1}
        borderRadius={rw(3)}
        overflow="hidden"
        bg="white"
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: '100%',
            height: rh(20),
          }}
        />

        <Box p={rw(3)}>
          <Text fontSize={rf(2.2)} fontWeight="bold">
            {item.name}
          </Text>

          <Text color="gray.500" fontSize={rf(1.8)} mt={rh(0.5)}>
            {item.country}
          </Text>

          <Text fontSize={rf(1.7)} mt={rh(0.8)} numberOfLines={2}>
            {item.description}
          </Text>
        </Box>
        <Box p={2}>
          <Text fontWeight={"bold"}>See more</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Box bg={"gray.600"} p={2} flex={1} px={rw(3)} mt={rh(4)}>
      <FlatList
        data={universities}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default Home;
