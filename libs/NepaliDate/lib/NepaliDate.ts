import NepaliCalendarHashMap from '../mapping/calendar.json'
import moment from "moment";
import {ENG_DATE_STARTING, NEPALI_DATE_INITIAL,} from "@/libs/NepaliDate/playground/src/constants/nepali.constant";
import {NepaliCalendarHashmapInterface, NepaliDateInterface} from "@/libs/NepaliDate/@types";
import {FormatNepaliDate, nepaliDigitToEng} from "@/libs/NepaliDate/lib/formatter/DateFormatter";


class NepaliDate {
    /**
     * CONVERT ENG TO NEPALI DATE
     * @param date
     * @param setting | {AvailableFormats format - date format for presentation, devanagari - represent digits as devanagari}
     */
    engToNepaliDate = (date: string | Date, setting: {
        format?: string | false,
        devanagari?: boolean
    } | undefined = undefined) => {

        const dateDifference = this.calculateCorrespondingNepaliDaysDiff(date)

        /**
         * CURRENTLY USING AUTO GENERATED JSON MAPPINGS - SWITCH TO ./utils/NepaliCalendarHashMapGenerator.utils.ts if u don't want to use the pre-generated mappings
         * GET CORRESPONDING YEAR
         */
        const year = (NepaliCalendarHashMap as Array<NepaliCalendarHashmapInterface>).find(year => {
            return (year?.min_day_range <= dateDifference) && (dateDifference <= year?.max_day_range)
        })

        /**
         * GET CORRESPONDING MONTH
         */
        const month = year?.months.find(month => {
            return (month?.min_day_range <= dateDifference) && (dateDifference <= month?.max_day_range)
        })

        /**
         * GET CORRESPONDING DAY
         */
        const day = month?.days?.find(day => {
            return day?.day === ((dateDifference - month?.min_day_range) + 1)
        })

        if (year && month && day) {
            /**
             * NEPALI DATE
             */
            const nepaliDate: NepaliDateInterface = {
                year: year?.year,
                month: month?.month,
                date: day?.day,
                day_np: day?.day_np,
                day_en: day?.day_en,
                month_np: month?.name_np,
                month_en: month?.name_en,
            }

            return {
                date: nepaliDate,
                key: `${nepaliDate.year}-${nepaliDate.month}-${nepaliDate?.date}`,
                formatted: FormatNepaliDate(nepaliDate, setting?.format || 'YYYY, MMMM DD, dddd', setting?.devanagari)
            }
        }
        return {
            date: null,
            formatted: 'Invalid Date'
        }
    }

    nepToEngDate(date: string | NepaliDateInterface | {
        year: number
        month: number
        date: number
    }, format: string | undefined = undefined) {
        let year: number = 0, month: number = 0, day: number = 0;

        if (typeof date === 'string') {
            const parsedArray = date.split('-')
            if (parsedArray.length < 3) {
                return {
                    date: null,
                    formatted: 'Invalid date'
                }
            }
            year = parseInt(nepaliDigitToEng(parsedArray[0]))
            month = parseInt(nepaliDigitToEng(parsedArray[1]))
            day = parseInt(nepaliDigitToEng(parsedArray[2]))
        } else {
            year = parseInt(date?.year as any)
            month = parseInt(date?.month as any)
            day = parseInt(date?.date as any)
        }

        /**
         * NEPALI YEAR
         */
        const NepaliYear = (NepaliCalendarHashMap as Array<NepaliCalendarHashmapInterface>)
            .find(y => {
                return y.year === year
            })

        /**
         * NEPALI MONTH
         */
        const NepaliMonth = NepaliYear?.months?.find(nm => {
            return nm.month === month
        })

        /**
         * NEPALI DATE
         */
        const NepaliDate = NepaliMonth?.days?.find(d => {
            return d.day === day
        })

        if (NepaliYear &&
            NepaliMonth &&
            NepaliDate) {
            const daysToBeAdded = (NepaliMonth.min_day_range + NepaliDate.day - 1) - NEPALI_DATE_INITIAL
            const initialDate = moment(ENG_DATE_STARTING).startOf('day')
            const convertedEngDate = initialDate.add(daysToBeAdded, 'days')
            return {
                date: convertedEngDate.toDate(),
                formatted: convertedEngDate.format(format || 'YYYY, MMMM DD, dddd')
            }
        }

        return {
            date: null,
            formatted: 'Invalid date'
        }
    }

    /**
     * CALCULATING THE DAYS DIFFERENCE BETWEEN THE PROVIDED DATE AND INITIAL DATE
     * @param date
     */
    private calculateCorrespondingNepaliDaysDiff = (date: string | Date) => {
        const startDate = moment(ENG_DATE_STARTING).startOf('day')
        const toBeConvertedDate = moment(date).startOf('day')
        return toBeConvertedDate.diff(startDate, 'day') + NEPALI_DATE_INITIAL
    }

}

export default NepaliDate


