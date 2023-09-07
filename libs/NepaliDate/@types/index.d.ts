export interface NepaliDateInterface {
    year: number,
    month: number,
    month_np: string,
    month_en: string,
    date: number,
    day_np: string,
    day_en: string
}

export interface DayCalendarInterface {
    day_en: string,
    day_np: string,
    day: number
}

export interface MonthCalendarHashmapInterface {
    year: number,
    month: number,
    name_en: string,
    name_np: string,
    min_day_range: number,
    max_day_range: number,
    total_days: number,
    days: Array<DayCalendarInterface>
}

export interface NepaliCalendarHashmapInterface {
    year: number,
    min_day_range: number,
    max_day_range: number,
    months: Array<MonthCalendarHashmapInterface>
}
