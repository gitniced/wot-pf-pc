import React from 'react'
import { Spin } from 'antd'
import type { PreviewItem } from '../../../../components/utils/interface'
import style from './index.module.less'

let mid = 5
function Article(props: { data: PreviewItem }) {
    const tmpData = props.data?.list || []
    if (tmpData.length > 5) {
        mid = tmpData.length / 2 + (tmpData.length % 2)
    } else {
        mid = 5
    }
    const left = tmpData.slice(0, mid)
    const right = tmpData.slice(mid, 10)

    const EmptyDom = () => {
        return (
            <div className={style.empty}>
                <div className={style.icon} />
                <div className={style.label}>点击编辑在右侧上传导航内容</div>
            </div>
        )
    }

    return (
        <>
            {tmpData.length === 0 ? (
                <EmptyDom />
            ) : (
                <div className={style.article_view}>
                    {left.map((item, index) => {
                        const firstItem = item
                        const lastItem = right[index]
                        return (
                            <div className={style.article_view_col} key={JSON.stringify(item)}>
                                <div className={style.article_view_item}>
                                    {firstItem.loading ? (
                                        <Spin />
                                    ) : (
                                        <img
                                            className={style.article_view_item_image}
                                            src={
                                                firstItem.image ||
                                                'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/saas-pc/icon%EF%BC%8Ficon_tuwendaohang%402x.png'
                                            }
                                            alt=""
                                        />
                                    )}

                                    <div className={style.article_view_item_desc}>
                                        {firstItem.label || ''}
                                    </div>
                                </div>
                                {lastItem &&
                                    (lastItem.loading ? (
                                        <Spin />
                                    ) : (
                                        <div className={style.article_view_item}>
                                            <img
                                                className={style.article_view_item_image}
                                                src={
                                                    lastItem.image ||
                                                    'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/saas-pc/icon%EF%BC%8Ficon_tuwendaohang%402x.png'
                                                }
                                                alt=""
                                            />
                                            <div className={style.article_view_item_desc}>
                                                {lastItem.label || ''}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Article
