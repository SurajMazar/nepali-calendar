/**
 * AVAILABLE DATE FORMATS
 */
export const DateFormats = {
    'YYYY-MM-DD': 'YYYY-MM-DD',
    'YYYY/MM/DD': 'YYYY/MM/DD',
    'MMMM D YYYY': 'MMMM D YYYY',
    'YYYY-MM-DD dddd': 'YYYY-MM-DD dddd',
    'YYYY/MM/DD dddd': 'YYYY/MM/DD dddd',
    'MMMM D YYYY dddd': 'MMMM D YYYY dddd'
}

/**
 * DATE FORMATS INTERFACE
 */
export type AvailableDateFormatsInterFace = keyof typeof DateFormats
