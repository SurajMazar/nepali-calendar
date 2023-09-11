import {MonthCalendarHashmapInterface, NepaliDateInterface} from "@/libs/NepaliDate/@types";

export type OnChangeDateInterface = (date: {
    nepaliDate: NepaliDateInterface,
    englishDate: Date
}) => void


export interface CalendarContextInterface {
    selectedYear?: number
    selectedMonth?: number
    selectedDate?: number
    calendar: MonthCalendarHashmapInterface | undefined,
    setCalendar: (defaultDate: string | Date) => void
    showEvents: boolean
    setShowEvents: (value: boolean) => void
    currentDate: NepaliDateInterface | null
    activeDate: NepaliDateInterface | null
    setActiveDate: (NepaliDateInterface) => void
    onYearChange:(year:number)=>voild
    onMonthChange:(month:number)=>voild
}
