import React, { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import type { ContentItem, PreviewItem } from '../../../../../components/utils/interface'
import styles from './index.module.less'
import { Radio, Form, Modal } from 'antd'
import AddCard from '../../../../../components/AddCard'
import type { RadioChangeEvent } from 'antd'
import ChoiceTextModal from '@/components/ChoiceTextModal/choiceTextModal'
import dayjs from 'dayjs'
import MoveContainer from '../../../../../components/MoveContainer'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import { CloseCircleFilled } from '@ant-design/icons'
import { RADIO_VALUE_ENUM } from './const'
import ChoiceCategory from './components/ChoiceCategory'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'

function ArticleContent(props: { data: PreviewItem }) {
    // 获取全局唯一的store
    const stores = useLocalObservable(() => getViewStore())
    const { data } = props
    const [value, setValue] = useState('') //radio的值
    const [visible, setVisible] = useState<boolean>(false) //控制显示隐藏
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox') //根据传是多选还是单选
    const [selectKey, setSelectKey] = useState<string[]>([]) //选中的行数的keys
    const [currentClick, setCurrentClick] = useState<boolean>(false) //判断点击的是取消还是确定  取消为true 确定为false
    const [valData, setValData] = useState([])

    const getImageTextData = async () => {
        const { defaultContent } = stores
        console.log('🍊 defaultContent:', JSON.parse(JSON.stringify(defaultContent)))

        let tempContent = cloneDeep(defaultContent)
        if (!tempContent?.length) {
            tempContent = (await stores.getGraphicData()) || []
        }

        tempContent?.length !== 0 &&
            stores.fixPreviewList({
                ...data,
                codes: tempContent,
                rule: 'default',
                selectCategory: [],
            })
    }

    useEffect(() => {
        if (data?.rule === 'default') {
            setValue(RADIO_VALUE_ENUM.DEFAULT)
            getImageTextData()
        }

        if (data?.rule === 'custom') {
            setValue(RADIO_VALUE_ENUM.MANUAL)
        }

        if (data?.rule === 'by_category') {
            setValue(RADIO_VALUE_ENUM.CATEGORY)
        }
    }, [])
    useEffect(() => {
        const arr: string[] = []
        const objArr: any = []
        const _data = data?.codes || data?.content || []
        _data.map(i => {
            arr.push(i?.code)
            objArr.push(i)
        })

        setSelectKey(arr)
        setValData(objArr)
    }, [data])

    useEffect(() => {
        if (data.type === 'content') {
            if (currentClick && data?.content?.length === 0) {
                setSelectKey([])
            }
        } else {
            if (currentClick && data?.codes?.length === 0) {
                setSelectKey([])
            }
        }
    }, [visible])

    useEffect(() => {
        /**  处理老数据  */
        if (data.type === 'content') {
            data?.content?.map(i => {
                if (!i?.defaultOpera) {
                    setSelectKey([])
                }
            })
        }
    }, [data])

    //select 选择框改变
    const onChange = (e: RadioChangeEvent) => {
        setSelectKey([])
        setValData([])
        setCurrentClick(true)
        if (e.target.value === RADIO_VALUE_ENUM.DEFAULT && selectKey.length !== 0) {
            Modal.confirm({
                title: '切换为默认规则将清空您已选择的图文,确定要继续吗?',
                icon: <ExclamationCircleOutlined />,
                centered: true,
                okText: '继续',
                cancelText: '取消',
                onOk: () => {
                    setValue(e.target.value)
                    getImageTextData()
                },
            })
        } else if (e.target.value === RADIO_VALUE_ENUM.DEFAULT) {
            setValue(e.target.value)
            getImageTextData()
        } else if (e.target.value === RADIO_VALUE_ENUM.MANUAL) {
            setValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: 'custom',
                selectCategory: [],
            })
        } else if (e.target.value === RADIO_VALUE_ENUM.CATEGORY) {
            setValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: 'by_category',
            })
        }
    }
    //添加内容的选择
    const getContentTitle = (val: string) => {
        switch (val) {
            case '1':
                return <>默认展示最新发布的4个图文</>
            case '2':
                return <>添加图文内容，最多10个（鼠标拖拽可调整顺序）</>
            case '3':
                return <>默认展示所选分类下最新发布的4个图文</>
            default:
        }
    }
    //默认的时候禁止添加导航
    const addImageText = (val: string) => {
        if (val === RADIO_VALUE_ENUM.DEFAULT) return false
        setVisible(true)
        setSelectionType('checkbox')
    }
    //modal的确认按钮
    const onSubmit = (val: any) => {
        const json = JSON.parse(JSON.stringify(val))
        // json.forEach((item: any) => {
        //     Object.assign(item, { defaultOpera: 1 })
        // })
        setCurrentClick(false)
        setVisible(false)
        setValData(json)

        stores.fixPreviewList({
            ...data,
            codes: json,
        })
    }

    // 删除
    const clickDelete = (key: string) => {
        const _arr = data?.codes || data?.content
        const arr = _arr?.filter(item => {
            return item?.code !== key
        })
        stores.fixPreviewList({
            ...data,
            codes: arr,
        })

        const res = selectKey.filter((i: string) => {
            return i !== key
        })
        setSelectKey(res)
    }

    // 元素排序
    const sortChange = (codes: any[]) => {
        stores.fixPreviewList({
            ...data,
            codes,
        })
    }

    //获取数据
    const CardRender = (contentItemData: ContentItem) => {
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

    /**
     * 渲染数据 去除不存在得数据
     */
    const renderData = () => {
        const arr = data?.codes?.filter(Boolean)?.length
            ? data?.codes?.filter(Boolean)
            : (data?.content || [])?.filter(Boolean)
        /**
         * 新数据  数组里 如果有字符串类型得数据 说明this.imgaeText得length 为0  清空数据
         * 老数据 data?.content 数组里直接是对象
         */
        if (arr?.some(i => typeof i === 'string')) {
            stores.fixPreviewList({
                ...data,
                codes: [],
            })
            return []
        }

        return arr
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>图文</div>
            <div className={styles.radio}>
                <div className={styles.radioTitle}>添加方式</div>
                <div className={styles.radios}>
                    <Form.Item initialValue={RADIO_VALUE_ENUM.DEFAULT}>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={RADIO_VALUE_ENUM.DEFAULT}>默认规则</Radio>
                            <Radio value={RADIO_VALUE_ENUM.MANUAL}>手动选择</Radio>
                            <Radio value={RADIO_VALUE_ENUM.CATEGORY}>按分类</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </div>
            <div className={styles.content}>
                <h3>添加内容</h3>
                <div className={styles.contentTitle}>{getContentTitle(value)}</div>
                {value !== RADIO_VALUE_ENUM.CATEGORY ? (
                    <AddCard
                        label="添加图文"
                        disabled={value === RADIO_VALUE_ENUM.DEFAULT && true}
                        isUpload={false}
                        onChange={() => {
                            addImageText(value)
                        }}
                    >
                        <MoveContainer
                            isDragDisabled={value === RADIO_VALUE_ENUM.DEFAULT ? true : false}
                            datasource={renderData()}
                            rowKey="code"
                            onChange={result => {
                                sortChange(result)
                            }}
                        >
                            {item => {
                                return CardRender(item)
                            }}
                        </MoveContainer>
                    </AddCard>
                ) : (
                    <div className={styles.category}>
                        <Form layout="vertical">
                            <Form.Item
                                name="category"
                                label="选择分类："
                                rules={[{ required: true }]}
                            >
                                <ChoiceCategory
                                    datas={data}
                                    fixPreviewList={stores.fixPreviewList}
                                    type="mobile"
                                />
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </div>
            <SetMicroComponentStyle
                styleData={data}
                onStyleChange={stores.fixPreviewList}
                mode="mobile"
            />

            {/* 模态框 */}
            {value === RADIO_VALUE_ENUM.MANUAL && (
                <ChoiceTextModal
                    visible={visible}
                    onCancel={() => {
                        setVisible(false)
                        setCurrentClick(true)
                    }}
                    onSubmit={onSubmit}
                    selectionType={selectionType}
                    selectKey={selectKey}
                    setSelectKey={setSelectKey}
                    valData={valData}
                />
            )}
        </div>
    )
}

export default observer(ArticleContent)
