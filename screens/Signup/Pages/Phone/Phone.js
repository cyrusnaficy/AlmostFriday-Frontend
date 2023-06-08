import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Animated
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as Haptics from "expo-haptics";

import FridayButton from "../../../../components/FridayButton/FridayButton";
import Favicon from "../../../../components/Onboarding/Favicon/Favicon";

import { styles } from "./styles";
import { styles as globalStyles } from "../../../../global/styles";
import { sendMessage } from "../../../../helpers/sendMessage";
import { checkAreaCode } from "../../../../helpers/checkPhone";
import { get } from "../../../../api/get";
import { AuthContext } from "../../../../context/AuthContext";

export default function Phone({ navigation }) {
	const [phone, setPhone] = useState("");
	const [isBlurred, setIsBlurred] = useState(true);
	const [buttonPos] = useState([new Animated.Value(hp(0)), new Animated.Value(hp(0))]);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function nextPage() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

		if (!isBlurred) {
			const isValid = await checkAreaCode(phone);

			if (isValid) {
				setIsLoading(true);

				const sms = await get({
					path: `/auth/sendCode?phoneNumber=${phone.replace(
						/\D/g,
						""
					)}`,
					headers: {},
				});

				setIsLoading(false);

				if (sms.success) {
                    AuthContext.phoneNumber = phone.replace(/\D/g, "")
                    navigation.navigate("verification");
				} else {
					sendMessage(
						"Something went wrong, please try again later 😬"
					);
				}
			} else {
				sendMessage("Make sure you are using a valid number 🤔");
			}
		}
	}

	function animateVal(pos) {
		if (pos == "down") {
			Animated.timing(buttonPos[0], {
				toValue: hp(5.5),
				duration: 300,
				useNativeDriver: false,
			}).start();
            Animated.timing(buttonPos[1], {
				toValue: hp(2.5),
				duration: 300,
				useNativeDriver: false,
			}).start();
			setHasAnimated(true);
		} else {
            for (let i = 0; i < buttonPos.length; i++) {
                Animated.timing(buttonPos[i], {
                    toValue: hp(0),
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
			setHasAnimated(false);
		}
	}

	function handlePhone(text) {
		let realText = text;

		if (!hasAnimated && text.length >= 1) {
			animateVal("down");
		}

		if (text.length == 0 && hasAnimated) {
			animateVal("up");
		}

		if (realText.length > phone.length) {
			switch (realText.length) {
				case 1:
					realText = "(" + realText;
					break;
				case 4:
					realText += ") ";
					break;
				case 9:
					realText += "-";
					break;
			}
		}

		const digitsOnly = realText.replace(/\D/g, "");

		if (digitsOnly.length == 10) {
			const finalText = formatPhoneNumber(realText);

			setPhone(formatPhoneNumber(finalText));

			if (finalText.length == 14) {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				setIsBlurred(false);
			} else {
				!isBlurred ? setIsBlurred(true) : null;
			}
		} else {
			setPhone(realText);
			!isBlurred ? setIsBlurred(true) : null;
		}
	}

	function formatPhoneNumber(phoneNumber) {
		const digitsOnly = phoneNumber.replace(/\D/g, "");

		if (digitsOnly.length === 4) {
			return `(${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(3)}`;
		} else if (digitsOnly.length === 10) {
			return `(${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(
				3,
				6
			)}-${digitsOnly.substring(6)}`;
		} else {
			return phoneNumber;
		}
	}

	return (
		<View style={globalStyles.container}>
			<Favicon title={"Phone Number"} navigation={navigation} />
			<View style={styles.relocatePhone}>
				<Animated.View style={{ top: buttonPos[1] }}>
					<View style={styles.alignPhone}>
						<Text style={globalStyles.onboardingTitle}>
							Phone Number
						</Text>
					</View>
                    <View style={styles.textInputCover}/>
					<View style={[globalStyles.row, styles.row]}>
						<TouchableOpacity
							onPress={() => {
								Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
								sendMessage(
									"Only US is supported, more countries coming soon 😭"
								)
							}}
						>
							<Text style={styles.americanFlag}>🇺🇸</Text>
						</TouchableOpacity>
						<Text style={styles.plusOne}>+1</Text>
						<TextInput
							style={styles.phoneInput}
							autoCorrect={true}
							keyboardType="number-pad"
							textContentType="telephoneNumber"
							maxLength={14}
							onChangeText={handlePhone}
							value={phone}
                            autoFocus={true}
						/>
					</View>
                </Animated.View>
				<Animated.View style={{ top: buttonPos[0] }}>
					<View style={styles.moveBlushButton}>
						<FridayButton
							title="Continue"
							onPress={nextPage}
							text={!isLoading}
							isBlurred={isBlurred}
						/>
					</View>
				</Animated.View>
			</View>
		</View>
	);
}
