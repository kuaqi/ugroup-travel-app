import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Destination } from "../types";
import HomeScreen from "../screens/HomeScreen";
import DestinationDetailsScreen from "../screens/DestinationDetailsScreen";

export type StackNavigation = NativeStackNavigationProp<RootStackParamList>

export type RootStackParamList = {
  Main: undefined,
  DestinationDetails: { title: string, destination: Destination } | undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DestinationDetails"
        component={DestinationDetailsScreen}
        options={({ route }) => ({
          headerShown: true,
          gestureEnabled: true,
          title: "",
          destination: route.params?.destination,
        })}
      />
    </Stack.Navigator>
  );
}
