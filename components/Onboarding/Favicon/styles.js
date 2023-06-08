
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    logoPos: {
        flex: 1,
        alignSelf: "flex-start",
        marginLeft: wp(5),
        marginTop: hp(3)
    }
});