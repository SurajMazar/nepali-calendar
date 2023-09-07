import {NEPALI_CALENDAR_DATE, NEPALI_DATE_INITIAL, NEPALI_DAYS, NEPALI_MONTHS} from "../../constants/nepali.constant";
import * as fs from "fs";
import path from "path";

interface DayCalendarInterface {
    day_en: string,
    day_np: string,
    day: number
}

interface MonthCalendarHashmapInterface {
    year: number,
    month: number,
    name_en: string,
    name_np: string,
    min_day_range: number,
    max_day_range: number,
    total_days: number,
    days: Array<DayCalendarInterface>
}

interface NepaliCalendarHashmapInterface {
    year: number,
    min_day_range: number,
    max_day_range: number,
    months: Array<MonthCalendarHashmapInterface>
}

class NepaliDateHashmapGeneratorService {

    protected NepaliCalendarData = NEPALI_CALENDAR_DATE;

    protected NepaliMonth = NEPALI_MONTHS

    generateHashMap() {

        let NpCalendarHashMap: Array<NepaliCalendarHashmapInterface> = [];

        let total_days = 0

        Object.entries(this.NepaliCalendarData).forEach((year) => {

            let prepareData: NepaliCalendarHashmapInterface = {
                year: parseInt(year[0]),
                min_day_range: total_days + 1,
                max_day_range: 0,
                months: []
            }
            let month_total = total_days + 1;
            const monthData: Array<MonthCalendarHashmapInterface> = year[1].map((month_days, index) => {
                let prepareData: MonthCalendarHashmapInterface = {
                    month: index + 1,
                    year: parseInt(year[0]),
                    name_en: this.NepaliMonth[(index + 1).toString() as "1"].en,
                    name_np: this.NepaliMonth[(index + 1).toString() as "1"].np,
                    min_day_range: month_total,
                    max_day_range: month_total + month_days - 1,
                    total_days: month_days,
                    days: []
                }
                total_days = total_days + month_days
                month_total = month_total + month_days;
                return prepareData;
            })

            prepareData = {
                ...prepareData,
                max_day_range: total_days,
                months: monthData
            }

            NpCalendarHashMap.push(prepareData)
        })

        NpCalendarHashMap = NpCalendarHashMap.map(year => {
            const months = year?.months.map((month, index) => {
                const days: Array<DayCalendarInterface> = [];
                for (let i = 0; i <= month?.total_days; i++) {
                    const diff = (month.min_day_range + i) - NEPALI_DATE_INITIAL
                    if (diff >= 0) {
                        const modulo = diff % 7 === 0 ? '7' : (diff % 7).toString()
                        const datPrep: DayCalendarInterface = {
                            day_np: NEPALI_DAYS[modulo as "1"].np,
                            day_en: NEPALI_DAYS[modulo as "1"].en,
                            day: i + 1
                        }
                        days.push(datPrep)
                    }
                }
                days.pop()
                return {
                    ...month,
                    days
                }
            })

            return {
                ...year,
                months
            }
        })

        // return NpCalendarHashMap
        fs.writeFileSync(path.join(__dirname, "../../../../mapping/calendar.json"), JSON.stringify(NpCalendarHashMap))
    }
}


export default new NepaliDateHashmapGeneratorService()
