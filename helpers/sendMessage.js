import { showMessage } from "react-native-flash-message";

export async function sendMessage(message) {
    showMessage({
        message: message,
        backgroundColor: "#7051e0",
        color: "white",
    });
}