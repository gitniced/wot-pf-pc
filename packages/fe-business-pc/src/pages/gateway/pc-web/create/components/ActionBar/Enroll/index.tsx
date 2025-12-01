import React, { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import type { PreviewItem } from '../../../../../components/utils/interface'
import { ADD_RULE } from '../../../../../components/utils/interface.d'
import styles from './index.module.less'
import { Radio, Form } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { cloneDeep } from 'lodash'
import { RADIO_VALUE_ENUM } from '@/pages/gateway/web/create/components/ActionBar/ArticleContent/const'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'
import EnrollConfig from './EnrollConfig'
import { AddContentConfig } from './AddContentConfig'
import EnrollModal from '@/components/EnrollModal'
import { getContentTitle } from './hooks'
import { getLocalStorage } from '@/storage'

function Enroll(props: { data: PreviewItem }) {
    // 获取全局唯一的store
    const stores = useLocalObservable(() => getViewStore())
    const { data } = props

    /**  //radio的值  */
    const [value, setValue] = useState('')
    /**  添加方式为按报名 添加报名modal的open  */
    const [enrollCustomOpen, setEnrollCustomOpen] = useState(false)

    /**  获取报名默认数据  */
    const getEnrollData = async (flag?: boolean) => {
        const response = (await stores.getEnrollData()) || []

        const selectedOrganizationDetail =
            getLocalStorage('USER_STORE')?.selectedOrganizationDetail || {}
        const { logo: organizationLogo, name: organizationName } = selectedOrganizationDetail || {}

        const tempContent = (cloneDeep(response) as unknown as []) || []
        tempContent?.length !== 0 &&
            stores.fixPreviewList({
                ...data,
                codes: tempContent.map((item: any) => ({
                    ...item,
                    organizationLogo,
                    organizationName,
                })),
                rule: ADD_RULE.DEFAULT,
                selectCategory: [],
                showLine: flag ? 2 : data?.showLine,
            })
    }

    useEffect(() => {
        if (data?.rule === 'default') {
            setValue(RADIO_VALUE_ENUM.DEFAULT)
            getEnrollData()
        }
        if (data?.rule === 'custom') {
            setValue(RADIO_VALUE_ENUM.MANUAL)
        }
        if (data?.rule === 'by_category') {
            setValue(RADIO_VALUE_ENUM.CATEGORY)
        }
    }, [])

    /** 添加方式 radio  change  */
    const onChange = (e: RadioChangeEvent) => {
        if (e.target.value === RADIO_VALUE_ENUM.DEFAULT) {
            setValue(e.target.value)
            getEnrollData(true)
        }
        if (e.target.value === RADIO_VALUE_ENUM.MANUAL) {
            setValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: ADD_RULE.CUSTOM,
                selectCategory: [],
                showLine: 1,
            })
        }

        if (e.target.value === RADIO_VALUE_ENUM.CATEGORY) {
            setValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: ADD_RULE.BY_CATEGORY,
                selectCategory: [],
                showLine: 2,
            })
        }
    }

    const onEnrollModalOk = (e: any) => {
        let tempData = cloneDeep(e)
        setEnrollCustomOpen(false)

        stores.fixPreviewList({
            ...data,
            codes: tempData,
            showLine: tempData.length,
        })
    }

    /**  添加内容的配置  */
    const getContentConfig = AddContentConfig(data, stores, setEnrollCustomOpen)

    return (
        <div className={styles.page}>
            <div className={styles.title}>报名</div>
            <EnrollConfig data={{ ...data }} stores={stores} />
            <div className={styles.radio}>
                <div className={styles.radioTitle}>添加方式</div>
                <div className={styles.radios}>
                    <Form.Item initialValue={RADIO_VALUE_ENUM.DEFAULT}>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={RADIO_VALUE_ENUM.DEFAULT}>默认规则</Radio>
                            <Radio value={RADIO_VALUE_ENUM.MANUAL}>按报名</Radio>
                            <Radio value={RADIO_VALUE_ENUM.CATEGORY}>按报名项目</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </div>
            <div className={styles.content}>
                <h3>添加内容</h3>
                <div className={styles.contentTitle}>{getContentTitle(value)}</div>
                {getContentConfig(value)}
            </div>
            <SetMicroComponentStyle
                styleData={data}
                onStyleChange={stores.fixPreviewList as any}
                mode="pc"
            />

            {enrollCustomOpen && (
                <EnrollModal
                    type="checkbox"
                    visible={enrollCustomOpen}
                    contentType="details"
                    onOk={e => {
                        onEnrollModalOk(e)
                    }}
                    onCancel={() => setEnrollCustomOpen(false)}
                    choiceData={data.codes || []}
                    statusList={[1, 2, 3]}
                />
            )}
        </div>
    )
}

export default observer(Enroll)
