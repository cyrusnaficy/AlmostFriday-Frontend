import * as Haptics from "expo-haptics";
import { DateHandler } from "../../../../helpers/onboaringFunctions";
import { sendMessage } from "../../../../helpers/sendMessage";

export class Handler {

	constructor(textValue, setTextValue, setIsBlurred) {
		this.textValue = textValue;
		this.setTextValue = setTextValue;
		this.setIsBlurred = setIsBlurred;
	}

	async dateHandler(text) {
		if (text.length > this.textValue.length) {

			if (text.length === 2 || text.length === 5) {
				this.setTextValue(text + "/");
			} else {
				this.setTextValue(text);
			}

			if (text.length == 10) {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				const ageHandler = new DateHandler(text);

				if (await ageHandler.isValidAge()) {
					if (await ageHandler.calculateAge()) {
						this.setIsBlurred(false);
					} else {
						sendMessage(
							"You must be at least 13 years old to use this app."
						);
					}
				} else {
					sendMessage(
						"Are you sure you are entering the correct age 😜"
					);
				}
			} else {
				this.setIsBlurred(true);
			}
		} else {
			this.setTextValue(text);
		}
	}

	async nameHandler(text) {
		this.setTextValue(
			text
				.split(" ")
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(" ")
		);
		if (text.length > 0) {
			this.setIsBlurred(false);
		} else {
			this.setIsBlurred(true);
		}
	}

	async codeHandler(text) {
		this.setTextValue(text);

		if (text.length == 6) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			this.setIsBlurred(false);
		} else {
			this.setIsBlurred(true);
		}
	}

}
