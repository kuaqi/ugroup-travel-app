import React, { useCallback } from "react";
import { Pressable, Image, Text, View, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigation } from "../navigation/StackNavigator";
import { Destination } from "../types";

interface Props {
  item: Destination,
  index: number,
}

const DestinationListItem = ({ item, index }: Props) => {
  const navigation = useNavigation<StackNavigation>()

  const onImagePress = useCallback((item: Destination) => {
    navigation.navigate('DestinationDetails', {
      title: item.name,
      destination: item,
    })
  }, [])

  function renderImage(imageUrl: string) {
    return (
      <ImageBackground
        source={require('../assets/No-Image-Placeholder.png')}
        style={styles.placeHolderImage}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.destinationImage}
        />
      </ImageBackground>
    );
  }

  function renderPadding(height: number) {
    return (<View style={{ height: height }} />);
  }

  return (
    <Pressable
      id={`${item.name}-${index}`}
      onPress={() => onImagePress(item)}
      style={[
        styles.itemContainer,
        index % 2 === 0 ? { marginRight: 4 } : { marginLeft: 4 },
      ]}>
      {renderImage(item.image)}
      {renderPadding(8)}
      <Text style={styles.destinationTitleText}>{item.name}</Text>
      {renderPadding(4)}
      <Text style={styles.destinationDescText}>{item.description}</Text>
      {renderPadding(48)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 0.5,
  },
  destinationImage: {
    borderRadius: 5,
    aspectRatio: 3 / 5,
  },
  placeHolderImage: {
    resizeMode: 'contain',
    backgroundColor: '#EFEFEF',
  },
  destinationTitleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  destinationDescText: {
    fontSize: 15,
  },
  destinationDateText: {
    fontSize: 14,
  },
})

export default React.memo(DestinationListItem)
