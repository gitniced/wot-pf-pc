import styles from './index.module.less'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { SortableItemProps } from '../../interface'
import CustomLink from '@/components/CustomLink'
import { FOOTER_LINK_TYPE } from '../../const'

export const SortableItem = ({
    data,
    deleteLink,
    onLinkEdit,
    flag,
    onCustomLinkChange,
    customLinkList,
}: SortableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: data.id as string,
    })
    transform && (transform.scaleY = 1)
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    /**
     * 把接口字段转换成组件可以用的obj对象
     */
    const componentsObj = (params: Record<string, unknown>) => {
        let { link, linkType, linkTitle } = params
        const _obj: Record<string, unknown> = {
            code: link,
            type: linkType,
            label: linkTitle,
        }
        return _obj
    }

    /**
     *  把组件的字段转换成接口使用的字段
     * @param params
     * @returns
     */
    const backEndObj = (params: Record<string, unknown>) => {
        console.log('parseLinkObj', params)
        let { code, route, type, label } = params
        const newParams = {
            link: code || route,
            linkType: type,
            linkTitle: label,
        }
        return newParams
    }

    const jumpLink = () => {
        if (flag !== FOOTER_LINK_TYPE.NAV_LINK) {
            return data?.link || '-'
        } else {
            return (
                <CustomLink
                    key={data.id}
                    type="pc"
                    value={componentsObj(data)}
                    onChange={e => {
                        console.log('🍊 e:', e)
                        onCustomLinkChange({
                            ...data,
                            ...backEndObj(e),
                        })
                    }}
                    list={customLinkList}
                />
            )
        }
    }

    return (
        <ul ref={setNodeRef} style={style}>
            <li className={styles.table_row_item}>
                <div className={styles.table_row_item_parent}>
                    <div>
                        <span className={styles.move_icon} {...attributes} {...listeners}>
                            <svg>
                                <use xlinkHref="#tuodong" />
                            </svg>
                        </span>
                        <span className={styles.item_title}>{data?.title || '-'}</span>
                    </div>
                    <div className={styles.table_row_item_parent_edit}>{jumpLink()}</div>
                    <div className={styles.table_row_item_parent_option}>
                        <span
                            onClick={() => {
                                onLinkEdit?.()
                            }}
                        >
                            编辑
                        </span>
                        <span
                            onClick={() => {
                                deleteLink?.(data?.id)
                            }}
                        >
                            删除
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    )
}
