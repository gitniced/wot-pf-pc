import { Modal } from 'antd'
import { useRef, useState } from 'react'
import GeneralForm from '../GeneralForm'
import { calcInterShipPay, calcMaxMonthlyPay, minInterShipPay, minMonthlyPay } from '../../config'
import { config, config2 } from '../../views/AttachmentResume/config'

const AddJobIntention = ({
    open,
    saveJobExpect,
    capacityTree,
    loadCapacityData,
    cityCascade,
    loadCityData,
    industryCascade,
    loadIndustryData,
    workArea,
    onCancel,
}: any) => {
    const [formData, setFormData] = useState({})
    const [maxSalaryOptions, setMaxSalaryOptions] = useState([])

    // 是否实习的判断
    const [isPractice, setPractice] = useState(false)
    // 是否兼职的判断
    const [isPartTime, setPartTime] = useState(false)

    const formRef = useRef<any>(null)

    // 添加求职意向成功
    const handleOk = async () => {
        const currentFormData = await formRef.current?.form?.validateFields()
        const { capacityId, city, industry, minSalary, maxSalary } = currentFormData
        currentFormData.capacityId = Array.isArray(capacityId)
            ? capacityId[capacityId.length - 1]
            : null
        currentFormData.city = Array.isArray(city) ? city[city.length - 1] : null
        currentFormData.industry = Array.isArray(industry) ? industry[industry.length - 1] : null

        // 不是实习模式下薪资乘以1000
        if (currentFormData.type !== 3) {
            currentFormData.minSalary = minSalary * 1000
            currentFormData.maxSalary = maxSalary * 1000
        }
        // 兼职模式下删除薪资
        if (currentFormData.type === 2) {
            delete currentFormData.minSalary
            delete currentFormData.maxSalary
        }

        await saveJobExpect(currentFormData)
        onCancel()
    }

    // 关闭modal窗
    const handleCancel = () => {
        formRef?.current?.form.resetFields()
        setFormData({})
        onCancel()
    }

    // 表单值变动的回调
    const formValueChange = (changedValues: any, allValues: any) => {
        if (changedValues?.minSalary) {
            // 最小薪资大于最大薪资时，最大薪资清空或者不在薪资范围内时，最大薪资清空
            if (
                changedValues?.minSalary > allValues?.maxSalary ||
                calcInterShipPay(changedValues?.minSalary).findIndex(
                    item => item.value === allValues?.maxSalary,
                ) === -1
            ) {
                formRef?.current?.form?.setFieldValue('maxSalary', '')
            }
            if (isPractice) {
                setMaxSalaryOptions(calcInterShipPay(changedValues?.minSalary) as [])
            } else {
                setMaxSalaryOptions(() => calcMaxMonthlyPay(changedValues?.minSalary) as [])
            }
        }

        if (changedValues?.type) {
            formRef?.current?.form?.setFieldValue('minSalary', '')
            formRef?.current?.form?.setFieldValue('maxSalary', '')
            setMaxSalaryOptions([])

            if (changedValues?.type === 2) {
                setPartTime(true)
            } else {
                setPartTime(false)
            }

            if (changedValues.type === 3) {
                setPractice(true)
            } else {
                setPractice(false)
            }
        }
    }

    return (
        <Modal
            width={520}
            title="添加求职意向"
            open={open}
            bodyStyle={{ padding: 0 }}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose
        >
            <GeneralForm
                footer={false}
                ref={formRef}
                gutter={24}
                style={{ background: '#fff' }}
                formValueChange={formValueChange}
                // @ts-ignore
                structure={config({
                    capacityTree,
                    loadCapacityData,
                    cityCascade,
                    loadCityData,
                    industryCascade,
                    loadIndustryData,
                    minSalaryOptions: isPractice ? minInterShipPay : minMonthlyPay,
                    maxSalaryOptions: maxSalaryOptions,
                    workArea,
                    isPartTime,
                })}
                config2={config2({ workArea, form: formRef })}
                formData={formData}
                onCancel={onCancel}
                onFinish={onCancel}
            />
        </Modal>
    )
}

export default AddJobIntention
