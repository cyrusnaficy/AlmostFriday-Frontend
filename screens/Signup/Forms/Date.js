import Signup from "../../../components/Onboarding/Signup/Signup";

export default function Date({ navigation }) {

	return (
		<Signup
			title={"Your Birthday"}
			textInputConfig={{
				keyboardType: "number-pad",
				maxLength: 10,
				placeholder: "MM/DD/YYYY",
			}}
			navigation={navigation}
		/>
	);
}
