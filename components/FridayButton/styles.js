import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    btnContainer: {
        width: wp(85),
        height: hp(8),
        backgroundColor: "#8192DC",
    },
    btnText: {
        fontFamily: "Inter-Medium",
        fontSize: hp(2.8)
    },
    centerBtnText: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    }
});