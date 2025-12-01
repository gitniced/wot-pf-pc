import TitleAdvance from '@/pages/enroll-information/components/TitleAdvance'
import styles from './index.module.less'
import { Cascader, Col, Form, Input, Radio, Row, Select } from 'antd'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'

import type { CascaderProps, UploadFile } from 'antd'
import type { UserStore } from '@/stores/userStore'
import { getCityListByParentCode, getFieldEnum } from '@/pages/enroll-information/api'
import type { CityItem, CommonEnumItem } from '@/pages/enroll-information/interface'
import { cloneDeep } from 'lodash'
import type { DefaultOptionType } from 'antd/lib/cascader'
import BatchImport from '@/components/BatchImport'

import React from 'react'
import { history } from 'umi'
import type { GroupEnrollQuery } from '../../interface'
import type { ImportParams } from '@/components/BatchImport/interface'
import { ENROLL_CHANNEL } from '@/types/enroll-const'
import { getSessionStorage } from '@/storage'
import { GENDER_OPTIONS } from '@/pages/enroll-information/constants'
import { getDecodeInfo } from '@wotu/wotu-components'

/**
 *
 * @returns 批量修正用户表单组件
 */
const ImportStep = React.forwardRef(
    ({ userStore, store }: { userStore: UserStore; store: any }, ref: any) => {
        const { activityCode, applyChannel } = history.location.query as GroupEnrollQuery
        const [form] = Form.useForm()

        const [selectedRegion, setSelectedRegion] = useState<CityItem[]>()
        // 证件类型枚举
        const [certificateTypeOptioins, setCertificateTypeOptions] = useState<
            { label: string; value: string }[]
        >([])

        const { userData } = userStore

        const {
            name: _name,
            mobile: _mobile,
            gender: _gender,
            idCardNo: _idCardNo,
            certificateType: _certificateType,
        } = userData

        const batchImportRef = useRef<{
            validate: () => Promise<void>
            handleStartImport: (values: ImportParams) => {}
        }>()

        // 参赛地区
        const [cityOptions, setCityOptions] = useState<CascaderProps[]>([])

        useEffect(() => {
            store.getLastImportInfo(activityCode).then((res: any) => {
                const {
                    position,
                    workAddress,
                    name = getDecodeInfo(_name || ''),
                    mobile = getDecodeInfo(_mobile || ''),
                    gender = _gender ? _gender : undefined,
                    idCardNo = getDecodeInfo(_idCardNo || ''),
                    certificateType = _certificateType,
                    participatingArea = [],
                } = res ?? {}

                setSelectedRegion(participatingArea)

                form.setFieldsValue({
                    position,
                    workAddress,
                    name,
                    mobile,
                    gender,
                    idCardNo,
                    certificateType: String(certificateType),
                    participatingArea: participatingArea
                        .map((item: CityItem) => item.name)
                        .join('/'),
                })
            })

            // 获取证件类型枚举
            getFieldEnum('TYPE_OF_CERTIFICATE').then((res: any) => {
                res?.map((item: CommonEnumItem) => {
                    certificateTypeOptioins.push({
                        label: item.name,
                        value: item.key,
                    })
                })
                setCertificateTypeOptions(certificateTypeOptioins)
            })
        }, [])

        /** 获取最终的报名渠道
         *  推广链接中会携带applyChannel字段
         *  非推广链接的话 根据当前为机构门户还是站点门户来获取applyChannel
         */
        const getFinallyApplyChannel = () => {
            const platform = getSessionStorage('PLATFORM')

            if (applyChannel) {
                return applyChannel
            }

            return platform === 'portal' ? ENROLL_CHANNEL.ORGANIZATION : ENROLL_CHANNEL.SITE
        }

        useImperativeHandle(ref, () => {
            return {
                validate: form.validateFields,
                handleStartImport: () => {
                    batchImportRef.current?.validate().then(() => {
                        const values = form.getFieldsValue()
                        return batchImportRef.current?.handleStartImport({
                            ...values,
                            activityCode,
                            applyChannel: getFinallyApplyChannel(),
                            participatingArea: selectedRegion,
                        })
                    })
                },
            }
        })

        // 获取参赛地区
        useEffect(() => {
            /** 如果配置信息请求身份parentCode默认为0 */
            getCityListByParentCode(0).then((res: any) => {
                const result = (res || []).map((item: CityItem) => ({
                    label: item.name,
                    value: item.code,
                    level: item.level,
                    /** 不为叶子结点，可以请求下一级数据 */
                    isLeaf: false,
                }))

                setCityOptions(cloneDeep(result))
            })
        }, [])

        /** 动态加载城市/区域*/
        const handleLoadCityData = (_selectedOptions: DefaultOptionType[]) => {
            const targetOption = _selectedOptions[_selectedOptions.length - 1]

            const { value, level: parentLevel } = targetOption

            // value不为空或者等级小于2才能获取下一级数据（只允许请求三级数据）
            if (value && parentLevel <= 2) {
                getCityListByParentCode(Number(value)).then((res: any) => {
                    targetOption.children = (res || []).map((item: CityItem) => ({
                        label: item.name,
                        value: item.code,
                        level: item.level,
                        // 第三级为叶子结点
                        isLeaf: parentLevel === 2,
                    }))

                    const fillData = (list: any[]) => {
                        list.map(item => {
                            if (item?.children?.length > 0) {
                                fillData(item.children)
                            }
                            if (item.value === targetOption.value) {
                                item.children = targetOption.children
                            }
                        })
                    }

                    const tempCityOptions = cloneDeep(cityOptions)

                    fillData(tempCityOptions)

                    // 修改state 触发render，更新视图
                    setCityOptions(tempCityOptions)
                })
            }
        }

        // 选择参赛地址
        const handleSelectRegion = (_: any, _selectedOptions: DefaultOptionType[]) => {
            const result: CityItem[] = _selectedOptions?.map(item => ({
                name: item.label as string,
                code: item.value as string,
            }))

            setSelectedRegion(result)
        }

        // 导入成功的code，用来第二步获取用户信息
        const handleImportDone = (importCode: string, importFile: UploadFile) => {
            // 更新导入用户的临时code
            store.updateImportCode(importCode)
            // 记录当前已经上传的文件，用于第二步回到第一步的回显
            store.updateImportFile(importFile)
            // 进入到第二步
            store.setCurrentStep(1)
        }

        return (
            <div className={styles.component_import_step}>
                <TitleAdvance title="批量报名联系人信息">
                    <Form form={form} layout="vertical">
                        <Row gutter={[32, 32]}>
                            <Col span={8}>
                                <Form.Item
                                    name="name"
                                    label="姓名"
                                    rules={[{ required: true, message: '请选择输入姓名' }]}
                                >
                                    <Input placeholder="请输入" maxLength={50} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="mobile"
                                    label="手机号"
                                    rules={[{ required: true, message: '请选择输入手机号' }]}
                                >
                                    <Input
                                        placeholder="请输入"
                                        maxLength={11}
                                        disabled={Boolean(_mobile)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="certificateType"
                                    label="证件类型"
                                    rules={[{ required: true, message: '请选择选择证件类型' }]}
                                >
                                    <Radio.Group
                                        disabled={Boolean(_idCardNo)}
                                        options={certificateTypeOptioins}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="idCardNo"
                                    label="证件号码"
                                    rules={[{ required: true, message: '请选择输入证件号码' }]}
                                >
                                    <Input
                                        placeholder="请输入"
                                        maxLength={50}
                                        disabled={Boolean(_idCardNo)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="gender"
                                    label="性别"
                                    rules={[{ required: true, message: '请选择性别' }]}
                                    required
                                >
                                    <Select placeholder="请选择" options={GENDER_OPTIONS} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="workAddress"
                                    label="工作单位"
                                    rules={[{ required: true, message: '请输入工作单位' }]}
                                    required
                                >
                                    <Input placeholder="请输入" maxLength={100} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="position"
                                    label="职务"
                                    rules={[{ required: true, message: '请输入职务' }]}
                                    required
                                >
                                    <Input placeholder="请输入" maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="participatingArea"
                                    label="参赛地区"
                                    rules={[{ required: true, message: '请选择参赛地区' }]}
                                    required
                                >
                                    <Cascader
                                        options={cityOptions}
                                        placeholder="请选择参赛地区"
                                        getPopupContainer={target => target.parentNode}
                                        loadData={handleLoadCityData}
                                        onChange={handleSelectRegion}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </TitleAdvance>
                <TitleAdvance title="批量导入报名信息">
                    <BatchImport
                        importFile={store.importFile}
                        onOk={handleImportDone}
                        onReset={() => store.resetImportCode()}
                        userStore={userStore}
                        ref={batchImportRef}
                    />
                </TitleAdvance>
            </div>
        )
    },
)

export default ImportStep
