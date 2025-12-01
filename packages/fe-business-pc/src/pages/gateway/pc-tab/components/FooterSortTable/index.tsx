import styles from './index.module.less'
import { Form, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import type { IFooterSortTableProps, SortableItemType } from '../../interface'
import { v4 as uuidv4 } from 'uuid'
import { LinkModal } from '../LinkModal'
import { SortableItem } from './SortableItem'
import { FOOTER_LINK_TYPE } from '../../const'

/**  FooterSortTable  */
const FooterSortTable: React.FC<IFooterSortTableProps> = ({
    flag,
    dataList = [],
    onAddLinks,
    onDeleteLinks,
    onEditLinks,
    updateList,
    customLinkList, //选择跳转链接
}) => {
    /**  from 表单  */
    const [form] = Form.useForm()

    /**  列表数据  */
    const [items, setItems] = useState(dataList)
    // console.log('🍊 items:', JSON.parse(JSON.stringify(items)))
    /**  弹窗显示隐藏  */
    const [isModalOpen, setIsModalOpen] = useState(false)
    /**  选中的元素  */
    const [checkItem, setCheckItem] = useState<null | Record<string, any>>(null)

    useEffect(() => {
        let _list = cloneDeep(dataList)
        setItems(_list)
    }, [dataList])

    /**  拖拽改变顺序  */
    const handleDragEnd = ({ over, active }: any) => {
        const dragIndex = items.findIndex((item: SortableItemType) => item.id === active.id)
        const hoverIndex = items.findIndex((item: SortableItemType) => item.id === over.id)
        if (active.id !== over.id) {
            const dragBox = items[dragIndex]

            const updatedDatas = [...items]
            updatedDatas.splice(dragIndex, 1)
            updatedDatas.splice(hoverIndex, 0, dragBox)
            updatedDatas.forEach((item, idx) => {
                item.sort = idx + 1
            })

            setItems(updatedDatas)
            updateList(updatedDatas)
        }
    }

    /**  关闭modal  */
    const closeModel = () => {
        setIsModalOpen(false)
        setCheckItem(null)
        form.resetFields()
    }
    /**  添加编辑链接确定事件  */
    const addShipLinks = async () => {
        let values = await form.validateFields()
        /**  编辑  */
        if (checkItem?.id) {
            const editData = {
                ...checkItem,
                ...values,
            }
            onEditLinks(editData)
        } else {
            /**  新增  */
            let length = flag === FOOTER_LINK_TYPE.NAV_LINK ? 15 : 50
            if (items?.length >= length) {
                message.warning(`最多添加${length}条`)
                return
            }
            onAddLinks({
                ...values,
                sort: items?.length + 1,
                id: uuidv4(),
            })
        }
        closeModel()
    }

    return (
        <div className={styles.sort_table}>
            <div
                className={styles.sort_table_add}
                onClick={() => {
                    setIsModalOpen(true)
                }}
            >
                <PlusOutlined />
                {flag === FOOTER_LINK_TYPE.NAV_LINK ? '添加导航' : '添加友情链接'}
            </div>
            <div className={styles.sort_table_title}>
                <div>名称</div>
                <span className={styles.sort_table_title_line} />
                <div>跳转链接</div>
                <span className={styles.sort_table_title_line} />
                <div>操作</div>
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext
                    items={items?.map((item: SortableItemType) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items
                        ?.sort((a, b) => a.sort - b.sort)
                        ?.map((item: SortableItemType) => (
                            <SortableItem
                                flag={flag}
                                key={item?.id}
                                data={item}
                                onLinkEdit={() => {
                                    setIsModalOpen(true)
                                    setCheckItem(item)
                                    form.setFieldsValue({ title: item?.title, link: item?.link })
                                }}
                                deleteLink={onDeleteLinks}
                                onCustomLinkChange={onEditLinks}
                                customLinkList={customLinkList}
                            />
                        ))}
                </SortableContext>
            </DndContext>
            {/* 链接modal */}
            <LinkModal
                flag={flag}
                form={form}
                isModalOpen={isModalOpen}
                checkItem={checkItem}
                closeModel={closeModel}
                addLinks={addShipLinks}
            />
        </div>
    )
}

export default FooterSortTable
