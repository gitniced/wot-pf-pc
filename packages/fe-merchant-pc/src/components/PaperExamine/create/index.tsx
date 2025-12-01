/**
 * 创建试卷
 */
import { Button, Form, Space } from 'antd'
import { useEffect, useState } from 'react'
import FooterControl from '@/components/FooterControl'
import TitleBlock from '@/components/TitleBlock'
import { getCookie, getLocalStorage } from '@/storage'
import http from '@/servers/http'

import styles from './index.module.less'
import { initValues } from './const'
import Breadcrumbs from '@/components/Breadcrumbs'
import WaitModal from './components/WaitModal'
import { findSiteData } from '@/utils/valueGet'
import type { DetailType } from '@/components/PaperComposition/edit/interface'
import {
    transToFormFieldsValue,
    transToSubmitData,
} from '@/components/PaperComposition/edit/transFormValues'
import FormSetting from '@/components/PaperComposition/components/FormSetting'
import useSiteStore from '@/hooks/useSiteStore'
import useMasterHistory from '@/hooks/userMasterHistory'
import useUserStore from '@/hooks/useUserStore'
import { useParams } from 'umi'
import type { QuestionRouteType } from '@/hooks/useCommonParams'

const ExamineCreate = () => {
    const masterHistory = useMasterHistory()
    const siteStore = useSiteStore()
    const userStore = useUserStore()

    const { code } = masterHistory.location.query || {}
    const { type } = useParams() as { type: QuestionRouteType }

    const [form] = Form.useForm()
    const [formData, setFormData] = useState<DetailType | any>(initValues)
    const [waitVisible, setWaitVisible] = useState<boolean>(false)

    useEffect(() => {
        form.setFieldsValue(initValues)
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' }) || ''
        document.title = `${code ? '重新生成' : '新建'}试卷-${siteName}`
    }, [])
    // 获取试卷详情
    const getPaperDetail = async () => {
        const res = (await http(`/exam/front/detail/${code}`, 'get', {})) as unknown as DetailType
        const { questionConfigList, receiptStartTime, ...values } = res || {}
        const data = {
            questionConfigList,
            receiptStartTime,
            ...values,
            questionTableData: questionConfigList,
            receiptStatus: receiptStartTime ? true : false,
        }
        const newData = transToFormFieldsValue(data)
        form.setFieldsValue(newData)
        setFormData(newData)
    }

    useEffect(() => {
        if (code) {
            getPaperDetail()
        }
    }, [code])
    /**
     * 查询抽题异步
     * @param paperCode 试卷code
     */
    const isGenerate = async (paperCode: string) => {
        http(`/exam/front/get_generate/${paperCode}`, 'post', {})
            .then(res => {
                if (res) {
                    setWaitVisible(false)
                    masterHistory.push(
                        `/merchant-center/paper-library/examine/edit?code=${paperCode}`,
                    )
                } else {
                    setTimeout(() => {
                        isGenerate(paperCode)
                    }, 1000)
                }
            })
            .catch(() => {
                setWaitVisible(false)
            })
    }
    // 保存试卷
    const handleSave = async () => {
        const { code: userCode } = userStore?.userData || {}
        const params: any = {
            ...transToSubmitData(formData, 'examine_create'),
            sid: getLocalStorage('SID'),
            organizationCode: getCookie('SELECT_ORG_CODE'),
            userCode,
        }
        setWaitVisible(true)
        try {
            let res
            if (code) {
                params.code = code
                res = (await http('/exam/front/update', 'post', params)) as unknown as string
            } else {
                res = (await http('/exam/front/create', 'post', params)) as unknown as string
            }
            if (res) {
                isGenerate(res)
            }
        } catch (error) {
            setWaitVisible(false)
        }
    }

    return (
        <div className={styles.create_wrapper}>
            <div className={styles.create_wrapper_inner}>
                <Breadcrumbs
                    crumbData={[
                        { link: `/paper-library/${type}/examine/list`, name: '模拟卷库' },
                        { link: '', name: code ? '编辑' : '新建' },
                    ]}
                />
                <div className={styles.create_box}>
                    <TitleBlock title="新建试卷" />
                    <div className={styles.content}>
                        <FormSetting
                            form={form}
                            type="examine_create"
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>
                </div>
            </div>
            <FooterControl>
                <Space size={16}>
                    <Button
                        onClick={() =>
                            masterHistory.push('/merchant-center/paper-library/examine/list')
                        }
                    >
                        取消
                    </Button>
                    <Button type="primary" onClick={handleSave}>
                        保存
                    </Button>
                </Space>
            </FooterControl>

            <WaitModal visible={waitVisible} title="抽题组卷" content="正在进行抽题组卷，请稍候…" />
        </div>
    )
}

export default ExamineCreate
