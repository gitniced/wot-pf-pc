import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { Badge, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { STATUS_ACTIVE, TYPE_TAG_TRANSFORMED, statusActive } from './const'
import HTTP from '@/servers/http'
import { getCookie, getLocalStorage } from '@/storage'

const API = {
    /**  活动管理分页  */
    enrollList: '/apply/front/activity/page',
    /**  报名项目-查询报名活动数量  */
    getCount: '/search/front/apply/entry_code_count',
}

export function hooks(statusList: number[]) {
    const organizationCode: string = getCookie('SELECT_ORG_CODE') || ''

    const selectedOrganizationDetail =
        getLocalStorage('USER_STORE')?.selectedOrganizationDetail || {}
    const { logo: organizationLogo, name: organizationName } = selectedOrganizationDetail || {}
    /**
     * list请求 publishStatus 发布状态 1已发布
     * organizationCode 机构code
     */
    const getEnrollDetailsList = async (params: any) => {
        const res: any = await HTTP(API.enrollList, 'post', {
            ...params,
            publishStatus: 1,
            organizationCode,
            statusList: statusList,
        })
        res.data =
            res?.data?.map((item: any) => ({ ...item, organizationLogo, organizationName })) || []
        return res
    }

    const getEnrollProjectList = async () => {
        let res: any =
            (await HTTP(API.getCount, 'get', {
                organizationCode,
            })) || []

        const fields = [
            'REVIEWS_PLAN',
            'TRAINING_PLAN',
            'TRAINING_CLASS',
            'SKILLS_COMPETITION',
            'COURSE_APPLY',
        ]

        res = res?.filter((i: { name: string }) => fields.includes(i.name)) || []

        return {
            data: res,
        }
    }

    const detailsColumns: ColumnsTypeItem<any>[] = [
        {
            search: true,
            title: '报名活动名称',
            dataIndex: 'name',
            render: (_, { name }) => <>{name || '-'}</>,
        },
        {
            search: false,
            title: '报名项目',
            dataIndex: 'entryName',
            render: (_, { entryName }) => <>{entryName || '-'}</>,
        },
        {
            title: '分类',
            dataIndex: 'categoryCode',
            ellipsis: true,
            labelTooltip: true,
            render: (_, { categoryName }) => <Tooltip title={categoryName}>{categoryName}</Tooltip>,
        },
        {
            title: '报名开始时间',
            dataIndex: 'applyStartTime',
            render: (_, { applyStartTime }) => {
                return (
                    <>{applyStartTime ? dayjs(applyStartTime).format('YYYY-MM-DD HH:mm') : '-'}</>
                )
            },
        },
        {
            search: false,
            title: '报名结束时间',
            dataIndex: 'applyEndTime',
            render: (_, { applyEndTime }) => {
                return <>{applyEndTime ? dayjs(applyEndTime).format('YYYY-MM-DD HH:mm') : '-'}</>
            },
        },
        {
            search: false,
            title: '活动状态',
            dataIndex: 'status',
            render: (_, { status }) => {
                return (
                    <>
                        <Badge status={statusActive[status] || 'default'} />{' '}
                        {STATUS_ACTIVE[status] || '-'}
                    </>
                )
            },
        },
    ]

    const projectColumns: ColumnsTypeItem<any>[] = [
        {
            search: false,
            title: '报名项目',
            dataIndex: 'name',
            render: (_, { name }) => <>{TYPE_TAG_TRANSFORMED[name] || '-'}</>,
        },
        {
            search: false,
            title: '报名活动数量',
            dataIndex: 'value',
            render: (_, { value }) => <>{value || 0}</>,
        },
    ]
    return { getEnrollDetailsList, detailsColumns, getEnrollProjectList, projectColumns }
}
