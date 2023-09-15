import React from 'react'
import {NEPALI_DAY_KEY, NEPALI_DAYS} from "@/libs/NepaliDate/constants/nepali.constant";
import {returnLimitedLetters} from "@/libs/NepaliCalendarReact/core/utils/string.utils";
import useCalendarContext from "@/libs/NepaliCalendarReact/core/hooks/useCalendarContext";
import useComputed from "@/libs/NepaliCalendarReact/core/hooks/useComputed";
import {DayCalendarInterface} from "@/libs/NepaliDate/@types";
import {engDigitToDev} from "@/libs/NepaliDate/lib/formatter/DateFormatter";
import {englishToNepaliDate, nepaliToEnglishDate} from "@/libs/NepaliDate";
import {OnChangeDateInterface} from "@/libs/NepaliCalendarReact/@types/context";

const CalendarUI: React.FC<{
    onDateSelected?: OnChangeDateInterface
}> = ({onDateSelected}) => {

    /**
     * CALENDAR CONTEXT
     */
    const {calendar, setActiveDate, activeDate, currentDate} = useCalendarContext()

    /**
     * FORMATTED CALENDAR DATA
     */
    const formattedCalendar = useComputed(() => {
        const formattedData: {
            [string: string]: {
                [string: string]: DayCalendarInterface
            }
        } = {}
        let iteration = 0
        calendar?.days?.forEach((day) => {
            const temp: any = {}
            temp[day.day_en] = day
            formattedData[iteration] = {
                ...(formattedData[iteration] || []),
                ...temp
            }
            if (day.day_en === NEPALI_DAYS["7"].en) {
                iteration = iteration + 1;
            }
        })
        return formattedData
    }, [calendar]);


    return (
        <table className={'np-calendar'}>
            {/** CALENDAR DAYS */}
            <thead>
            <tr>
                {
                    Object.entries(NEPALI_DAYS).map(month => (
                        <th key={month[0]}>{returnLimitedLetters(month[1].en)}</th>
                    ))
                }
            </tr>
            </thead>

            {/** CALENDAR'S DATE */}
            <tbody>
            {
                Object.entries(formattedCalendar).map(FCalendar => (
                    <tr key={FCalendar[0]}>
                        {
                            Object.entries(NEPALI_DAYS).map((days) => {

                                /**
                                 * NEPALI DATE KEY
                                 */
                                const dayKey = days[0] as NEPALI_DAY_KEY;

                                /**
                                 * DATE FROM ARRAY
                                 */
                                const date = FCalendar[1][NEPALI_DAYS[dayKey]['en']]

                                /**
                                 * ENGLISH DATE INSTANCE
                                 */
                                const engDate = calendar ? nepaliToEnglishDate({
                                    date: date?.day,
                                    month: calendar?.month,
                                    year: calendar?.year
                                }, 'D MMM') : null

                                /**
                                 * NEPALI DATE INSTANCE
                                 */
                                const nepaliDate = engDate?.date ? englishToNepaliDate(engDate?.date) : null;

                                /**
                                 * IS SELECTED DATE
                                 */
                                const isActive = activeDate ? (activeDate?.date === date?.day)
                                    && (activeDate?.year === nepaliDate?.date?.year)
                                    && (activeDate?.month === nepaliDate?.date?.month) : false

                                /**
                                 * IS CURRENT DATE
                                 */
                                const isCurrentDate = currentDate ? (currentDate?.date === nepaliDate?.date?.date)
                                    && (currentDate?.year === nepaliDate?.date?.year)
                                    && (currentDate?.month === nepaliDate?.date?.month) : false

                                /**
                                 * CHECK IF THE DAY IS SATURDAY
                                 */
                                const isSaturday = dayKey === '7'

                                /**
                                 * CHECK IF THE DAY IS FRIDAY
                                 */
                                const isFriday = dayKey === '6'

                                return (
                                    <td key={days[0]}
                                        onClick={() => {
                                            if (engDate?.date && nepaliDate?.date && onDateSelected) {
                                                onDateSelected({
                                                    nepaliDate: nepaliDate?.date,
                                                    englishDate: engDate?.date
                                                })
                                            }
                                            setActiveDate(nepaliDate?.date)
                                        }}
                                        className={`
                                            ${isSaturday ? '!border-red-200' : ''} 
                                            ${isFriday ? '!border-r-red-200' : ''} 
                                            ${isCurrentDate ? 'bg-yellow-50' : ''}
                                            ${isActive ? '!bg-blue-50' : ''}
                                        `}>
                                        {
                                            date ?
                                                <div
                                                    className={`relative flex items-center justify-center h-full w-full`}>
                                                    <p className={`text-3xl text-primary font-medium ${isSaturday ? 'text-red-500' : ''}`}>
                                                        {engDigitToDev((date.day).toString())}
                                                    </p>

                                                    {
                                                        engDate ?
                                                            <div
                                                                className={`absolute bottom-0 right-0  text-sm ${isSaturday ? 'text-red-500' : ''}`}>
                                                                {engDate?.formatted}
                                                            </div>
                                                            : ''
                                                    }
                                                </div>
                                                :
                                                ''
                                        }
                                    </td>
                                )
                            })
                        }
                    </tr>
                ))
            }


            </tbody>
        </table>
    )
}

export default CalendarUI
