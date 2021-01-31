import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, DEFAULT_THEME, COLORS, SCREEN_HEIGHT } from "./constants";
import { scaleFont, scaleSize } from "./utils";
export default StyleSheet.create({
    header: {
        width: "auto",
        height: 100,
        backgroundColor: DEFAULT_THEME.primaryColor,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    flexCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 10,
    },
    container: {
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: DEFAULT_THEME.secondaryColor,
        backgroundColor: COLORS.white,
        width: SCREEN_WIDTH * 0.9,
    },
    body: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        minHeight: scaleSize(240),
    },
    footer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
    },
    h1: {
        color: COLORS.white,
        fontSize: scaleFont(20),
        fontWeight: "600",
        letterSpacing: 1,
    },
    h2: {
        color: COLORS.white,
        fontSize: scaleFont(16),
        letterSpacing: 1,
    },
    mt10: {
        marginTop: 10,
    },
    date: {
        justifyContent: "center",
        alignItems: "center",
        width: "14%",
        padding: 8,
        borderRadius: 1000,
    },
    p: {
        color: COLORS.black,
        fontSize: scaleFont(12),
    },
    selectedDateStyle: {
        backgroundColor: DEFAULT_THEME.secondaryColor,
    },
    currentDateStyle: {
        borderWidth: 1,
        borderColor: DEFAULT_THEME.primaryColor,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: `${DEFAULT_THEME.primaryColor}5`,
        justifyContent: "center",
        alignItems: "center",
    },
    bold: {
        fontWeight: "bold",
    },
    input: {
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: DEFAULT_THEME.secondaryColor,
        width: "80%",
        color: DEFAULT_THEME.red,
    },
    errorInput: {
        borderColor: `${COLORS.red}5`,
    },
});
