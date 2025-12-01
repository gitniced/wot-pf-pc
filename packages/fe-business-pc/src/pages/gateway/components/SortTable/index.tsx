import { useEffect, useState } from 'react'
import { Form, Input, Modal, message } from 'antd'
import { ExclamationCircleOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import CustomLink from '@/components/CustomLink'
import styles from './index.module.less'
import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'

import {
    useSortable,
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
//@ts-ignore
import { CSS } from '@dnd-kit/utilities'
import { observer } from 'mobx-react'
import { Power } from '@wotu/wotu-pro-components'
import { isDisableDiv } from '@/utils/isDisableDiv'

const { confirm } = Modal

/**
 *  把组件的字段转换成接口使用的字段
 * @param params
 * @returns
 */
const parseLinkObj = (params: Record<string, unknown>) => {
    console.log('parseLinkObj', params)
    let { code, route, type, label } = params
    const newParams = {
        linkUrl: code || route,
        linkType: type,
        linkName: label,
    }
    return newParams
}

/**
 * 把接口字段转换成组件可以用的obj对象
 */
const generateLinkObj = (params: Record<string, unknown>) => {
    let { linkUrl, linkType, linkName } = params
    const _obj: Record<string, unknown> = {
        code: linkUrl,
        type: linkType,
        label: linkName,
    }
    return _obj
}

interface SortableItemType {
    id: string
    data: any
    onLevelTwoNavAdd: () => void
    onLevelOneNavDelete: () => void
    onLevelOneNavEdit: () => void
    onLevelTwoNavEdit: (item: Record<string, any>) => void
    onLevelTwoNavDelete: (code: string) => void
    onLevelTwoNavPositionChang: (item: Record<string, any>) => void
    onLinkChange: (item: Record<string, any>) => void
    onLevelTwoLinkChang: (item: Record<string, any>) => void
    customLinkList: []
}

enum TiTlE_LEVEL_ENUM {
    // 一级导航
    LEVEL_ONE = 1,
    // 二级导航
    LEVEL_TWO = 2,
}

export const SortableItem = observer(function ({
    id,
    data,
    onLevelTwoNavAdd,
    onLevelOneNavDelete,
    onLevelOneNavEdit,
    onLevelTwoNavEdit,
    onLevelTwoNavDelete,
    onLevelTwoNavPositionChang,
    onLinkChange,
    onLevelTwoLinkChang,
    customLinkList,
}: SortableItemType) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id })
    const [dataSource, setDataSource] = useState(data.childNaviList)
    useEffect(() => {
        setDataSource(data.childNaviList)
    }, [data])
    // 保证上下拖动的时候不会 缩放变形
    transform && (transform.scaleY = 1)
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    /**
     * 是否有 二级导航
     * @returns
     */
    const isChildren = () => {
        return dataSource && dataSource.length
    }

    /**
     * 获取 子元素的数量
     * @returns
     */
    const childrenCount = () => {
        return dataSource && dataSource.length
    }

    return (
        <ul ref={setNodeRef} style={style}>
            <li className={styles.table_row_item}>
                <input type="checkbox" id={`${id}`} hidden />
                <div className={styles.table_row_item_parent}>
                    <div>
                        <span className={styles.move_icon} {...attributes} {...listeners}>
                            <svg>
                                <use xlinkHref="#tuodong" />
                            </svg>
                        </span>
                        {isChildren() ? (
                            <label htmlFor={`${id}`} className={styles.table_row_item_label}>
                                <RightOutlined className={styles.table_row_item_label_icon} />
                            </label>
                        ) : null}
                        <span>{data.name}</span>
                    </div>
                    <Power powerId={11116} visible={true}>
                        <div className={styles.table_row_item_parent_edit}>
                            <CustomLink
                                key={data.linkUrl}
                                type="pc"
                                value={generateLinkObj(data)}
                                onChange={e => {
                                    // console.log(e)
                                    onLinkChange({
                                        ...data,
                                        ...parseLinkObj(e),
                                    })
                                }}
                                list={customLinkList}
                                powerId={11116}
                            />
                        </div>
                    </Power>
                    <div className={styles.table_row_item_parent_option}>
                        <Power powerId={11115}>
                            <span
                                onClick={() => {
                                    if (childrenCount() >= 5) {
                                        message.info('二级导航最多只能添加5个')
                                        return
                                    }

                                    onLevelTwoNavAdd?.()
                                }}
                            >
                                添加二级导航
                            </span>
                        </Power>
                        <Power powerId={11116}>
                            <span
                                onClick={() => {
                                    onLevelOneNavEdit?.()
                                }}
                            >
                                编辑
                            </span>
                        </Power>
                        <Power powerId={11117}>
                            <span
                                onClick={() => {
                                    onLevelOneNavDelete?.()
                                }}
                            >
                                删除
                            </span>
                        </Power>
                    </div>
                </div>

                <div className={styles.child}>
                    <ul>
                        <DndContext
                            onDragEnd={(_event: DragEndEvent) => {
                                const { active, over } = _event
                                if (!active || !over) return
                                if (active?.id !== over?.id) {
                                    setDataSource(
                                        (datalistArr: { code: string; sort: number }[]) => {
                                            const oldIndex = datalistArr.findIndex(
                                                i => i?.code === active.id,
                                            )
                                            const newIndex = datalistArr.findIndex(
                                                i => i?.code === over.id,
                                            )
                                            // 位置交换 相当于编辑了两侧交换的两个元素
                                            onLevelTwoNavPositionChang({
                                                ...datalistArr[oldIndex],
                                                sort: datalistArr[newIndex].sort,
                                            })

                                            onLevelTwoNavPositionChang({
                                                ...datalistArr[newIndex],
                                                sort: datalistArr[oldIndex].sort,
                                            })
                                            const t = datalistArr[oldIndex].sort
                                            datalistArr[oldIndex].sort = datalistArr[newIndex].sort
                                            datalistArr[newIndex].sort = t
                                            return arrayMove(datalistArr, oldIndex, newIndex)
                                        },
                                    )
                                }
                            }}
                        >
                            <SortableContext
                                items={dataSource.map((item: any) => ({ ...item, id: item?.code }))}
                            >
                                {dataSource.map((item: any, index) => {
                                    // return <S key={index} childSortItem={item}/>
                                    return (
                                        <ChildSortItem
                                            childSortItem={item}
                                            key={index}
                                            onLevelTwoNavDelete={onLevelTwoNavDelete}
                                            onLevelTwoLinkChang={onLevelTwoLinkChang}
                                            onLevelTwoNavEdit={onLevelTwoNavEdit}
                                            customLinkList={customLinkList}
                                        />
                                    )
                                })}
                            </SortableContext>
                        </DndContext>
                    </ul>
                </div>
            </li>
        </ul>
    )
})
function ChildSortItem({
    childSortItem,
    onLevelTwoLinkChang,
    onLevelTwoNavEdit,
    onLevelTwoNavDelete,
    customLinkList = [],
}: {
    childSortItem: any
    onLevelTwoLinkChang: (v: any) => void
    onLevelTwoNavEdit: (v: any) => void
    onLevelTwoNavDelete: (v: any) => void
    customLinkList: any[]
}) {
    const {
        attributes: childAttributes,
        listeners: childListeners,
        setNodeRef: childSetNodeRef,
        transform: childTransform,
        transition: childTransition,
    } = useSortable({ id: childSortItem?.code })
    const childStyle = {
        transform: CSS.Transform.toString(childTransform),
        transition: childTransition,
    }
    return (
        <li
            className={styles.table_row_item_child_item}
            key={childSortItem?.code}
            ref={childSetNodeRef}
            style={childStyle}
        >
            <div>
                <span className={styles.move_icon} {...childAttributes} {...childListeners}>
                    <svg>
                        <use xlinkHref="#tuodong" />
                    </svg>
                </span>
                <span>{childSortItem.name}</span>
            </div>
            <div className={styles.table_row_item_parent_edit}>
                <CustomLink
                    key={childSortItem.linkUrl}
                    type="pc"
                    value={generateLinkObj(childSortItem)}
                    onChange={e => {
                        onLevelTwoLinkChang({
                            ...childSortItem,
                            ...parseLinkObj(e),
                        })
                    }}
                    list={customLinkList}
                    powerId={11116}
                />
            </div>
            <div className={styles.table_row_item_parent_option}>
                <Power powerId={11116}>
                    <span
                        onClick={() => {
                            onLevelTwoNavEdit?.(childSortItem)
                        }}
                    >
                        编辑
                    </span>
                </Power>
                <Power powerId={11117}>
                    <span
                        onClick={() => {
                            onLevelTwoNavDelete?.(childSortItem?.code)
                        }}
                    >
                        删除
                    </span>
                </Power>
            </div>
        </li>
    )
}

interface SortTableType {
    dataList: any[]
    onAddNav: (params: Record<string, unknown>) => void
    onEditNav: (params: Record<string, unknown>) => void
    onDeleteNav: (code: string) => void
    onChangePosition: (params: Record<string, unknown>) => void
    customLinkList: any[]
}

function SortTable({
    dataList,
    onAddNav,
    onDeleteNav,
    onEditNav,
    onChangePosition,
    customLinkList,
}: SortTableType) {
    // 列表数据
    const [items, setItems] = useState(dataList)
    // 弹窗显示隐藏
    const [isOpen, setIsOpen] = useState(false)
    // 菜单等级
    const [titleLevel, setTitleLevel] = useState<TiTlE_LEVEL_ENUM>(TiTlE_LEVEL_ENUM.LEVEL_ONE)
    // 选中的元素
    const [checkItem, setCheckItem] = useState<null | Record<string, any>>(null)
    // 父级code  操作二级菜单的时候使用
    const [parentCode, setParentCode] = useState<null | string>('')
    // from 表单
    const [form] = Form.useForm()

    useEffect(() => {
        console.count('data list ')
        const _dataList = [...dataList].map(item => ({ ...item, id: item?.code }))
        _dataList.shift()
        setItems(_dataList)
    }, [dataList])

    /**
     * 等级枚举
     */
    const upMap: Record<string, string> = {
        1: '一',
        2: '二',
    }

    /**
     *  取到当前list中最大的sort
     *  如果有传 code  就去招对应下面的子集
     * @returns
     */
    const getListMaxSort = (code?: string) => {
        const computeSort = (d: { sort: number }[]) => Math.max(...[...d.map(i => i.sort), 1])
        if (code) {
            return computeSort(dataList.find(i => i?.code === code)?.childNaviList || [])
        } else {
            return computeSort(dataList)
        }
    }

    /**
     *  等级一的时候的操作
     * @param values
     */
    const LevelOneNavOption = (values: Record<string, string>) => {
        if (checkItem?.code) {
            const params = {
                ...checkItem,
                ...values,
            }
            delete params.id
            onEditNav(params)
        } else {
            onAddNav({
                ...values,
                sort: getListMaxSort() + 1,
            })
        }
        closeModel()
    }

    /**
     *  等级二的时候 导航的操作
     */
    const LevelTwoNavOption = (values: Record<string, string>) => {
        // 有父级code  表示去编辑
        if (parentCode && checkItem) {
            onEditNav({
                ...checkItem,
                ...values,
                parentCode,
            })
        } else {
            // 没有父级code  表示是添加 那么父级code 直接传选中项
            onAddNav({
                ...values,
                parentCode: parentCode,
                sort: getListMaxSort(parentCode!) + 1,
            })
        }
        closeModel()
    }

    /**
     * 添加导航
     */
    const addNav = () => {
        form.validateFields().then(values => {
            console.log(values)
            if (titleLevel === TiTlE_LEVEL_ENUM.LEVEL_ONE) {
                LevelOneNavOption(values)
            } else if (titleLevel === TiTlE_LEVEL_ENUM.LEVEL_TWO) {
                LevelTwoNavOption(values)
            }
        })
    }

    return (
        <div className={styles.sort_table}>
            <Power powerId={11115} visible={true}>
                <div
                    className={styles.sort_table_add}
                    onClick={() => {
                        setIsOpen(true)
                        setTitleLevel(1)
                    }}
                    style={isDisableDiv(11115)}
                >
                    <PlusOutlined />
                    添加一级导航
                </div>
            </Power>
            <div className={styles.sort_table_title}>
                <div>导航名称</div>
                <span className={styles.sort_table_title_line} />
                <div>跳转链接</div>
                <span className={styles.sort_table_title_line} />
                <div>操作</div>
            </div>
            <ul>
                <li className={styles.table_row_item}>
                    <input type="checkbox" hidden />
                    <div className={styles.table_row_item_parent}>
                        <div>首页</div>
                    </div>
                </li>
            </ul>
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {items.map(item => (
                        <SortableItem
                            key={item?.code}
                            id={item?.code}
                            data={item}
                            // 一级导航编辑
                            onLevelOneNavEdit={() => {
                                setTitleLevel(1)
                                setCheckItem(item)
                                setIsOpen(true)
                                form.setFieldsValue({ name: item.name })
                            }}
                            // 一级导航删除
                            onLevelOneNavDelete={() => {
                                confirm({
                                    title: '确定要删除吗，该导航的下级导航也会同步删除。',
                                    icon: <ExclamationCircleOutlined />,
                                    onOk() {
                                        console.log('OK')
                                        onDeleteNav(item?.code)
                                    },
                                    okText: '确定',
                                    cancelText: '取消',
                                })
                            }}
                            // 二级导航新增
                            onLevelTwoNavAdd={() => {
                                setTitleLevel(2)
                                setParentCode(item?.code)
                                setIsOpen(true)
                            }}
                            // 二级导航编辑
                            onLevelTwoNavEdit={i => {
                                setTitleLevel(2)
                                setCheckItem(i)
                                setIsOpen(true)
                                setParentCode(item?.code)
                                form.setFieldsValue({ name: i.name })
                            }}
                            // 二级导航删除
                            onLevelTwoNavDelete={code => {
                                confirm({
                                    title: '确定要删除吗？',
                                    icon: <ExclamationCircleOutlined />,
                                    onOk() {
                                        onDeleteNav(code)
                                    },
                                    okText: '确定',
                                    cancelText: '取消',
                                })
                            }}
                            // 二级导航 位置移动
                            onLevelTwoNavPositionChang={(child: Record<string, string>) => {
                                onChangePosition({
                                    ...child,
                                    parentCode: item?.code,
                                })
                            }}
                            // 链接地址变动
                            onLinkChange={e => {
                                onEditNav(e)
                            }}
                            // 二级导航链接改变
                            onLevelTwoLinkChang={e => {
                                onEditNav({
                                    ...e,
                                    parentCode: item?.code,
                                })
                            }}
                            customLinkList={customLinkList}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <Modal
                open={isOpen}
                title={`${checkItem?.name ? '编辑' : '添加'}${upMap[titleLevel]}级导航`}
                onCancel={() => closeModel()}
                onOk={addNav}
                maskClosable={false}
            >
                <Form form={form}>
                    <Form.Item
                        label="导航名称"
                        name="name"
                        required
                        rules={[{ required: true, message: '请输入名称', whitespace: true }]}
                    >
                        {/* 一级导航限制五个字，二级八个字 */}
                        <Input
                            placeholder="请输入"
                            maxLength={titleLevel === TiTlE_LEVEL_ENUM.LEVEL_ONE ? 6 : 8}
                            showCount
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

    /**
     * 关闭弹窗
     */
    function closeModel() {
        setIsOpen(false)
        setCheckItem(null)
        setParentCode(null)
        setTitleLevel(1)
        form.resetFields()
    }

    /**
     *  拖动结束回调 利用了函数的声明提升特性
     * @param event
     * @returns
     */
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        // return

        if (!active || !over) return
        if (active?.id !== over?.id) {
            setItems(datalistArr => {
                const oldIndex = datalistArr.findIndex(i => i.id === active.id)
                const newIndex = datalistArr.findIndex(i => i.id === over.id)
                // 位置交换 相当于改变了当前元素的sort
                onChangePosition({
                    ...datalistArr[oldIndex],
                    sort: datalistArr[newIndex].sort,
                })

                // onChangePosition({
                //     ...datalistArr[newIndex],
                //     sort: datalistArr[oldIndex].sort,
                // })
                const t = datalistArr[oldIndex].sort
                datalistArr[oldIndex].sort = datalistArr[newIndex].sort
                datalistArr[newIndex].sort = t
                return arrayMove(datalistArr, oldIndex, newIndex)
            })
        }
    }
}

export default observer(SortTable)
