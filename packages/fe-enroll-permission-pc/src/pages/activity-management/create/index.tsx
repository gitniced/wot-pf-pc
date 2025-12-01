import styles from './index.module.less'
import { Button, Form, Steps } from 'antd'
import { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { history, useModel } from 'umi'
import type { IRoute } from 'umi'
import { ACTIVITY_STEP_ENUM } from './const'
import ActivityCreateStore from './store'
import { addFormParams } from './utils'
import { hooks } from './hooks'
import { getSessionStorage } from '@/storage'
export const ActivityCreate = observer(() => {
    /**  isRelease 1为发布 0为未发布  */
    const { code, activityFormat, isRelease = '0' } = history.location.query as any
    /**  是否为编辑  */
    const idEdit = !!code
    const store = useLocalObservable(() => new ActivityCreateStore())
    const { editIsPublish } = store
    /**  不能编辑 编辑并且发布 */
    const cannotEdit = idEdit && editIsPublish

    const [form] = Form.useForm()
    /**  监听形式  */
    const monFormat = Form.useWatch('activityForm', form)
    /**  监听关联岗位  */
    const relatedPositions = Form.useWatch('relateProfessionStatus', form)
    /**  监听活动打卡  */
    const activityCheckIn = Form.useWatch('relateSignStatus', form)
    /**   监听定位  */
    const location = Form.useWatch('locationStatus', form)

    /**  当前步骤  */
    const [currentStep, setCurrentStep] = useState<number>(ACTIVITY_STEP_ENUM.FIRST)
    const [formSid, setFormSid] = useState<any>('')

    // 回显数据
    useEffect(() => {
        // 编辑的情况下请求练习详情数据
        if (code) {
            store.getActivityDetails(code).then(res => {
                form.setFieldsValue(res)
                res?.activityForm && addFormParams('activityFormat', res?.activityForm)
                res?.sid && addFormParams('sid', res?.sid)
            })
        }
    }, [code])

    const { renderStep, handleCancel, handleSaveDraft, handleSaveAndNext } = hooks(
        currentStep,
        form,
        setCurrentStep,
        code,
        store,
        cannotEdit,
        setFormSid,
        formSid,
        monFormat,
        relatedPositions,
        activityFormat,
        activityCheckIn,
        location,
    )

    const { masterStore, gatewayUserStore } = useModel('@@qiankunStateFromMaster')
    const platform = getSessionStorage('PLATFORM')
    let selectedOrganizationDetail: any = {}
    platform === 'workbench'
        ? (selectedOrganizationDetail = masterStore?.userStore?.selectedOrganizationDetail || '')
        : ''
    platform === 'portal'
        ? (selectedOrganizationDetail = gatewayUserStore?.selectedOrganizationDetail || '')
        : ''
    useEffect(() => {
        const { name: organizationName } = selectedOrganizationDetail || {}
        setTimeout(() => {
            document.title = organizationName
                ? `创建/编辑活动-${organizationName}`
                : '创建/编辑活动'
        }, 1000)
    }, [selectedOrganizationDetail])

    return (
        <div className={styles.page_activity_create}>
            <div className={styles.content_top}>
                <div className={styles.step_wrapper}>
                    <Steps current={currentStep}>
                        <Steps.Step title="基本信息" />
                        <Steps.Step title="活动介绍" />
                        {/* <Steps.Step title="内容详情" /> */}
                        <Steps.Step title="活动设置" />
                    </Steps>
                </div>

                <div className={styles.content_wrapper}>
                    <Form
                        form={form}
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 12 }}
                        validateTrigger="onBlur"
                    >
                        {renderStep(currentStep)}
                    </Form>
                </div>
            </div>

            <div className={styles.footer_wrapper}>
                <Button
                    onClick={handleCancel}
                    style={{
                        marginRight: '10px',
                    }}
                >
                    {currentStep === ACTIVITY_STEP_ENUM.FIRST ? '取消' : '上一步'}
                </Button>
                {/* 只要不是发布状态就有 */}
                {isRelease === '0' && (
                    <Button
                        type="primary"
                        onClick={handleSaveDraft}
                        style={{
                            marginRight: '10px',
                        }}
                    >
                        保存，暂不发布
                    </Button>
                )}

                <Button type="primary" onClick={handleSaveAndNext}>
                    {currentStep === ACTIVITY_STEP_ENUM.THIRD
                        ? editIsPublish
                            ? '保存'
                            : '发布'
                        : '下一步'}
                </Button>
            </div>
        </div>
    )
})

const ObserverPage: IRoute = ActivityCreate
ObserverPage.title = '活动'
export default ObserverPage
