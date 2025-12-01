import React, { useEffect, useState } from 'react'
import type { ImageItem, PreviewItem, UrlItem } from '../../../../../components/utils/interface'
import MiniHeader from '@/pages/gateway/components/MiniHeader'
import styles from './index.module.less'
import SubTitle from '@/pages/gateway/components/SubTitle'
import AddCard from '@/pages/gateway/components/AddCard'
import { UPDATE_TYPE, getViewStore } from '../../../store'
import { observer, useLocalObservable } from 'mobx-react'
import { cloneDeep } from 'lodash'
import MoveContainer from '@/pages/gateway/components/MoveContainer'
import CardItems from '@/pages/gateway/components/CardItem'
import type { RadioChangeEvent } from 'antd'
import { Modal, Radio } from 'antd'
import FillMethods from '@/pages/gateway/components/FillMethods'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'

function CustomImage() {
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

    const _addImage = (url: string | number, rest?: any) => {
        // @ts-ignore
        const imageItem: ImageItem = { image: url as string, ...rest }
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
        if (_templateData) {
            webStore.fixPreviewList({
                ..._templateData,
                list: _templateData?.list?.filter(item => item.image !== image),
            })
        }
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

    // 链接改变
    const onLinkChange = (urlItem: UrlItem, image: string | number) => {
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
        const [removed] = list.splice(from, 1)
        list.splice(to, 0, removed)
        webStore.fixPreviewList({
            ...tempData,
            list,
        })
    }

    const onRadioChange = (direction: PreviewItem['direction']) => {
        if (direction === 'horizontal' && (tempData?.list?.length || 0) > 4) {
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
            <MiniHeader title="图片" />
            <SubTitle title="展示样式" />
            <Radio.Group
                defaultValue="horizontal"
                buttonStyle="solid"
                className={styles.type_icon_group}
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
            <FillMethods
                value={tempData.fillMethod}
                onChangeFill={v => {
                    onChangeFill(v)
                }}
            />
            <div className={styles.splitLine} />
            <SubTitle
                title="添加内容"
                description={`建议图片尺寸1920px，高度不限制，最多添加${
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
                                    customLinkList={linkList}
                                    type="pc"
                                    item={item}
                                    rowKey={'image'}
                                    remove={remove}
                                    onCheckImage={onCheckImage}
                                    changeValue={changeValue}
                                    onLinkChange={onLinkChange}
                                    key={item.image}
                                />
                            )
                        }}
                    </MoveContainer>
                </AddCard>
            </div>
            <SetMicroComponentStyle
                styleData={tempData}
                showImageMargin={true}
                onStyleChange={webStore.fixPreviewList}
                mode="pc"
            />
        </div>
    )
}

export default observer(CustomImage)
