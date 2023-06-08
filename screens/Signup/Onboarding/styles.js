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
        fontFamily: "Inter-Medium",
        color: "#EFCE57",
        fontSize: wp(13),
    },
    adjustBtn: {
        top: hp(30)
    }
});