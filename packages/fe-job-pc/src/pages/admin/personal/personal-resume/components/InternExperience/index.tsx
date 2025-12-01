import { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { Divider, message } from 'antd'
import internExperienceConfig from './config'
import dayjs from 'dayjs'
import GeneralForm from '../GeneralForm'
import OperationBtn from '../OperateBtn'

const Index = forwardRef(
    (
        {
            capacityTree,
            loadCapacityData,
            userPracticeList,
            savePracticeExperience,
            deletePracticeExperience,
            industryCascade,
            loadIndustryData,
            setStatus,
            recall,
            ws,
            getAIChat,
            capacityList,
        }: any,
        ref,
    ) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})
        const [origin, setOrigin] = useState<any>({})

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
            if (userPracticeList.length > 2) {
                return message.warning('最多添加三条实习经历')
            }
            setOrigin({})
            setFormData({})
            setMode('edit')
        }

        useImperativeHandle(
            ref,
            () => {
                return {
                    addFunc,
                }
            },
            [userPracticeList],
        )

        const editFunc = async (userPracticeItem: any) => {
            setOrigin(userPracticeItem)
            const { startTime, endTime, capacityName, industryName } = userPracticeItem
            await loadIndustryData([{ value: userPracticeItem.parentIndustry }])
            setFormData({
                ...userPracticeItem,
                industry: industryName,
                capacityId: capacityName,
                startEnd: [dayjs(startTime), endTime === 0 ? dayjs() : dayjs(endTime)],
            })
            setMode('edit')
        }

        const delFunc = (code: string) => {
            deletePracticeExperience(code)
        }

        const onCancel = () => {
            setMode('view')
        }

        const onFinish = async (value: any) => {
            const mergeData = { ...formData, ...value }
            const target = Array.isArray(mergeData.capacityId)
                ? mergeData.capacityId.slice(-1)
                : [origin.capacityId]
            const resp = await capacityList(target)
            let job = ''
            if (resp.length > 0) {
                job = resp[0].name
            }

            const [m1, m2] = mergeData.startEnd
            const startTime = dayjs(m1).valueOf()
            const endTime = dayjs(m2).valueOf()
            const capacityId = Array.isArray(mergeData?.capacityId)
                ? mergeData?.capacityId[mergeData.capacityId.length - 1]
                : origin.capacityId
            const industry = Array.isArray(mergeData?.industry)
                ? mergeData?.industry[mergeData.industry.length - 1]
                : origin.industry

            const params = { ...formData, ...value, startTime, endTime, job, capacityId, industry }
            savePracticeExperience(params)
            setMode('view')
        }

        if (mode === 'view') {
            return userPracticeList?.map(
                (
                    {
                        code,
                        name,
                        startTime,
                        endTime,
                        performance,
                        description,
                        capacityName,
                        industryName,
                    }: any,
                    i: number,
                ) => (
                    <div className={styles.intern_container} key={code}>
                        <div className={styles.school}>
                            <div className={styles.school_exp}>
                                <div className={styles.school_name}>{name}</div>
                                <div className={styles.school_period}>
                                    {convertYear(startTime) + '-' + convertYear(endTime)}
                                </div>
                            </div>
                            <div className={styles.operate}>
                                <OperationBtn
                                    editFunc={() => editFunc(userPracticeList[i])}
                                    delFunc={() => delFunc(code)}
                                />
                            </div>
                        </div>
                        <div className={styles.basic_info}>
                            <span>{capacityName}</span>
                            {capacityName && industryName && <Divider type="vertical" />}
                            <span>{industryName}</span>
                        </div>
                        {description && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>工作内容:</div>
                                <div className={styles.content}>{description}</div>
                            </div>
                        )}
                        {performance && (
                            <div className={styles.text_item}>
                                <div className={styles.label}>工作业绩:</div>
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
                    capacityTree,
                    loadCapacityData,
                    ws,
                    recall,
                    getAIChat,
                    remoteFunc: capacityList,
                })}
                gutter={24}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
