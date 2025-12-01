import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { UPDATE_TYPE, getViewStore } from './store'
import type { PreviewItem } from '../../components/utils/interface'
import MoveCom from '../../components/MoveItem'

import type { DraggableLocation, DragStart, DropResult } from 'react-beautiful-dnd'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useEffect, useState } from 'react'
import CreateDefault from '../../components/CreateDefault'
import { COMPONENT_TYPE } from '../../components/const'
import { component_type } from '../../components/const'
import { getSectionComponents } from './components/Mytools/generatorFn'
import PrevCom from '../../components/PrevItem'
import CreateHeader from '../../components/CreateHeader'
import { Button } from 'antd'
import { cloneDeep } from 'lodash'
import { getCookie } from '@/storage'
import getCustomLinkList from '@/utils/getCustomLinkList'
const Index = (props: any) => {
    const stores = useLocalObservable(() => getViewStore())
    const orgName = getCookie('ORG_NAME')

    useEffect(() => {
        stores.getGraphicData()
        // stores.getBrushQuestData()
        stores.getComponentList()
        ;(async () => {
            let list = await getCustomLinkList('mobile')
            stores.getLinkList(list)
        })()

        return () => {
            stores.clearData()
        }
    }, [])

    const [currentDrag, setCurrentDrag] = useState('')

    const onDragTouch = (params: PreviewItem) => {
        stores.updatePreviewList(UPDATE_TYPE.FIX, { previewItem: params })
    }

    const onDragDelete = (id: number) => {
        stores.updatePreviewList(UPDATE_TYPE.DELETE, { id })
    }

    const onDragStart = (result: DragStart) => {
        const { draggableId } = result
        if (component_type.includes(draggableId)) {
            setCurrentDrag(draggableId)
        }
    }
    const onDragEnd = (result: DropResult) => {
        setCurrentDrag('')
        const { draggableId, destination, source } = result || {}
        const { droppableId: fromDropId, index: fromIndex } = (source as DraggableLocation) || {}
        const { droppableId: toDropId, index: toIndex } = (destination as DraggableLocation) || {}
        if (fromDropId === toDropId) {
            if (fromDropId === 'mobile') {
                stores.updatePreviewList(UPDATE_TYPE.EDIT, { from: fromIndex, to: toIndex })
            }
        } else {
            if (toDropId === 'mobile') {
                stores.updatePreviewList(UPDATE_TYPE.ADD, {
                    previewItem: CreateDefault(draggableId as COMPONENT_TYPE),
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
        ;(async () => {
            await stores.getGraphicData()
            await stores.getPreviewData(code)
        })()

        document.title = orgName
            ? `微页面${code ? '编辑' : '新增'}-${orgName}`
            : `微页面${code ? '编辑' : '新增'}`
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <CreateHeader
                    saveDaft={stores.savePreviewData}
                    savePublish={stores.savePreviewData}
                    unSave={stores.unSave}
                    status={stores.status}
                />
            </div>
            <div className={styles.content}>
                {/* @ts-ignore */}
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div className={styles.component_list}>
                        {/* <div className={styles.left_fixed_div}>
                            {MoveCom(stores.componentsList, currentDrag)}
                        </div>
                        <div className={styles.component_list_shadow} /> */}
                        {MoveCom(stores.componentsList, currentDrag)}
                    </div>
                    <div className={styles.drop_content}>
                        {/* @ts-ignore */}
                        <Droppable droppableId="mobile">
                            {provided => (
                                <div
                                    className={styles.mobile}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <div
                                        className={styles.mobile_box}
                                        style={{ background: stores.pageColor }}
                                    >
                                        <div className={styles.mobile_top}>
                                            <div className={styles.page_title}>
                                                {stores.pageTitle}
                                            </div>
                                        </div>
                                        {stores.previewList.map(
                                            (item: PreviewItem, previewItemIndex: number) => {
                                                return (
                                                    <PrevCom
                                                        key={`prev_${item.id}`}
                                                        previewData={item}
                                                        indexNum={previewItemIndex}
                                                        onDragTouch={onDragTouch}
                                                        onDragDelete={onDragDelete}
                                                        isDragDisabled={
                                                            item.type === COMPONENT_TYPE.CUSTOMER
                                                        }
                                                    />
                                                )
                                            },
                                        )}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                        <Button
                            type={'default'}
                            className={styles.page_config}
                            onClick={stores.cleanActive}
                        >
                            <svg
                                className={['icon', styles.page_icon].join(' ')}
                                aria-hidden="true"
                            >
                                <use xlinkHref={`#icon_yemianshezhi`} />
                            </svg>
                            页面设置
                        </Button>
                    </div>
                </DragDropContext>
                <div className={styles.component_info}>
                    {/* <div className={styles.fixed_div}>
                        {getSectionComponents(stores.getNowActive() as PreviewItem)}
                    </div> */}
                    {getSectionComponents(stores.getNowActive() as PreviewItem)}
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(Index))
