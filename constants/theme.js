import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const COLORS = {
  primary: "#2A4D50",
  secondary: "#DDF0FF",
  tertiary: "#FF7754",
  gray: "#C1C0C8",
  offwhite: "#F3F4F8",
  white: "#FFFFFF",
  black: "#000000",
  red: "#E81ED4",
  green: "#00C135",
  lightwhite: "#FAFAFC",
  blue: '#0A01A4',
  greenM: '#66DB35'
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, SIZES, SHADOWS };
