import styles from './index.module.less'
import type { PreviewItem } from '../../../../../components/utils/interface'
import { Form, Radio } from 'antd'
import { RADIO_VALUE_ENUM } from '../ArticleContent/const'
import { useEffect, useState } from 'react'
import type { RadioChangeEvent } from 'antd'
import AddCard from '@/pages/gateway/components/AddCard'
import MoveContainer from '@/pages/gateway/components/MoveContainer'
import { useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import { CloseCircleFilled } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'
import SelectQuizContentModal from './components/SelectQuizContentModal'
import calculateRemainingTime from '@/utils/calculateRemainingTime'
import { PRACTICE_STATE_TEXT } from './const'

interface IBrushQuestionsProps {
    data: PreviewItem
}

/**  刷题设置   */
const BrushQuestions: React.FC<IBrushQuestionsProps> = props => {
    const { data } = props
    const stores = useLocalObservable(() => getViewStore())

    const [radioValue, setRadioValue] = useState('') //radio的值
    const [brushQstVisible, setBrushQstVisible] = useState<boolean>(false) //控制显示隐藏

    /**  获取默认刷题数据  */
    const getBrushQuestionsData = async () => {
        const datas = await stores.getBrushQuestData()

        stores.fixPreviewList({
            ...data,
            codes: datas?.length !== 0 ? datas : [],
            rule: 'default',
        })
    }

    useEffect(() => {
        if (data?.rule === 'default') {
            setRadioValue(RADIO_VALUE_ENUM.DEFAULT)
            getBrushQuestionsData()
        }

        if (data?.rule === 'custom') {
            setRadioValue(RADIO_VALUE_ENUM.MANUAL)
        }
    }, [])

    /**  radio 事件改变  */
    const onChange = (e: RadioChangeEvent) => {
        if (e.target.value === RADIO_VALUE_ENUM.DEFAULT) {
            setRadioValue(e.target.value)
            getBrushQuestionsData()
        } else {
            setRadioValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: 'custom',
            })
        }
    }

    /**  不同radio  不同文案  */
    const getContentTitle = (val: string) => {
        switch (val) {
            case '1':
                return <>默认展示最近的4个已发布的刷题</>
            case '2':
                return <>添加刷题内容，最多10个（鼠标拖拽可调整顺序）</>

            default:
        }
    }

    /**  添加刷题    */
    const addBrushQuestions = (val: string) => {
        if (val === RADIO_VALUE_ENUM.DEFAULT) return
        setBrushQstVisible(true)
    }

    /**
     * 渲染数据 去除不存在得数据
     */
    const renderData = () => {
        const arr = data?.codes!.filter(Boolean) || []
        return arr
    }

    /**  元素排序  */
    const sortChange = (codes: any[]) => {
        stores.fixPreviewList({
            ...data,
            codes,
        })
    }

    /**  删除选择的内容  */
    const clickDelete = (key: string) => {
        const _arr = data?.codes
        const arr = _arr?.filter(item => {
            return item?.code !== key
        })
        stores.fixPreviewList({
            ...data,
            codes: arr,
        })
    }

    /**  获取数据 渲染  */
    const CardRender = (contentItemData: any) => {
        let {
            title = '-',
            startTime = '',
            endTime = '',
            questionCount = '-',
            status = '',
            code = '',
        } = contentItemData || {}

        return (
            <div className={styles.review_item}>
                <div className={styles.review_item_info_title}>{title}</div>
                <div className={styles.review_item_time}>
                    {calculateRemainingTime(startTime, endTime)}
                </div>
                <div className={styles.review_item_footer}>
                    <div className={styles.footer_number}>{questionCount}</div>
                    <div className={styles.footer_tag}>{PRACTICE_STATE_TEXT[status] || '-'}</div>
                </div>

                {/* 等于默认规则得时候不可删除 不可排序 */}
                {radioValue !== RADIO_VALUE_ENUM.DEFAULT && (
                    <CloseCircleFilled
                        className={styles.review_item_close}
                        onClick={() => clickDelete(code)}
                    />
                )}
            </div>
        )
    }

    /**  modal 确定事件  */
    const onOkSubmit = (e: any = []) => {
        let tempData = cloneDeep(e)
        setBrushQstVisible(false)
        stores.fixPreviewList({
            ...data,
            codes: tempData,
        })
    }

    return (
        <div className={styles.brushQuestions_page}>
            <div className={styles.title}>练习</div>
            <div className={styles.radio}>
                {/* 添加方式  */}
                <div className={styles.radioTitle}>添加方式</div>
                <div className={styles.radios}>
                    <Form.Item>
                        <Radio.Group onChange={onChange} value={radioValue}>
                            <Radio value={RADIO_VALUE_ENUM.DEFAULT}>默认规则</Radio>
                            <Radio value={RADIO_VALUE_ENUM.MANUAL}>手动选择</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </div>
            {/* 添加内容  */}
            <div className={styles.content}>
                <h3>添加内容</h3>
                <div className={styles.contentTitle}>{getContentTitle(radioValue)}</div>
                <AddCard
                    label="添加刷题"
                    disabled={radioValue === RADIO_VALUE_ENUM.DEFAULT}
                    isUpload={false}
                    onChange={() => {
                        addBrushQuestions(radioValue)
                    }}
                >
                    <MoveContainer
                        isDragDisabled={radioValue === RADIO_VALUE_ENUM.DEFAULT}
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
            </div>
            {/* 组件样式 */}
            <SetMicroComponentStyle
                styleData={data}
                onStyleChange={stores.fixPreviewList as any}
                mode="mobile"
            />
            {/* 添加刷题modal */}
            <SelectQuizContentModal
                visible={brushQstVisible}
                onCancel={() => setBrushQstVisible(false)}
                choiceData={data.codes || []}
                onOk={onOkSubmit}
            />
        </div>
    )
}

export default BrushQuestions
