import React from 'react'
import CustomUpload from '../CustomUpload'
import style from './index.module.less'
import { Input } from 'antd'
import type { UrlItem, ImageItem } from './../interface'
import CustomLink from '@/components/CustomLink'

interface CardItemType {
    item: Record<string, keyof ImageItem>
    remove?: (k: string) => void
    rowKey?: string
    type?: 'pc' | 'mobile'
    changeValue?: (item: ImageItem, e: React.ChangeEvent<HTMLInputElement>) => void
    onCheckImage?: (url: string, k: string) => void
    onLinkChange?: (i: UrlItem, id: string | number) => void
    onUplaodStar?: (...e: any) => void
    onUploadEnd?: (...e: any) => void
    // 是否展示导航标题
    isShowTitle?: boolean
    customLinkList: any[]
}

function CardItem({
    item,
    remove,
    rowKey = 'id',
    type,
    changeValue,
    onCheckImage,
    onLinkChange,
    onUplaodStar,
    onUploadEnd,
    isShowTitle = false,
    customLinkList = [],
}: CardItemType) {
    return (
        <div className={style.article_card} key={item[rowKey]}>
            <img
                src="https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/saas-pc/close.png"
                alt=""
                className={style.closed}
                onClick={() => {
                    remove?.(item[rowKey])
                }}
            />
            <div className={style.cart_img}>
                <CustomUpload
                    onUplaodStar={() => {
                        onUplaodStar?.('233', item[rowKey])
                    }}
                    onUploadEnd={() => {
                        onUploadEnd?.('233', item[rowKey])
                    }}
                    onChange={e => {
                        const nowUrl = e[0]?.response?.url
                        nowUrl && onCheckImage?.(nowUrl, item[rowKey])
                    }}
                >
                    <img src={item.image || ''} alt="" className={style.inner_img} />
                    <div className={style.mask}>更换</div>
                </CustomUpload>
            </div>
            <div className={style.article_content_right}>
                {isShowTitle ? (
                    <div className={style.article_content_title}>
                        <div className={style.article_content_title_symbol}>*</div>
                        <div className={style.article_content_title_text}>导航标题</div>
                        <Input
                            placeholder="请输入"
                            className={style.article_content_title_input}
                            defaultValue={item.label}
                            maxLength={4}
                            onChange={e => {
                                changeValue?.(item as unknown as ImageItem, e)
                            }}
                        />
                    </div>
                ) : (
                    <div className={style.article_content_title_text}>跳转链接：</div>
                )}
                {console.log('item.url')}
                {console.log(item.url)}
                <div className={style.select_link}>
                    {isShowTitle ? (
                        <div className={style.article_content_title_symbol}>*</div>
                    ) : null}
                    <CustomLink
                        type={type}
                        value={item.url as UrlItem}
                        onChange={e => {
                            onLinkChange?.(e as UrlItem, item[rowKey])
                        }}
                        list={customLinkList}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardItem
