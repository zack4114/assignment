import { Dimensions } from "react-native";
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const YEAR_ITEM_HEIGHT = 40;
export const GUIDELINE_BASE_WIDTH = 375;
export const COLORS = {
    black: "#000",
    gray: "#D2D2D2",
    white: "#FFF",
    red: "#F00",
};
export const DEFAULT_THEME = {
    primaryColor: COLORS.black,
    secondaryColor: COLORS.gray,
};
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
