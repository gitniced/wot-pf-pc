import { Form } from 'antd'
import React from 'react'
import BaseSetting from '../BaseSetting'
import ComposeSetting from '../ComposeSetting'
import OtherSetting from '../OtherSetting'
import AdvanceSetting from '../AdvanceSetting'
import type { FormSettingProps } from './interface'
import handleValues from './handleValues'
import DetailContent from '../DetailContent'
import styles from './index.module.less'
import useUserStore from '@/hooks/useUserStore'
import useSiteStore from '@/hooks/useSiteStore'
import useCommonParams from '@/hooks/useCommonParams'

const FormSetting = (props: FormSettingProps) => {
    const userStore = useUserStore()
    const siteStore = useSiteStore()
    const commonParams = useCommonParams()
    const { form, type, formData, setFormData } = props || {}
    const { templateType, templateCode, composition, fromFileCode } = formData || {}
    const { subject } = commonParams

    // form值发生改变的回调
    const onValuesChange = async (changedValues: Record<string, any>) => {
        const values = await handleValues.processedValue(
            changedValues,
            formData,
            form,
            type,
            userStore?.selectedOrganization,
            commonParams,
        )
        setFormData((v: any) => ({ ...v, ...values }))
    }

    return (
        <Form form={form} labelCol={{ span: 5 }} onValuesChange={onValuesChange}>
            <BaseSetting form={form} type={type} formData={formData} setFormData={setFormData} />
            {/* 组卷模板未选择或者选择不使用 */}
            {!templateType || templateType === 'none' ? (
                <>
                    <ComposeSetting
                        form={form}
                        type={type}
                        formData={formData}
                        setFormData={setFormData}
                        siteData={siteStore?.siteData?.data || {}}
                    />
                    {(composition !== 'fromfile' || fromFileCode) && (
                        <>
                            <OtherSetting isShowEdit={type === 'template' ? true : false} />
                            <AdvanceSetting formData={formData} subject={subject} />
                        </>
                    )}
                </>
            ) : (
                templateCode && (
                    <div className={styles.template}>
                        <DetailContent
                            isEdit={true}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>
                )
            )}
        </Form>
    )
}
export default FormSetting
