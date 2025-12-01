import Breadcrumbs from '@/components/Breadcrumbs'
import styles from './index.module.less'
import { Button, Modal, Tooltip, Typography, message } from 'antd'
import TitleBlock from '@/components/TitleBlock'
import type { SubmitItem, IRouteParams, LocationParams } from './interface'
import dayjs from 'dayjs'
import { observer, useLocalObservable } from 'mobx-react'
import GradingSubmitStore from './store'
import { useParams, useLocation, history } from 'umi'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import BusinessTable from '@/components/BusinessTable'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

const SubmitGrading = () => {
    const store = useLocalObservable(() => GradingSubmitStore)
    const { taskCode } = useParams() as IRouteParams

    const { query: routeQuery } = useLocation() as unknown as LocationParams

    useEffect(() => {
        document.title = '提交成绩'
    }, [])

    // 提交成绩
    const handleSubmitGrading = () => {
        if (!store.totalCount) {
            message.warn('暂无成绩可提交')
            return
        }
        Modal.confirm({
            centered: true,
            title: '提交成绩',
            content: '提交后将无法修改，是否确定提交?',
            onCancel: () => {},
            onOk: () => {
                store
                    .submitGrading({
                        taskCode,
                    })
                    .then(() => {
                        message.success('成绩提交成功')
                        window.open(`/exam-center/grading/grading-tasks?save_listTab=20`, '_self')
                    })
            },
        })
    }

    // 修改成绩
    const handleEditGrading = (stuCode: string) => {
        window.open(`/exam-center/grading/grading-detail/${taskCode}?stuCode=${stuCode}`, '_blank')
    }

    const columns: ColumnsTypeItem<SubmitItem>[] = [
        {
            title: '试卷名称',
            dataIndex: 'paperTitle',
            ellipsis: true,
        },
        {
            title: '考卷序号',
            dataIndex: 'submitSort',
            width: 120,
        },
        {
            title: '交卷时间',
            dataIndex: 'submitTime',
            render: submitTime => dayjs(submitTime).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            // @ts-ignore
            title: (
                <Tooltip title="不包含其他阅卷老师所给得分">
                    主观题得分 <InfoCircleOutlined />
                </Tooltip>
            ),
            dataIndex: 'subjectiveScore',
            width: 140,
        },
        {
            title: '阅卷人',
            dataIndex: 'teacherName',
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Typography.Link onClick={() => handleEditGrading(record.stuCode)}>
                    修改
                </Typography.Link>
            ),
        },
    ]

    return (
        <div className={styles.page_submit_grading}>
            <Breadcrumbs
                crumbData={[
                    { link: '/grading/grading-tasks', name: '阅卷任务' },
                    { name: '提交成绩' },
                ]}
            />

            <div className={styles.content_wrapper}>
                <TitleBlock title="提交成绩" />

                <BusinessTable
                    params={{
                        taskCode,
                        examCode: routeQuery?.examCode,
                    }}
                    columns={columns}
                    renderOptionBar={() => (
                        <Button type="primary" onClick={handleSubmitGrading}>
                            提交成绩
                        </Button>
                    )}
                    // @ts-ignore
                    request={store.getSubmitList}
                    search={false}
                />
            </div>
        </div>
    )
}

export default observer(SubmitGrading)
