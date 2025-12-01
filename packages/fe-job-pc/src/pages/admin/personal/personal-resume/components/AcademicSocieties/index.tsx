import { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import GeneralForm from '../GeneralForm'
import OperationBtn from '../OperateBtn'
import config from './config'
import styles from './index.module.less'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'
dayjs.extend(weekday)
dayjs.extend(localeData)

const Index = forwardRef(
    (
        {
            type,
            userSchoolExperienceList,
            saveAcademicSocieties,
            deleteAcademicSocieties,
            setStatus,
            ws,
            getAIChat,
            recall,
        }: any,
        ref,
    ) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})

        const addFunc = () => {
            setFormData({})
            setMode('edit')
        }

        useEffect(() => {
            setStatus(mode === 'view' ? '' : '编辑')
        }, [mode])

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

        const editFunc = (userSchoolExperienceItem: any) => {
            const { startTime, endTime } = userSchoolExperienceItem

            setFormData({
                ...userSchoolExperienceItem,
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
            deleteAcademicSocieties({ code, type })
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
            const params = { ...formData, ...value, startTime, endTime, type }

            await saveAcademicSocieties(params)
            setMode('view')
        }

        if (mode === 'view') {
            return userSchoolExperienceList.map(
                ({ code, name, job, startTime, endTime, description }: any, i: number) => (
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
                                    editFunc={() => editFunc(userSchoolExperienceList[i])}
                                    delFunc={() => delFunc(code)}
                                />
                            </div>
                        </div>
                        <div className={styles.basic_info}>
                            <span>{job}</span>
                        </div>
                        {description && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>经历描述:</div>
                                <div className={styles.content}>{description}</div>
                            </div>
                        )}
                    </div>
                ),
            )
        }

        return (
            // @ts-ignore
            <GeneralForm
                structure={config({ type, ws, getAIChat, recall })}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
