import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import MyTitle from '../components/MyTitle'
import { Button, Form, Space } from 'antd'
import styles from './index.module.less'
import type { DetailType } from './interface'
import http from '@/servers/http'
import API from './api'
import { getCookie, getLocalStorage } from '@/storage'
import { transToFormFieldsValue, transToSubmitData } from './transFormValues'
import FormSetting from '../components/FormSetting'
import { handleTemplateTableList, initValues } from './const'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'
import useUserStore from '@/hooks/useUserStore'
import useMasterHistory from '@/hooks/userMasterHistory'
import useCommonParams from '@/hooks/useCommonParams'

const Edit = () => {
    const masterHistory = useMasterHistory()
    const siteStore = useSiteStore()
    const userStore = useUserStore()

    const commonParams = useCommonParams()

    const { code } = masterHistory.location.query || {}
    const [form] = Form.useForm()
    const [formData, setFormData] = useState<DetailType | any>(initValues)

    useEffect(() => {
        form.setFieldsValue(initValues)
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' }) || ''
        document.title = `${code ? '编辑' : '新建'}组卷模板-${siteName}`
    }, [])

    // 获取模版详情
    const getDetails = async () => {
        const res = (await http(
            `${API.getTemplateDetail}/${code}`,
            'get',
            {},
        )) as unknown as DetailType
        const { questionConfigList, receiptStartTime, ...values } = res || {}
        const data = {
            questionConfigList,
            receiptStartTime,
            ...values,
            templateTableList: handleTemplateTableList(questionConfigList),
            receiptStatus: receiptStartTime ? true : false,
        }
        const newData = transToFormFieldsValue(data)
        form.setFieldsValue(newData)
        setFormData(newData)
    }

    useEffect(() => {
        if (code) {
            getDetails()
        }
    }, [code])

    // 提交数据
    const submit = async () => {
        const { code: userCode } = userStore?.userData || {}
        const params: any = {
            ...transToSubmitData(formData, 'template'),
            sid: getLocalStorage('SID'),
            organizationCode: getCookie('SELECT_ORG_CODE'),
            userCode,
        }
        let res
        if (code) {
            params.code = code
            res = (await http(API.updateTemplate, 'post', {
                ...params,
                ...commonParams,
            })) as unknown
        } else {
            res = (await http(API.createTemplate, 'post', {
                ...params,
                ...commonParams,
            })) as unknown
        }
        if (res) {
            masterHistory.push('/merchant-center/paper-library/examine-composition/list')
        }
    }

    return (
        <div className={styles.edit}>
            <Breadcrumbs
                crumbData={[
                    { link: '/paper-library/examine-composition/list', name: '组卷模板' },
                    { link: '', name: code ? '编辑' : '新建' },
                ]}
            />
            <div className={styles.content}>
                <MyTitle title={`${code ? '编辑' : '新建'}组卷模板`} />
                <div className={styles.form_box}>
                    <FormSetting
                        form={form}
                        type="template"
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
            </div>
            <div className={styles.footer}>
                <Space>
                    <Button
                        onClick={() =>
                            masterHistory.push(
                                '/merchant-center/paper-library/examine-composition/list',
                            )
                        }
                    >
                        取 消
                    </Button>
                    <Button type="primary" onClick={submit}>
                        保 存
                    </Button>
                </Space>
            </div>
        </div>
    )
}

export default Edit
