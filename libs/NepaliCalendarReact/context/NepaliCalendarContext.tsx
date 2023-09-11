import React, {createContext, PropsWithChildren, useState} from "react";
import {CalendarContextInterface} from "@/libs/NepaliCalendarReact/@types/context";
import {MonthCalendarHashmapInterface, NepaliDateInterface} from "@/libs/NepaliDate/@types";
import {englishToNepaliDate, getCalendar, getCalendarFromDate} from "@/libs/NepaliDate";

/**
 * NEPALI CALENDAR CONTEXT
 */
export const NepaliCalendarContext = createContext<CalendarContextInterface>({} as CalendarContextInterface)


export const NepaliCalendarContextWrapper: React.FC<PropsWithChildren> = ({children}) => {

    /**
     * COMPONENT STATE
     */
    const [selectedDate, setSelectedDate] = useState<number>()
    const [selectedYear, setSelectedYear] = useState<number>()
    const [selectedMonth, setSelectedMonth] = useState<number>()
    const [calendar, setCalendar] = useState<MonthCalendarHashmapInterface | undefined>(getCalendarFromDate(new Date()))
    const [showEvents, setShowEvents] = useState<boolean>(false)
    const [currentDate, setCurrentDate] = useState<NepaliDateInterface | null>(englishToNepaliDate(new Date())?.date)
    const [activeDate, setActiveDate] = useState<NepaliDateInterface | null>(null)

    /**
     *
     * @param date
     */
    const setCalendarData = (date: string | Date) => {
        const npDateMonth = getCalendarFromDate(date);
        const npDate = englishToNepaliDate(date)
        setSelectedYear(npDate?.date?.year)
        setSelectedMonth(npDate?.date?.month)
        setActiveDate(npDate?.date)
        setCalendar(npDateMonth)
    }

    const onYearChange = (year: number) => {
        setSelectedYear(year)
        const cal = getCalendar(year, selectedMonth)
        setCalendar(cal)
    }

    const onMonthChange = (month: number) => {
        setSelectedMonth(month)
        const cal = getCalendar(selectedYear, month)
        setCalendar(cal)
    }

    return <NepaliCalendarContext.Provider value={{
        calendar,
        selectedDate,
        selectedYear,
        selectedMonth,
        showEvents,
        setShowEvents,
        setCalendar: setCalendarData,
        setActiveDate,
        activeDate,
        currentDate,
        onYearChange,
        onMonthChange
    }}>
        {children}
    </NepaliCalendarContext.Provider>
}
