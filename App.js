import React, { useEffect } from 'react';
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import { SIGNUP_SCREENS } from "./constants/screens";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
		"Lobster": require("./assets/fonts/Lobster-Regular.otf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.otf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.otf")
	});

	Text.defaultProps = {
		allowFontScaling: false,
	};

	Notifications.setNotificationHandler({
		handleNotification: async () => ({
	    shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		}),
	});

  useEffect(() => {
    
		async function isReady() {
			if (fontsLoaded) {
				await SplashScreen.hideAsync();
			}
		}

		isReady();

	}, [fontsLoaded]);

  if(!fontsLoaded) {
    return;
  }

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
				}}
			>
				{SIGNUP_SCREENS.map((screen, index) => (
					<Stack.Screen
						name={screen.name}
						component={screen.component}
						key={index}
					/>
				))}
			</Stack.Navigator>
			<FlashMessage position="top" />
		</NavigationContainer>
	);
}
