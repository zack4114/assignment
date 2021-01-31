import { PixelRatio } from "react-native";
import { GUIDELINE_BASE_WIDTH, MONTHS, SCREEN_WIDTH } from "./constants";
const DATE_VALIDATOR_REGEX = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");
export const getDate = (date) => {
    return date.toDateString();
};

export const getYear = (date) => {
    return date.getFullYear();
};

export const getDays = (date) => {
    const lastDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const previousMonthTotalDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    const firstDayIndex = date.getDay();
    const days = [];
    for (let i = firstDayIndex; i > 0; i--) {
        days.push({
            day: previousMonthTotalDays - i + 1,
            sameMonth: false,
            isToday: false,
            date: new Date(date.getFullYear(), date.getMonth() - 1, previousMonthTotalDays - i + 1),
            disabled: true,
        });
    }
    for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
        days.push({
            day: i,
            sameMonth: true,
            isToday: i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear(),
            date: new Date(date.getFullYear(), date.getMonth(), i),
            disabled: false,
        });
    }
    for (let i = 1; i <= nextDays; i++) {
        days.push({
            day: i,
            sameMonth: false,
            isToday: false,
            date: new Date(date.getFullYear(), date.getMonth() + 1, i),
            disabled: true,
        });
    }
    return days;
};

export const getMonth = (date) => {
    return MONTHS[date.getMonth()];
};

export const isSameDate = (date1, date2) => {
    if (!!date1 && !!date2) {
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
        return !(date1 > date2 || date1 < date2);
    }
    return false;
};

export const getYearList = () => {
    const temp = [];
    for (let i = 1000; i < 3000; i++) {
        temp.push(i);
    }
    return temp;
};
export const getMonthIndexFromMonth = (month) => {
    return MONTHS.indexOf(month);
};

export const validateDate = (date) => {
    return DATE_VALIDATOR_REGEX.test(date);
};

export const getDateFromDDMMYYYYFormat = (date) => {
    const [day, month, year] = date.split("/").map((item) => Number(item));
    return new Date(year, month - 1, 1);
};

// export const scaleSize = size => size * PixelRatio.getFontScale()
export const scaleSize = (size) => (SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * size;

export function scaleFont(size) {
    if (SCREEN_WIDTH <= GUIDELINE_BASE_WIDTH) {
        return size * 1 - PixelRatio.get() / 10;
    } else {
        return size;
    }
}
