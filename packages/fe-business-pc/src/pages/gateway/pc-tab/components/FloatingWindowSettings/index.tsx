import styles from './index.module.less'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { SuspensionModal } from './SuspensionModal'
import type store from '../../store'
import { observer } from 'mobx-react'
import { DndContext, useSensors } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { PointerSensor, useSensor } from '@dnd-kit/core'
import { isDisableDiv } from '@/utils/isDisableDiv'
import { Power } from '@wotu/wotu-pro-components'
interface IFloatingWindowSettingsProps {
    store: store
}

const FloatingWindowSettings: React.FC<IFloatingWindowSettingsProps> = ({ store }) => {
    /**  from 表单  */
    const [form] = Form.useForm()
    /**  modal 显示  */
    const [isOpen, setIsOpen] = useState(false)
    /**  编辑的item  */
    const [checkItem, setCheckItem] = useState(null)
    /**   悬浮窗数据 */
    const [susPenList, setSusPenList] = useState([])

    useEffect(() => {
        setSusPenList(store.suspendedWindowList || [])
    }, [store.suspendedWindowList])

    /**  modal open
     *  flag true 为编辑 false 为新增
     */
    const onAddSuspension = (flag: boolean = false, item?: any) => {
        setIsOpen(true)

        if (flag) {
            setCheckItem(item)
            sessionStorage.setItem('isFirstOpenModal', '1')
        } else {
            setCheckItem(null)
        }
    }

    const closeModel = () => {
        setIsOpen(false)
        setCheckItem(null)
        form.resetFields()
        sessionStorage.removeItem('isFirstOpenModal')
    }

    /**  新建编辑
     *  idEdit true 为编辑 false 为新增
     */
    const addSuspensionSubmit = async (idEdit: boolean) => {
        let values = await form.validateFields()
        if (idEdit) {
            values = {
                ...values,
                code: checkItem?.code,
            }
            store.editSusWindow(values, closeModel)
        } else {
            store.createSusWindow(values, closeModel)
        }
    }

    /**  拖拽改变顺序  */
    const handleDragEnd = ({ over, active }: any) => {
        const dragIndex = susPenList?.findIndex(item => item?.code === active.id)
        const hoverIndex = susPenList?.findIndex(item => item?.code === over.id)
        if (active.id !== over.id) {
            const dragBox = susPenList?.[dragIndex]
            const updatedDatas = [...susPenList]

            updatedDatas.splice(dragIndex, 1)
            updatedDatas.splice(hoverIndex, 0, dragBox)
            updatedDatas.forEach((item, idx) => {
                item.sort = idx + 1
            })
            setSusPenList(updatedDatas)
            store.updateSusWindowSort(updatedDatas)
        }
    }

    return (
        <div className={styles.floating_window_settings}>
            <div className={styles.title}>最多可设置5个悬浮窗</div>
            <div className={styles.sus_contents}>
                <DndContext
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToHorizontalAxis]}
                    sensors={useSensors(
                        useSensor(PointerSensor, {
                            activationConstraint: {
                                distance: 5,
                            },
                        }),
                    )}
                >
                    <SortableContext
                        items={susPenList?.map(item => item?.code)}
                        strategy={horizontalListSortingStrategy}
                        disabled={isDisableDiv(11120, true)}
                    >
                        {susPenList?.map(i => {
                            return (
                                <SortableItem
                                    key={i.code}
                                    i={i}
                                    store={store}
                                    onAddSuspension={onAddSuspension}
                                />
                            )
                        })}
                    </SortableContext>
                </DndContext>
                {store?.suspendedWindowList?.length < 5 && (
                    <Power powerId={11119}>
                        <div className={styles.content} onClick={() => onAddSuspension()}>
                            <PlusOutlined style={{ fontSize: 18, color: 'rgba(0,0,0,0.45)' }} />
                            <span>点击添加</span>
                        </div>
                    </Power>
                )}
            </div>

            <SuspensionModal
                form={form}
                isOpen={isOpen}
                addSuspensionSubmit={addSuspensionSubmit}
                closeModel={closeModel}
                checkItem={checkItem}
                customLinkList={store.customLinkList || []}
            />
        </div>
    )
}

export default observer(FloatingWindowSettings)
