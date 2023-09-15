import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import {NEPALI_CALENDAR_DATE, NEPALI_MONTHS} from "@/libs/NepaliDate/constants/nepali.constant";
import {Button, Col, DatePicker, Form, Row, Select} from "antd";
import useComputed from "@/libs/NepaliCalendarReact/core/hooks/useComputed";
import {englishToNepaliDate, nepaliToEnglishDate} from "@/libs/NepaliDate";
import {FaSyncAlt} from "react-icons/fa";
import dayjs from "dayjs";

const DateConvertor: NextPage = () => {

    /**
     * COMPONENT STATE
     */
    const [reverse, setReversed] = useState(false)
    const [result, setResult] = useState<string>()

    /**
     * ANTD FORMS
     */
    const [npForm] = Form.useForm()
    const npYear = Form.useWatch('year', npForm)
    const npMonth = Form.useWatch('month', npForm)
    const npDays = useComputed(() => {
        return NEPALI_CALENDAR_DATE[npYear as 2000] && NEPALI_CALENDAR_DATE[npYear as 2000][npMonth - 1] ? NEPALI_CALENDAR_DATE[npYear as 2000][npMonth - 1] : 0
    }, [npMonth, npYear])

    const [enForm] = Form.useForm()


    useEffect(() => {
        const currentNepaliDate = englishToNepaliDate(new Date())
        if (currentNepaliDate?.date) {
            npForm.setFieldsValue({
                year: currentNepaliDate?.date?.year,
                month: currentNepaliDate?.date?.month.toString(),
                day: currentNepaliDate?.date?.date
            })
        }

        enForm.setFieldsValue({
            date: dayjs(new Date())
        })
    }, [reverse])

    return (
        <section className={'min-h-screen flex items-center gap-8 flex-col'}>
            <div className={' text-white flex justify-center items-center gap-2'}>
                <h3 className={'text-2xl font-bold'}>{!reverse ? 'Nepali Date to English date' : 'English date to Nepali Date'}</h3>
                <div className="px-4 py-2 bg-white text-primary rounded-full cursor-pointer"
                     onClick={() => {
                         setResult(undefined)
                         setReversed(!reverse)
                     }}
                >
                    <FaSyncAlt/>
                </div>
            </div>
            <div className={'min-w-[700px] overflow-auto bg-white p-4'}>
                {
                    reverse ?
                        <Form form={enForm} layout={'vertical'} onFinish={(values) => {
                            const engDate = englishToNepaliDate(values.date, {
                                devanagari: true,
                                format: 'DD MMMM YYYY, dddd'
                            })
                            setResult(engDate?.formatted)
                        }}>
                            <Row gutter={[8, 8]}>
                                <Col xs={12}>
                                    <Form.Item name={'date'} label={'Date'} rules={[{
                                        required: true,
                                        message: 'Date is required !'
                                    }]}>
                                        <DatePicker size='large' className='w-full'
                                                    placeholder={"Select English date"}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Button size={'large'} className={'!bg-primary'} type={'primary'}
                                            htmlType={'submit'}>Convert</Button>
                                </Col>
                            </Row>
                        </Form> :
                        ''
                }
                {
                    !reverse ? <Form form={npForm} layout={'vertical'}
                                     onFinish={(values) => {
                                         const engDate = nepaliToEnglishDate({
                                             date: values?.day,
                                             month: values?.month,
                                             year: values?.year
                                         }, 'DD MMMM YYYY, dddd')
                                         setResult(engDate?.formatted)
                                     }}>
                        <Row gutter={[8, 8]}>
                            <Col xs={8}>
                                <Form.Item name={'year'} label={'Year'} rules={[{
                                    required: true,
                                    message: 'Year is required !'
                                }]}>
                                    <Select size={'large'} placeholder={'Select Year'} onChange={() => {
                                        npForm.setFieldValue('day', null)
                                    }}>
                                        {
                                            Object.entries(NEPALI_CALENDAR_DATE).map(item => <>
                                                <Select.Option value={item[0]} key={item[0]}>
                                                    {item[0]}
                                                </Select.Option>
                                            </>)
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={8}>
                                <Form.Item name={'month'} label={'Month'} rules={[{
                                    required: true,
                                    message: 'Month is required !'
                                }]}>
                                    <Select size={'large'} placeholder={'Select Month'} onChange={() => {
                                        npForm.setFieldValue('day', null)
                                    }}>
                                        {
                                            Object.entries(NEPALI_MONTHS).map(item => <>
                                                <Select.Option value={item[0]} key={item[0]}>
                                                    {item[1].np}
                                                </Select.Option>
                                            </>)
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>


                            <Col xs={8}>
                                <Form.Item name={'day'} label={'Day'} rules={[{
                                    required: true,
                                    message: 'Day is required !'
                                }]}>
                                    <Select size={'large'} placeholder={'Select Day'}>
                                        {
                                            Array.from(Array(npDays), (e, i) => {
                                                return <Select.Option value={i + 1} key={i + 1}>
                                                    {i + 1}
                                                </Select.Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>


                            <Col xs={24}>
                                <Button size={'large'} className={'!bg-primary'} type={'primary'}
                                        htmlType={'submit'}>Convert</Button>
                            </Col>
                        </Row>
                    </Form> : ''
                }
                {result ?
                    <div className="p-4 bg-white font-medium text-black text-2xl text-center">
                        {result}
                    </div>
                    : ''}

            </div>


        </section>
    )
}

export default DateConvertor
