import React, { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import type { PreviewItem } from '../../../../../components/utils/interface'
// import { LAYOUT_STYLE } from '../../../../../components/utils/interface'
// import styles from './index.module.less'
import styles from '../../../../../web/create//components/ActionBar/ArticleContent/index.module.less'
// import styles from '@/pages/gateway/web/create/components/ActionBar/ArticleContent/index.module.less'
import { Radio, Form } from 'antd'
import ChoiceTextModal from '@/components/ChoiceTextModal/choiceTextModal'
import { cloneDeep } from 'lodash'
import { RADIO_VALUE_ENUM } from '@/pages/gateway/web/create/components/ActionBar/ArticleContent/const'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'
import ImageTextConfig from './ImageTextConfig'
import { AddContentConfig } from './AddContentConfig'
import { getCardListRender } from './getCardListRender'
import { articleContFc } from './articleContFc'

function ArticleContent(props: { data: PreviewItem }) {
    // 获取全局唯一的store
    const stores = useLocalObservable(() => getViewStore())
    const { data } = props
    // console.log('🍊 data:', JSON.parse(JSON.stringify(data)))

    const [value, setValue] = useState('') //radio的值
    const [visible, setVisible] = useState<boolean>(false) //控制显示隐藏
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox') //根据传是多选还是单选
    const [selectKey, setSelectKey] = useState<string[]>([]) //选中的行数的keys
    const [currentClick, setCurrentClick] = useState<boolean>(false) //判断点击的是取消还是确定  取消为true 确定为false
    const [valData, setValData] = useState([])

    const getImageTextData = async (flag?: boolean) => {
        const response = (await stores.getGraphicData()) || []

        const tempContent = (cloneDeep(response) as unknown as []) || []
        tempContent?.length !== 0 &&
            stores.fixPreviewList({
                ...data,
                codes: tempContent,
                rule: 'default',
                selectCategory: [],
                showLine: flag ? 2 : data?.showLine,
            })
    }

    useEffect(() => {
        const arr: string[] = []
        const objArr: any = []
        const _data = data?.codes || data?.content || []
        _data?.map(i => {
            arr.push(i?.code)
            objArr.push(i)
        })
        setSelectKey(arr)
        setValData(objArr)
    }, [data])

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
        if (data.type === 'content') {
            data?.content?.map(i => {
                if (!i?.defaultOpera) {
                    setSelectKey([])
                }
            })
        }
    }, [data])

    //select 选择框改变
    const { addImageText, sortChange, clickDelete, onChange, getContentTitle, onSubmit } =
        articleContFc(
            setCurrentClick,
            selectKey, //选中的行数的keys
            setValue, //radio的值
            getImageTextData, // 获取图文默认数据
            stores,
            data,
            setVisible, //控制显示隐藏
            setSelectionType, //根据传是多选还是单选
            setSelectKey, //选中的行数的keys set
        )

    /**  添加内容的配置  */
    const getContentConfig = AddContentConfig(
        data,
        stores,
        value, //radio的值
        addImageText, //添加图文
        sortChange /**  sort  */,
        getCardListRender(value, clickDelete) /**  获取数据  */,
    )

    return (
        <div className={styles.page}>
            <div className={styles.title}>图文</div>
            <ImageTextConfig data={{ ...data }} stores={stores} />
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
                <div className={styles.contentTitle}>
                    {getContentTitle(value, data.layoutStyle)}
                </div>
                {getContentConfig(value)}
            </div>
            <SetMicroComponentStyle
                styleData={data}
                onStyleChange={stores.fixPreviewList}
                mode="pc"
            />

            {/* 模态框 */}
            {visible && (
                <ChoiceTextModal
                    data={data}
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
