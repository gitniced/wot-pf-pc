import React from 'react'
import type { PreviewItem } from '../utils/interface'
import styles from './index.module.less'
import { Draggable } from 'react-beautiful-dnd'
import { getViewComponents } from '../../web/create/components/Mytools/generatorFn'
import { getViewComponents as pcGetViewComponents } from '@/pages/gateway/pc-web/create/components/Mytools/generatorFn'
// import { DeleteOutlined } from '@ant-design/icons'
import { COMPONENT_TYPE, COMPONENT_TYPE_NAME } from '../const'
// @ts-ignore
import { cloneDeep } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'

const PrevCom = ({
    previewData,
    indexNum,
    hideTip,
    removePosition = 'right',
    mode = 'mobile',
    onDragTouch,
    onDragDelete,
    isDragDisabled,
}: {
    previewData: PreviewItem
    indexNum: number
    hideTip?: boolean
    removePosition?: 'right' | 'top'
    mode?: 'pc' | 'mobile'
    onDragTouch: (previewData: PreviewItem) => void
    onDragDelete: (id: number) => void
    isDragDisabled?: boolean
}) => {
    const viewFn: Record<string, (nowActive: PreviewItem) => JSX.Element> = {
        pc: pcGetViewComponents,
        mobile: getViewComponents,
    }
    return (
        // @ts-ignore
        <Draggable
            draggableId={previewData.id?.toString() as string}
            key={`${previewData.type}${previewData.id}`}
            index={indexNum}
            isDragDisabled={isDragDisabled}
        >
            {dragProvided => (
                <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    // style={{ position: 'relative'}}
                >
                    <div
                        className={[
                            styles.preview_item,
                            previewData.active ? styles.active : '',
                            previewData.type === COMPONENT_TYPE.CUSTOMER
                                ? styles.customer_wrapper_small
                                : '',
                            previewData.type === COMPONENT_TYPE.CUSTOMER && previewData.nameType
                                ? styles.customer_wrapper
                                : '',
                        ].join(' ')}
                        onClick={e => {
                            e.stopPropagation()
                            const tempPreviewData = cloneDeep(previewData)
                            tempPreviewData.active = true
                            onDragTouch(tempPreviewData)
                        }}
                    >
                        {viewFn[mode]?.(previewData)}
                        {previewData.active && !hideTip ? (
                            <div className={styles.text}>
                                <div className={styles.text_con}>
                                    {COMPONENT_TYPE_NAME[previewData.type]}
                                </div>
                            </div>
                        ) : null}
                        {previewData.active ? (
                            <div
                                className={[styles.delete, styles[removePosition]].join(' ')}
                                onClick={e => {
                                    e.stopPropagation()
                                    onDragDelete(previewData.id as number)
                                }}
                            >
                                {/* @ts-ignore */}
                                <DeleteOutlined />
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default PrevCom
