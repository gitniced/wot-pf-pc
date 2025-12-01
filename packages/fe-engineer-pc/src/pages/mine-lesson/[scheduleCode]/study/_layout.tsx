import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'umi'
import styles from './_layout.module.less'
import type { PageProps } from '@/types'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import CustomMenu from './components/CustomMenu'

const Index: React.FC = observer((props: PageProps) => {
    const store = useLocalObservable(() => new Store())

    // 布局占位常量
    const LAYOUT_TOP_OFFSET = 64 // 顶部占位
    const LAYOUT_BOTTOM_OFFSET = 70 // 底部占位

    /**
     * 不需要展示布局的路由
     */
    const ignorePath: RegExp[] = [
        /^\/mine-lesson\/[^/]+\/study\/result$/,
        /^\/engineer-center\/mine-lesson\/[^/]+\/study\/result$/,
    ]
    const routeQuery = useLocation()
    const {
        //@ts-ignore
        query: { taskCode, stageCode, stepCode } = {},
    } = routeQuery || {}
    const { scheduleCode } = useParams<{ scheduleCode: string }>()

    const {
        scheduleInfo,
        nodeTree,
        getScheduleInfo,
        updateCourseCode,
        initTaskPage,
        getMenuLink,
        updateNodeTreeActiveAndOpen,
    } = store
    const { courseCode = '' } = scheduleInfo || {}

    /**  父级容器索引 */
    const parentContentRef = useRef<HTMLDivElement>(null)
    /**  左容器索引 */
    const leftContentRef = useRef<HTMLDivElement>(null)
    /**  是否展示布局 */
    const [disLayout, setDisLayout] = useState(false)
    /**  容器左边距 */
    const [domLeftNum, setDomLeftNum] = useState<number>(0)
    /**  容器上边距 */
    const [domTopNum, setDomTopNum] = useState<number>(0)
    /**  容器高度 */
    const [domHeightNum, setDomHeightNum] = useState<number>(0)
    const routeList = [
        { icon: '#partition', text: '学习路径', path: '/roadmap' },
        { icon: '#detail', text: '学习任务', path: '/task' },
    ]

    /**
     * 判断是否滚动到底部
     * @param threshold 触底阈值，默认30像素
     */
    const isBottom = (threshold: number = 30) => {
        const scrollContent = document.querySelector('.right_content')
        if (!scrollContent) return false

        const scrollTop = scrollContent.scrollTop || 0 // 滚动距离
        const scrollHeight = scrollContent.scrollHeight || 0 // 内容总高度
        const clientHeight = scrollContent.clientHeight || 0 // 可视区域高度

        // 当前滚动位置 + 可视区域高度 >= 内容总高度 - 阈值
        return scrollTop + clientHeight >= scrollHeight - threshold
    }

    /**
     * 判断是否滚动到底部 获取容器底部距离底部的高度
     */
    const getBottomOffset = () => {
        const scrollContent = document.querySelector('.right_content')
        if (!scrollContent) return 0

        const scrollTop = scrollContent.scrollTop || 0 // 滚动距离
        const scrollHeight = scrollContent.scrollHeight || 0 // 内容总高度
        const clientHeight = scrollContent.clientHeight || 0 // 可视区域高度
        // 容器底部距离底部的高度
        return scrollHeight - scrollTop - clientHeight
    }

    /**
     * 统一的左侧容器高度计算函数
     * @param currentScrollTop 当前滚动位置
     * @returns { height: number, top: number } 返回高度和top值
     */
    const calculateLeftContentLayout = (currentScrollTop: number) => {
        const contentTopY = parentContentRef?.current?.offsetTop || 0
        const clientHeight = document.documentElement.clientHeight || 0
        const isAtBottom = isBottom(LAYOUT_BOTTOM_OFFSET)
        const bottomOffset = getBottomOffset()

        let height = 0
        let top = 0

        if (currentScrollTop > contentTopY) {
            // 当滚动超过内容顶部时，固定在顶部
            top = LAYOUT_TOP_OFFSET
            height = isAtBottom
                ? clientHeight - LAYOUT_TOP_OFFSET - LAYOUT_BOTTOM_OFFSET + bottomOffset
                : clientHeight - LAYOUT_TOP_OFFSET
        } else {
            // 当滚动未超过内容顶部时，跟随滚动
            top = contentTopY - currentScrollTop + LAYOUT_TOP_OFFSET
            height =
                clientHeight - top - (isAtBottom ? LAYOUT_BOTTOM_OFFSET - LAYOUT_TOP_OFFSET : 0)
        }

        height = height - 12
        top = top + 12

        return { height, top }
    }

    /**
     * 窗口大小调整处理函数
     */
    const resizeHandler = () => {
        const domLeft =
            (parentContentRef?.current?.offsetLeft - document.documentElement.scrollLeft || 0) + 12
        setDomLeftNum(domLeft)

        const rightContentElement = document.querySelector('.right_content') as HTMLElement
        const currentScrollTop = rightContentElement?.scrollTop || 0
        const { height, top } = calculateLeftContentLayout(currentScrollTop)

        setDomHeightNum(height)
        setDomTopNum(top)
    }

    /**
     * 水平滚动处理函数
     */
    const scrollHandler = () => {
        const domLeft =
            (parentContentRef?.current?.offsetLeft - document.documentElement.scrollLeft || 0) + 12
        setDomLeftNum(domLeft)
    }

    /**
     * 内容区域滚动处理函数
     */
    const domScrollHandler = () => {
        const rightContentElement = document.querySelector('.right_content') as HTMLElement
        const currentScrollTop = rightContentElement?.scrollTop || 0
        const { height, top } = calculateLeftContentLayout(currentScrollTop)

        setDomTopNum(top)
        setDomHeightNum(height)

        const domLeft =
            (parentContentRef?.current?.offsetLeft - document.documentElement.scrollLeft || 0) + 12
        setDomLeftNum(domLeft)
    }

    /**
     * 组件初始化时设置布局和事件监听
     */
    useEffect(() => {
        const tempContainer = document.querySelector('.right_content') as HTMLElement
        const currentScrollTop = tempContainer?.scrollTop || 0

        // 使用统一的高度计算函数
        const { height, top } = calculateLeftContentLayout(currentScrollTop)

        setDomTopNum(top)
        setDomHeightNum(height)

        // 设置左边距
        const domLeft =
            (parentContentRef?.current?.offsetLeft - document.documentElement.scrollLeft || 0) + 12
        setDomLeftNum(domLeft)

        // 添加事件监听，先检查元素是否存在
        window.addEventListener('resize', resizeHandler)
        if (tempContainer) {
            tempContainer.addEventListener('scroll', domScrollHandler)
        }
        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
            if (tempContainer) {
                tempContainer.removeEventListener('scroll', domScrollHandler)
            }
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    useEffect(() => {
        if (scheduleCode) {
            getScheduleInfo(scheduleCode)
        }
    }, [scheduleCode])

    useEffect(() => {
        if (courseCode) {
            updateCourseCode(courseCode)
        }
    }, [courseCode])

    useEffect(() => {
        if (courseCode) {
            if (location.pathname === `/engineer-center/mine-lesson/${scheduleCode}/study/task`) {
                initTaskPage(courseCode, { taskCode, stageCode, stepCode })
            } else {
                initTaskPage(courseCode, { taskCode, stageCode, stepCode }, false)
            }
        }
    }, [location.pathname, courseCode, taskCode, stageCode, stepCode])

    useEffect(() => {
        const tempDisLayout = ignorePath.some(pattern => pattern.test(location.pathname))
        setDisLayout(tempDisLayout)
    }, [location.pathname])

    return (
        <div className={styles.page} ref={parentContentRef}>
            {disLayout ? null : (
                <div className={styles.left_content}>
                    <div
                        className={styles.menu_content}
                        ref={leftContentRef}
                        style={{ left: domLeftNum, top: domTopNum, height: domHeightNum }}
                    >
                        {routeList.map(item => (
                            <Link
                                key={item.path}
                                className={[
                                    styles.left_content_item,
                                    location.pathname.includes(`/study/roadmap`) &&
                                    item.path.includes(`/roadmap`)
                                        ? styles.active
                                        : '',
                                ].join(' ')}
                                to={`/mine-lesson/${scheduleCode}/study${item.path}${location.search}`}
                            >
                                <svg className={`icon`} aria-hidden="true">
                                    <use xlinkHref={item.icon} />
                                </svg>
                                <div className={styles.left_content_text}>{item.text}</div>
                            </Link>
                        ))}
                        <CustomMenu
                            list={nodeTree}
                            linkHandler={getMenuLink}
                            updateNodeTreeActiveAndOpen={updateNodeTreeActiveAndOpen}
                        />
                    </div>
                </div>
            )}
            <div
                className={styles.right_content}
                style={{ minHeight: domHeightNum > 600 ? domHeightNum : 600 }}
            >
                {props.children}
            </div>
        </div>
    )
})

export default Index
