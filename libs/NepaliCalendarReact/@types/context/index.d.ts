import {MonthCalendarHashmapInterface, NepaliDateInterface} from "@/libs/NepaliDate/@types";

export interface CalendarContextInterface {
    selectedYear?: number
    selectedMonth?: number
    selectedDate?: number
    calendar: MonthCalendarHashmapInterface | undefined,
    setCalendar: (defaultDate: string | Date) => void
    showEvents: boolean
    setShowEvents: (value: boolean) => void
}
