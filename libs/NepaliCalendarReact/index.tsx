import React, {PropsWithChildren} from 'react'
import CalendarRoot from "@/libs/NepaliCalendarReact/components/Calendar";
import {NepaliCalendarPropsInterface} from "@/libs/NepaliCalendarReact/@types";
import {NepaliCalendarContextWrapper} from "@/libs/NepaliCalendarReact/context/NepaliCalendarContext";


const NepaliCalendar: React.FC<NepaliCalendarPropsInterface> = (props) => {
    return (
        <NepaliCalendarContextWrapper>
            <CalendarRoot {...props}/>
        </NepaliCalendarContextWrapper>
    )
}

export default NepaliCalendar
