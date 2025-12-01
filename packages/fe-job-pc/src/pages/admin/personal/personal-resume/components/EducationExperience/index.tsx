import { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import { Divider, message } from 'antd'
import GeneralForm from '../GeneralForm'
import educationExperienceConfig from './config'
import styles from './index.module.less'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'
import OperationBtn from '../OperateBtn'
dayjs.extend(weekday)
dayjs.extend(localeData)

const Index = forwardRef(
    (
        {
            userEducationList,
            degressOption,
            saveEducation,
            requestFunc,
            requestUniversityFunc,
            setStatus,
            ws,
            recall,
            getAIChat,
            remoteFunc,
            deleteEducation,
        }: any,
        ref,
    ) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})
        const [initOptions, setInitOptions] = useState<Record<string, any>[]>([])

        const addFunc = () => {
            if (userEducationList.length > 2) {
                return message.warning('最多添加三条实习经历')
            }
            setFormData({})
            setMode('edit')
        }

        useEffect(() => {
            setStatus(mode === 'view' ? '' : '编辑')
        }, [mode])

        useImperativeHandle(
            ref,
            () => {
                return {
                    addFunc,
                }
            },
            [userEducationList],
        )

        const convertYear = (time: string | number | Date) => {
            if (time === 0) {
                return '至今'
            }
            if (!time) return ''

            return new Date(time).getFullYear()
        }

        const editFunc = (userEducationItem: any) => {
            const { startTime, endTime, profession, professionCode } = userEducationItem
            if (profession && professionCode) {
                setInitOptions([{ label: profession, value: professionCode }])
            }
            setFormData({
                ...userEducationItem,
                startEnd: [dayjs(startTime), endTime === 0 ? dayjs() : dayjs(endTime)],
            })
            setMode('edit')
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
            const [{ name: profession }] = await remoteFunc([mergeData.professionCode])

            const params = { ...formData, ...value, startTime, endTime, profession }
            await saveEducation(params)
            setMode('view')
        }

        if (mode === 'view') {
            return userEducationList?.map(
                (
                    {
                        code,
                        name,
                        startTime,
                        endTime,
                        degreeType,
                        courseDesc,
                        professionDesc,
                        schoolExperience,
                        degreeName,
                        profession,
                    }: any,
                    i: number,
                ) => (
                    <div className={styles.edu_container} key={code}>
                        <div className={styles.school}>
                            <div className={styles.school_exp}>
                                <div className={styles.school_name}>{name}</div>
                                <div className={styles.school_period}>
                                    {convertYear(startTime) + '-' + convertYear(endTime)}
                                </div>
                            </div>
                            <div className={styles.operate}>
                                <OperationBtn
                                    editFunc={() => editFunc(userEducationList[i])}
                                    delFunc={() => deleteEducation(code)}
                                />
                            </div>
                        </div>
                        <div className={styles.basic_info}>
                            <span>{degreeType === 1 ? '全日制' : '非全日制'}</span>
                            {degreeName && (
                                <>
                                    <Divider type="vertical" />
                                    <span>{degreeName}</span>
                                </>
                            )}
                            {profession && (
                                <>
                                    <Divider type="vertical" />
                                    <span>{profession}</span>
                                </>
                            )}
                        </div>
                        {courseDesc && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>主修课程:</div>
                                <div className={styles.content}>{courseDesc}</div>
                            </div>
                        )}
                        {professionDesc && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>专业成绩:</div>
                                <div className={styles.content}>{professionDesc}</div>
                            </div>
                        )}
                        {schoolExperience && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>在校经历:</div>
                                <div className={styles.content}>{schoolExperience}</div>
                            </div>
                        )}
                    </div>
                ),
            )
        }

        return (
            // @ts-ignore
            <GeneralForm
                structure={educationExperienceConfig({
                    ws,
                    recall,
                    getAIChat,
                    degressOption,
                    requestFunc,
                    requestUniversityFunc,
                    initOptions,
                    remoteFunc,
                })}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
