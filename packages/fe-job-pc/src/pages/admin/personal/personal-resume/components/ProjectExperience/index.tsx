import { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import styles from './index.module.less'
import internExperienceConfig from './config'
import dayjs from 'dayjs'
import GeneralForm from '../GeneralForm'
import OperationBtn from '../OperateBtn'

const Index = forwardRef(
    (
        {
            userProjectExperienceList,
            saveProjectExperience,
            deleteProjectExperience,
            industryCascade,
            loadIndustryData,
            setStatus,
            getAIChat,
            recall,
            ws,
        }: any,
        ref,
    ) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})

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

        const addFunc = () => {
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

        const editFunc = (userPracticeItem: any) => {
            const { startTime, endTime } = userPracticeItem

            setFormData({
                ...userPracticeItem,
                startEnd: [dayjs(startTime), endTime === 0 ? dayjs() : dayjs(endTime)],
            })
            setMode('edit')
        }

        const delFunc = (code: string) => {
            deleteProjectExperience(code)
        }

        const onCancel = () => {
            setMode('view')
        }

        const onFinish = (value: any) => {
            const mergeData = { ...formData, ...value }
            const [m1, m2] = mergeData.startEnd
            const startTime = dayjs(m1).valueOf()
            let endTime = dayjs(m2).valueOf()
            if (dayjs(m2).endOf('day').valueOf() === dayjs().endOf('day').valueOf()) {
                endTime = 0
            }
            const params = { ...formData, ...value, startTime, endTime }
            saveProjectExperience(params)
            setMode('view')
        }

        if (mode === 'view') {
            return userProjectExperienceList?.map(
                (
                    { code, name, startTime, endTime, performance, description, url, job }: any,
                    i: number,
                ) => (
                    <div className={styles.common_container} key={code}>
                        <div className={styles.top}>
                            <div className={styles.top_exp}>
                                <div className={styles.top_name}>{name}</div>
                                <div className={styles.top_period}>
                                    {convertYear(startTime) + '-' + convertYear(endTime)}
                                </div>
                            </div>
                            <div className={styles.operate}>
                                <OperationBtn
                                    editFunc={() => editFunc(userProjectExperienceList[i])}
                                    delFunc={() => delFunc(code)}
                                />
                            </div>
                        </div>
                        <div className={styles.basic_info}>
                            <span>{job}</span>
                        </div>
                        {url && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>项目链接:</div>
                                <div style={{ color: '#1678FF' }} className={styles.content}>
                                    {url}
                                </div>
                            </div>
                        )}
                        {description && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>项目描述:</div>
                                <div className={styles.content}>{description}</div>
                            </div>
                        )}
                        {performance && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>项目业绩:</div>
                                <div className={styles.content}>{performance}</div>
                            </div>
                        )}
                    </div>
                ),
            )
        }

        return (
            // @ts-ignore
            <GeneralForm
                structure={internExperienceConfig({
                    industryCascade,
                    loadIndustryData,
                    getAIChat,
                    ws,
                    recall,
                })}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
