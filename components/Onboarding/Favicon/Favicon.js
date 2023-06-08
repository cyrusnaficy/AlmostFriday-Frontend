import { TouchableOpacity } from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as Haptics from "expo-haptics";

import Back from "../../../assets/svg/Signup/Back";

import { styles } from "./styles";

export default function Favicon(props) {

    function onPress() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        switch (props.title) {
            case "Your Birthday":
                props.navigation.navigate("onboarding")
                break;
            case "Phone Number":
                props.navigation.navigate("date")
                break;
        }
    }

	return (
		<TouchableOpacity style={styles.logoPos} onPress={onPress}>
			<Back width={wp(15)} height={hp(15)} />
		</TouchableOpacity>
	);
}
