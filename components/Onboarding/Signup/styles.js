import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    contentRepositionFlex: {
        flex: 1,
        marginBottom: hp(55)
    },
    formatButton: {
        marginTop: hp(17),
        alignItems: "center",
    },
    resendContainer: {
        marginBottom: hp(2),
    },
    resendText: {
        fontFamily: "Roboto-Medium",
        fontSize: hp(2),
        color: "#8192DC",
        textDecorationLine: "underline",
    },
    textInputCover: {
        width: wp(75),
        height: hp(7),
        backgroundColor: "#000",
        opacity: 0.2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: hp(1),
        position: "absolute",
        top: hp(5.75)
    },
    textInputMargin: {
        marginTop: hp(1)
    }
});