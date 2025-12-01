import { useRef } from 'react'
import { Modal, Form, Select, message } from 'antd'
import CourseInfo from '@/pages/assistant/home/components/CourseInfo'
import { useEffect, useState } from 'react'
import http from '@/servers/http'
import api from './../../api'
import { levelListMap } from '@/pages/assistant/home'
import { history } from 'umi'

interface Props {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    courseInfo: Record<string, any> | null
}

const Index = (props: Props) => {
    const [form] = Form.useForm()
    const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
    }

    const childRef = useRef<any>(null)

    const { isModalOpen, handleOk, handleCancel, courseInfo } = props
    const [detail, setDetail] = useState(null)
    const [templateList, setTemplateList] = useState<Record<string, any>[]>([])

    const onOk = () => {
        form.validateFields().then(res => {
            const params = {
                ...res,
            }

            params.coverUrl = params?.coverUrl?.[0]?.url

            if (courseInfo) {
                http(api.coursesUpdateBaseInfo, 'post', { ...params, code: courseInfo?.code }).then(
                    () => {
                        message.success('编辑成功！')
                        handleOk()
                    },
                )
            } else {
                http(api.coursesCreate, 'post', { ...params }).then(data => {
                    message.success('新建成功！')
                    history.push(`/assistant/course/${data}/design/conversion`)
                })
            }
        })
    }

    const getDetail = () => {
        http(api.coursesDetailBaseInfo, 'get', { code: courseInfo?.code }).then((res: any) => {
            form.setFieldsValue({
                customCoverStatus: res?.customCoverStatus,
                name: res?.name,
                majorCode: res?.majorCode,
                levelCode: String(res?.levelCode),
            })
            setDetail(res)
            childRef.current?.getLevelList(String(res?.majorCode))
        })
    }

    const getTemplateList = () => {
        http(api.coursesListTemplate, 'post', {}).then((res: any) => {
            setTemplateList(
                res?.map((item: any) => ({
                    value: item?.code,
                    label: `${item?.name}【${item?.majorName}${
                        +item?.qualityStatus === 1 ? '优质课程' : ''
                    }-${levelListMap?.[item?.level]?.abbreviation}】`,
                    item,
                })),
            )
        })
    }

    useEffect(() => {
        if (courseInfo) {
            getDetail()
        } else {
            getTemplateList()
        }
    }, [])

    return (
        <Modal
            title={courseInfo ? '编辑基本信息' : '复制模板课程'}
            open={isModalOpen}
            onOk={onOk}
            onCancel={handleCancel}
            width={584}
        >
            <Form form={form} {...formItemLayout} autoComplete="off">
                {!courseInfo && (
                    <Form.Item
                        label="选择模板课程"
                        name="templateCode"
                        rules={[{ required: true, message: '请选择！' }]}
                    >
                        <Select
                            placeholder="请选择"
                            options={templateList}
                            onChange={(e, i: any) => {
                                form.setFieldsValue({
                                    majorCode: i?.item?.majorCode,
                                    levelCode: undefined,
                                })
                                childRef.current?.getLevelList(i?.item?.majorCode)
                            }}
                        />
                    </Form.Item>
                )}

                <CourseInfo
                    form={form}
                    courseInfo={detail}
                    templateList={templateList}
                    ref={childRef}
                />
            </Form>
        </Modal>
    )
}

export default Index
