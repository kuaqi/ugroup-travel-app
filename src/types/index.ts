export type DestinationsResponse = {
  destinations: Destination[],
}

export type Destination = {
  name: string,
  location: Coordinates,
  image: string,
  description: string,
  suggestedTravelDates: [],
}

export type Coordinates = { 
  latitude: number,
  longitude: number,
}
