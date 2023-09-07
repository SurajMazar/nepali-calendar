import NepaliDate from "@/libs/NepaliDate/lib/NepaliDate";
import {useState} from "react";

export default function Home() {
    /**
     * FORM STATE
     */
    const [form, setForm] = useState({
        date: ''
    })
    const [selected, setSelected] = useState<string>()
    const [form2, setForm2] = useState({
        date: ''
    })

    const [selected2, setSelected2] = useState<string>()

    return (
        <div className={'min-h-screen flex justify-center items-center flex-col gap-8'}>
            <h3>ENG to NEP</h3>
            <div>
                <input className={'p-3 border-2 border-gray-500 outline-0 border-r-0'} type="text"
                       placeholder={'Eng date eg 2023-09-06'} onChange={(event) => {
                    setForm({
                        date: event?.target?.value
                    })
                }}/>
                <button className={'p-3 text-white bg-blue-500 border-2 border-blue-500'} onClick={() => {
                    if (form?.date) {
                        setSelected(form?.date)
                    }
                }}>submit
                </button>
            </div>
            <div className={'text-2xl'}>
                {
                    selected ?
                        new NepaliDate().engToNepaliDate(selected, {
                            devanagari: true
                        })?.formatted : ''
                }
            </div>
            <h3>NEP to ENG</h3>
            <div>
                <input className={'p-3 border-2 border-gray-500 outline-0 border-r-0'} type="text"
                       placeholder={'Nep date eg 2080-05-20'} onChange={(event) => {
                    setForm2({
                        date: event?.target?.value
                    })
                }}/>
                <button className={'p-3 text-white bg-blue-500 border-2 border-blue-500'} onClick={() => {
                    if (form?.date) {
                        setSelected2(form?.date)
                    }
                }}>submit
                </button>
            </div>
            <div className={'text-2xl'}>
                {
                    selected2 ?
                        new NepaliDate().nepToEngDate(selected2)?.formatted : ''
                }
            </div>
        </div>
    )
}
