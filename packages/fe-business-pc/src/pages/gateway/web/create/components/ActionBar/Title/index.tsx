import React, { useState, useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { Radio, Form, Input } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { getViewStore as getPcViewStore } from '@/pages/gateway/pc-web/create/store'
import { getViewStore as getMobileViewStore } from '@/pages/gateway/web/create/store'
import type { PreviewItem } from '../../../../../components/utils/interface'
import styles from './index.module.less'
import classnames from 'classnames'
import CustomLink from '@/components/CustomLink'
import MiniHeader from '../../../../../components/MiniHeader'
import classNames from 'classnames'
import SubTitle from '../../../../../components/SubTitle'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'
// import getCustomLinkList from '@/utils/getCustomLinkList'
function Title(props: { data: PreviewItem; mode?: 'pc' | 'mobile' }) {
    const { data, mode = 'mobile' } = props
    // 获取全局唯一的store
    let getViewStore = mode === 'pc' ? getPcViewStore : getMobileViewStore
    const stores = useLocalObservable(() => getViewStore(mode))

    const [radioValue, setRadioValue] = useState(false)
    const [form] = Form.useForm()

    const onValuesChange = (_, allValues: { label?: string; url?: object; hasLink?: boolean }) => {
        setRadioValue(allValues?.hasLink || false)

        if (!allValues?.hasLink && allValues.url) {
            allValues.url = {}
            form.setFieldValue('url', {})
        }
        console.log('allValues', allValues)

        stores.fixPreviewList({
            ...data,
            ...allValues,
        })
    }

    useEffect(() => {
        setRadioValue(data?.hasLink || false)

        form?.setFieldsValue(data)
    }, [data])

    const onRadioChange = (value: RadioChangeEvent | boolean) => {
        form.setFieldValue('hasLink', value)
        setRadioValue(value || false)
    }

    return (
        <div className={styles.content}>
            <MiniHeader title="标题栏" />
            <Form form={form} layout="vertical" requiredMark={true} onValuesChange={onValuesChange}>
                <div className={styles.center}>
                    <div className={styles.section_show}>
                        <SubTitle title="展示样式" />

                        <Form.Item noStyle name="hasLink" initialValue={false}>
                            <Radio.Group
                                defaultValue="a"
                                buttonStyle="solid"
                                className={styles.btn_list}
                            >
                                <Radio.Button value={false} className={styles.btn}>
                                    <svg
                                        className={classnames('icon', styles.icon)}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#icon_chunwenzi`} />
                                    </svg>
                                </Radio.Button>

                                <Radio.Button value={true} className={styles.btn}>
                                    <svg
                                        className={classnames('icon', styles.icon)}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#icon_dairukou`} />
                                    </svg>
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                        <div className={styles.text}>
                            <span
                                onClick={() => onRadioChange(false)}
                                className={classNames(radioValue ? null : styles.text_checked)}
                            >
                                纯文字
                            </span>
                            <span
                                onClick={() => onRadioChange(true)}
                                className={classNames(radioValue ? styles.text_checked : null)}
                            >
                                带入口
                            </span>
                        </div>
                    </div>
                    <div className={styles.line} />
                    <div className={styles.section}>
                        <SubTitle title="添加内容" />
                        <Form.Item
                            label="标题"
                            required={true}
                            name={'label'}
                            className={styles.form_item}
                        >
                            <Input placeholder="请输入标题" maxLength={30} />
                        </Form.Item>

                        {radioValue && (
                            <Form.Item
                                className={styles.form_item}
                                label="跳转链接"
                                required={true}
                                name={'url'}
                            >
                                <CustomLink type={mode} list={stores.customLinkList} />
                            </Form.Item>
                        )}
                    </div>
                </div>
            </Form>
            <SetMicroComponentStyle
                styleData={data}
                onStyleChange={stores.fixPreviewList}
                mode={mode}
            />
        </div>
    )
}

export default observer(Title)
