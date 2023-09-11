import React, {useEffect} from 'react'
import {NepaliCalendarPropsInterface} from "@/libs/NepaliCalendarReact/@types";
import useCalendarContext from "@/libs/NepaliCalendarReact/core/hooks/useCalendarContext";
import CalendarUI from "@/libs/NepaliCalendarReact/components/Calendar/CalendarUI";
import CalendarPicker from "@/libs/NepaliCalendarReact/components/Calendar/CalendarPicker";

const CalendarRoot: React.FC<NepaliCalendarPropsInterface> = (props) => {

    /**
     * PROPS
     */
    const {events, defaultValue, loadingEvents, onDateSelected} = props

    /**
     * HOOKS
     */
    const {setCalendar} = useCalendarContext()

    /**
     * MOUNTED
     */
    useEffect(() => {
        setCalendar(defaultValue || new Date())
    }, []) /** @eslint-ignore-line */


    return (
        <>
            <CalendarPicker/>
            <CalendarUI onDateSelected={onDateSelected}/>
        </>
    )
}

export default CalendarRoot
