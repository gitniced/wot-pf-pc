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
import { handleTemplateTableList, handleTemplateDifficultyTableData, initValues } from './const'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'
import useMasterHistory from '@/hooks/userMasterHistory'
import useUserStore from '@/hooks/useUserStore'
import useCommonParams from '@/hooks/useCommonParams'

const Edit = () => {
    const siteStore = useSiteStore()
    const userStore = useUserStore()
    const masterHistory = useMasterHistory()
    const commonParams = useCommonParams()

    const { code } = masterHistory.location.query || {}
    const [form] = Form.useForm()
    const [formData, setFormData] = useState<DetailType | any>()

    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' }) || ''
        document.title = `${code ? '编辑' : '新建'}组卷模板-${siteName}`
    }, [])

    // 获取模版详情
    const getDetails = async () => {
        const res = (await http(`${API.getTemplateDetail}/${code}`, 'get', {
            ...commonParams,
        })) as unknown as DetailType
        const { difficultyConfigList, questionConfigList, receiptStartTime, ...values } = res || {}
        const data = {
            difficultyConfigList,
            questionConfigList,
            receiptStartTime,
            ...values,
            templateTableList: handleTemplateTableList(questionConfigList),
            templateDifficultyTableData: handleTemplateDifficultyTableData(difficultyConfigList),
            receiptStatus: receiptStartTime ? true : false,
        }
        const newData = transToFormFieldsValue(data)
        form.setFieldsValue(newData)
        setFormData(newData)
    }

    useEffect(() => {
        code && getDetails()
        //  判断是否是上海站点
        const isShangHaiAlias = getCookie('ALIAS') === 'esh'
        const initialValues = {
            ...initValues,
            chaosOrderState: isShangHaiAlias,
            chaosOptionsState: isShangHaiAlias,
            numContinuousState: isShangHaiAlias,
        }
        setFormData(initialValues)
        form.setFieldsValue(initialValues)
    }, [code])

    // 提交数据
    const submit = async () => {
        const { code: userCode } = userStore?.userData || {}
        const params: any = {
            ...transToSubmitData(formData, 'template'),
            sid: getLocalStorage('SID'),
            organizationCode: userStore?.selectedOrganization,
            userCode,
            ...commonParams,
        }
        if (!params.difficultyLimit) {
            params.difficultyConfigList = []
        }
        let res
        if (code) {
            params.code = code
            res = (await http(API.updateTemplate, 'post', params)) as unknown
        } else {
            res = (await http(API.createTemplate, 'post', params)) as unknown
        }
        if (res) {
            masterHistory.push('./list')
        }
    }

    return (
        <div className={styles.edit}>
            <Breadcrumbs
                crumbData={[{ link: './list', name: '组卷模板' }, { name: code ? '编辑' : '新建' }]}
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
                    <Button onClick={() => masterHistory.push('./list')}>取 消</Button>
                    <Button type="primary" onClick={submit}>
                        保 存
                    </Button>
                </Space>
            </div>
        </div>
    )
}

export default Edit
