import React from 'react';
import { Image, ScrollView } from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import { Box, Button, Text } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const Details = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image
        source={{ uri: item.image }}
        style={{
          width: '100%',
          height: rh(30),
        }}
      />

      <Box p={rw(4)}>
        <Text fontSize={rf(2.8)} fontWeight="bold">
          {item.name}
        </Text>

        <Text fontSize={rf(2)} color="gray.500" mt={rh(1)}>
          {item.country}
        </Text>

        <Text fontSize={rf(1.9)} mt={rh(2)}>
          {item.description}
        </Text>
        <Text fontSize={rf(2.2)} fontWeight="bold" mt={rh(3)}>
          About University
        </Text>

        <Text fontSize={rf(1.8)} mt={rh(1)}>
          This university is globally recognized for its academic excellence,
          research opportunities, and student diversity.
        </Text>
      </Box>
      <Box>
       <Button onPress={handleBack}>Back</Button>
      </Box>
    </ScrollView>
  );
};

export default Details;
