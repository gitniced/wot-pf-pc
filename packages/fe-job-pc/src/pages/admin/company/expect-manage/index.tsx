import { useRef } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { Row, Select, Space } from 'antd'
import classnames from 'classnames'

import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

import TitleBlock from '@/components/TitleBlock'

import type { JobExpectDto } from './interface'
import { WORK_TYPE_NAME_MAPS, WORK_TYPE_OPTIONS } from './constants'
import type { IRoute } from 'umi'
import { getSessionStorage } from '@/storage'
import EyeShowCom from '@/components/EyeShowCom'
import dayjs from 'dayjs'
import { NumberRange } from '@/components/NumberRange'
import MoreSelect from '@/components/MoreSelect'
import AreaCascader from '@/components/AreaCascader'
import { DatePicker } from '@/components/Picker'
import Store from './store'
import styles from './index.module.less'

const { RangePicker } = DatePicker

const RecruiterManage = () => {
    const store = useLocalObservable(() => Store)

    // 是否是中台
    const isMiddle = getSessionStorage('PLATFORM') === 'middle'

    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    const findThirdLevelElements = (tree: any, level = 1) => {
        let result: any = []
        if (Array.isArray(tree)) {
            tree.forEach(node => {
                const { childList } = node || {}
                // console.log(node)
                if (level === 3) {
                    result.push(node)
                } else if (Array.isArray(childList)) {
                    result = result.concat(findThirdLevelElements(childList, level + 1))
                }
            })
        }
        return result
    }

    const columns: ColumnsTypeItem<JobExpectDto>[] = [
        {
            title: '用户',
            width: 200,
            dataIndex: 'nickName',
            search: true,
            formItemProps: {
                label: '昵称',
            },
            formOrder: 5,
            render: (_, { nickName, mobile }) => {
                return (
                    <Space direction={'vertical'}>
                        <Row>{nickName}</Row>
                        <Row>
                            <EyeShowCom fullStr={mobile || ''} type="phone" />
                        </Row>
                    </Space>
                )
            },
        },
        {
            title: '求职类型',
            width: 150,
            dataIndex: 'type',
            search: true,
            formOrder: 0,
            render: (_, { type = 0 }) => {
                return WORK_TYPE_NAME_MAPS[Number(type)] || '-'
            },
            renderFormItem: () => {
                return (
                    <Select
                        placeholder="请选择"
                        style={{ width: '100%' }}
                        options={WORK_TYPE_OPTIONS}
                    />
                )
            },
        },
        {
            title: '期望行业',
            width: 120,
            dataIndex: 'industryName',
            formOrder: 1,
            formItemProps: {
                name: 'industry',
            },
            renderFormItem() {
                return (
                    <MoreSelect
                        all={false}
                        placeholder="请选择期望行业"
                        valueKey={'id'}
                        requestMethod="get"
                        requestUrl={'/common_data/industry/all?parentCode=0'}
                        fomatterResposeBody={data => {
                            let tempList = []
                            for (const key in data) {
                                tempList.push(data[key])
                            }
                            return tempList
                        }}
                        showSearch={false}
                    />
                )
            },
        },
        {
            title: '期望职位',
            width: 180,
            dataIndex: 'capacityName',
            formOrder: 2,
            formItemProps: {
                name: 'capacityId',
            },
            renderFormItem() {
                return (
                    <MoreSelect
                        all={false}
                        placeholder="请选择期望职位"
                        valueKey={'code'}
                        requestUrl={'/common_data/capacity/list_by_top'}
                        fomatterResposeBody={list => {
                            const { data } = list || {}
                            let tempList = findThirdLevelElements(data)
                            return tempList
                        }}
                    />
                )
            },
        },
        {
            title: '期望城市',
            width: 180,
            dataIndex: 'cityName',
            formOrder: 3,
            renderFormItem: () => {
                return <AreaCascader type="city" />
            },
        },
        {
            title: '期望薪资',
            width: 180,
            dataIndex: 'salary',
            formOrder: 4,
            render: (_, { minSalary, maxSalary }) => {
                return `${minSalary}~${maxSalary}`
            },
            formItemProps: {
                label: '薪资范围',
            },
            renderFormItem: () => {
                return <NumberRange holderStr="薪资" minStr="最低薪资" maxStr="最高薪资" />
            },
        },
        {
            hide: true,
            search: true,
            title: '手机号',
            width: 180,
            dataIndex: 'mobile',
            formOrder: 6,
        },
        {
            title: '来源',
            width: 180,
            dataIndex: 'sourceName',
        },
        {
            search: true,
            title: '登记时间',
            width: 180,
            dataIndex: 'createdAt',
            formOrder: 7,
            render: (_, { createdAt }) => {
                return dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')
            },
            renderFormItem: () => {
                return <RangePicker allowClear />
            },
        },
    ]

    return (
        <div
            className={classnames(styles.page_recruiter_manage, {
                [styles.isMiddle]: isMiddle,
            })}
        >
            <TitleBlock title="求职意向" />
            <SuperTable
                actionRef={actionRef}
                columns={columns}
                // @ts-ignore
                request={store.getJobExpectList}
                beforeSearchSubmit={(myParams: Record<string, any>) => {
                    const convertDate = (dateArray: any[] | null) => {
                        if (!dateArray?.length) {
                            return {
                                start: null,
                                end: null,
                            }
                        }
                        const start = +dayjs(dateArray[0].$d).startOf('day').format('x')
                        const end = +dayjs(dateArray[1].$d).startOf('day').format('x')
                        return {
                            start,
                            end,
                        }
                    }
                    // 跟进回款日期
                    const { start, end } = convertDate(myParams.createdAt)
                    myParams.startTime = start || undefined
                    myParams.endTime = end || undefined
                    delete myParams.createdAt

                    if (myParams?.salary?.length > 0) {
                        myParams.minSalary = myParams.salary?.[0]
                        myParams.maxSalary = myParams.salary?.[1]
                        delete myParams.salary
                    } else {
                        myParams.minSalary = undefined
                        myParams.maxSalary = undefined
                    }

                    if (myParams?.cityName?.length > 0) {
                        myParams.city = myParams.cityName?.[1]
                        delete myParams.cityName
                    } else {
                        myParams.city = undefined
                    }

                    return myParams
                }}
            />
        </div>
    )
}

const observePage: IRoute = observer(RecruiterManage)
observePage.title = '求职意向'

export default observePage
