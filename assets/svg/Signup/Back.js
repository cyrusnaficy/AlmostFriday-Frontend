import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"

export default function Back(props) {
  return (
    <Svg
      width={hp(4)}
      height={hp(4)}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M48.925 28.325h-30.54l9.348-11.227a2.578 2.578 0 10-3.966-3.296l-12.875 15.45a3.075 3.075 0 00-.231.386c0 .129 0 .206-.18.335-.117.295-.179.61-.181.927.002.318.063.632.18.927 0 .129 0 .206.18.335.068.134.146.263.232.386l12.875 15.45a2.574 2.574 0 001.983.927 2.575 2.575 0 001.983-4.223l-9.348-11.227h30.54a2.575 2.575 0 000-5.15z"
        fill="#8192DC"
      />
    </Svg>
  )
}