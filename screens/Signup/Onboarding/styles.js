import { StyleSheet } from 'react-native';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    fridayCover: {
        bottom: hp(30),
    },
    almostFridayText: {
        fontFamily: "Lobster",
        color: "#8192DC",
        fontSize: wp(15),
    },
    adjustBtn: {
        top: hp(30)
    }
});