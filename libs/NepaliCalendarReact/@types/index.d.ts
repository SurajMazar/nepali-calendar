import {OnChangeDateInterface} from "@/libs/NepaliCalendarReact/@types/context";

export type EventsBaseType = { date: string | Date }

export interface NepaliCalendarPropsInterface<T extends Record<any, any> = any> {
    defaultValue?: Date | string
    events?: Array<T & EventsBaseType>
    loadingEvents?: boolean
    onDateSelected?: OnChangeDateInterface
}
