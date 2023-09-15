import NepaliCalendar from "@/libs/NepaliCalendarReact";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className={'w-full lg:w-3/5'}>
                <NepaliCalendar
                    onDateSelected={(date) => {
                    console.log(date)
                }}/>
            </div>
        </main>

    )
}
