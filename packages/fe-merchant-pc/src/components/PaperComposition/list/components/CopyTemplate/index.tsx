import { InfoCircleOutlined } from '@ant-design/icons'
import { Cascader, Form, Modal, Tooltip, message } from 'antd'
import React, { useState } from 'react'
import http from '@/servers/http'
import API from './api'
import { uniqBy } from 'lodash'
import type { JobData, CopyTemplateProps } from './interface'
import styles from './index.module.less'
import { formatCommonJobData, generateName } from './const'

const CopyTemplate = (props: CopyTemplateProps) => {
    const { visible, recordData, userCode, handleOk, handleCancel } = props || {}
    const [modalForm] = Form.useForm()
    const [jobData, setJobData] = useState<JobData>()

    /**
     * 处理树结构数据为级联选择器数据
     * @param data 需要处理的数据
     * @param index 当前为第几层,从0开始
     * @param childrenArray 子数据字段
     * @param key
     * @returns 处理后的数据
     */
    const handleData = (
        data: any[],
        index: number,
        childrenArray: string[],
        key: 'code' | 'id',
    ): any[] => {
        return data.map(item => {
            const children = item[childrenArray?.[index]]
            return {
                label: item.name,
                value: JSON.stringify({ value: item?.[key], label: item.name }),
                children:
                    children?.length > 0 ? handleData(children, index + 1, childrenArray, key) : [],
            }
        })
    }
    // 请求接口获取下拉列表
    const _getJobData = async (workName = '', workCode = '') => {
        const params = {
            order: 'ASC',
            orderBy: 'createdAt',
            pageNo: 1,
            pageSize: 30,
            workName,
            workCode,
        }
        const res = (await http(API.jobPage, 'post', params)) as unknown as JobData
        const data = handleData(res.data, 0, ['workList', 'levelList'], 'id')
        if (jobData?.data) {
            setJobData({ ...res, data: uniqBy([...jobData.data, ...data], 'value') })
        } else {
            setJobData({ ...res, data })
        }
    }
    // 搜索回调
    const getJobData = async (search: string = '') => {
        if (search) {
            _getJobData(search)
        }
    }
    // 点击确定
    const OnFinish = async () => {
        const { code } = recordData || {}
        const { commonJob } = modalForm.getFieldsValue() || {}
        let copyList: any = []
        if (commonJob && Array.isArray(commonJob)) {
            commonJob.forEach(item => {
                const formatCommonJob = formatCommonJobData(item)
                const businessName = `${formatCommonJob.jobName}/${formatCommonJob.jobType}/${formatCommonJob.jobLevel}`
                const title = generateName(businessName)
                copyList.push({
                    copyTitle: title,
                    customContent: {
                        commonJob: formatCommonJob,
                    },
                })
            })
        }
        const params = {
            paperCode: code,
            copyList,
            userCode,
        }
        const res = (await http(API.copyTemplate, 'post', params)) as unknown as {
            success: boolean
            text: string
        }
        if (res.success) {
            message.success('复制成功')
        } else {
            message.warning(res.text)
        }
        handleOk()
    }

    return (
        <Modal
            title="复制组卷模板"
            width={800}
            open={visible}
            centered
            onOk={OnFinish}
            onCancel={handleCancel}
        >
            <div className={styles.copy_modal}>
                <div className={styles.name}>
                    <p>模板名称：</p>
                    <p>{recordData?.title}</p>
                </div>
                <div>
                    <p className={styles.copy_source}>复制到</p>
                    <Form form={modalForm}>
                        <Form.Item
                            label={
                                <div className={styles.label}>
                                    <span>职业/工种/等级</span>
                                    <Tooltip title="支持多选职业/工种/等级，批量复制组卷模板">
                                        <InfoCircleOutlined />
                                    </Tooltip>
                                </div>
                            }
                            name="commonJob"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择职业/工种/等级',
                                },
                            ]}
                        >
                            {/* TODO 换成标准组件 */}
                            <Cascader
                                showSearch={true}
                                onSearch={getJobData}
                                showCheckedStrategy={Cascader.SHOW_CHILD}
                                displayRender={label => label.join('/')}
                                multiple
                                options={jobData?.data}
                                placeholder="请选择"
                                allowClear={false}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default CopyTemplate
