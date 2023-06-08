import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"

export default function Info(props) {
  return (
    <Svg
      width={hp(4)}
      height={hp(4)}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 3.333a16.667 16.667 0 100 33.334 16.667 16.667 0 000-33.334zm1.667 23.334a1.667 1.667 0 01-3.334 0v-8.334a1.667 1.667 0 113.334 0v8.334zM20 15a1.666 1.666 0 110-3.332A1.666 1.666 0 0120 15z"
        fill="#8192DC"
      />
    </Svg>
  )
}