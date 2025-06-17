import React, { useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

interface Props {
  route: any,
}

export default function DestinationDetailsScreen({ route }: Props) {
  const { destination } = route.params
  const [isCalendarDestination, setCalendarDestination] = useState(false)

  function onCalendarPress() {
    setCalendarDestination(!isCalendarDestination)
    console.log('Implement the onCalendarPress function.')
  }

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
        {renderCalendarButton()}
      </View>
    );
  }

  function renderCalendarButton() {
    const calendarColor = isCalendarDestination ? '#000000' : 'lightgray'

    return (
      <View style={styles.calendarContainer}>
        <TouchableOpacity
          style={[styles.calendarButton, { backgroundColor: 'white' } ]}
          onPress={onCalendarPress}>
          <Text>
            <FontAwesome6
              name="calendar"
              size={26}
              color={calendarColor}
            />
          </Text>
        </TouchableOpacity>
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
  calendarContainer: {
    right: 0,
    bottom: 0,
    paddingBottom: 20,
    paddingRight: 20,
    position: 'absolute',
  },
  calendarButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 28,
  },
  destinationNameText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 18,
  },
})
