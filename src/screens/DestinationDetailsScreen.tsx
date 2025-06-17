import React from "react";
import { Image, StyleSheet, Text, View, ScrollView, ImageBackground } from "react-native";

interface Props {
  route: any,
}

export default function DestinationDetailsScreen({ route }: Props) {
  const { destination } = route.params

  function renderBanner() {
    return (
      <View>
        <ImageBackground
          source={require('../assets/No-Image-Placeholder.png')}
          style={styles.bannerImage}>
          <Image
            source={{ uri: destination.image }}
            style={styles.bannerImage}
          />
        </ImageBackground>
      </View>
    );
  }

  function renderPadding(height: number) {
    return (<View style={{ height: height }} />);
  }

  function renderContent() {
    return (
      <>
        {renderPadding(14)}
        <View style={styles.bodyContainer}>
          <Text style={styles.destinationNameText}>
            {destination.name}
          </Text>
          {renderPadding(8)}
          {destination.description && renderDescription()}
          {renderPadding(10)}
          {destination.location && renderLatitude()}
          {destination.location && renderLongitude()}
          {renderPadding(10)}
          {destination.suggestedTravelDates && renderSuggestedDates()}
        </View>
        {renderPadding(60)}
      </>
    );
  }

  function renderDescription() {
    return <Text style={styles.descriptionText}>{destination.description}</Text>
  }

  function renderLatitude() {
    return <Text>{'Latitude: ' + destination.location.latitude}</Text>
  }

  function renderLongitude() {
    return <Text>{'Longitude: ' + destination.location.longitude}</Text>
  }

  function renderSuggestedDates() {
    return (
      <>
        <Text>Start Date: {destination.suggestedTravelDates[0]}</Text>
        <Text>End Date: {destination.suggestedTravelDates[1]}</Text>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderBanner()}
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bodyContainer: {
    paddingHorizontal: 16,
  },
  bannerImage: {
    aspectRatio: 1,
    width: '100%',
  },
  destinationNameText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 18,
  },
})
