import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TextInput, Keyboard } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Calendar from "./components/Calendar";
import { validateDate } from "./components/Calendar/utils";

const Application = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [inputDate, setInputDate] = useState("");
    const [weekNumber, setWeekNumber] = useState("");
    useEffect(() => {
        setWeekNumber("");
    }, [inputDate]);
    const getWeekNumber = () => {
        const [dd, mm, yyyy] = inputDate.split("/").map((item) => Number(item));
        const temp = new Date(yyyy, mm-1, dd);
        const firstDate = new Date(temp.getFullYear(), 0, 1);
        const totalDays = Math.floor((temp - firstDate) / (24 * 60 * 60 * 1000));
        const result = Math.ceil((temp.getDay() + 1 + totalDays) / 7);
        return result;
    };
    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Text> SELECTED DATE: {!!selectedDate && selectedDate.toDateString()}</Text>
                <Button title="Open Calendar" onPress={() => setIsOpenCalendar(true)}></Button>
                <Calendar selectedDate={selectedDate} isVisible={isOpenCalendar} onClose={() => setIsOpenCalendar(false)} onChangeDate={(date) => setSelectedDate(date)} />
                <TextInput style={styles.input} onChangeText={(text) => setInputDate(text)} placeholder="DD/MM/YYYY" maxLength={10} value={inputDate} />
                {!validateDate(inputDate) && <Text>Please enter valid date to get week number</Text>}
                <Button
                    disabled={!validateDate(inputDate)}
                    title="Get Week Number"
                    onPress={() => {
                        Keyboard.dismiss();
                        setWeekNumber(getWeekNumber(inputDate));
                    }}
                ></Button>
                <Text>{weekNumber}</Text>
            </View>
        </ScrollView>
    );
};

export default Application;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "gray",
        width: "80%",
        marginTop: 20,
    },
});
