import styles from './index.module.less'
import { LeftOutlined, DownloadOutlined } from '@ant-design/icons'
import type { COURSE_DESIGN_STEP_MAP_STYLISTIC, COURSE_DESIGN_STEP } from '@/modules/course/const'
import {
    COURSE_DESIGN_STYLISTIC_MAP,
    COURSE_DESIGN_STYLISTIC,
    COURSE_DESIGN_LEARNING_TASK_TYPE,
} from '@/modules/course/const'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, history, useParams } from 'umi'
import { observer } from 'mobx-react'
import { Tooltip, Tabs, message } from 'antd'
import classNames from 'classnames'
import { CourseStoreProvider } from '@/modules/course/context'
import CourseDesignTitle from '@/pages/assistant/components/CourseDesignTitle'
import { useCourseStore } from '@/modules/course/context'
import type { IListBaseItem } from '@/modules/course/types/learning'
import http from '@/servers/http'
import api from '@/pages/assistant/home/api'
import { useSaasTitle } from '@wotu/wotu-components'
import HrefContainer from '@/components/HrefContainer'
import { downloadWay } from '@/modules/course/service'
import { downloadFileByUrl } from '@/utils/file'
import dayjs from 'dayjs'
import { getCookie } from '@/storage'

type StylisticKey =
    (typeof COURSE_DESIGN_STEP_MAP_STYLISTIC)[COURSE_DESIGN_STEP.check][number]['key']

const Index: React.FC = observer(() => {
    useSaasTitle(`课程预览`)

    const { search, pathname } = useLocation()
    let initStylistic = new URLSearchParams(search).get(
        'stylistic',
    ) as unknown as StylisticKey | null
    initStylistic = initStylistic ? Number(initStylistic) : 1

    const [activeKey, setActiveKey] = useState<StylisticKey | null>(initStylistic)
    const [detail, setDetail] = useState<Record<string, any> | null>(null)
    const stylisticList = useMemo(() => Object.values(COURSE_DESIGN_STYLISTIC_MAP), [])
    const stylistic = useMemo(
        () => (activeKey === null ? null : stylisticList.find(item => item.key === activeKey)),
        [activeKey, stylisticList],
    )
    const contentMainRef = useRef<HTMLDivElement>(null)

    const scrollToTop = () => {
        if (contentMainRef.current) {
            contentMainRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }

    const isManager = String(getCookie('SELECT_IDENTITY_CODE')) === '8'

    const courseStore = useCourseStore()

    const activeListItem = useMemo(() => courseStore.activeListItem, [courseStore.activeListItem])

    const taskList = useMemo(() => courseStore.taskList, [courseStore.taskList])

    const taskListItems = useMemo(() => {
        return taskList.map((item, index) => ({
            label: `任务${(item.sort, index + 1)}：${item.name}`,
            key: item.code,
        }))
    }, [taskList])

    const showTitleTabs = useMemo(() => {
        return (
            stylistic &&
            [
                COURSE_DESIGN_STYLISTIC.stylistic5,
                COURSE_DESIGN_STYLISTIC.stylistic6,
                COURSE_DESIGN_STYLISTIC.stylistic8,
                COURSE_DESIGN_STYLISTIC.stylistic7,
                COURSE_DESIGN_STYLISTIC.stylistic9,
                COURSE_DESIGN_STYLISTIC.stylistic10,
                COURSE_DESIGN_STYLISTIC.stylistic12,
            ].includes(stylistic?.key as COURSE_DESIGN_STYLISTIC)
        )
    }, [stylistic?.key])

    const getDetail = () => {
        http(api.coursesDetailBaseInfo, 'get', { code: courseStore?.courseCode }).then(
            (res: any) => {
                setDetail(res)
            },
        )
    }

    useEffect(() => {
        courseStore.getCourseTaskList()
        getDetail()
    }, [courseStore])

    const downloadAllWayHandler = useCallback(async () => {
        const hide = message.loading('下载中...')
        try {
            const url = await downloadWay({
                courseCode: courseStore.courseCode,
                type: 0,
            })
            message.success('下载成功')
            if (url) {
                downloadFileByUrl(
                    url,
                    `${courseStore.course?.name}-${dayjs().format('YYYYMMDDHHmmss')}`,
                )
            }
        } finally {
            hide()
        }
    }, [courseStore.courseCode, courseStore.course?.name])

    if (!courseStore.isHydrated || !detail) {
        return <div />
    }

    return (
        <div className={styles.course_preview}>
            <div className={styles.course_preview_left}>
                <div className={styles.header}>
                    <div className={styles.header_box}>
                        <div
                            className={classNames(styles.back, isManager && styles.hidden)}
                            onClick={() => {
                                history.goBack()
                            }}
                        >
                            <LeftOutlined />
                            返回
                        </div>

                        <div className={styles.title}>
                            <div>{detail?.name || '-'}</div>
                        </div>

                        <div className={styles.row}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#cengji`} />
                            </svg>
                            <div>
                                {detail?.majorName} {detail?.levelName && '·'} {detail?.levelName}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#people`} />
                            </svg>
                            <div>
                                {detail?.teacherList
                                    ?.map((ele: any) => ele?.name)
                                    ?.filter((ele: any) => ele)
                                    ?.join('、')}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.title} style={{ padding: '0 24px' }}>
                    <div>工学一体化体例</div>
                    <div onClick={downloadAllWayHandler}>
                        <a>
                            <DownloadOutlined />
                            下载
                        </a>
                    </div>
                </div>

                <div className={styles.list}>
                    {stylisticList.map(item => (
                        <HrefContainer
                            key={item.key}
                            url={`${pathname}?stylistic=${item.key}`}
                            className={classNames(
                                styles.list_item,
                                item.key === activeKey && styles.active,
                            )}
                            disableJump
                            onClick={() => {
                                setActiveKey(item.key as any)
                                const params = new URLSearchParams(search)
                                if (item.key === null) {
                                    params.delete('stylistic')
                                } else {
                                    params.set('stylistic', String(item.key))
                                }
                                const nextSearch = params.toString()
                                history.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname)
                                scrollToTop()
                            }}
                        >
                            <Tooltip title={item.name} placement="right">
                                <div className={styles.text}>{item.name}</div>
                            </Tooltip>
                        </HrefContainer>
                    ))}
                </div>
            </div>

            <div className={styles.course_preview_right}>
                <CourseDesignTitle
                    key={stylistic?.name ?? '未知命名'}
                    title={stylistic?.name ?? '未知命名'}
                    style={showTitleTabs ? { paddingBottom: 0 } : undefined}
                    bottomRender={
                        showTitleTabs ? (
                            <Tabs
                                tabBarStyle={{
                                    marginBottom: 0,
                                    borderBottom: 'none',
                                }}
                                items={taskListItems}
                                defaultActiveKey={activeListItem?.code}
                                onChange={e => {
                                    courseStore.setActiveListItem(
                                        taskList.find(item => item.code === e) as IListBaseItem,
                                        COURSE_DESIGN_LEARNING_TASK_TYPE.task,
                                    )
                                }}
                            />
                        ) : null
                    }
                />

                <div className={styles.content_main} ref={contentMainRef}>
                    {stylistic ? <stylistic.component /> : null}
                </div>
            </div>
        </div>
    )
})

const CoursePreview: React.FC = props => {
    const { id } = useParams<{ id: string }>()

    return (
        <CourseStoreProvider courseId={id}>
            <Index>{props.children}</Index>
        </CourseStoreProvider>
    )
}

export default CoursePreview
