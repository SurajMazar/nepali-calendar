import {NepaliDateInterface} from "@/libs/NepaliDate/@types";
import {EngNepDigitMap} from "@/libs/NepaliDate/constants/nepali.constant";

/**
 *
 * @param NepaliDate
 * @param format
 * @param devanagari
 * @constructor
 */
export const FormatNepaliDate = (NepaliDate: NepaliDateInterface, format: string, devanagari: boolean = false) => {
    const date = sanitizeDate(NepaliDate.date)
    const dateNep = engDigitToDev(date)

    const monthDigit = sanitizeDate(NepaliDate.month)
    const monthDigitNep = engDigitToDev(monthDigit)

    const yearDigit = NepaliDate?.year.toString()
    const yearDigitNep = engDigitToDev(yearDigit)

    if (devanagari) {
        return format.replace(new RegExp(`YYYY`, 'g'), yearDigitNep)
            .replace(new RegExp(`MMMM`, 'g'), NepaliDate?.month_np)
            .replace(new RegExp(`MM`, 'g'), monthDigitNep)
            .replace(new RegExp(`DD`, 'g'), dateNep)
            .replace(new RegExp(`dddd`, 'g'), NepaliDate?.day_np)
    }
    return format.replace(new RegExp(`YYYY`, 'g'), yearDigit)
        .replace(new RegExp(`MMMM`, 'g'), NepaliDate?.month_en)
        .replace(new RegExp(`MM`, 'g'), monthDigit)
        .replace(new RegExp(`DD`, 'g'), date)
        .replace(new RegExp(`dddd`, 'g'), NepaliDate?.day_en)
}

/**
 * SANITIZE DATE
 * @param day
 */
const sanitizeDate = (day: number) => {
    if (day < 10) {
        return '0' + day.toString()
    }
    return day.toString()
}


/**
 * CONVERT ENG DIGIT TO NEP
 * @param eng
 */
export const engDigitToDev = (eng: string) => {
    Object.entries(EngNepDigitMap).forEach(value => {
        eng = eng.replace(new RegExp(value[0], 'g'), value[1])
    })
    return eng
}

/**
 * CONVERT NEP DIGIT TO NEP
 * @param eng
 */
export const nepaliDigitToEng = (eng: string) => {
    Object.entries(EngNepDigitMap).forEach(value => {
        eng = eng.replace(`/${value[1]}/g`, value[0])
    })
    return eng
}
