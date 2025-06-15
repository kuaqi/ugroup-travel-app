import React, { useState, useCallback, useEffect } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { DestinationsService } from "../api/destinationsAPI";
import { Destination } from "../types";
import DestinationListItem from "../components/DestinationListItem";

export default function HomeScreen() {
  const keyExtractor = useCallback((item: Destination) => `${item.name.toString()}`, [])
  const [destinationsData, setDestinationsData] = useState<Destination[]>([])

  const renderItem: ListRenderItem<Destination> = useCallback(({ item, index }) => {
    return <DestinationListItem item={item} index={index} />
  }, [])

  useEffect(() => {
    async function fetchData() {
      const destinationsData = await DestinationsService.getDestinations()
      if (destinationsData) {
        setDestinationsData(destinationsData)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={destinationsData || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        initialNumToRender={8}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: 8,
  },
})
