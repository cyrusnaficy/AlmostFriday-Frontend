import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Animated, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as Haptics from "expo-haptics";

import BlushButton from "../../FridayButton/FridayButton";
import Favicon from "../Favicon/Favicon";

import { styles as globalStyles } from "../../../global/styles";
import { styles } from "./styles";
import { Navigator } from "./class/navigator";
import { Handler } from "./class/handler";
import { sendMessage } from "../../../helpers/sendMessage";
import { get } from "../../../api/get";
import { AuthContext } from "../../../context/AuthContext";

export default function Signup({
	title,
	textInputConfig,
	navigation,
	...props
}) {
	const [textValue, setTextValue] = useState("");
	const [isBlurred, setIsBlurred] = useState(true);
	const dataHandler = new Handler(textValue, changeText, setIsBlurred);
	const [buttonPos] = useState([new Animated.Value(hp(0)), new Animated.Value(hp(0))]);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [phoneCountDown, setPhoneCountDown] = useState(30);
	const [sendingCode, setSendingCode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function animateVal(pos) {
		if (pos == "down") {
			Animated.timing(buttonPos[0], {
				toValue: hp(5),
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

	function changeText(text) {

		if(textInputConfig.viewType == "animated") {
			if(text.length > 0) {
				if(!hasAnimated) {
					animateVal("down");
				}
			} else {
				if(hasAnimated) {
					animateVal("up");
				}
			}

		}

		setTextValue(text);
		
	}

	function textTrigger(text) {
		switch (title) {
			case "Your Birthday":
				dataHandler.dateHandler(text);
				break;
            case "Your Name":
                dataHandler.nameHandler(text);
				break;
			case "Verification Code":
				dataHandler.codeHandler(text);
		}
	}

	function nextPageTrigger() {
		const navigatorHandler = new Navigator(
			navigation,
			title,
			isBlurred,
			textValue,
			setIsLoading
		);
		navigatorHandler.nextPage();
	}

	useEffect(() => {

		setTimeout(() => {
			if(textInputConfig.textContentType == "oneTimeCode" && phoneCountDown > 0) {
				setPhoneCountDown(phoneCountDown - 1);
			}
		}, 1000);

	}, [phoneCountDown]);


	async function resendCode() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

		if(phoneCountDown == 0) {

			setSendingCode(true);

			const sms = await get({
				path: `/auth/sendCode?phoneNumber=${AuthContext.phoneNumber}`,
				headers: {},
			});

			if(!sms.success) {
				sendMessage("There was an error sending the code, please try again later 😬")
			}

			setSendingCode(false);
			setPhoneCountDown(30);

		} else {
			if(phoneCountDown == 1) {
				sendMessage(`Please wait ${phoneCountDown} more second before resending a code.`)
			} else {
				sendMessage(`Please wait ${phoneCountDown} seconds before resending a code.`)
			}
		}
	}

	return (
		<View style={globalStyles.container}>
			<Favicon title={title} />
			<View
				style={[
					styles.contentRepositionFlex,
					globalStyles.alignContents,
				]}
			>
				<Animated.View style={{top: buttonPos[1], alignItems: "center"}}>
					<Text
						style={[
							globalStyles.onboardingTitle,
							{ marginBottom: hp(1.5) },
						]}
					>
						{title}
					</Text>
					<TextInput
						style={globalStyles.onboardingInput}
						value={textValue}
						onChangeText={textTrigger}
						autoFocus={true}
						keyboardType={textInputConfig.keyboardType}
						placeholder={textInputConfig.placeholder}
						maxLength={textInputConfig.maxLength}
						textContentType={textInputConfig.textContentType ? textInputConfig.textContentType : null}
						autoCapitalize={textInputConfig.autoCapitalize ? textInputConfig.autoCapitalize : null}
					/>
				</Animated.View>
				<Animated.View style={{top: buttonPos[0]}}>
					<View style={[styles.formatButton, {top: textInputConfig.textContentType ? textInputConfig.textContentType == "oneTimeCode" ? -hp(3.5) : -hp(4): hp(1)}]}>
						{textInputConfig.textContentType == "oneTimeCode" ? (
							<TouchableOpacity style={styles.resendContainer} onPress={resendCode}>
								{sendingCode ? (
									<Text style={styles.resendText}>Sending Code...</Text>
								) : (
									<Text style={styles.resendText}>Resend Code</Text>
								)}
							</TouchableOpacity>
						) : null}
						<BlushButton
							title={props.buttonText ? props.buttonText: "Continue"}
							onPress={nextPageTrigger}
							text={!isLoading}
							isBlurred={isBlurred}
						/>
					</View>
				</Animated.View>
			</View>
		</View>
	);
}
