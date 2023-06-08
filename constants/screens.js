import Onboarding from "../screens/Signup/Onboarding/Onboarding";
import Date from "../screens/Signup/Forms/Date";
import Phone from "../screens/Signup/Pages/Phone/Phone";

export const SIGNUP_SCREENS = [
    {
        name: "onboarding",
        component: Onboarding
    },
    {
        name: "date",
        component: Date
    },
    {
        name: "phone",
        component: Phone
    }
]