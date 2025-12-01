// 数据统计

import { Col, Row, Space, Spin, Tabs, Typography } from 'antd'
import styles from './index.module.less'
// import { SuperTable } from '@wotu/wotu-components'
import { useParams } from 'umi'
import type { RouteQuery } from '../interface'
import Breadcrumbs from '@/components/Breadcrumbs'
import KnowledgeEcharts from './KnowledgeEcharts'
import { useEffect, useMemo, useState } from 'react'
import { useLocalObservable } from 'mobx-react-lite'

import Store from './store'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import type {
    ColumnsSetting,
    ColumnsTypeItem,
} from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { PracticeItem } from './interface'
import { STATISTICS_DATA_OPTIONS } from './constants'
import { JOIN_USER_ENUM } from '../edit/constants'
import BusinessTable from '@/components/BusinessTable'
import useUserColumns from '@/hooks/useUserColumns'
import useUserStore from '@/hooks/useUserStore'

const Statistics = () => {
    const store = useLocalObservable(() => Store)
    const userStore = useUserStore()
    const { columnsSettings } = useUserColumns(userStore)

    const { statisticsData, knowledgePointCount, wrongKnowledgePointCount, loading } = store

    const { code } = useParams() as RouteQuery

    useEffect(() => {
        document.title = '练习统计'

        if (code) {
            store.getStatisticsData(code)
            store.getKnowledgeData(code)
        }
    }, [code])

    const columnsInStore = (key: string) => {
        if (columnsSettings.length) {
            const column = columnsSettings.find((item: ColumnsSetting) => item.key === key)

            return {
                ...column,
                hide: !column || column?.hide,
                order: column?.order,
            }
        }
    }

    const desensitizationList = [
        {
            key: 'name',
            type: '1',
            sign: true,
        },
        {
            key: 'account',
            type: '2',
        },
        {
            key: 'idcard',
            type: '4',
        },
        {
            key: 'mobile',
            type: '2',
        },
    ]

    const [columns] = useState(
        (
            [
                {
                    title: '姓名',
                    width: 140,
                    dataIndex: 'name',
                    search: true,
                },
                {
                    title: '账号名',
                    width: 140,
                    dataIndex: 'account',
                    search: true,
                    // render: val => val || '--',
                },
                {
                    title: '身份证号',
                    width: 220,
                    dataIndex: 'idcard',
                    search: true,

                    // render: val => val || '--',
                },
                {
                    title: '手机号',
                    width: 140,
                    dataIndex: 'mobile',
                    search: true,
                    // render: val => val || '--',
                },
                {
                    title: '已练习题数',
                    width: 140,
                    dataIndex: 'practicedCount',
                },
                {
                    title: '已完成轮次',
                    width: 140,
                    dataIndex: 'wheelCount',
                },
                {
                    title: '首轮正确率',
                    width: 140,
                    dataIndex: 'firstWheelAccuracyScore',
                    render: val => (val ? `${(val * 100).toFixed(2)}%` : '--'),
                },
                {
                    title: '最高正确率',
                    width: 140,
                    dataIndex: 'topWheelAccuracyScore',
                    render: val => (val ? `${(val * 100).toFixed(2)}%` : '--'),
                },
                {
                    title: '练习起止时间',
                    dataIndex: 'practiceTime',
                    width: 400,
                    fixed: 'right',
                    render: (_, { startTime, endTime }) => {
                        const FORMMT = 'YYYY-MM-DD HH:mm:ss'
                        const startTimeStr = startTime ? dayjs(startTime).format(FORMMT) : '不限'
                        const endTimeStr = endTime ? dayjs(endTime).format(FORMMT) : '不限'

                        if (!startTime && !endTime) return '--'
                        return `${startTimeStr} 至 ${endTimeStr}`
                    },
                },
            ] as ColumnsTypeItem<PracticeItem>[]
        ).map(item => ({
            ...item,
            ...columnsInStore(item.dataIndex as string),
        })),
    )

    const dataList = useMemo(() => {
        const getValue = (key: string) => {
            if (key === 'userCount') {
                return statisticsData.joinStatus === JOIN_USER_ENUM.NOT_LIMIT
                    ? '不限'
                    : statisticsData[key]
            }
            if (['startTime', 'endTime'].includes(key)) {
                return statisticsData[key] === 0
                    ? '不限'
                    : dayjs(statisticsData[key]).format('YYYY-MM-DD')
            }

            return statisticsData[key]
        }
        return STATISTICS_DATA_OPTIONS.map(item => ({
            ...item,
            value: getValue(item.key),
        }))
    }, [statisticsData])

    return (
        <div className={styles.page_practice_statistics}>
            <Breadcrumbs
                crumbData={[{ link: '/practice/list', name: '练习' }, { name: '练习统计' }]}
            />

            <Spin spinning={loading}>
                <div className={styles.practice_detail}>
                    <Typography.Title level={5}>{statisticsData.title}</Typography.Title>

                    <Row gutter={[16, 16]}>
                        {dataList.map(item => (
                            <Col span={8}>
                                <Space size={0}>
                                    <Typography>{item.label}：</Typography>
                                    <Typography className={styles.value}>{item.value}</Typography>
                                </Space>
                            </Col>
                        ))}
                    </Row>
                </div>

                <div className={styles.practice_data_tab}>
                    <Tabs
                        items={[
                            {
                                label: '练习情况',
                                key: 'practice',
                                children: (
                                    <BusinessTable
                                        rowKey="idcard"
                                        // @ts-ignore
                                        request={store.getPracticeList}
                                        columns={columns}
                                        params={{ practiceCode: code }}
                                        toolBar={true}
                                        desensitizationList={desensitizationList}
                                    />
                                ),
                            },
                            {
                                label: '知识点统计',
                                key: 'statistics',
                                children: (
                                    <KnowledgeEcharts
                                        questionCount={statisticsData.questionCount}
                                        knowledgePointCount={knowledgePointCount}
                                        wrongKnowledgePointCount={wrongKnowledgePointCount}
                                    />
                                ),
                            },
                        ]}
                    />
                </div>
            </Spin>
        </div>
    )
}

export default observer(Statistics)
