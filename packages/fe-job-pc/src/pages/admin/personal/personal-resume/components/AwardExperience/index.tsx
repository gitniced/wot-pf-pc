import { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import OperationBtn from '../OperateBtn'
import GeneralForm from '../GeneralForm'
import config from './config'
import styles from './index.module.less'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'
dayjs.extend(weekday)
dayjs.extend(localeData)

const Index = forwardRef(
    ({ userAwardList, saveAwardExperience, deleteAwardExperience, setStatus }: any, ref) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})

        useEffect(() => {
            setStatus(mode === 'view' ? '' : '编辑')
        }, [mode])

        const addFunc = () => {
            setFormData({})
            setMode('edit')
        }

        const convertYear = (time: string | number | Date) => {
            if (time === 0) {
                return '至今'
            }
            if (!time) return ''
            const d = new Date(time)
            return `${d.getFullYear()}.${
                d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
            }`
        }

        const editFunc = (userAwardExperience: any) => {
            const { startTime, endTime } = userAwardExperience

            setFormData({
                ...userAwardExperience,
                startEnd: [dayjs(startTime), endTime === 0 ? dayjs() : dayjs(endTime)],
            })
            setMode('edit')
        }

        useImperativeHandle(
            ref,
            () => {
                return {
                    addFunc,
                }
            },
            [],
        )

        const delFunc = (code: string) => {
            deleteAwardExperience({ code })
        }

        const onCancel = () => {
            setMode('view')
        }

        const onFinish = async (value: any) => {
            const mergeData = { ...formData, ...value }
            const [m1, m2] = mergeData.startEnd
            const startTime = dayjs(m1).valueOf()
            let endTime = dayjs(m2).valueOf()
            if (dayjs(m2).endOf('day').valueOf() === dayjs().endOf('day').valueOf()) {
                endTime = 0
            }
            const params = { ...formData, ...value, startTime, endTime }
            await saveAwardExperience(params)
            setMode('view')
        }

        if (mode === 'view') {
            return userAwardList.map(({ code, name, startTime, endTime }: any, i: number) => (
                <div key={code} className={styles.common_container}>
                    <div className={styles.top}>
                        <div className={styles.top_exp}>
                            <div className={styles.top_name}>{name}</div>
                            <div className={styles.top_period}>
                                {convertYear(startTime) + '-' + convertYear(endTime)}
                            </div>
                        </div>

                        <div className={styles.operate}>
                            <OperationBtn
                                editFunc={() => editFunc(userAwardList[i])}
                                delFunc={() => delFunc(code)}
                            />
                        </div>
                    </div>
                </div>
            ))
        }

        return (
            // @ts-ignore
            <GeneralForm
                structure={config()}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
