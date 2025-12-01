// 新建招聘单位弹窗

import { useEffect, useState } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { inject } from 'mobx-react'

import AreaCascader from '@/components/AreaCascader'

import type { CreateModalProps } from './interface'
import LoadingCascader from '../company-homepage/formList/BasicInfo/LoadingCascader'
import { getRecruitCompanyTypeApi, getRecruiterDetailApi } from './api'
import type UserStore from '@/stores/userStore'

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
}

const CreateModal = ({
    code,
    open,
    onCancel,
    onCreate,
    onEdit,
    userStore,
}: CreateModalProps & { userStore?: UserStore }) => {
    const [form] = Form.useForm()
    const [recruitCompanyType, setRecruitCompanyType] = useState<
        { label: string; value: number }[]
    >([])

    useEffect(() => {
        if (open && code) {
            // 获取招聘详情
            getRecruiterDetailApi(code).then((res: any) => {
                const {
                    companyName,
                    companyCode,
                    companyType,
                    provinceCode,
                    cityCode,
                    regionCode,
                    industryId,
                    parentIndustryId,
                } = res

                form.setFieldsValue({
                    companyName,
                    companyCode,
                    companyType,
                    addressList: [provinceCode, cityCode, regionCode],
                    industryList: [parentIndustryId, industryId],
                })
            })
        }
        if (open) {
            getRecruitCompanyTypeApi().then((res: any) => {
                // @ts-ignore
                res?.map(item => {
                    recruitCompanyType.push({
                        label: item.desc,
                        value: item.code,
                    })
                })
                setRecruitCompanyType([...recruitCompanyType])
            })
        }
    }, [open, code])

    // 新增招聘单位
    const handleCreateRecruiter = () => {
        form.validateFields().then(values => {
            const { companyName, companyCode, companyType, addressList, industryList } = values

            const [provinceCode, cityCode, regionCode] = addressList
            const [_parentIndustryId, industryId] = industryList

            const createParams = {
                companyName,
                companyCode,
                companyType,
                provinceCode,
                cityCode,
                regionCode,
                industryId,
                organizationCode: userStore?.userData?.lastOrganizationCode,
            }

            const editParams = { ...createParams, code }
            if (code) {
                onEdit?.(editParams).then(() => {
                    form.resetFields()
                })
            } else {
                onCreate?.(createParams).then(() => {
                    form.resetFields()
                })
            }
        })
    }

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    return (
        <Modal title="新建" open={open} onCancel={handleCancel} onOk={handleCreateRecruiter}>
            <Form form={form} {...formItemLayout}>
                <Form.Item
                    required
                    label="单位名称"
                    name="companyName"
                    rules={[{ required: true, message: '请输入单位名称' }]}
                >
                    <Input placeholder="请输入" maxLength={50} />
                </Form.Item>
                <Form.Item label="统一信用代码" name="companyCode">
                    <Input placeholder="请输入" maxLength={50} />
                </Form.Item>
                <Form.Item
                    required
                    label="单位性质"
                    name="companyType"
                    rules={[{ required: true, message: '请选择单位性质' }]}
                >
                    <Select placeholder="请选择" options={recruitCompanyType} />
                </Form.Item>
                <Form.Item
                    required
                    label="所在地"
                    name="addressList"
                    rules={[{ required: true, message: '请选择所在地' }]}
                >
                    <AreaCascader type="area" />
                </Form.Item>
                <Form.Item
                    required
                    label="行业"
                    name="industryList"
                    rules={[{ required: true, message: '请选择行业' }]}
                >
                    <LoadingCascader
                        api="/common_data/industry/list"
                        placeholder="请选择所属行业"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default inject('userStore')(CreateModal)
