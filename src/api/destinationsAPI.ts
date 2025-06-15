import { DestinationsResponse } from "../types"

export const DestinationsService = {
  getDestinations,
}

export async function getDestinations() {
  const localhost = '10.0.2.2:8081'
  const url = `http://${localhost}/src/data/data.json`
  const controller = new AbortController()

  const config = {
    method: 'GET',
    signal: controller.signal,
  }

  try {
    const response = await fetch(url, config)
    const jsonData: DestinationsResponse = await response.json()
    return jsonData.destinations
  } catch (error) {
    console.error('getDestinations error:', error)
  }
}
