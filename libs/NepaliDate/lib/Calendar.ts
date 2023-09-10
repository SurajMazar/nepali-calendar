import {NepaliCalendarMapping} from "@/libs/NepaliDate/constants/nepali.constant";
import NepaliDate from "@/libs/NepaliDate/lib/NepaliDate";

/**
 *
 * @param currentEngDate
 */
export const getCalendarFromDate = (currentEngDate: string | Date) => {
    const nepaliDate = new NepaliDate().engToNepaliDate(currentEngDate)
    return getCalendar(nepaliDate?.date?.year, nepaliDate?.date?.month)
}

/**
 *
 * @param year
 * @param month
 */
export const getCalendar = (year: number | undefined, month: number | undefined) => {
    const mappedYear = NepaliCalendarMapping?.find(hYear => year === hYear.year)
    return mappedYear?.months.find(hMonth => hMonth.month === month)
}
