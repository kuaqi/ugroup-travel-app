import { Alert } from "react-native";
import RNCalendarEvents from "react-native-calendar-events";
import { Destination } from "../types";

export function useCalendarEvents() {
  async function requestCalendarPermissions() {
    try {
      const permission = await RNCalendarEvents.requestPermissions()
      switch (permission) {
        case 'authorized':
          console.log('Calendar permission granted.')
          return true
        case 'denied':
          console.log('Calendar permission denied.')
          return false
        case 'undetermined':
          console.log('Calendar permission undetermined.')
          return false
        default:
          return false
      }
    } catch (error) {
      console.error('requestCalendarPermissions error:', error)
      return false
    }
  }

  async function createEvent(destination: Destination) {
    const { name, location, suggestedTravelDates } = destination
    const eventLocation = `${location.latitude}, ${location.longitude}`
    const startDate = new Date(suggestedTravelDates[0])
    const endDate = new Date(suggestedTravelDates[1])
    const alarmDate = new Date(startDate);
    alarmDate.setDate(startDate.getDate() - 1);
    
    try {
      const eventId = await RNCalendarEvents.saveEvent(name, {
        // calendarId: '',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        location: eventLocation,
        notes: '',
        alarms: [{ date: alarmDate.toISOString() }],
      })
      Alert.alert('New Destination!', `${name} added as a calendar event.`)
      console.log('New calendar eventId:', eventId)
      console.log('startDate:', startDate.toISOString())
      console.log('alarmDate:', alarmDate.toISOString())
    } catch (error) {
      console.error('createEvent error:', error);
    }
  }

  async function deleteEvent(eventId: string) {
    try {
      const isDeleted = await RNCalendarEvents.removeEvent(eventId)
      if (isDeleted) {
        console.log('Event deleted successfully.')
      }
    } catch (error) {
      console.error('deleteEvent error:', error);
    }
  }

  return {
    requestCalendarPermissions,
    createEvent,
    deleteEvent,
  }
}
