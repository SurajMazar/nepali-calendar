import {NepaliDateInterface} from "@/libs/NepaliDate/@types";

export type EventsBaseType = { date: string | Date }

export interface NepaliCalendarPropsInterface<T extends Record<any, any> = any> {
    defaultValue?: Date | string
    events?: Array<T & EventsBaseType>
    loadingEvents?: boolean
    onDateSelected?: (date: {
        nepaliDate: NepaliDateInterface,
        englishDate: Date
    }) => void
}
