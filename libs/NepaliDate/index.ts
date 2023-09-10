import NepaliDate from "@/libs/NepaliDate/lib/NepaliDate";
import {NepaliDateInterface} from "@/libs/NepaliDate/@types";
import {getCalendar as GC, getCalendarFromDate as GCD} from "@/libs/NepaliDate/lib/Calendar";
import {engDigitToDev as EDN, nepaliDigitToEng as NDE} from "@/libs/NepaliDate/lib/formatter/DateFormatter";

/**
 * CONVERT NEPALI DATE TO ENGLISH DATE
 * @param date
 * @param format
 */
export const nepaliToEnglishDate = (date: string | NepaliDateInterface | {
    year: number
    month: number
    date: number
}, format: string | undefined = undefined) => {
    return new NepaliDate().nepToEngDate(date, format)
}

/**
 * CONVERT ENGLISH DATE TO NEPALI DATE
 * @param date
 * @param setting
 */
export const englishToNepaliDate = (date: string | Date, setting: {
    format?: string | false,
    devanagari?: boolean
} | undefined = undefined) => {
    return new NepaliDate().engToNepaliDate(date, setting)
}


/**
 * GET CALENDAR DATA FROM DATE
 */
export const getCalendarFromDate = GCD

/**
 * GET CALENDAR
 */
export const getCalendar = GC


/**
 * NEPALI TO ENG DIGIT
 */
export const englishDigitToDevanagari = EDN

/**
 * NEPALI DIGIT TO ENGLISH
 */
export const devanagariDigitToEnglish = NDE
