import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { UPDATE_TYPE, getViewStore } from './store'
import type { PreviewItem } from '../../components/utils/interface'
import MoveCom from '@/pages/gateway/components/MoveItem'

import type { DraggableLocation, DragStart, DropResult } from 'react-beautiful-dnd'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useEffect, useState } from 'react'
import { PcCreateDefault } from '@/pages/gateway/components/CreateDefault'
import { component_type } from '../../components/utils/const'
import PrevCom from '@/pages/gateway/components/PrevItem'
import CreateHeader from '@/pages/gateway/components/CreateHeader'
// @ts-ignore
import { cloneDeep } from 'lodash'
import { getCookie } from '@/storage'
import PcWebActionWarp from './components/PcWebActionWarp'
import type { COMPONENT_TYPE } from '../../components/const'
import getCustomLinkList from '@/utils/getCustomLinkList'

const Index = (props: any) => {
    const stores = useLocalObservable(() => getViewStore())

    const orgName = getCookie('ORG_NAME')
    useEffect(() => {
        // stores.getGraphicData()
        stores.getComponentList()
        // stores.getBrushQuestData()
        ;(async () => {
            let list = await getCustomLinkList('pc')
            stores.getLinkList(list)
        })()

        return () => {
            stores.clearData()
            stores.clearInstance()
        }
    }, [])

    const [currentDrag, setCurrentDrag] = useState('')

    /**
     *  内容区域的点击事件
     * @param params
     */
    const onDragTouch = (params: PreviewItem) => {
        stores.updatePreviewList(UPDATE_TYPE.FIX, { previewItem: params })
    }
    /**
     * 删除行为
     * @param id
     */
    const onDragDelete = (id: number) => {
        stores.updatePreviewList(UPDATE_TYPE.DELETE, { id })
    }

    /**
     * 开始拖动
     * @param result
     */
    const onDragStart = (result: DragStart) => {
        const { draggableId } = result
        if (component_type.includes(draggableId)) {
            setCurrentDrag(draggableId)
        }
    }
    /**
     *  拖动结束
     * @param result
     */
    const onDragEnd = (result: DropResult) => {
        setCurrentDrag('')
        const { draggableId, destination, source } = result || {}
        const { droppableId: fromDropId, index: fromIndex } = (source as DraggableLocation) || {}
        const { droppableId: toDropId, index: toIndex } = (destination as DraggableLocation) || {}
        if (fromDropId === toDropId) {
            if (fromDropId === 'pc-web') {
                stores.updatePreviewList(UPDATE_TYPE.EDIT, { from: fromIndex, to: toIndex })
            }
        } else {
            if (toDropId === 'pc-web') {
                stores.updatePreviewList(UPDATE_TYPE.ADD, {
                    previewItem: PcCreateDefault(draggableId as COMPONENT_TYPE),
                    from: fromIndex,
                    to: toIndex,
                })
            }
        }
    }

    // 监听pageTitle和pageColor 变化时深copy previewList 绕过Drop的provide的忽略list以外变化的memo
    useEffect(() => {
        const tempPreviewList = cloneDeep(stores.previewList)
        stores.updatePreviewList(UPDATE_TYPE.COVER, { list: tempPreviewList })
    }, [stores.pageTitle, stores.pageColor])

    useEffect(() => {
        const {
            location: { query },
        } = props
        const { code } = query || {}
        stores.getPreviewData(code)
        document.title = orgName
            ? `微页面${code ? '编辑' : '新增'}-${orgName}`
            : `微页面${code ? '编辑' : '新增'}`
    }, [])
    // 让mobx 进行依赖收集
    stores.previewList

    // return (
    //     <div className={styles.page}>
    // <CreateHeader
    //     backPath="/gateway/pc-web"
    //     saveDaft={stores.savePreviewData}
    //     savePublish={stores.savePreviewData}
    //     unSave={stores.unSave}
    //     status={stores.status}
    // />
    //         <div className={styles.content}>
    //             {/* @ts-ignore  */}
    // <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
    //     <div className={styles.component_list}>
    //         {MoveCom(stores.componentsList, currentDrag, {
    //             style: { width: '100%' },
    //         })}
    //         <div className={styles.component_list_shadow} />
    //     </div>
    //     <div className={styles.drop_content}>
    //         {/* @ts-ignore */}
    //         <Droppable droppableId="pc-web">
    //             {provided => {
    //                 console.log(provided, '这里应该渲染的')
    //                 return (
    //                     <div
    //                         className={styles.pc_web}
    //                         {...provided.droppableProps}
    //                         ref={provided.innerRef}
    //                         style={{ background: stores.pageColor }}
    //                     >
    //                         {stores.previewList.map(
    //                             (item: PreviewItem, previewItemIndex: number) => {
    //                                 return (
    //                                     <PrevCom
    //                                         mode="pc"
    //                                         key={`prev_${item.id}`}
    //                                         previewData={item}
    //                                         removePosition="top"
    //                                         indexNum={previewItemIndex}
    //                                         hideTip={true}
    //                                         onDragTouch={onDragTouch}
    //                                         onDragDelete={onDragDelete}
    //                                     />
    //                                 )
    //                             },
    //                         )}
    //                         {provided.placeholder}
    //                     </div>
    //                 )
    //             }}
    //         </Droppable>
    //     </div>
    // </DragDropContext>
    // <div className={styles.component_info}>
    //     <PcWebActionWarp />
    // </div>
    //         </div>
    //     </div>
    // )
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <CreateHeader
                    backPath="/gateway/pc-web"
                    saveDaft={stores.savePreviewData}
                    savePublish={stores.savePreviewData}
                    unSave={stores.unSave}
                    status={stores.status}
                />
            </div>
            <div className={styles.content}>
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div className={styles.component_list}>
                        {MoveCom(stores.componentsList, currentDrag, {
                            style: { width: '100%' },
                        })}
                        <div className={styles.component_list_shadow} />
                    </div>
                    <div className={styles.drop_content}>
                        {/* @ts-ignore */}
                        <Droppable droppableId="pc-web">
                            {provided => {
                                // console.log(provided, '这里应该渲染的')
                                return (
                                    <div
                                        className={styles.pc_web}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{ background: stores.pageColor }}
                                    >
                                        {stores.previewList.map(
                                            (item: PreviewItem, previewItemIndex: number) => {
                                                return (
                                                    <PrevCom
                                                        mode="pc"
                                                        key={`prev_${item.id}`}
                                                        previewData={item}
                                                        removePosition="top"
                                                        indexNum={previewItemIndex}
                                                        hideTip={true}
                                                        onDragTouch={onDragTouch}
                                                        onDragDelete={onDragDelete}
                                                    />
                                                )
                                            },
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )
                            }}
                        </Droppable>
                    </div>
                </DragDropContext>
                <div className={styles.component_info}>
                    <PcWebActionWarp />
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(Index))
