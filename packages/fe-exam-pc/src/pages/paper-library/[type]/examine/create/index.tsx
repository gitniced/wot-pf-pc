/**
 * 创建试卷
 */
import { Button, Form, Space, message } from 'antd'
import { useEffect, useState } from 'react'
import FormSetting from '../../../examine-composition/components/FormSetting'
import type { DetailType } from '../../../examine-composition/edit/interface'
import FooterControl from '@/components/FooterControl'
import TitleBlock from '@/components/TitleBlock'
import { getLocalStorage } from '@/storage'
import {
    transToFormFieldsValue,
    transToSubmitData,
} from '../../../examine-composition/edit/transFormValues'
import styles from './index.module.less'
import { initValues } from './const'
import Breadcrumbs from '@/components/Breadcrumbs'
import WaitModal from './components/WaitModal'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'
import useMasterHistory from '@/hooks/userMasterHistory'
import useUserStore from '@/hooks/useUserStore'
import useCommonParams from '@/hooks/useCommonParams'
import { getFrontDetail, postFrontCreate, postFrontGetGenerate, postFrontUpdate } from './api'
import { getTitleByType } from '../../utils'
import usePageParams from '@/hooks/usePageParams'
import { DIFFICULTY_LEVEL } from '@/pages/paper-library/[type]/const'

const ExamineCreate = () => {
    const siteStore = useSiteStore()
    const userStore = useUserStore()
    const masterHistory = useMasterHistory()
    const commonParams = useCommonParams()

    const { code } = masterHistory.location.query || {}
    const urlParams = usePageParams(code ? ['code'] : [])
    const [form] = Form.useForm()
    const [formData, setFormData] = useState<DetailType | any>(initValues)
    const [waitVisible, setWaitVisible] = useState<boolean>(false)
    console.log(formData, 'formData')

    useEffect(() => {
        form.setFieldsValue(initValues)
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' }) || ''
        document.title = `${code ? '重新生成' : '新建'}试卷-${siteName}`
    }, [])
    // 获取试卷详情
    const getPaperDetail = async () => {
        const res = (await getFrontDetail(code, commonParams)) as unknown as DetailType
        const {
            difficultyConfigList,
            questionConfigList,
            receiptStartTime,
            examinationCommitmentLetter,
            expertReviewMaterials,
            questionSourceType,
            ...values
        } = res || {}
        const data = {
            questionConfigList,
            difficultyConfigList,
            difficultyTableData: difficultyConfigList.map((item: any) => {
                item.levelName = DIFFICULTY_LEVEL[item.level]
                return item
            }),
            receiptStartTime,
            ...values,
            questionTableData: questionConfigList,
            receiptStatus: receiptStartTime ? true : false,
            examinationCommitmentLetter,
            expertReviewMaterials,
            questionSourceType: questionSourceType ? questionSourceType : undefined,
        }
        const newData = transToFormFieldsValue(data)
        form.setFieldsValue({
            ...newData,
            examinationCommitmentLetter: examinationCommitmentLetter
                ? [
                      {
                          url: examinationCommitmentLetter,
                          name: examinationCommitmentLetter.split('/').splice(-1)[0],
                          status: 'done',
                      },
                  ]
                : [],
            expertReviewMaterials: expertReviewMaterials
                ? [
                      {
                          url: expertReviewMaterials,
                          name: expertReviewMaterials.split('/').splice(-1)[0],
                          status: 'done',
                      },
                  ]
                : [],
        })
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
        postFrontGetGenerate(paperCode, commonParams)
            .then(res => {
                if (res) {
                    setWaitVisible(false)
                    masterHistory.push(`./edit?code=${paperCode}`)
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
        form.validateFields()
            .then(async () => {
                const { code: userCode } = userStore?.userData || {}
                const params: any = {
                    ...transToSubmitData(formData, 'examine_create'),
                    sid: getLocalStorage('SID'),
                    organizationCode: userStore?.selectedOrganization,
                    userCode,
                }

                if (!params.difficultyLimit) {
                    params.difficultyConfigList = []
                }
                setWaitVisible(true)
                try {
                    let res
                    if (code) {
                        params.code = code
                        res = (await postFrontUpdate({
                            ...params,
                            ...commonParams,
                        })) as unknown as string
                    } else {
                        res = (await postFrontCreate({
                            ...params,
                            ...commonParams,
                        })) as unknown as string
                    }
                    if (res) {
                        isGenerate(res)
                    }
                } catch (error) {
                    setWaitVisible(false)
                }
            })
            .catch(err => {
                const { errorFields } = err || {}
                if (errorFields?.[0]?.errors?.[0]) {
                    message.error(errorFields?.[0]?.errors?.[0])
                }
            })
    }

    const pageTitle = getTitleByType(commonParams)
    return (
        <div className={styles.create_wrapper}>
            <div className={styles.create_wrapper_inner}>
                <Breadcrumbs
                    crumbData={[
                        { link: `./list?${urlParams}`, name: pageTitle! },
                        { name: code ? '编辑' : '新建' },
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
            {/* @ts-ignore */}
            <FooterControl>
                <Space size={16}>
                    <Button onClick={() => masterHistory.push(`./list?${urlParams}`)}>取消</Button>
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
