import React, { useEffect, Suspense, lazy } from 'react'
import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import { useRouteMatch } from 'umi'
import Store from './store'
import type { PageProps } from '@/types'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { useSaasTitle } from '@wotu/wotu-components'
import { Spin } from 'antd'

// 懒加载RoadmapGraph组件，实现代码分割
// 使用webpack魔法注释进行预加载优化
const RoadmapGraph = lazy(
    () =>
        import(
            /* webpackChunkName: "roadmap-graph" */
            /* webpackPrefetch: true */
            '@/components/RoadmapGraph'
        ),
)

const Roadmap: React.FC<PageProps> = () => {
    const isTeacher = useJudgeTeacher()
    useSaasTitle(`${isTeacher ? '教学-学习路径' : '学习-学习路径'}`)
    const routeMatch = useRouteMatch()
    const store = useLocalObservable(() => new Store())
    const { roadMapDetail, getRoadMap } = store

    const {
        //@ts-ignore
        params: { scheduleCode },
    } = routeMatch || {}

    useEffect(() => {
        // 并行执行：数据获取 + 组件预加载
        getRoadMap(scheduleCode, isTeacher)

        // 立即开始预加载RoadmapGraph组件和@antv chunk
        // 这样当数据加载完成时，组件代码很可能已经准备好了
        import('@/components/RoadmapGraph').catch(() => {
            // 预加载失败不影响正常流程，组件渲染时会重新加载
        })
    }, [scheduleCode])

    return (
        <div className={styles.roadmap}>
            <Suspense
                fallback={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 900,
                            height: 724,
                        }}
                    >
                        <Spin size="large" tip="正在加载学习路径图谱..." />
                    </div>
                }
            >
                <RoadmapGraph initialData={roadMapDetail} width={900} height={724} />
            </Suspense>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(Roadmap))
