import React, {PropsWithChildren} from 'react'
import {NEPALI_CALENDAR_DATE, NEPALI_MONTHS} from "@/libs/NepaliDate/constants/nepali.constant";
import useCalendarContext from "@/libs/NepaliCalendarReact/core/hooks/useCalendarContext";

const CalendarPicker: React.FC = () => {

    /**
     * CONTEXT
     */
    const {onMonthChange, onYearChange, selectedYear, selectedMonth} = useCalendarContext()

    return (
        <div className={'flex gap-4 items-center justify-center mb-8'}>
            <select onChange={(event) => {
                onYearChange(parseInt(event.target?.value))
            }} value={selectedYear || ''} placeholder={'Select year'} className={'px-4 py-2'}>
                {
                    Object.entries(NEPALI_CALENDAR_DATE).map(item => <>
                        <option value={item[0]}>
                            {item[0]}
                        </option>
                    </>)
                }
            </select>

            <select onChange={(event) => {
                onMonthChange(parseInt(event.target?.value))
            }} value={selectedMonth || ''} placeholder={'Select month'} className={'px-4 py-2'}>
                {
                    Object.entries(NEPALI_MONTHS).map(item => <>
                        <option value={item[0]}>
                            {item[1].np}
                        </option>
                    </>)
                }
            </select>
        </div>
    )
}

export default CalendarPicker
