import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212C89",
        alignItems: 'center',
        justifyContent: 'center'
    },
    alignContents: {
        alignItems: "center",
        alignSelf: "center"
    },
    centerBtnText: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    row: {
        flexDirection: "row"
    },
    onboardingTitle: {
        fontFamily: "Roboto-Medium",
        fontSize: wp(8),
        color: "#fff",
    },
    onboardingInput: {
        fontSize: wp(10),
        color: "#fff",
    }
});