import { ModalCallbackContext, ModalValueContext } from '@/components/ModalProvider'
import { Form, Radio } from 'antd'
import { useContext, useEffect } from 'react'

const DownloadModal = () => {
    const [form] = Form.useForm()
    const initValues = { file_format: 'pdf', paper_content: '1' }
    const { dataSource } = useContext(ModalValueContext)
    const { confirmValueCallback } = useContext(ModalCallbackContext)

    useEffect(() => {
        form.setFieldsValue(initValues)
        confirmValueCallback?.({ ...dataSource, ...initValues })
    }, [])

    const changeFormData = (changed: any, values: any) => {
        confirmValueCallback?.({ ...dataSource, ...values })
    }

    return (
        <>
            <Form form={form} onValuesChange={changeFormData}>
                <Form.Item
                    name="file_format"
                    label="文件格式"
                    rules={[{ required: true, message: '请选择文件格式' }]}
                >
                    <Radio.Group>
                        <Radio value="pdf">PDF</Radio>
                        <Radio value="word">Word</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="paper_content"
                    label="试卷内容"
                    style={{ marginBottom: 0 }}
                    rules={[{ required: true, message: '请选择试卷内容' }]}
                >
                    <Radio.Group>
                        <Radio value="1">题目（考试用）</Radio>
                        <Radio value="2">答案 + 解析（讲解用）</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </>
    )
}

export default DownloadModal
