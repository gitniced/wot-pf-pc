import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Modal } from 'antd'
import { Power } from '@wotu/wotu-pro-components'
import { isDisableDiv } from '@/utils/isDisableDiv'

/**  拖拽的item  */
export function SortableItem({
    i,
    store,
    onAddSuspension,
}: {
    i: any
    store: any
    onAddSuspension: any
}) {
    const { attributes, listeners, setNodeRef, transform, isDragging, transition } = useSortable({
        id: i.code,
    })

    const isPower = () => {
        if (isDisableDiv(11120, true)) {
            return 'not-allowed'
        } else {
            return isDragging ? 'grabbing' : 'grab'
        }
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 1,
        cursor: isPower(),
    }

    return (
        <div
            className={styles.content}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <svg className="icon" aria-hidden="true">
                <use xlinkHref={`#${i.selectedIcon}`} />
            </svg>
            {/* 遮罩层 */}
            <div className={styles.mask}>
                <Power powerId={11120}>
                    <svg
                        className="icon"
                        aria-hidden="true"
                        onClick={() => onAddSuspension(true, i)}
                    >
                        <use xlinkHref={`#icon-pingjia`} />
                    </svg>
                </Power>
                <Power powerId={11121}>
                    <svg
                        className="icon"
                        aria-hidden="true"
                        onClick={() => {
                            Modal.confirm({
                                title: '确定要删除吗？',
                                icon: <ExclamationCircleOutlined />,
                                onOk() {
                                    store.deleteSusWindow(i.code)
                                },
                                okText: '确定',
                                cancelText: '取消',
                            })
                        }}
                    >
                        <use xlinkHref={`#delete`} />
                    </svg>
                </Power>
            </div>
        </div>
    )
}
