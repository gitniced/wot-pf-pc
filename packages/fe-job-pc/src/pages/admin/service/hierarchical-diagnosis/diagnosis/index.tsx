import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import EyeShowCom from '@/components/EyeShowCom'
import { Button, Col, message, Modal, Row, Space, Steps, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'

import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
import FirstStep from './FirstStep'
import { DIAGNOSIS_STEP_ENUM, jobStateList, personLevel, STATUS_COLOR, STATUS_TEXT } from './consts'
import { history, useLocation } from 'umi'
import SecondStep from './SecondStep'
import TitleAdvance from '@/components/TitleAdvance'
import { setDocTitle } from '@/utils/setDocTitle'

const EmploymentAssistanceDetail = () => {
    const store = useLocalObservable(() => Store)
    const { query: { code, step } } = useLocation()

    const { surveyScoreList, judgmentResults, dimensionHierarchy, assistanceInfo, surveyQuestionList, judgmentQuestionList } = store
    const { name, gender, idCard, mobile, age, userInfo, jobState, serviceUnit, state, jobType, jobUnit, jobPosition } = assistanceInfo
    const { registeredProvinceName = '', registeredCityName = '', registeredDistrictName = '', registeredAddress = '',
        provinceName = '',
        cityName = '',
        districtName = '',
        address = '',
    } = userInfo || {}
    const [currentStep, setCurrentStep] = useState<number>(DIAGNOSIS_STEP_ENUM.FIRST)
    const assistanceMeasuresRef = useRef({
        // 保存校验
        validateSave: (callback: (data: any) => void) => { },
    })

    const jobSeekerInformation = [
        { label: '姓名：', value: <EyeShowCom fullStr={name!} type='name' /> },
        { label: '性别：', value: gender === 1 ? '男' : '女' },
        { label: '证件号码：', value: <EyeShowCom fullStr={idCard!} type="idcard" /> },
        { label: '手机号：', value: <EyeShowCom fullStr={mobile!} type="idcard" /> },
        { label: '年龄：', value: age },
        { label: '人员类别：', value: personLevel[`${userInfo?.type}`] || '-' },
        { label: '学历：', value: userInfo?.degreeName },
        { label: '毕业院校：', value: userInfo?.school },
        { label: '所学专业：', value: userInfo?.profession },
        { label: '户籍地址：', value: `${registeredProvinceName}${registeredCityName}${registeredDistrictName}${registeredAddress}` },
        { label: '居住地址：', value: `${provinceName}${cityName}${districtName}${address}` },
        { label: '意向岗位：', value: userInfo?.position?.map(item => item.name).join(',') },
    ]

    const serviceInformation = [
        { label: '服务状态：', value: <Tag color={STATUS_COLOR[`${state}`]}>{STATUS_TEXT[`${state}`]}</Tag> },
        { label: '服务单位：', value: serviceUnit },
        { label: '就业状态：', value: jobStateList?.[`${jobState}`] },
        { label: '就业类型：', value: jobType, hide: state !== 50 },
        { label: '就业单位：', value: jobUnit, hide: state !== 50 },
        { label: '就业岗位：', value: jobPosition, hide: state !== 50 },
    ]

    const stepItems = [
        {
            title: '研判提问',
        },
        {
            title: '确认分级结果',
        },
    ]

    const handleCancel = () => {
        Modal.confirm({
            title: '取消后不会保存任何修改结果，是否确定取消？',
            onOk: () => {
                history.goBack()
            },
        })
    }

    const handleNext = () => {
        const quesLength = surveyQuestionList.length + judgmentQuestionList.length
        if (quesLength !== Object.keys(store.answerObj).length) {
            message.error('请先完成本页全部题目')
            return
        }
        store.submitAnswer({
            recordCode: code,
            questionAnswerDtos: Object.keys(store.answerObj).map(item => {
                return { questionCode: item, sequence: store.answerObj[item] }
            })
        }).then(() => {
            store.getAssistanceDetail(code)
            setCurrentStep(DIAGNOSIS_STEP_ENUM.SECOND)
        })
    }

    const handlePrev = () => {
        Modal.confirm({
            title: '返回上一步不会保存当前步骤修改结果，是否确定返回？',
            onOk: () => {
                setCurrentStep(DIAGNOSIS_STEP_ENUM.FIRST)
            },
        })
    }

    const handleSave = () => {
        assistanceMeasuresRef.current.validateSave((measureList) => {
            console.log(measureList)
            if (measureList.length === 0) {
                return message.error('请先维护帮扶措施')
            }
            store.submitMeasure({
                recordCode: code,
                measureList: measureList,
                confirm: 0
            }).then(res => {
                message.success('保存成功')
                store.getAssistanceDetail(code)
            })
        })
    }

    const handleSubmit = () => {
        assistanceMeasuresRef.current.validateSave((measureList) => {
            if (measureList.length === 0) {
                return message.error('请先维护帮扶措施')
            }
            Modal.confirm({
                title: '提交后不支持修改，且无法撤销操作，是否确定提交？',
                onOk: () => {
                    store.submitMeasure({
                        recordCode: code,
                        measureList: measureList,
                        confirm: 1
                    }).then(res => {
                        message.success('提交成功')
                        history.push('./list')
                    })
                },
            })
        })
    }

    useEffect(() => {
        setDocTitle('诊断')
        store.getAssistanceDetail(code)
        store.resetAnswer()
        if(step === '2'){
            setCurrentStep(DIAGNOSIS_STEP_ENUM.SECOND)
        }
    }, [])

    return (
        <div className={styles.page_employment_assistance_detail}>
            <div className={styles.top}>
                <TitleBlock title="诊断" />
                <div className={styles.top_inner}>
                    {/* 求职者信息 */}
                    <div className={styles.job_seeker_information}>
                        <TitleAdvance title="求职者信息">
                            <Row gutter={[24, 24]}>
                                {jobSeekerInformation.map(item => (
                                    <Col span={12} key={item.label}>
                                        <span className={styles.label}>{item.label}</span>
                                        <span className={styles.value}>{item.value}</span>
                                    </Col>
                                ))}
                            </Row>
                        </TitleAdvance>
                    </div>
                    <div className={styles.service_information}>
                        <TitleAdvance title="服务信息">
                            <Row gutter={[24, 24]}>
                                {serviceInformation.filter(item => !item.hide).map(item => (
                                    <Col span={24} key={item.label}>
                                        <span className={styles.label}>{item.label}</span>
                                        <span className={styles.value}>{item.value || '-'}</span>
                                    </Col>
                                ))}
                            </Row>
                        </TitleAdvance>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <Steps items={stepItems} current={currentStep} />

                <div className={styles.step_wrapper}>
                    {currentStep === DIAGNOSIS_STEP_ENUM.FIRST && <FirstStep code={code} store={store} />}
                    {currentStep === DIAGNOSIS_STEP_ENUM.SECOND && (
                        <SecondStep
                            ref={assistanceMeasuresRef}
                            surveyScoreList={surveyScoreList}
                            judgmentResults={judgmentResults}
                            dimensionHierarchy={dimensionHierarchy}
                        />
                    )}
                </div>
            </div>

            <div className={styles.footer_wrapper}>
                <Space size={16}>
                    {currentStep === DIAGNOSIS_STEP_ENUM.FIRST && (
                        <>
                            <Button onClick={handleCancel}>取消</Button>
                            <Button type="primary" onClick={handleNext}>
                                下一步
                            </Button>
                        </>
                    )}
                    {currentStep === DIAGNOSIS_STEP_ENUM.SECOND && (
                        <>
                            <Button onClick={handlePrev}>上一步</Button>
                            <Button onClick={handleSave}>保存</Button>
                            <Button type="primary" onClick={handleSubmit}>
                                确认提交，实施服务
                            </Button>
                        </>
                    )}
                </Space>
            </div>
        </div>
    )
}

export default observer(EmploymentAssistanceDetail)
