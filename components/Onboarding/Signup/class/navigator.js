import * as Haptics from "expo-haptics";
import { AuthContext } from "../../../../context/AuthContext";
import { post } from "../../../../api/post";
import { createItem } from "../../../../helpers/storage/items";
import { sendMessage } from "../../../../helpers/sendMessage";

export class Navigator {

    constructor(navigation, title, isBlurred, textValue, setButtonText) {
        this.navigation = navigation;
        this.title = title;
        this.isBlurred = isBlurred;
        this.textValue = textValue
        this.setButtonText = setButtonText;
    }

    async nextPage() {
        switch (this.title) {
            case "Your Birthday":
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                if (!this.isBlurred) {
                    AuthContext.birthday = this.textValue;
                    this.navigation.navigate("phone");
                }
                break;
            
            case "Your Name":
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                if (!this.isBlurred) {

                    this.setButtonText(true);

                    const authRes = await post({
                        path: "/auth/signup",
                        headers: {
                            "Authorization": AuthContext.phoneJWT,
                        },
                        body: {
                            name: this.textValue,
                            phoneNumber: AuthContext.phoneNumber,
                            school: AuthContext.school,
                            date: AuthContext.birthday,
                            location: AuthContext.location,
                            notificationToken: AuthContext.notificationToken,
                        }
                    })

                    this.setButtonText(false);

                    console.log(authRes)

                    if (authRes.success) {

                        await createItem("userID", authRes.data.data.userID);
                        await createItem("sessionID", authRes.data.data.jwtToken);
                        this.navigation.navigate("home");

                    } else {

                        sendMessage("There was an error completing your account, please try again later 😬");

                    }
                }
                break;
            case "Verification Code":

                if(this.textValue.length == 6) {
                    this.setButtonText(true);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                    console.log(AuthContext.phoneNumber, this.textValue)
                    
                    const authRes = await post({
                        path: `/auth/login?phoneNumber=${AuthContext.phoneNumber}&code=${this.textValue}`,
                        headers: {},
                        body: {}
                    })

                    console.log(authRes)

                    this.setButtonText(false);

                    if (authRes.data.loggedIn) {

                        await createItem("userID", authRes.data.data.userID);
                        await createItem("sessionID", authRes.data.data.jwtToken);
                        this.navigation.navigate("home");

                    } else if (authRes.data.message == "Invalid code!") {

                        sendMessage("Please enter a valid code 🔒");

                    } else if(authRes.data.status== 200) {

                        AuthContext.phoneJWT = authRes.data.data;
                        this.navigation.navigate("permissions");
                        
                    } else {
                        sendMessage("There was an error logging in, please try again later 😬");
                    }
                    
                } else {
                    sendMessage("Please enter a valid code 🔒");
                }
                break;
        }
    }

}