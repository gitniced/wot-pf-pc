import { Space, Tabs, Tooltip, Typography, Button } from 'antd'
import styles from './index.module.less'
import { GRADING_STATE_ENUM, MARK_STATE_ENUM_OPTIONS } from '../constants'
import { useMemo, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import MarkRecordStore from '../store'
import dayjs from 'dayjs'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { RecordListItem } from '../interface'
import useUserStore from '@/hooks/useUserStore'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import BusinessTable from '@/components/BusinessTable'
import { getDecodeInfo, usePageListConfig } from '@wotu/wotu-components'
import { SettingOutlined } from '@ant-design/icons'
import { downloadUrlFile } from '@/utils/tool'
import { isDemo } from '@/utils/customeFields'
// import { omit } from 'lodash'
// import { getDesenstitizedCertNum } from '@/utils/tool'

const RecordList = ({
    taskCode,
    handleShowSettingDetail,
}: {
    taskCode: string
    handleShowSettingDetail: () => void
}) => {
    const userStore = useUserStore()

    const store = useLocalObservable(() => MarkRecordStore)

    const { getPageListConfig, setPageListConfig } = usePageListConfig()

    const [activeTab, setActiveTab] = useState<number>(
        Number(getPageListConfig('save_listTab', GRADING_STATE_ENUM.FINISHED)),
    )

    const handleLinkToDetail = (stuExamCode: string) => {
        window.open(`/exam-center/exam-manage/record-detail/${stuExamCode}`, '_blank')
    }

    const isHidden = activeTab === GRADING_STATE_ENUM.NOT_SUBMIT

    const desensitizationList = [
        {
            key: 'stuName',
            type: '1',
            sign: true,
        },
        {
            key: 'certNumber',
            type: '4',
        },
        {
            key: 'teacherName',
            type: '1',
        },
    ]

    const columns = useMemo(
        () =>
            [
                {
                    title: '考生姓名',
                    dataIndex: 'stuName',
                    width: 150,
                    ellipsis: true,
                    search: true,
                },
                {
                    title: '证件号码',
                    dataIndex: 'certNumber',
                    width: 200,
                    ellipsis: true,
                    search: true,
                },
                {
                    title: '阅卷人',
                    dataIndex: 'teacherName',
                    width: 200,
                    ellipsis: true,
                    search: true,
                    hide: isHidden || activeTab === GRADING_STATE_ENUM.NO_NEED,
                    render: (_ = '--', record: any) => {
                        const shortName = _.split(',')
                            .map((i: string) => getDecodeInfo(i || '', '1'))
                            .join(',')
                        const fullName = _.split(',')
                            .map((i: string) => getDecodeInfo(i || ''))
                            .join(',')
                        return (
                            <Space>
                                <Typography.Text>
                                    {record.isHideMsg ? shortName || '--' : fullName || '--'}
                                </Typography.Text>
                            </Space>
                        )
                    },
                },
                {
                    title: '考卷序号',
                    dataIndex: 'submitSort',
                    width: 120,
                    ellipsis: true,
                    hide: isHidden,
                },
                {
                    title: '合格分/满分',
                    dataIndex: 'qualifiedScore',
                    width: 120,
                    ellipsis: true,
                    hide: isHidden,
                    render: (_, record) => {
                        const { fullScore, qualifiedScore } = record
                        return `${qualifiedScore}/${fullScore}`
                    },
                },
                {
                    title: '试卷名称',
                    dataIndex: 'paperTitle',
                    width: 240,
                    ellipsis: true,
                    hide: isHidden,
                },
                {
                    title: '交卷时间',
                    dataIndex: 'submitTime',
                    width: 200,
                    ellipsis: true,
                    hide: isHidden,
                    render: submitTime => dayjs(submitTime).format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    title: '客观题得分',
                    dataIndex: 'objectiveScore',
                    width: 120,
                    ellipsis: true,
                    fixed: 'right',
                    hide: isHidden,
                    render: val => val ?? '--',
                },
                {
                    // @ts-ignore
                    title:
                        activeTab !== GRADING_STATE_ENUM.ONGOING ? (
                            '主观题得分'
                        ) : (
                            <Tooltip title="阅卷中，主观题得分实时统计">
                                主观题得分
                                <InfoCircleOutlined />
                            </Tooltip>
                        ),
                    dataIndex: 'subjectiveScore',
                    width: activeTab === GRADING_STATE_ENUM.ONGOING ? 150 : 120,
                    ellipsis: true,
                    fixed: 'right',
                    hide: isHidden || activeTab === GRADING_STATE_ENUM.NO_NEED,
                    render: val => val ?? '--',
                },
                {
                    title: '最终成绩',
                    dataIndex: 'totalScore',
                    width: 120,
                    ellipsis: true,
                    fixed: 'right',
                    hide: isHidden || activeTab !== GRADING_STATE_ENUM.FINISHED,
                },
                {
                    title: '操作',
                    dataIndex: 'opereate',
                    width: 150,
                    fixed: 'right',
                    hide: ![GRADING_STATE_ENUM.FINISHED, GRADING_STATE_ENUM.ONGOING].includes(
                        activeTab,
                    ),
                    render: (_, record) => {
                        return (
                            <Typography.Link onClick={() => handleLinkToDetail(record.stuExamCode)}>
                                详情
                            </Typography.Link>
                        )
                    },
                },
            ] as ColumnsTypeItem<RecordListItem>[],
        [activeTab],
    )

    const onChangeTab = (activeKey: string) => {
        setPageListConfig(activeKey, 'save_listTab', true)
        setActiveTab(Number(activeKey))
    }

    const handleDownload = () => {
        downloadUrlFile('https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/example/%E9%98%85%E5%8D%B7%E8%AE%B0%E5%BD%95_d3cdf3b3.xlsx', `阅卷记录${dayjs().format('YYYYMMDDHHmmss')}`)
    }

    return (
        <div className={styles.component_record_list}>
            <BusinessTable
                params={{
                    taskCode,
                    state: activeTab,
                    organizationCode: userStore?.selectedOrganization,
                }}
                rowKey="stuCode"
                // @ts-ignore
                request={store.getRecordList}
                columns={columns}
                renderOptionBar={() => (
                    <Tabs
                        activeKey={activeTab.toString()}
                        onChange={onChangeTab}
                        tabBarExtraContent={
                            <Space>
                                {isDemo && <Button onClick={handleDownload}>
                                    下载阅卷记录
                                </Button>}
                                <Button icon={<SettingOutlined />} onClick={handleShowSettingDetail}>
                                    阅卷配置详情
                                </Button>
                            </Space>
                        }
                    >
                        {MARK_STATE_ENUM_OPTIONS.map(item => (
                            <Tabs.TabPane tab={item.label} key={item.value} />
                        ))}
                    </Tabs>
                )}
                toolBar={false}
                desensitizationList={desensitizationList}
            />
        </div>
    )
}

export default observer(RecordList)
