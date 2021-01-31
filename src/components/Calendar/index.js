import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, Keyboard } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "./styles";
import { COLORS, DAYS, MONTHS, YEAR_ITEM_HEIGHT } from "./constants";
import { getDays, getMonth, getYear, isSameDate, getYearList, getMonthIndexFromMonth, validateDate, getDateFromDDMMYYYYFormat } from "./utils";
import { FlatList, TextInput } from "react-native-gesture-handler";
const initialDate = new Date();
initialDate.setDate(1);
const Calendar = ({ isVisible, selectedDate, onChangeDate = () => {}, onClose = () => {} }) => {
    const [date, setDate] = useState(!!selectedDate ? selectedDate : initialDate);
    useEffect(() => {
        if (isVisible && selectedDate) {
            const temp = new Date(selectedDate);
            temp.setDate(1)
            setDate(!!temp ? temp : initialDate);
        }
    }, [isVisible]);
    const [activeModal, setActiveModal] = useState("");
    const [searchDateInput, setSearchDateInput] = useState("");
    const [isValidSearchInput, setIsValidSearchInput] = useState(true);
    const updateYear = (year) => {
        date.setFullYear(year);
        setActiveModal("");
        setDate(date);
    };
    const updateMonth = (month) => {
        date.setMonth(getMonthIndexFromMonth(month));
        setActiveModal("");
        setDate(date);
    };
    const validateInputDate = () => {
        setIsValidSearchInput(validateDate(searchDateInput));
    };
    useEffect(() => {
        setIsValidSearchInput(true);
    }, [searchDateInput]);
    const currentNavigationYear = date.getFullYear();
    const currentNavigationMonth = MONTHS[date.getMonth()];
    const renderModalContent = () => {
        switch (activeModal) {
            case "years":
            case "months":
                return (
                    <View style={{ backgroundColor: COLORS.white, height: YEAR_ITEM_HEIGHT * 5, width: 200, borderRadius: 8 }}>
                        <FlatList
                            data={activeModal == "years" ? getYearList() : MONTHS}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (activeModal == "years") {
                                            updateYear(item);
                                        } else {
                                            updateMonth(item);
                                        }
                                    }}
                                    style={{ width: "100%", height: YEAR_ITEM_HEIGHT, justifyContent: "center", alignItems: "center" }}
                                >
                                    <Text style={[(activeModal == "years" ? currentNavigationYear : currentNavigationMonth) === item && styles.bold]}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            getItemLayout={(data, index) => ({ length: YEAR_ITEM_HEIGHT, offset: YEAR_ITEM_HEIGHT * index, index })}
                            initialScrollIndex={activeModal == "years" ? currentNavigationYear - 1000 - 2 : date.getMonth() - 1}
                            contentContainerStyle={{ padding: 10 }}
                            keyExtractor={(item) => `${item}`}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                );
            case "goToDate":
                return (
                    <View style={[{ paddingVertical: 20, backgroundColor: COLORS.white, width: 200, borderRadius: 8 }, styles.flexCenter]}>
                        <TextInput
                            placeholder={"DD/MM/YYYY"}
                            style={[styles.input, !isValidSearchInput && styles.errorInput]}
                            onChangeText={(text) => setSearchDateInput(text)}
                            value={searchDateInput}
                            onBlur={validateInputDate}
                            maxLength={10}
                        />
                        {!isValidSearchInput && <Text style={{ color: COLORS.red, fontSize: 8, marginTop: 4, width: "80%" }}>Please Enter valid date in DD/MM/YYYY format</Text>}
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => setActiveModal("")}>
                                <Text style={styles.bold}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={!validateDate(searchDateInput)}
                                onPress={() => {
                                    setDate(getDateFromDDMMYYYYFormat(searchDateInput));
                                    setActiveModal("");
                                }}
                            >
                                <Text style={styles.bold}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };
    return (
        <Modal visible={isVisible} onDismiss={onClose} onRequestClose={onClose} animationType="fade">
            <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.modalOverlay}>
                <View onStartShouldSetResponder={(event) => true} style={styles.container}>
                    <View style={[styles.header]}>
                        <TouchableOpacity
                            onPress={() => {
                                date.setMonth(date.getMonth() - 1);
                                setDate(new Date(date));
                            }}
                        >
                            <Entypo name="chevron-left" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <View style={[styles.flexCenter]}>
                            <TouchableOpacity onPress={() => setActiveModal("years")}>
                                <Text style={styles.h1}>{getYear(date)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setActiveModal("months")}>
                                <Text style={[styles.h1, { marginTop: 10 }]}>{getMonth(date)}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                date.setMonth(date.getMonth() + 1);
                                setDate(new Date(date));
                            }}
                        >
                            <Entypo name="chevron-right" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <FlatList
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        disabled={item.disabled}
                                        onPress={() => {
                                            onChangeDate(item.date);
                                            onClose();
                                        }}
                                        style={[
                                            styles.date,
                                            { opacity: item.sameMonth ? 1 : 0.5 },
                                            item.isToday ? styles.currentDateStyle : {},
                                            isSameDate(item.date, selectedDate) ? styles.selectedDateStyle : {},
                                        ]}
                                    >
                                        <Text style={[styles.p]}>{item.day}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                            bounces={false}
                            ListHeaderComponent={() => (
                                <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                    {DAYS.map((item) => (
                                        <View key={item} style={[styles.date]}>
                                            <Text style={[styles.p]}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                            extraData={[selectedDate]}
                            data={getDays(date)}
                            keyExtractor={(item, index) => `${index}${item.day}`}
                            numColumns={7}
                        ></FlatList>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => setActiveModal("goToDate")}>
                            <Text>Go To Date</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={!!activeModal} transparent animationType="fade">
                        <TouchableOpacity activeOpacity={1} onPress={() => (activeModal == "goToDate" ? Keyboard.dismiss() : setActiveModal(""))} style={styles.modalOverlay}>
                            {renderModalContent()}
                        </TouchableOpacity>
                    </Modal>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default Calendar;
