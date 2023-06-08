import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import LottieView from "lottie-react-native";

import PhotoSnap from "../../../assets/lottie/photoSnap.json"
import FridayButton from "../../../components/FridayButton/FridayButton";
import * as Haptics from "expo-haptics";

import { styles } from "./styles";
import { styles as globalStyles } from "../../../global/styles"

export default function Onboarding({ navigation }) {
    const [lottieSpeed, setLottieSpeed] = useState(1);

    useEffect(() => {

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        async function executeHapticFeedback() {
            await delay(1350);
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            for(let i = 0; i < 4; i++) {
                await delay(330);
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }

            await delay(1100);

            setLottieSpeed(0);
        }

        executeHapticFeedback();

    }, []);

    return (
        <View style={globalStyles.container}>
            <View style={styles.fridayCover}>
                <Text style={styles.almostFridayText}>Almost Friday</Text>
            </View>
            <LottieView
                source={PhotoSnap}
                autoPlay
                loop
                style={styles.fire}
                speed={lottieSpeed}
            />
            <View style={styles.adjustBtn}>
                <FridayButton
                    title="Get Started!"
                    text={true}
                    boxButton={true}
                    bounce={true}
                />
            </View>
        </View>
    )
}