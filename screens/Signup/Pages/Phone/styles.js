import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    relocatePhone: {
        flex: 1,
        marginBottom: hp(60),
        alignItems: "center",
        alignSelf: "center"
    },
    americanFlag: {
        fontSize: hp(4),
        textDecorationLine: "underline",
        textDecorationColor: "#BABABA"
    },
    plusOne: {
        fontSize: wp(8),
        fontFamily: "Roboto-Medium",
        marginLeft: wp(2),
        color: "#fff",
    },
    alignPhone: {
        alignSelf: "center",
    },
    phoneInput: {
        fontSize: wp(10),
        fontFamily: "Roboto-Medium",
        color: "#fff",
        width: wp(70),
        marginLeft: wp(2),
    },
    row: {
        marginTop: hp(3), 
        width: wp(85),
        alignItems: "center",
    },
    moveBlushButton: {
        marginTop: hp(15)
    },   
    textInputCover: {
        width: wp(90),
        height: hp(7),
        backgroundColor: "#000",
        opacity: 0.2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: hp(1),
        position: "absolute",
        top: hp(6.25),
        alignSelf: "center"
    }
});