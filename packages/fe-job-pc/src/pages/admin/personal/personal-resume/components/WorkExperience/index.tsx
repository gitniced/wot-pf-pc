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
            userWorkExperienceList,
            saveWorkExperience,
            deleteWorkExperience,
            industryCascade,
            loadIndustryData,
            setStatus,
            ws,
            recall,
            getAIChat,
            capacityTree,
            loadCapacityData,
            capacityList,
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
            if (userWorkExperienceList.length > 2) {
                return message.warning('最多添加三条实习经历')
            }
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
            [userWorkExperienceList],
        )

        const editFunc = async (userPracticeItem: any) => {
            const { startTime, endTime, job } = userPracticeItem

            const industry =
                userPracticeItem.industry === 0 && userPracticeItem.parentIndustry === 0
                    ? ''
                    : [userPracticeItem.parentIndustry, userPracticeItem.industry]
            await loadIndustryData([{ value: userPracticeItem.parentIndustry }])

            setFormData({
                ...userPracticeItem,
                capacity: job,
                capacityId: userPracticeItem?.capacity,
                industry,
                startEnd: [dayjs(startTime), endTime === 0 ? dayjs() : dayjs(endTime)],
            })
            setMode('edit')
        }

        const delFunc = (code: string) => {
            deleteWorkExperience(code)
        }

        const onCancel = () => {
            setMode('view')
        }

        const onFinish = async (value: any) => {
            const mergeData = { ...formData, ...value }

            if (Object.prototype.toString.call(mergeData.capacity) === '[object String]') {
                mergeData.capacity = mergeData.capacityId
            }

            const target = Array.isArray(mergeData.capacity)
                ? mergeData.capacity.slice(-1)
                : [mergeData.capacity]
            const resp = await capacityList(target)
            let job = ''
            if (resp.length > 0) {
                job = resp[0].name
            }

            const capacity = Array.isArray(mergeData.capacity)
                ? mergeData.capacity[mergeData.capacity.length - 1]
                : mergeData.capacity
            const industry = Array.isArray(mergeData?.industry)
                ? mergeData.industry[mergeData.industry.length - 1]
                : undefined
            const [m1, m2] = mergeData.startEnd
            const startTime = dayjs(m1).valueOf()
            let endTime = dayjs(m2).valueOf()
            if (dayjs(m2).endOf('day').valueOf() === dayjs().endOf('day').valueOf()) {
                endTime = 0
            }
            const params = { ...formData, ...value, startTime, endTime, job, capacity, industry }

            await saveWorkExperience(params)
            setMode('view')
        }

        if (mode === 'view') {
            return userWorkExperienceList?.map(
                (
                    {
                        code,
                        name,
                        job,
                        startTime,
                        endTime,
                        performance,
                        description,
                        industryName,
                    }: any,
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
                                    editFunc={() => editFunc(userWorkExperienceList[i])}
                                    delFunc={() => delFunc(code)}
                                />
                            </div>
                        </div>
                        <div className={styles.basic_info}>
                            <span>{job}</span>
                            {job && industryName && <Divider type="vertical" />}
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
                    ws,
                    recall,
                    getAIChat,
                    capacityTree,
                    loadCapacityData,
                    remoteFunc: capacityList,
                })}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
