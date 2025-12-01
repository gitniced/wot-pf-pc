import styles from './index.module.less'
import { useCallback, useRef, useState } from 'react'
import classNames from 'classnames'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { ICourseDataItem } from '../../types'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Modal, Radio } from 'antd'
import ClickEditInput from '@/components/ClickEditInput'
import { PlusOutlined } from '@ant-design/icons'
import type { ILearningHomework } from '../../types/learning'
import { LEARNING_EDIT_FORMAT, LEARNING_FILE_FORMAT } from '../../constants/learning'
import { createUploadResourceFile } from '../../service'
import { RESOURCE_FORMAT, RESOURCE_TYPE } from '@/modules/resource/const'
import customOpen from '@/utils/customOpen'
import useBroadcastChannel from '@/hooks/useBroadcastChannel'
import {
    generateComponentStatePrefix,
    generateHomeworkState,
    extractHomeworkIdFromState,
    findHomeworkIndexById,
} from './utils'
import { useEffect } from 'react'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditItemListHomeworkH2CardProps
    extends IUseComponentValueProps<ILearningHomework[]> {
    title: string
    dataTitle: string
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<ILearningHomework[]>, 'value'>[]
    majorCode: string
    uniqueId?: string
}

const DEFAULT_HOMEWORK: ILearningHomework[] = [
    {
        code: '',
        name: '',
        objectives: '',
        requirements: '',
        editFormat: LEARNING_EDIT_FORMAT.online,
        fileFormat: LEARNING_FILE_FORMAT.word,
        templateInfo: '',
        templateName: '',
        sort: 1,
    },
]

/**
 * 课后作业
 */
const ClickEditItemListHomeworkH2Card: React.FC<IClickEditItemListHomeworkH2CardProps> = props => {
    const [active, setActive] = useState(false)

    const mindBroadcastChannel = useBroadcastChannel<{
        state: string
        code: string
        name: string
    }>('mind')
    const wordBroadcastChannel = useBroadcastChannel<{
        state: string
        code: string
        name: string
    }>('word')
    const excelBroadcastChannel = useBroadcastChannel<{
        state: string
        code: string
        name: string
    }>('excel')

    const [loadingStates, setLoadingStates] = useState<{
        menu: Record<number, boolean>
        upload: Record<number, boolean>
    }>({
        menu: {},
        upload: {},
    })

    const defaultValueRef = useRef(JSON.parse(JSON.stringify(DEFAULT_HOMEWORK)))

    const {
        value: values,
        onChange,
        onChangeBlur,
    } = useComponentValue({
        value: props.value,
        defaultValue: props.defaultValue?.length ? props.defaultValue : defaultValueRef.current,
        refreshKey: props.refreshKey,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    // 生成唯一的组件 state 前缀（只在首次渲染时生成）
    const componentStatePrefixRef = useRef<string>('')
    if (!componentStatePrefixRef.current) {
        componentStatePrefixRef.current = generateComponentStatePrefix(props.uniqueId)
    }
    const componentStatePrefix = componentStatePrefixRef.current

    const handleHomeworkChange = useCallback(
        (assignmentIndex: number, field: keyof ILearningHomework, fieldValue: any) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues[assignmentIndex] = {
                    ...newValues[assignmentIndex],
                    [field]: fieldValue,
                }
                return newValues
            })
        },
        [onChange],
    )

    // 多字段修改方法
    const handleHomeworkMultiChange = useCallback(
        (assignmentIndex: number, fields: Partial<ILearningHomework>) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues[assignmentIndex] = {
                    ...newValues[assignmentIndex],
                    ...fields,
                }
                return newValues
            })
        },
        [onChange],
    )

    const handleDeleteHomework = useCallback(
        (assignmentIndex: number) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues.splice(assignmentIndex, 1)
                return newValues
            })
            if (!active) onChangeBlur()
        },
        [active, onChange, onChangeBlur],
    )

    const handleFileUpload = useCallback(
        async (assignmentIndex: number) => {
            setLoadingStates(prev => ({
                ...prev,
                upload: { ...prev.upload, [assignmentIndex]: true },
            }))

            try {
                const file = await createUploadResourceFile()
                handleHomeworkMultiChange(assignmentIndex, {
                    templateInfo: file.url,
                    templateName: file.name,
                })
                onChangeBlur()
            } finally {
                setLoadingStates(prev => ({
                    ...prev,
                    upload: { ...prev.upload, [assignmentIndex]: false },
                }))
            }
        },
        [handleHomeworkChange, onChangeBlur],
    )

    const onMenuClick = useCallback(
        async (
            e: Parameters<Exclude<MenuProps['onClick'], undefined>>[0],
            index: number,
            homework: ILearningHomework,
        ) => {
            setLoadingStates(prev => ({
                ...prev,
                menu: { ...prev.menu, [index]: true },
            }))

            try {
                const homeworkState = generateHomeworkState(componentStatePrefix, index, homework)

                if (e.key === RESOURCE_FORMAT.word) {
                    window.sessionStorage.setItem('office_broadcast_state', homeworkState)
                    customOpen(
                        `/office/word?fromType=${RESOURCE_TYPE.activityHomework}&majorCode=${props.majorCode}`,
                        '_blank',
                    )
                } else if (e.key === RESOURCE_FORMAT.excel) {
                    window.sessionStorage.setItem('office_broadcast_state', homeworkState)
                    customOpen(
                        `/office/excel?fromType=${RESOURCE_TYPE.activityHomework}&majorCode=${props.majorCode}`,
                        '_blank',
                    )
                } else if (e.key === RESOURCE_FORMAT.mind) {
                    window.sessionStorage.setItem('office_broadcast_state', homeworkState)
                    customOpen(
                        `/office/mind?fromType=${RESOURCE_TYPE.activityHomework}&majorCode=${props.majorCode}`,
                        '_blank',
                    )
                }
            } finally {
                setLoadingStates(prev => ({
                    ...prev,
                    menu: { ...prev.menu, [index]: false },
                }))
            }
        },
        [componentStatePrefix, props.majorCode],
    )

    // 渲染单个作业
    const renderHomework = useCallback(
        (assignmentData: ILearningHomework, assignmentIndex: number) => {
            return (
                <div key={assignmentIndex} className={styles.assignment}>
                    <div className={styles.assignment_index}>作业{assignmentIndex + 1}：</div>
                    <div className={styles.assignment_wrapper}>
                        <div className={styles.assignment_header}>
                            <div className={styles.assignment_title_wrapper}>
                                <ClickEditInput
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入"
                                    value={assignmentData.name}
                                    rows={1}
                                    lineHeight={24}
                                    padding={{ vertical: 4, horizontal: 12 }}
                                    style={{ borderRadius: 0 }}
                                    backgroundColor="transparent"
                                    onChange={value =>
                                        handleHomeworkChange(assignmentIndex, 'name', value)
                                    }
                                    onChangeBlur={value =>
                                        handleHomeworkChange(assignmentIndex, 'name', value)
                                    }
                                    plainTextMode
                                />
                            </div>
                        </div>

                        <div className={styles.assignment_content}>
                            <div className={styles.assignment_info}>
                                <div className={styles.info_row}>
                                    <div className={styles.info_label}>考核目标：</div>
                                    <div className={styles.info_content}>
                                        <ClickEditInput
                                            active={active}
                                            setActive={setActive}
                                            placeholder="请输入"
                                            value={assignmentData.objectives}
                                            rows={1}
                                            lineHeight={24}
                                            padding={{ vertical: 4, horizontal: 12 }}
                                            onChange={value =>
                                                handleHomeworkChange(
                                                    assignmentIndex,
                                                    'objectives',
                                                    value,
                                                )
                                            }
                                            onChangeBlur={value =>
                                                handleHomeworkChange(
                                                    assignmentIndex,
                                                    'objectives',
                                                    value,
                                                )
                                            }
                                            plainTextMode
                                        />
                                    </div>
                                </div>

                                <div className={styles.info_row}>
                                    <div className={styles.info_label}>任务要求：</div>
                                    <div className={styles.info_content}>
                                        <ClickEditInput
                                            active={active}
                                            setActive={setActive}
                                            placeholder="请输入"
                                            value={assignmentData.requirements}
                                            rows={1}
                                            lineHeight={24}
                                            padding={{ vertical: 4, horizontal: 12 }}
                                            onChange={value =>
                                                handleHomeworkChange(
                                                    assignmentIndex,
                                                    'requirements',
                                                    value,
                                                )
                                            }
                                            onChangeBlur={value =>
                                                handleHomeworkChange(
                                                    assignmentIndex,
                                                    'requirements',
                                                    value,
                                                )
                                            }
                                            plainTextMode
                                        />
                                    </div>
                                </div>

                                <div className={styles.info_row}>
                                    <div className={styles.info_label}>提交格式：</div>
                                    <div className={styles.info_content}>
                                        <Radio.Group
                                            value={assignmentData.editFormat}
                                            onChange={e => {
                                                handleHomeworkMultiChange(assignmentIndex, {
                                                    editFormat: e.target.value,
                                                    templateInfo: '',
                                                    templateName: '',
                                                    fileFormat: undefined,
                                                })
                                                setActive(true)
                                            }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 12,
                                            }}
                                        >
                                            <Radio value={LEARNING_EDIT_FORMAT.online}>
                                                <span className={styles.info_content_text}>
                                                    在线文档（文档/表格/脑图）
                                                </span>
                                                {assignmentData.editFormat ===
                                                LEARNING_EDIT_FORMAT.online ? (
                                                    !assignmentData.templateInfo ? (
                                                        <Dropdown
                                                            menu={{
                                                                onMouseDown: e => {
                                                                    e.preventDefault()
                                                                    e.stopPropagation()
                                                                },
                                                                onClick: e => {
                                                                    onMenuClick(
                                                                        e,
                                                                        assignmentIndex,
                                                                        assignmentData,
                                                                    )
                                                                    setActive(true)
                                                                },
                                                                items: [
                                                                    {
                                                                        key: RESOURCE_FORMAT.word,
                                                                        label: '文档',
                                                                    },
                                                                    {
                                                                        key: RESOURCE_FORMAT.excel,
                                                                        label: '表格',
                                                                    },
                                                                    {
                                                                        key: RESOURCE_FORMAT.mind,
                                                                        label: '脑图',
                                                                    },
                                                                ],
                                                            }}
                                                        >
                                                            <Button
                                                                type="link"
                                                                size="small"
                                                                loading={
                                                                    loadingStates.menu[
                                                                        assignmentIndex
                                                                    ]
                                                                }
                                                                style={{
                                                                    paddingTop: 0,
                                                                    paddingBottom: 0,
                                                                    marginTop: 0,
                                                                    marginBottom: 0,
                                                                }}
                                                            >
                                                                设置模版
                                                            </Button>
                                                        </Dropdown>
                                                    ) : (
                                                        <Dropdown
                                                            menu={{
                                                                items: [
                                                                    {
                                                                        key: 'edit',
                                                                        label: '编辑',
                                                                        onClick: () => {
                                                                            const code =
                                                                                assignmentData.templateInfo
                                                                            if (
                                                                                assignmentData.fileFormat ===
                                                                                LEARNING_FILE_FORMAT.word
                                                                            ) {
                                                                                const homeworkState =
                                                                                    generateHomeworkState(
                                                                                        componentStatePrefix,
                                                                                        assignmentIndex,
                                                                                        assignmentData,
                                                                                    )
                                                                                window.sessionStorage.setItem(
                                                                                    'office_broadcast_state',
                                                                                    homeworkState,
                                                                                )
                                                                                customOpen(
                                                                                    `/office/word/${code}?fromType=${RESOURCE_TYPE.activityHomework}`,
                                                                                    '_blank',
                                                                                )
                                                                            } else if (
                                                                                assignmentData.fileFormat ===
                                                                                LEARNING_FILE_FORMAT.excel
                                                                            ) {
                                                                                const homeworkState =
                                                                                    generateHomeworkState(
                                                                                        componentStatePrefix,
                                                                                        assignmentIndex,
                                                                                        assignmentData,
                                                                                    )
                                                                                window.sessionStorage.setItem(
                                                                                    'office_broadcast_state',
                                                                                    homeworkState,
                                                                                )
                                                                                customOpen(
                                                                                    `/office/excel/${code}?fromType=${RESOURCE_TYPE.activityHomework}`,
                                                                                    '_blank',
                                                                                )
                                                                            } else if (
                                                                                assignmentData.fileFormat ===
                                                                                LEARNING_FILE_FORMAT.mind
                                                                            ) {
                                                                                const homeworkState =
                                                                                    generateHomeworkState(
                                                                                        componentStatePrefix,
                                                                                        assignmentIndex,
                                                                                        assignmentData,
                                                                                    )
                                                                                window.sessionStorage.setItem(
                                                                                    'office_broadcast_state',
                                                                                    homeworkState,
                                                                                )
                                                                                customOpen(
                                                                                    `/office/mind/${code}?fromType=${RESOURCE_TYPE.activityHomework}`,
                                                                                    '_blank',
                                                                                )
                                                                            }
                                                                        },
                                                                    },
                                                                    {
                                                                        key: 'delete',
                                                                        label: '删除',
                                                                        onClick: () => {
                                                                            Modal.confirm({
                                                                                type: 'warning',
                                                                                title: '删除后无法找回，是否确定删除？',
                                                                                onOk: () => {
                                                                                    handleHomeworkMultiChange(
                                                                                        assignmentIndex,
                                                                                        {
                                                                                            templateInfo:
                                                                                                '',
                                                                                            templateName:
                                                                                                '',
                                                                                        },
                                                                                    )
                                                                                    onChangeBlur()
                                                                                },
                                                                            })
                                                                        },
                                                                    },
                                                                ],
                                                            }}
                                                        >
                                                            <Button
                                                                type="link"
                                                                size="small"
                                                                style={{
                                                                    paddingTop: 0,
                                                                    paddingBottom: 0,
                                                                    marginTop: 0,
                                                                    marginBottom: 0,
                                                                }}
                                                            >
                                                                已设置：
                                                                {assignmentData.templateName}
                                                            </Button>
                                                        </Dropdown>
                                                    )
                                                ) : null}
                                            </Radio>
                                            <Radio value={LEARNING_EDIT_FORMAT.file}>
                                                <span className={styles.info_content_text}>
                                                    文件（doc、docx、xlsx、xls、pptx、zip）
                                                </span>
                                                {assignmentData.editFormat ===
                                                LEARNING_EDIT_FORMAT.file ? (
                                                    !assignmentData.templateInfo ? (
                                                        <Button
                                                            type="link"
                                                            size="small"
                                                            loading={
                                                                loadingStates.upload[
                                                                    assignmentIndex
                                                                ]
                                                            }
                                                            style={{
                                                                paddingTop: 0,
                                                                paddingBottom: 0,
                                                                marginTop: 0,
                                                                marginBottom: 0,
                                                            }}
                                                            onClick={() => {
                                                                handleFileUpload(assignmentIndex)
                                                                setActive(true)
                                                            }}
                                                        >
                                                            上传模版
                                                        </Button>
                                                    ) : (
                                                        <>
                                                            <span>
                                                                {assignmentData.templateName}
                                                            </span>
                                                            <Button
                                                                type="link"
                                                                size="small"
                                                                loading={
                                                                    loadingStates.upload[
                                                                        assignmentIndex
                                                                    ]
                                                                }
                                                                style={{
                                                                    paddingTop: 0,
                                                                    paddingBottom: 0,
                                                                    marginTop: 0,
                                                                    marginBottom: 0,
                                                                }}
                                                                onClick={() => {
                                                                    handleFileUpload(
                                                                        assignmentIndex,
                                                                    )
                                                                    setActive(true)
                                                                }}
                                                            >
                                                                重新上传
                                                            </Button>
                                                        </>
                                                    )
                                                ) : null}
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.delete_btn}
                        onClick={() => handleDeleteHomework(assignmentIndex)}
                        style={{
                            marginLeft: 16,
                            opacity: values?.length <= 1 ? 0 : 1,
                            pointerEvents: values?.length <= 1 ? 'none' : 'auto',
                        }}
                    >
                        <svg className="icon" aria-hidden="true" style={{ width: 16, height: 16 }}>
                            <use xlinkHref={`#delete`} />
                        </svg>
                    </div>
                </div>
            )
        },
        [
            active,
            setActive,
            handleHomeworkChange,
            handleHomeworkMultiChange,
            handleDeleteHomework,
            handleFileUpload,
            loadingStates,
            componentStatePrefix,
            onMenuClick,
        ],
    )

    const handleBlur = useCallback(() => {
        if (!active) return
        setActive(false)
        onChange(
            v =>
                v?.filter(
                    item =>
                        item.code ||
                        item.name ||
                        item.objectives ||
                        item.requirements ||
                        item.editFormat ||
                        item.fileFormat ||
                        item.templateInfo,
                ) || [],
        )
        onChangeBlur()
    }, [active, onChangeBlur, onChange])

    const handleAddHomework = useCallback(() => {
        onChange(oldValues => {
            const newHomework: ILearningHomework = {
                code: '',
                name: '',
                objectives: '',
                requirements: '',
                editFormat: LEARNING_EDIT_FORMAT.online,
                fileFormat: LEARNING_FILE_FORMAT.word,
                templateInfo: '',
                templateName: '',
                sort: 1,
            }
            const newValues = [...(oldValues || []), newHomework]
            return newValues
        })
        setActive(true)
    }, [onChange])

    // 监听 broadcastChannel 消息
    useEffect(() => {
        const handleMessage = (
            msg: { state: string; code: string; name: string },
            fileFormat: LEARNING_FILE_FORMAT,
        ) => {
            // 提取 homeworkId
            const homeworkId = extractHomeworkIdFromState(msg.state, componentStatePrefix)
            if (!homeworkId) return

            // 找到匹配的作业项
            const currentValues = values || []
            const matchIndex = findHomeworkIndexById(currentValues, homeworkId)

            if (matchIndex === -1) return

            const defaultName =
                fileFormat === LEARNING_FILE_FORMAT.mind
                    ? '未命名脑图'
                    : fileFormat === LEARNING_FILE_FORMAT.word
                    ? '未命名文档'
                    : '未命名表格'

            handleHomeworkMultiChange(matchIndex, {
                templateInfo: msg.code,
                fileFormat: fileFormat,
                templateName: msg.name || defaultName,
            })
            onChangeBlur()
        }

        const handleMindMessage = (msg: { state: string; code: string; name: string }) => {
            handleMessage(msg, LEARNING_FILE_FORMAT.mind)
        }

        const handleWordMessage = (msg: { state: string; code: string; name: string }) => {
            handleMessage(msg, LEARNING_FILE_FORMAT.word)
        }

        const handleExcelMessage = (msg: { state: string; code: string; name: string }) => {
            handleMessage(msg, LEARNING_FILE_FORMAT.excel)
        }

        mindBroadcastChannel.on(handleMindMessage)
        wordBroadcastChannel.on(handleWordMessage)
        excelBroadcastChannel.on(handleExcelMessage)
    }, [
        componentStatePrefix,
        values,
        handleHomeworkMultiChange,
        onChangeBlur,
        mindBroadcastChannel,
        wordBroadcastChannel,
        excelBroadcastChannel,
    ])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_item_list_homework_h2_card, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.card_header}>
                <div className={styles.card_title}>{props.title}</div>
            </div>

            <div className={styles.card_content}>
                <div className={styles.assignments_list}>
                    {(values || []).map((assignment, assignmentIndex) =>
                        renderHomework(assignment, assignmentIndex),
                    )}
                </div>
            </div>

            <div className={styles.card_footer}>
                <Button type="ghost" onClick={handleAddHomework} icon={<PlusOutlined />}>
                    添加
                </Button>
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditItemListHomeworkH2Card)
