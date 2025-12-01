import React, { useEffect, useState } from 'react'
import type { ImageItem, UrlItem } from '../../../../../components/utils/interface'
import MiniHeader from '@/pages/gateway/components/MiniHeader'
import styles from './index.module.less'
import SubTitle from '@/pages/gateway/components/SubTitle'
import AddCard from '@/pages/gateway/components/AddCard'
import { UPDATE_TYPE, getViewStore } from '../../../store'
import { observer, useLocalObservable } from 'mobx-react'
import { cloneDeep } from 'lodash'
import MoveContainer from '@/pages/gateway/components/MoveContainer'
import CardItems from '@/pages/gateway/components/CardItem'
import FillMethods from '@/pages/gateway/components/FillMethods'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'

function Swiper() {
    const webStore = useLocalObservable(() => getViewStore())

    /**   跳转链接数据  需要手动监听赋最新值 */
    const [linkList, setLinkList] = useState<any[]>(webStore.customLinkList)
    useEffect(() => {
        setLinkList(webStore.customLinkList)
    }, [webStore.customLinkList])

    let tempData = webStore.getNowActive()!
    tempData = cloneDeep(tempData)
    const [btnDisable, setBtnDisable] = useState(false)

    useEffect(() => {
        const { list } = tempData || {}
        if (list?.length === 5) {
            setBtnDisable(true)
        } else {
            setBtnDisable(false)
        }
    }, [tempData])

    const addImage = (files: any) => {
        const {
            response: { url },
        } = files[0]
        // @ts-ignore
        const imageItem: ImageItem = { image: url }
        let { list } = tempData || {}
        list = list?.concat([imageItem])
        tempData.list = list
        webStore.updatePreviewList(UPDATE_TYPE.FIX, { previewItem: tempData })
    }

    // 删除元素
    const remove = (image: string) => {
        webStore.fixPreviewList({
            ...tempData,
            list: tempData.list?.filter(item => item.image !== image),
        })
    }
    // 图片的选择
    const onCheckImage = (url: string, id: number | string) => {
        webStore.fixPreviewList({
            ...tempData,
            list: tempData.list?.map(item => (item.image === id ? { ...item, image: url } : item)),
        })
    }

    // 内容改变
    const changeValue = (_inputItem: ImageItem, event: React.ChangeEvent<HTMLInputElement>) => {
        webStore.fixPreviewList({
            ...tempData,
            list: tempData.list?.map(item =>
                item.id === _inputItem.id
                    ? // @ts-ignore
                      { ...item, label: event.nativeEvent.target?.value || '' }
                    : item,
            ),
        })
    }

    // 元素排序
    const sortItem = (from: number, to: number) => {
        const list = cloneDeep(tempData.list || [])
        // const t = list[from]
        // list[from] = list[to]
        // list[to] = t
        const [removed] = list.splice(from, 1)
        list.splice(to, 0, removed)
        webStore.fixPreviewList({
            ...tempData,
            list,
        })
    }

    // 链接选择的改变
    const onLinkChange = (urlItem: UrlItem, image: string | number) => {
        const _data = webStore.getNowActive() || { list: [] }

        webStore.fixPreviewList({
            ...tempData,
            list: _data.list?.map(item => {
                console.log(item)
                return item.image === image ? { ...item, url: urlItem } : item
            }),
        })
    }
    /**
     * 填充方式的改变
     * @param fillMethod
     */
    const onChangeFill = (fillMethod: 'cover' | 'space') => {
        webStore.fixPreviewList({
            ...tempData,
            fillMethod,
        })
    }

    return (
        <div className={styles.custom_image}>
            <MiniHeader title="轮播" />
            <FillMethods
                value={tempData.fillMethod}
                onChangeFill={v => {
                    onChangeFill(v)
                }}
            />
            <SubTitle
                title="添加内容"
                description={`建议图片尺寸${
                    tempData.fillMethod === 'cover' ? 1920 : 1200
                }px，高度400px，有效内容在中间1200px的安全区域内，以免出现电脑分辨率过小，内容被裁剪的情况。最多添加5张图片。`}
            />
            <div className={styles.add_con}>
                <AddCard
                    label="添加图片"
                    onChange={addImage}
                    disabled={btnDisable}
                    isUpload={true}
                    onUplaodStar={() => {
                        webStore.setIspadding(true)
                    }}
                    onUploadEnd={() => {
                        webStore.setIspadding(false)
                    }}
                >
                    <MoveContainer
                        datasource={tempData.list || []}
                        onDragEnd={(from, to) => {
                            sortItem(from, to)
                        }}
                        rowKey={'image'}
                    >
                        {item => {
                            return (
                                <CardItems
                                    type="pc"
                                    item={item}
                                    rowKey={'image'}
                                    remove={remove}
                                    onCheckImage={onCheckImage}
                                    onLinkChange={onLinkChange}
                                    changeValue={changeValue}
                                    key={item.image}
                                    customLinkList={linkList}
                                />
                            )
                        }}
                    </MoveContainer>
                </AddCard>
            </div>
            <SetMicroComponentStyle
                styleData={tempData}
                onStyleChange={webStore.fixPreviewList}
                mode="mobile"
            />
        </div>
    )
}

export default observer(Swiper)
