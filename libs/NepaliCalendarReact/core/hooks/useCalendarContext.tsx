import {useContext} from "react";
import {NepaliCalendarContext} from "@/libs/NepaliCalendarReact/context/NepaliCalendarContext";

/**
 * NEPALI CALENDAR CONTEXT
 */
const useCalendarContext = () => {
    return useContext(NepaliCalendarContext)
}

export default useCalendarContext
