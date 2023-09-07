"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nepali_constant_1 = require("../../constants/nepali.constant");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
class NepaliDateHashmapGeneratorService {
    constructor() {
        this.NepaliCalendarData = nepali_constant_1.NEPALI_CALENDAR_DATE;
        this.NepaliMonth = nepali_constant_1.NEPALI_MONTHS;
    }
    generateHashMap() {
        let NpCalendarHashMap = [];
        let total_days = 0;
        Object.entries(this.NepaliCalendarData).forEach((year) => {
            let prepareData = {
                year: parseInt(year[0]),
                min_day_range: total_days + 1,
                max_day_range: 0,
                months: []
            };
            let month_total = total_days + 1;
            const monthData = year[1].map((month_days, index) => {
                let prepareData = {
                    month: index + 1,
                    year: parseInt(year[0]),
                    name_en: this.NepaliMonth[(index + 1).toString()].en,
                    name_np: this.NepaliMonth[(index + 1).toString()].np,
                    min_day_range: month_total,
                    max_day_range: month_total + month_days - 1,
                    total_days: month_days,
                    days: []
                };
                total_days = total_days + month_days;
                month_total = month_total + month_days;
                return prepareData;
            });
            prepareData = Object.assign(Object.assign({}, prepareData), { max_day_range: total_days, months: monthData });
            NpCalendarHashMap.push(prepareData);
        });
        NpCalendarHashMap = NpCalendarHashMap.map(year => {
            const months = year === null || year === void 0 ? void 0 : year.months.map((month, index) => {
                const days = [];
                for (let i = 0; i <= (month === null || month === void 0 ? void 0 : month.total_days); i++) {
                    const diff = (month.min_day_range + i) - nepali_constant_1.NEPALI_DATE_INITIAL;
                    if (diff >= 0) {
                        const modulo = diff % 7 === 0 ? '7' : (diff % 7).toString();
                        const datPrep = {
                            day_np: nepali_constant_1.NEPALI_DAYS[modulo].np,
                            day_en: nepali_constant_1.NEPALI_DAYS[modulo].en,
                            day: i + 1
                        };
                        days.push(datPrep);
                    }
                }
                days.pop();
                return Object.assign(Object.assign({}, month), { days });
            });
            return Object.assign(Object.assign({}, year), { months });
        });
        // return NpCalendarHashMap
        fs.writeFileSync(path_1.default.join(__dirname, "../../../../mapping/calendar.json"), JSON.stringify(NpCalendarHashMap));
    }
}
exports.default = new NepaliDateHashmapGeneratorService();
