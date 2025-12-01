import styles from './index.module.less'
import { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import React from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { ICourseDataItem } from '../../types'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ILearningResource } from '../../types/learning'
import ResourceRelevanceModal from './components/ResourceRelevanceModal'
import ResourceAddModal from './components/ResourceAddModal'
import { RESOURCE_TYPE } from '@/modules/resource/const'

interface IClickEditItemResourceH2CardProps extends IUseComponentValueProps<ILearningResource[]> {
    title: string
    dataTitle: string
    className?: string
    style?: React.CSSProperties
    items: Omit<ICourseDataItem<ILearningResource[]>, 'value'>[]
    courseCode: string
}

/**
 * 学习资源
 */
const ClickEditItemResourceH2Card: React.FC<IClickEditItemResourceH2CardProps> = props => {
    const [active, _setActive] = useState(false)
    const [resourceAddModalVisible, setResourceAddModalVisible] = useState(false)
    const [resourceRelevanceModalVisible, setResourceRelevanceModalVisible] = useState(false)

    const {
        value: values,
        onChange,
        onChangeBlur,
    } = useComponentValue({
        value: props.value,
        defaultValue: props.defaultValue,
        refreshKey: props.refreshKey,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const handleDeleteItem = useCallback(
        (index: number) => {
            onChange(oldValues => {
                const newValues = [...(oldValues || [])]
                newValues.splice(index, 1)
                return newValues
            })
            if (!active) onChangeBlur()
        },
        [active, onChange, onChangeBlur],
    )

    // const handleBlur = useCallback(() => {
    //     if (!active) return
    //     setActive(false)
    //     onChangeBlur()
    // }, [active, onChangeBlur])

    const excludeResourceCode = useMemo(() => {
        return (values?.map(resource => resource.resourceLibraryCode) || []).filter(
            resourceLibraryCode => !!resourceLibraryCode,
        ) as string[]
    }, [values])

    return (
        <div
            className={classNames(styles.item_resource, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
            style={props.style}
        >
            <div className={styles.item_resource_header}>
                <div className={styles.item_resource_header_title}>{props.title}</div>
            </div>

            <div className={styles.item_resource_content}>
                <div className={styles.resource_content}>
                    {(values || []).map((resource, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index + '_' + resource.code} className={styles.resource_item}>
                            <div className={styles.resource_item_text}>
                                <span>
                                    {resource.serialNumber}. {resource.name || '未命名资源'}
                                </span>
                                {resource.type !== RESOURCE_TYPE.activityResource && (
                                    <div className={styles.resource_link}>资源库</div>
                                )}
                            </div>

                            <div
                                className={styles.delete_btn}
                                onClick={() => handleDeleteItem(index)}
                            >
                                <svg
                                    className="icon"
                                    aria-hidden="true"
                                    style={{ width: 16, height: 16 }}
                                >
                                    <use xlinkHref={`#delete`} />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className={styles.item_resource_footer}
                style={{ marginTop: values && values.length > 0 ? 12 : 0 }}
            >
                <Button
                    type="ghost"
                    onClick={() => {
                        setResourceRelevanceModalVisible(true)
                    }}
                    icon={
                        <svg className="icon" aria-hidden="true" style={{ width: 16, height: 16 }}>
                            <use xlinkHref={`#link`} />
                        </svg>
                    }
                >
                    从资源库关联
                </Button>
                <Button
                    type="ghost"
                    onClick={() => {
                        setResourceAddModalVisible(true)
                    }}
                    icon={<PlusOutlined />}
                >
                    手动添加
                </Button>
            </div>

            <ResourceRelevanceModal
                courseCode={props.courseCode}
                excludeResourceCode={excludeResourceCode}
                open={resourceRelevanceModalVisible}
                onCancel={() => {
                    setResourceRelevanceModalVisible(false)
                }}
                onOk={resources => {
                    onChange(oldValues => {
                        const newValues = [
                            ...(oldValues || []),
                            ...resources.map(
                                (resource, index) =>
                                    ({
                                        code: '',
                                        name: resource.name,
                                        serialNumber: (values?.length || 0) + 1 * (index + 1),
                                        resourceLibraryCode: resource.code,
                                        fileFormat: resource.format,
                                        content: resource.code,
                                        type: resource.type,
                                    } as ILearningResource),
                            ),
                        ]
                        return newValues
                    })
                    onChangeBlur()
                    setResourceRelevanceModalVisible(false)
                }}
            />

            <ResourceAddModal
                open={resourceAddModalVisible}
                onCancel={() => {
                    setResourceAddModalVisible(false)
                }}
                onOk={resource => {
                    onChange(oldValues => {
                        const newValues = [
                            ...(oldValues || []),
                            {
                                code: '',
                                name: resource.name,
                                serialNumber: (values?.length || 0) + 1,
                                resourceLibraryCode: '',
                                fileFormat: resource.format,
                                content: resource.url || '',
                                type: RESOURCE_TYPE.activityResource,
                            } as ILearningResource,
                        ]
                        return newValues
                    })
                    onChangeBlur()
                    setResourceAddModalVisible(false)
                }}
            />
        </div>
    )
}

export default React.memo(ClickEditItemResourceH2Card)
