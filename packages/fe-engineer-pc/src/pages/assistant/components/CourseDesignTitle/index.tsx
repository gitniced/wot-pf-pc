import styles from './index.module.less'
import { Button, Input, message, Modal } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import GenerateButton from '@/components/AIComp/GenerateButton'
import aiStore from '@/modules/ai/store'
import { observer, useLocalObservable } from 'mobx-react'
import { toJS } from 'mobx'
import { useCourseStore } from '@/modules/course/context'
import classNames from 'classnames'
import { BIT_TYPE } from '@/modules/ai/const'
import { DownloadOutlined } from '@ant-design/icons'
import { downloadWay } from '@/modules/course/service'
import { downloadFileByUrl } from '@/utils/file'
import { COURSE_DESIGN_STYLISTIC_MAP } from '@/modules/course/const'

interface ICourseDesignTitleProps {
    title: string
    bottomRender?: React.ReactNode
    style?: React.CSSProperties
    canEdit?: boolean
    onEdit?: (title: string) => void
}

const CourseDesignTitle: React.FC<ICourseDesignTitleProps> = props => {
    const store = useLocalObservable(() => aiStore)
    const courseStore = useCourseStore()
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)
    const tempTitle = useRef('')

    useEffect(() => {
        setTitle(props.title)
        setEdit(false)
    }, [props.title])

    const downloadWayHandler = useCallback(async () => {
        if (!store?.exchangeData?.bizType) {
            message.warning('请先选择体例')
            return
        }
        const type = store?.getStylisticType(store?.exchangeData?.bizType as BIT_TYPE)
        const url = await downloadWay({
            courseCode: store?.exchangeData?.courseCode,
            type,
        })
        if (url) {
            downloadFileByUrl(url, COURSE_DESIGN_STYLISTIC_MAP[type]?.name?.replaceAll?.('.', ''))
        }
    }, [store?.exchangeData?.bizType, store?.exchangeData?.courseCode])

    return (
        <div className={styles.course_design_title} style={props.style}>
            <div className={styles.course_design_title_wrapper}>
                <div className={styles.course_design_title_left}>
                    <div className={styles.title}>
                        {!edit ? (
                            <span>{title}</span>
                        ) : (
                            <Input
                                autoFocus
                                defaultValue={title}
                                onChange={e => {
                                    setTitle(e.target.value)
                                }}
                                maxLength={50}
                            />
                        )}

                        {props.canEdit &&
                            (edit ? (
                                <>
                                    <Button
                                        type="link"
                                        size="small"
                                        style={{ marginLeft: 8 }}
                                        onClick={() => {
                                            if (title) {
                                                setEdit(false)
                                                props.onEdit?.(title)
                                            } else {
                                                setEdit(false)
                                                setTitle(tempTitle.current)
                                                tempTitle.current = ''
                                            }
                                        }}
                                    >
                                        更新
                                    </Button>
                                    <Button
                                        type="link"
                                        size="small"
                                        danger
                                        onClick={() => {
                                            if (!store?.exchangeData?.taskCode) {
                                                message.warning('请先选择学习任务')
                                                return
                                            }

                                            Modal.confirm({
                                                type: 'warning',
                                                content:
                                                    '删除学习任务将一并删除学习任务下的全部学习环节、活动信息，删除后无法找回。是否确定删除？',
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: async () => {
                                                    try {
                                                        await courseStore.removeCourseTask(
                                                            store?.exchangeData?.taskCode,
                                                        )
                                                    } catch (error) {
                                                        message.error('删除失败')
                                                        throw error // 重新抛出错误，保持弹窗打开
                                                    }
                                                },
                                            })
                                        }}
                                    >
                                        删除
                                    </Button>
                                </>
                            ) : (
                                <svg
                                    className={classNames('icon', styles.edit_icon)}
                                    aria-hidden="true"
                                    onClick={() => {
                                        setEdit(true)
                                        tempTitle.current = title
                                    }}
                                >
                                    <use xlinkHref={`#edit`} />
                                </svg>
                            ))}
                    </div>
                </div>

                <div className={styles.course_design_title_right}>
                    {(store?.exchangeData?.bizType === BIT_TYPE.wayNine ||
                        store?.exchangeData?.bizType === BIT_TYPE.wayTen) && (
                        <span className={styles.title_desc}>
                            请先完成关键信息设计，体例内容将自动同步
                        </span>
                    )}
                    {store?.isStylistic && (
                        <Button icon={<DownloadOutlined />} onClick={downloadWayHandler}>
                            下载
                        </Button>
                    )}
                    {store?.exchangeData?.courseCode &&
                        store?.exchangeData?.bizType !== BIT_TYPE.wayNine &&
                        store?.exchangeData?.bizType !== BIT_TYPE.wayTen && (
                            <GenerateButton
                                params={{ ...(store?.exchangeData || {}) }}
                                title={title}
                                onOptionsClick={async () => {
                                    if (!store?.exchangeData) {
                                        message.warning('失败')
                                        return
                                    }

                                    return courseStore.refreshCourseDesignInfoByAI(
                                        toJS(store?.exchangeData),
                                    )
                                }}
                            />
                        )}
                    {/* <div className={styles.record}>生成记录(0)</div>
                <div className={styles.one_click_ai}>
                    <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/button_ai_small.png" />
                    一键生成
                </div> */}
                </div>
            </div>

            {props.bottomRender}
        </div>
    )
}

export default observer(CourseDesignTitle)
