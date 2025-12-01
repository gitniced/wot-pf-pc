import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import EyeShowCom from '@/components/EyeShowCom'
import { Col, Row, Tag } from 'antd'
import { useContext, useEffect } from 'react'

import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
import TitleAdvance from '@/components/TitleAdvance'
import DiagnosisResults from './DiagnosisResults'
import AssistanceMeasures from './AssistanceMeasures'
import ServiceRecord from './ServiceRecord'
import { MyServiceContext } from './context'
import { setDocTitle } from '@/utils/setDocTitle'
import { useLocation } from 'umi'
import { jobStateList, personLevel, STATUS_COLOR, STATUS_TEXT } from './consts'

const EmploymentAssistanceDetail = () => {
    const store = useLocalObservable(() => Store)
    const { query: { code } } = useLocation()

    const { surveyScoreList, judgmentResults, dimensionHierarchy, assistanceInfo } = store
    const { name, gender, idCard, mobile, age, userInfo, jobState, serviceUnit, state, jobType, jobUnit, jobPosition } = assistanceInfo
    const { registeredProvinceName = '', registeredCityName = '', registeredDistrictName = '', registeredAddress = '',
        provinceName = '',
        cityName = '',
        districtName = '',
        address = '',
    } = userInfo || {}
    // 是否是我的记录页面，编辑操作与服务页面有差异
    const { isRecord } = useContext(MyServiceContext)

    const jobSeekerInformation = [
        { label: '姓名：', value: <EyeShowCom fullStr={name} type='name' /> },
        { label: '性别：', value: gender === 1 ? '男' : '女' },
        { label: '证件号码：', value: <EyeShowCom fullStr={idCard} type="idcard" /> },
        { label: '手机号：', value: <EyeShowCom fullStr={mobile} type="phone" /> },
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
        { label: '就业类型：', value: jobType , hide: state !== 50},
        { label: '就业单位：', value: jobUnit , hide: state !== 50},
        { label: '就业岗位：', value: jobPosition , hide: state !== 50},
    ]


    useEffect(() => {
        setDocTitle(isRecord ? '服务记录' : '服务')
        store.getAssistanceDetail(code)
        store.getAassistanceServerQuestionData(code)
        store.getAssistanceJobQuestionData(code)
    }, [])

    return (
        <div className={styles.my_service_page_component}>
            <div className={styles.top}>
                <TitleBlock title="服务" />
                <div className={styles.top_inner}>
                    {/* 求职者信息 */}
                    <div className={styles.job_seeker_information}>
                        <TitleAdvance title="求职者信息">
                            <Row gutter={[24, 24]}>
                                {jobSeekerInformation.map(item => (
                                    <Col span={12} key={item.label}>
                                        <span className={styles.label}>{item.label}</span>
                                        <span className={styles.value}>{item.value || '-'}</span>
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
                <div className={styles.step_wrapper}>
                    <div className={styles.second_step_content}>
                        {/* 诊断结果 */}
                        <DiagnosisResults
                            surveyScoreList={surveyScoreList}
                            judgmentResults={judgmentResults}
                            dimensionHierarchy={dimensionHierarchy}
                        />

                        {/* 帮扶措施 */}
                        {Number(state) > 20 && store.measureList.length > 0 && <AssistanceMeasures isRecord={isRecord} />}

                        {/* 服务记录 */}
                        {Number(state) > 30 && <ServiceRecord isRecord={isRecord} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(EmploymentAssistanceDetail)
