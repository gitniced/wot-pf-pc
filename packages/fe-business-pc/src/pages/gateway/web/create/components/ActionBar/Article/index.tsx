import React, { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import type { PreviewItem, ImageItem, UrlItem } from '../../../../../components/utils/interface'
import MiniHeader from '../../../../../components/MiniHeader'
import style from './index.module.less'
import MoveContainer from '../../../../../components/MoveContainer'
import AddCard from '../../../../../components/AddCard'
import SubTitle from '../../../../../components/SubTitle'
import CardItems from '../../../../../components/CardItem'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'
// import getCustomLinkList from '@/utils/getCustomLinkList'

const defaultImage =
    'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/saas-pc/icon%EF%BC%8Ficon_tuwendaohang%402x.png'

function Article(props: { data: PreviewItem }) {
    const { data } = props

    // 获取全局唯一的store
    const stores = useLocalObservable(() => getViewStore())
    /**  跳转链接数据  */
    const [linkList, setLinkList] = useState<any[]>(stores.customLinkList)
    useEffect(() => {
        setLinkList(stores.customLinkList)
    }, [stores.customLinkList])

    // 是否是置灰的
    const isDisable = (props.data.list?.length || 0) >= 10

    // 去添加内容
    const toAddItem = () => {
        if (isDisable) return
        const newItem = {
            image: defaultImage,
            label: '图文导航',
            url: { url: '', code: '' },
            // sort: props.data.list?.length || 0,
            id: (props.data.list?.length || 0) + Math.random() * 100,
        }
        stores.fixPreviewList({
            ...data,
            list: [...(data.list || []), newItem],
        })
    }

    // 删除元素
    const remove = (id: number | string) => {
        const _data = stores.getNowActive()
        stores.fixPreviewList({
            ..._data,
            list: _data?.list?.filter(item => item.id !== id),
        })
    }

    // 内容改变
    const changeValue = (_inputItem: ImageItem, event: React.ChangeEvent<HTMLInputElement>) => {
        stores.fixPreviewList({
            ...data,
            list: data.list?.map(item =>
                item.id === _inputItem.id
                    ? // @ts-ignore
                      { ...item, label: event.nativeEvent.target?.value || '' }
                    : item,
            ),
        })
    }

    // 元素排序
    const sortChange = (list: any[]) => {
        stores.fixPreviewList({
            ...data,
            list,
        })
    }
    // 图片的选择
    const onCheckImage = (url: string, id: number | string, rest: Record<string, unknown>) => {
        stores.fixPreviewList({
            ...data,
            list: data.list?.map(item =>
                item.id === id ? { ...item, image: url, ...rest } : item,
            ),
        })
    }

    // 链接选择的改变
    const onLinkChange = (urlItem: UrlItem, id: string | number) => {
        const _data = stores.getNowActive() || { list: [] }
        stores.fixPreviewList({
            ...data,
            list: _data.list?.map(item => (item.id === id ? { ...item, url: urlItem } : item)),
        })
    }

    return (
        <div className={style.article}>
            <MiniHeader title="图文导航" />
            <div className={style.article_content}>
                <SubTitle title="添加内容" description="添加导航，最多10个（鼠标拖拽可调整顺序）" />
                <AddCard
                    label="添加导航"
                    disabled={isDisable}
                    isUpload={false}
                    onChange={() => {
                        toAddItem()
                    }}
                >
                    <MoveContainer
                        datasource={data.list || []}
                        onChange={result => {
                            sortChange(result)
                        }}
                    >
                        {item => {
                            return (
                                <CardItems
                                    item={item}
                                    remove={remove}
                                    changeValue={changeValue}
                                    onCheckImage={(e, k) => onCheckImage(e, k, { loading: false })}
                                    key={item.id}
                                    onLinkChange={onLinkChange}
                                    isShowTitle={true}
                                    onUplaodStar={(...e: any) => {
                                        onCheckImage?.(e[0], e[1], { loading: true })
                                    }}
                                    customLinkList={linkList}
                                />
                            )
                        }}
                    </MoveContainer>
                </AddCard>
                <SetMicroComponentStyle
                    styleData={data}
                    onStyleChange={stores.fixPreviewList}
                    mode="mobile"
                />
            </div>
        </div>
    )
}

export default observer(Article)
