import React, { useState, useEffect } from "react";
import { Pressable, Text, View, Animated } from "react-native";
import { DotIndicator } from "react-native-indicators";
import * as Haptics from "expo-haptics";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { styles } from "./styles";

export default function FridayButton({ title, onPress, text, ...props }) {
	const [scaleValue] = useState(new Animated.Value(1));
	const [userDefaultScale] = useState(new Animated.Value(1));

	useEffect(() => {
		if (props.bounce) {

			const animate = (toValue) => {
				Animated.timing(userDefaultScale, {
					toValue,
					duration: 750,
					useNativeDriver: true,
				}).start(() => {
					setTimeout(() => {
                        animate(toValue === 0.95 ? 1 : 0.95);
					}, 50);
				});
			};
			animate(0.95);
		}
	}, []);

	function scaleUp() {
		Animated.spring(scaleValue, {
			toValue: 0.8,
			useNativeDriver: false,
		}).start();
	}

	function scaleDown() {
		Animated.spring(scaleValue, {
			toValue: 1,
			useNativeDriver: false,
		}).start();
	}

	return (
		<Animated.View
			style={{
				transform: [{ scale: userDefaultScale }],
			}}
		>
			<Animated.View
				style={{
					transform: [{ scale: scaleValue }],
				}}
			>
				<Pressable
					style={[
						styles.btnContainer,
						{
							opacity: props.isBlurred ? 0.7 : 1,
							borderRadius: props.boxButton ? hp(0.5) : hp(5),
						},
					]}
					onPress={() => {
						props.isBlurred
							? Haptics.notificationAsync(
									Haptics.NotificationFeedbackType.Error
							  )
							: Haptics.impactAsync(
									Haptics.ImpactFeedbackStyle.Medium
							  );
						onPress();
					}}
					onPressIn={scaleUp}
					onPressOut={scaleDown}
				>
					<View style={styles.centerBtnText}>
						{text ? (
							<Text style={styles.btnText}>{title}</Text>
						) : (
							<DotIndicator size={hp(1)} color="#000" />
						)}
					</View>
				</Pressable>
			</Animated.View>
		</Animated.View>
	);
}
