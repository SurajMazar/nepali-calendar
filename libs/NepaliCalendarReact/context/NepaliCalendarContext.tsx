import React, {createContext, PropsWithChildren, useState} from "react";
import {CalendarContextInterface} from "@/libs/NepaliCalendarReact/@types/context";
import {MonthCalendarHashmapInterface} from "@/libs/NepaliDate/@types";
import useComputed from "@/libs/NepaliCalendarReact/core/hooks/useComputed";
import {getCalendar, getCalendarFromDate} from "@/libs/NepaliDate";

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


    return <NepaliCalendarContext.Provider value={{
        calendar,
        selectedDate,
        selectedYear,
        selectedMonth,
        showEvents,
        setShowEvents,
        setCalendar: (date: string | Date) => {
            setCalendar(getCalendarFromDate(date))
        }
    }}>
        {children}
    </NepaliCalendarContext.Provider>
}
