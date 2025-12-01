import Breadcrumbs from '@/components/Breadcrumbs'
import {
    EXAMINE_COMMENT_TYPE,
    EXAMINE_COMMENT_TYPE_LABEL,
    EXAMINE_COMMENT_TYPE_VALUE,
} from '../student/const'
import styles from './index.module.less'
import type { IRoute } from 'umi'
import { useLocation, useParams } from 'umi'
import { getCommentSelfTableColumns } from './const'
import type { TabsProps } from 'antd'
import { Table, Tabs, Spin } from 'antd'
import { useEffect, useMemo } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import qs from 'qs'
import { cloneDeep } from 'lodash'
import CommentItem from './components/commentItem'
import type { PageProps } from '@/types'
import { getCookie } from '@/storage'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC<PageProps> = () => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const { query } = useLocation()
    const { type, projectCode } = query || {}
    const typedType = type as keyof typeof EXAMINE_COMMENT_TYPE_LABEL
    const store = useLocalObservable(() => new Store())
    const {
        // 第一步
        hasRequestAssProjects,
        assProjects,
        getAssProjects,
        // 第二步
        isRequestPending,
        isPendingSubmitEvaluation,
        waitEvaluationList,
        currentEvaluation,
        outcomeList,
        selfEvaluationTurbo,
        intraGroupEvaluationTurbo,
        interGroupEvaluationTurbo,
        selectEvaluation,
        updateComment,
        updateCriteria,
        getProjectOutcomes,
        submitEvaluation,
        initStore,
    } = store
    const { criteria, userCode } = currentEvaluation || {}
    const { taskName, projectName } = criteria || {}

    const waitEvaluationListTabs = useMemo(() => {
        return waitEvaluationList.map(item => ({
            label: item.userName,
            key: item.userCode,
        })) as unknown as Required<TabsProps>['items']
    }, [waitEvaluationList])

    // 获取链接地址
    const getLinkUrl = (linkType: 'task' | 'type' | 'com') => {
        const tempQuery = cloneDeep(query)
        switch (linkType) {
            case 'task':
                delete tempQuery.type
                delete tempQuery.projectCode
                return `/mine-lesson/${scheduleCode}/examine/student?${qs.stringify(tempQuery)}`
            case 'type':
                delete tempQuery.projectCode
                return `/mine-lesson/${scheduleCode}/examine/comment?${qs.stringify(tempQuery)}`
            default:
                return `/mine-lesson/${scheduleCode}/examine/comment?${qs.stringify(tempQuery)}`
        }
    }

    // 面包屑数据
    const crumbData = [
        {
            name: '我的任务',
            link: getLinkUrl('task'),
        },
        {
            name: EXAMINE_COMMENT_TYPE_LABEL[typedType],
            link: getLinkUrl('type'),
        },
        ...(projectCode
            ? [
                  {
                      name: '评价',
                      link: getLinkUrl('com'),
                  },
              ]
            : []),
    ]

    // 表格列数据
    const columns = useMemo(
        () => getCommentSelfTableColumns(scheduleCode, typedType, query),
        [scheduleCode, typedType],
    )

    useSaasTitle(
        `${
            projectCode
                ? `考核-${EXAMINE_COMMENT_TYPE_LABEL[typedType]}-评价`
                : `考核-${EXAMINE_COMMENT_TYPE_LABEL[typedType]}`
        }`,
    )

    // 根据评价类型和项目编码获取初始数据
    useEffect(() => {
        if (projectCode && scheduleCode) {
            switch (typedType) {
                case EXAMINE_COMMENT_TYPE.selfEvaluationCount:
                    selfEvaluationTurbo(getCookie('USER_CODE'), projectCode)
                    break
                case EXAMINE_COMMENT_TYPE.intraGroupPeerCount:
                    intraGroupEvaluationTurbo(projectCode)
                    break
                case EXAMINE_COMMENT_TYPE.interGroupPeerCount:
                    interGroupEvaluationTurbo(scheduleCode, projectCode)
                    break
                default:
                //
            }
        }
    }, [typedType, projectCode, scheduleCode])

    // 当前评价对象用户编码或项目编码更新时重新获取成果列表
    useEffect(() => {
        if (userCode && scheduleCode && projectCode) {
            getProjectOutcomes(userCode, scheduleCode, projectCode)
        }
    }, [userCode, scheduleCode, projectCode])

    // 第一步————获取考核项目列表数据
    useEffect(() => {
        if (typedType && scheduleCode) {
            getAssProjects(scheduleCode, EXAMINE_COMMENT_TYPE_VALUE[typedType])
        }
    }, [type, scheduleCode, projectCode])

    useEffect(() => {
        return () => {
            initStore()
        }
    }, [])

    console.log('waitEvaluationListTabs', waitEvaluationListTabs)
    // 渲染
    return (
        <div className={styles.comment}>
            <Breadcrumbs crumbData={crumbData} />

            <div className={styles.comment_children}>
                {projectCode ? (
                    <Spin spinning={isRequestPending}>
                        <div className={styles.comment_task}>
                            <div className={styles.task_title}>
                                {EXAMINE_COMMENT_TYPE_LABEL[typedType]}
                            </div>
                            <div className={styles.task_content}>
                                <div
                                    className={[
                                        typedType === EXAMINE_COMMENT_TYPE.selfEvaluationCount
                                            ? styles.task_content_item_self
                                            : styles.task_content_item,
                                    ].join(' ')}
                                >
                                    <span>学习任务：</span>
                                    <span className={styles.task_content_item_desc}>
                                        {taskName}
                                    </span>
                                </div>
                                <div
                                    className={[
                                        typedType === EXAMINE_COMMENT_TYPE.selfEvaluationCount
                                            ? styles.task_content_item_self
                                            : styles.task_content_item,
                                    ].join(' ')}
                                >
                                    <span>考核项目：</span>
                                    <span className={styles.task_content_item_desc}>
                                        {projectName}
                                    </span>
                                </div>
                            </div>

                            {type !== EXAMINE_COMMENT_TYPE.selfEvaluationCount &&
                                waitEvaluationListTabs.length > 0 && (
                                    <Tabs
                                        className={styles.task_tabs}
                                        activeKey={userCode}
                                        items={waitEvaluationListTabs}
                                        onChange={selectEvaluation}
                                    />
                                )}

                            <CommentItem
                                outcomeList={outcomeList}
                                currentEvaluation={currentEvaluation}
                                isPendingSubmitEvaluation={isPendingSubmitEvaluation}
                                updateComment={updateComment}
                                updateCriteria={updateCriteria}
                                submitEvaluation={submitEvaluation}
                            />
                        </div>
                    </Spin>
                ) : (
                    <Table
                        loading={!hasRequestAssProjects}
                        className={styles.comment_table}
                        columns={columns}
                        dataSource={assProjects}
                        pagination={false}
                        bordered
                    />
                )}
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index)) as unknown as IRoute
