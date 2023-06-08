import { TouchableOpacity } from "react-native";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as Haptics from "expo-haptics";

import Info from "../../../assets/svg/Signup/Info";

import { styles } from "./styles";
import { sendMessage } from "../../../helpers/sendMessage";

export default function Favicon(props) {

    function onPress() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        switch (props.title) {
            case "Your Birthday":
                sendMessage("Your birthday is used to verify you are old enough to use Almost Friday. It is not shared with anyone.");
        }
    }

	return (
		<TouchableOpacity style={styles.logoPos} onPress={onPress}>
			<Info width={wp(15)} height={hp(15)} />
		</TouchableOpacity>
	);
}
