import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    contentRepositionFlex: {
        flex: 1,
        marginBottom: hp(55)
    },
    formatButton: {
        marginTop: hp(17.5),
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
    }
});