import React from 'react'
import type { ContentItem } from '../../../../../components/utils/interface'
import styles from '../../../../../web/create//components/ActionBar/ArticleContent/index.module.less'
import dayjs from 'dayjs'
import { CloseCircleFilled } from '@ant-design/icons'
import { RADIO_VALUE_ENUM } from '@/pages/gateway/web/create/components/ActionBar/ArticleContent/const'

export function getCardListRender(value: string, clickDelete: (key: string) => void) {
    return (contentItemData: ContentItem) => {
        let { code, title, cover, categoryNameList, publishTime, categoryNames } =
            contentItemData || {}
        cover = cover || ''
        categoryNameList = categoryNameList || categoryNames || []
        return (
            <div className={[styles.review_item, cover ? styles.small : styles.noImg].join(' ')}>
                <div className={styles.review_item_info}>
                    <div className={styles.review_item_info_title}>{title}</div>
                    <div className={styles.review_item_info_btm}>
                        <div className={styles.review_item_info_btm_time}>
                            {dayjs(publishTime).format('YYYY-MM-DD ')}
                        </div>
                        <div className={styles.review_item_info_btm_tags}>
                            {categoryNameList.map((cateItem: string, index: number) => {
                                return (
                                    index < 2 && (
                                        <div
                                            key={cateItem}
                                            className={styles.review_item_info_btm_tag_item}
                                        >
                                            {cateItem}
                                        </div>
                                    )
                                )
                            })}
                        </div>
                    </div>
                </div>
                {cover ? (
                    <div className={styles.image} style={{ backgroundImage: `url(${cover})` }} />
                ) : null}
                {/* 等于默认规则得时候不可删除 不可排序 */}
                {value !== RADIO_VALUE_ENUM.DEFAULT && (
                    <CloseCircleFilled
                        className={styles.review_item_close}
                        onClick={() => clickDelete(code)}
                    />
                )}
            </div>
        )
    }
}
