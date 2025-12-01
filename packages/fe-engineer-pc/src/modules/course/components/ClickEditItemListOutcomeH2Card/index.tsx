import styles from './index.module.less'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { ICourseDataItem } from '../../types'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Modal, Radio } from 'antd'
import ClickEditInput from '@/components/ClickEditInput'
import { PlusOutlined } from '@ant-design/icons'
import type { ILearningOutcome } from '../../types/learning'
import {
    LEARNING_COLLABORATION_TYPE,
    LEARNING_EDIT_FORMAT,
    LEARNING_FILE_FORMAT,
} from '../../constants/learning'
import { createUploadResourceFile } from '../../service'
import { RESOURCE_FORMAT, RESOURCE_TYPE } from '@/modules/resource/const'
import customOpen from '@/utils/customOpen'
import useBroadcastChannel from '@/hooks/useBroadcastChannel'
import {
    generateComponentStatePrefix,
    generateOutcomeState,
    extractOutcomeIdFromState,
    findOutcomeIndexById,
} from './utils'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditItemListOutcomeH2CardProps extends IUseComponentValueProps<ILearningOutcome[]> {
    title: string
    dataTitle: string
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<ILearningOutcome[]>, 'value'>[]
    majorCode: string
    uniqueId?: string
}

const DEFAULT_OUTCOME: ILearningOutcome[] = [
    {
        code: '',
        name: '',
        type: LEARNING_COLLABORATION_TYPE.team,
        editFormat: LEARNING_EDIT_FORMAT.online,
        fileFormat: LEARNING_FILE_FORMAT.word,
        templateInfo: '',
        templateName: '',
        sort: 1,
    },
]

/**
 * 学习成果
 */
const ClickEditItemListOutcomeH2Card: React.FC<IClickEditItemListOutcomeH2CardProps> = props => {
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

    const defaultValueRef = useRef(JSON.parse(JSON.stringify(DEFAULT_OUTCOME)))

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

    const handleOutcomeChange = useCallback(
        (outcomeIndex: number, field: keyof ILearningOutcome, fieldValue: any) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues[outcomeIndex] = {
                    ...newValues[outcomeIndex],
                    [field]: fieldValue,
                }
                return newValues
            })
        },
        [onChange],
    )

    // 多字段修改方法
    const handleOutcomeMultiChange = useCallback(
        (outcomeIndex: number, fields: Partial<ILearningOutcome>) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues[outcomeIndex] = {
                    ...newValues[outcomeIndex],
                    ...fields,
                }
                return newValues
            })
        },
        [onChange],
    )

    // 处理协作模式变更 - 所有成果联动
    const handleCollaborationTypeChange = useCallback(
        (collaborationType: LEARNING_COLLABORATION_TYPE) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                // 更新所有成果的协作模式
                newValues.forEach((outcome, index) => {
                    newValues[index] = {
                        ...newValues[index],
                        type: collaborationType,
                    }
                })
                return newValues
            })
        },
        [onChange],
    )

    const handleDeleteOutcome = useCallback(
        (outcomeIndex: number) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues.splice(outcomeIndex, 1)
                return newValues
            })
            if (!active) onChangeBlur()
        },
        [active, onChange, onChangeBlur],
    )

    const handleFileUpload = useCallback(
        async (outcomeIndex: number) => {
            setLoadingStates(prev => ({
                ...prev,
                upload: { ...prev.upload, [outcomeIndex]: true },
            }))

            try {
                const file = await createUploadResourceFile()
                handleOutcomeMultiChange(outcomeIndex, {
                    templateInfo: file.url,
                    templateName: file.name,
                })
                onChangeBlur()
            } finally {
                setLoadingStates(prev => ({
                    ...prev,
                    upload: { ...prev.upload, [outcomeIndex]: false },
                }))
            }
        },
        [handleOutcomeMultiChange, onChangeBlur],
    )

    const onMenuClick = useCallback(
        async (
            e: Parameters<Exclude<MenuProps['onClick'], undefined>>[0],
            index: number,
            outcome: ILearningOutcome,
        ) => {
            setLoadingStates(prev => ({
                ...prev,
                menu: { ...prev.menu, [index]: true },
            }))

            try {
                const outcomeState = generateOutcomeState(componentStatePrefix, index, outcome)

                if (e.key === RESOURCE_FORMAT.word) {
                    window.sessionStorage.setItem('office_broadcast_state', outcomeState)
                    customOpen(
                        `/office/word?fromType=${RESOURCE_TYPE.activityOutcome}&majorCode=${props.majorCode}`,
                        '_blank',
                    )
                } else if (e.key === RESOURCE_FORMAT.excel) {
                    window.sessionStorage.setItem('office_broadcast_state', outcomeState)
                    customOpen(
                        `/office/excel?fromType=${RESOURCE_TYPE.activityOutcome}&majorCode=${props.majorCode}`,
                        '_blank',
                    )
                } else if (e.key === RESOURCE_FORMAT.mind) {
                    window.sessionStorage.setItem('office_broadcast_state', outcomeState)
                    customOpen(
                        `/office/mind?fromType=${RESOURCE_TYPE.activityOutcome}&majorCode=${props.majorCode}`,
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

    // 渲染单个学习成果
    const renderLearningOutcome = useCallback(
        (outcomeData: ILearningOutcome, outcomeIndex: number) => {
            return (
                <div key={outcomeIndex} className={styles.learning_outcome}>
                    <div className={styles.outcome_index}>成果{outcomeIndex + 1}：</div>
                    <div className={styles.learning_outcome_wrapper}>
                        <div className={styles.outcome_header}>
                            <div className={styles.outcome_title_wrapper}>
                                <ClickEditInput
                                    active={active}
                                    setActive={setActive}
                                    placeholder="请输入成果标题"
                                    value={outcomeData.name}
                                    rows={1}
                                    lineHeight={24}
                                    padding={{ vertical: 4, horizontal: 12 }}
                                    style={{ borderRadius: 0 }}
                                    backgroundColor="transparent"
                                    onChange={value =>
                                        handleOutcomeChange(outcomeIndex, 'name', value)
                                    }
                                    onChangeBlur={value =>
                                        handleOutcomeChange(outcomeIndex, 'name', value)
                                    }
                                    plainTextMode
                                />
                            </div>
                        </div>

                        <div className={styles.outcome_content}>
                            <div className={styles.outcome_info}>
                                <div className={styles.info_row}>
                                    <div className={styles.info_label}>提交格式：</div>
                                    <div className={styles.info_content}>
                                        <Radio.Group
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 12,
                                            }}
                                            value={outcomeData.editFormat}
                                            onChange={e => {
                                                handleOutcomeMultiChange(outcomeIndex, {
                                                    editFormat: e.target.value,
                                                    templateInfo: '',
                                                    templateName: '',
                                                    fileFormat: undefined,
                                                })
                                                setActive(true)
                                            }}
                                        >
                                            <Radio value={LEARNING_EDIT_FORMAT.online}>
                                                <span className={styles.info_content_text}>
                                                    在线文档（文档/表格/脑图）
                                                </span>
                                                {outcomeData.editFormat ===
                                                LEARNING_EDIT_FORMAT.online ? (
                                                    !outcomeData.templateInfo ? (
                                                        <Dropdown
                                                            menu={{
                                                                onMouseDown: e => {
                                                                    e.preventDefault()
                                                                    e.stopPropagation()
                                                                },
                                                                onClick: e => {
                                                                    onMenuClick(
                                                                        e,
                                                                        outcomeIndex,
                                                                        outcomeData,
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
                                                                    loadingStates.menu[outcomeIndex]
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
                                                                                outcomeData.templateInfo
                                                                            if (
                                                                                outcomeData.fileFormat ===
                                                                                LEARNING_FILE_FORMAT.word
                                                                            ) {
                                                                                const outcomeState =
                                                                                    generateOutcomeState(
                                                                                        componentStatePrefix,
                                                                                        outcomeIndex,
                                                                                        outcomeData,
                                                                                    )
                                                                                window.sessionStorage.setItem(
                                                                                    'office_broadcast_state',
                                                                                    outcomeState,
                                                                                )
                                                                                customOpen(
                                                                                    `/office/word/${code}?fromType=${RESOURCE_TYPE.activityOutcome}`,
                                                                                    '_blank',
                                                                                )
                                                                            } else if (
                                                                                outcomeData.fileFormat ===
                                                                                LEARNING_FILE_FORMAT.excel
                                                                            ) {
                                                                                const outcomeState =
                                                                                    generateOutcomeState(
                                                                                        componentStatePrefix,
                                                                                        outcomeIndex,
                                                                                        outcomeData,
                                                                                    )
                                                                                window.sessionStorage.setItem(
                                                                                    'office_broadcast_state',
                                                                                    outcomeState,
                                                                                )
                                                                                customOpen(
                                                                                    `/office/excel/${code}?fromType=${RESOURCE_TYPE.activityOutcome}`,
                                                                                    '_blank',
                                                                                )
                                                                            } else if (
                                                                                outcomeData.fileFormat ===
                                                                                LEARNING_FILE_FORMAT.mind
                                                                            ) {
                                                                                const outcomeState =
                                                                                    generateOutcomeState(
                                                                                        componentStatePrefix,
                                                                                        outcomeIndex,
                                                                                        outcomeData,
                                                                                    )
                                                                                window.sessionStorage.setItem(
                                                                                    'office_broadcast_state',
                                                                                    outcomeState,
                                                                                )
                                                                                customOpen(
                                                                                    `/office/mind/${code}?fromType=${RESOURCE_TYPE.activityOutcome}`,
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
                                                                                    handleOutcomeMultiChange(
                                                                                        outcomeIndex,
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
                                                                {outcomeData.templateName}
                                                            </Button>
                                                        </Dropdown>
                                                    )
                                                ) : null}
                                            </Radio>
                                            <Radio value={LEARNING_EDIT_FORMAT.file}>
                                                <span className={styles.info_content_text}>
                                                    文件（doc、docx、xlsx、xls、pptx、zip）
                                                </span>
                                                {outcomeData.editFormat ===
                                                LEARNING_EDIT_FORMAT.file ? (
                                                    !outcomeData.templateInfo ? (
                                                        <Button
                                                            type="link"
                                                            size="small"
                                                            loading={
                                                                loadingStates.upload[outcomeIndex]
                                                            }
                                                            style={{
                                                                paddingTop: 0,
                                                                paddingBottom: 0,
                                                                marginTop: 0,
                                                                marginBottom: 0,
                                                            }}
                                                            onClick={() => {
                                                                handleFileUpload(outcomeIndex)
                                                                setActive(true)
                                                            }}
                                                        >
                                                            上传模版
                                                        </Button>
                                                    ) : (
                                                        <>
                                                            <span>{outcomeData.templateName}</span>
                                                            <Button
                                                                type="link"
                                                                size="small"
                                                                loading={
                                                                    loadingStates.upload[
                                                                        outcomeIndex
                                                                    ]
                                                                }
                                                                style={{
                                                                    paddingTop: 0,
                                                                    paddingBottom: 0,
                                                                    marginTop: 0,
                                                                    marginBottom: 0,
                                                                }}
                                                                onClick={() => {
                                                                    handleFileUpload(outcomeIndex)
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

                                <div className={styles.info_row}>
                                    <div className={styles.info_label}>协作模式：</div>
                                    <div className={styles.info_content}>
                                        <Radio.Group
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 16,
                                            }}
                                            value={outcomeData.type}
                                            onChange={e => {
                                                handleCollaborationTypeChange(e.target.value)
                                                setActive(true)
                                            }}
                                        >
                                            <Radio value={LEARNING_COLLABORATION_TYPE.team}>
                                                <span className={styles.info_content_text}>
                                                    团队提交（团队协作完成，由组长统一提交）
                                                </span>
                                            </Radio>
                                            <Radio value={LEARNING_COLLABORATION_TYPE.personal}>
                                                <span className={styles.info_content_text}>
                                                    个人提交（个人独立完成，每人均需提交）
                                                </span>
                                            </Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.delete_btn}
                        onClick={() => handleDeleteOutcome(outcomeIndex)}
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
            handleOutcomeChange,
            handleOutcomeMultiChange,
            handleDeleteOutcome,
            handleFileUpload,
            handleCollaborationTypeChange,
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
                        item.type ||
                        item.editFormat ||
                        item.fileFormat ||
                        item.templateInfo,
                ) || [],
        )
        onChangeBlur()
    }, [active, onChangeBlur, onChange])

    const handleAddOutcome = useCallback(() => {
        onChange(oldValues => {
            const currentCollaborationType =
                oldValues && oldValues.length > 0
                    ? oldValues[0].type
                    : LEARNING_COLLABORATION_TYPE.team

            const newOutcome: ILearningOutcome = {
                code: '',
                name: '',
                type: currentCollaborationType,
                editFormat: LEARNING_EDIT_FORMAT.online,
                fileFormat: LEARNING_FILE_FORMAT.word,
                templateInfo: '',
                templateName: '',
                sort: 1,
            }

            return [...(oldValues || []), newOutcome]
        })
        setActive(true)
    }, [onChange, setActive])

    // 监听 broadcastChannel 消息
    useEffect(() => {
        const handleMessage = (
            msg: { state: string; code: string; name: string },
            fileFormat: LEARNING_FILE_FORMAT,
        ) => {
            // 提取 outcomeId
            const outcomeId = extractOutcomeIdFromState(msg.state, componentStatePrefix)
            if (!outcomeId) return

            // 找到匹配的成果项
            const currentValues = values || []
            const matchIndex = findOutcomeIndexById(currentValues, outcomeId)

            if (matchIndex === -1) return

            const defaultName =
                fileFormat === LEARNING_FILE_FORMAT.mind
                    ? '未命名脑图'
                    : fileFormat === LEARNING_FILE_FORMAT.word
                    ? '未命名文档'
                    : '未命名表格'

            handleOutcomeMultiChange(matchIndex, {
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

        // 组件卸载时自动清理
        return () => {
            mindBroadcastChannel.off(handleMindMessage)
            wordBroadcastChannel.off(handleWordMessage)
            excelBroadcastChannel.off(handleExcelMessage)
        }
    }, [
        componentStatePrefix,
        values,
        handleOutcomeMultiChange,
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
            className={classNames(styles.click_edit_item_list_outcome_h2_card, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.card_header}>
                <div className={styles.card_title}>{props.title}</div>
            </div>

            <div className={styles.card_content}>
                <div className={styles.outcomes_list}>
                    {(values || []).map((outcome, outcomeIndex) =>
                        renderLearningOutcome(outcome, outcomeIndex),
                    )}
                </div>
            </div>

            <div className={styles.card_footer}>
                <Button type="ghost" onClick={handleAddOutcome} icon={<PlusOutlined />}>
                    添加
                </Button>
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditItemListOutcomeH2Card)
