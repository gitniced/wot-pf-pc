import React, { useEffect, useState } from 'react'
import type { ImageItem, PreviewItem, UrlItem } from '../../../../../components/utils/interface'
import MiniHeader from '../../../../../components/MiniHeader'
import styles from './index.module.less'
import SubTitle from '../../../../../components/SubTitle'
import AddCard from '../../../../../components/AddCard'
import { UPDATE_TYPE, getViewStore } from '../../../store'
import { observer, useLocalObservable } from 'mobx-react'
import { cloneDeep } from 'lodash'
import MoveContainer from '../../../../../components/MoveContainer'
import CardItems from '../../../../../components/CardItem'
import type { RadioChangeEvent } from 'antd'
import { Modal, Radio } from 'antd'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'

function CustomImage() {
    const webStore = useLocalObservable(() => getViewStore())
    let tempData = webStore.getNowActive()!
    tempData = cloneDeep(tempData)

    /**  跳转链接数据  */
    const [linkList, setLinkList] = useState<any[]>(webStore.customLinkList)
    useEffect(() => {
        setLinkList(webStore.customLinkList)
    }, [webStore.customLinkList])

    const [btnDisable, setBtnDisable] = useState(false)
    // const spinListId = useRef([])
    useEffect(() => {
        const { list, direction } = tempData || {}
        if (direction === 'horizontal') {
            if (list?.length === 4) {
                setBtnDisable(true)
            } else {
                setBtnDisable(false)
            }
        } else {
            if (list?.length === 10) {
                setBtnDisable(true)
            } else {
                setBtnDisable(false)
            }
        }
    }, [tempData])

    const _addImage = (url: string | number, rest?: Record<string, unknown>) => {
        const imageItem: ImageItem = { image: url, ...rest }
        let { list } = tempData || {}
        list = list?.concat([imageItem])
        tempData.list = list
        webStore.updatePreviewList(UPDATE_TYPE.FIX, { previewItem: tempData })
    }

    const pellUrlAndaddImage = (files: any) => {
        const {
            response: { url },
        } = files[0]
        _addImage(url)
    }

    // 删除元素
    const remove = (image: string) => {
        const _templateData = webStore.getNowActive()
        webStore.fixPreviewList({
            ..._templateData,
            list: _templateData?.list?.filter(item => item.image !== image),
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
                    ? { ...item, label: event.nativeEvent.target?.value || '' }
                    : item,
            ),
        })
    }

    // 链接改变
    const onLinkChange = (urlItem: UrlItem, image: string) => {
        const _data = webStore.getNowActive() || { list: [] }
        let { list } = _data

        list = list || []
        list.map(item => {
            if (item.image === image) {
                item.url = urlItem
            }
        })
        webStore.fixPreviewList({
            ...tempData,
            list,
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

    const onRadioChange = (direction: PreviewItem['direction']) => {
        if (direction === 'horizontal' && tempData?.list?.length > 4) {
            Modal.confirm({
                title: '警告',
                centered: true,
                content: '横向平铺最多上传4张图片，切换后会清空超出数量的图片，确定要继续吗？',
                onOk: () => {
                    webStore.fixPreviewList({
                        ...tempData,
                        list: tempData?.list?.slice(0, 4),
                        direction,
                    })
                },
            })
        } else {
            webStore.fixPreviewList({
                ...tempData,
                direction,
            })
        }
    }

    return (
        <div className={styles.custom_image}>
            <MiniHeader title="图片" />
            <SubTitle title="展示样式" />
            <Radio.Group
                defaultValue="horizontal"
                buttonStyle="solid"
                className={styles.type_con}
                onChange={(e: RadioChangeEvent) => {
                    const {
                        target: { value },
                    } = e
                    onRadioChange(value)
                }}
                value={tempData.direction}
            >
                <Radio.Button value={'horizontal'} className={styles.type_btn}>
                    <svg className={['icon', styles.type_icon].join(' ')} aria-hidden="true">
                        <use xlinkHref={`#icon_hengxianghuadong`} />
                    </svg>
                </Radio.Button>

                <Radio.Button value={'vertical'} className={styles.type_btn}>
                    <svg className={['icon', styles.type_icon].join(' ')} aria-hidden="true">
                        <use xlinkHref={`#icon_yihangyige`} />
                    </svg>
                </Radio.Button>
            </Radio.Group>
            <div className={styles.type_text}>
                <span
                    onClick={() => onRadioChange('horizontal')}
                    className={[
                        tempData.direction === 'horizontal' ? styles.type_text_checked : '',
                    ].join(' ')}
                >
                    {' '}
                    横向平铺
                </span>
                <span
                    onClick={() => onRadioChange('vertical')}
                    className={[
                        tempData.direction === 'vertical' ? styles.type_text_checked : '',
                    ].join(' ')}
                >
                    {' '}
                    纵向平铺
                </span>
            </div>

            <div className={styles.splitLine} />
            <SubTitle
                title="添加内容"
                description={`建议图片尺寸750，高度不限制，最多添加${
                    tempData?.direction === 'horizontal' ? 4 : 10
                }张。（鼠标拖拽可调整顺序）`}
            />
            <div className={styles.add_con}>
                <AddCard
                    label="添加图片"
                    onChange={pellUrlAndaddImage}
                    disabled={btnDisable}
                    isUpload={true}
                    onUplaodStar={() => {
                        _addImage('233', { loading: true })
                    }}
                    onUploadEnd={() => {
                        remove('233')
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
                                    item={item}
                                    rowKey={'image'}
                                    remove={remove}
                                    onCheckImage={onCheckImage}
                                    changeValue={changeValue}
                                    onLinkChange={onLinkChange}
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
                showImageMargin={true}
            />
        </div>
    )
}

export default observer(CustomImage)
