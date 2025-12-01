import { Modal } from 'antd'
import { useRef, useState } from 'react'
import { calcInterShipPay, calcMaxMonthlyPay, minInterShipPay, minMonthlyPay } from '../../config'
import { config2, config } from '../../views/AttachmentResume/config'
import GeneralForm from '../GeneralForm'
import { useDeepCompareEffect } from 'ahooks'

const AddIntendPosition = ({
    open,
    type,
    handleOk,
    handleCancel,
    handleFinish,
    capacityTree,
    loadCapacityData,
    cityCascade,
    industryCascade,
    workArea,
    loadCityData,
    loadIndustryData,
    formData = {},
    isPartTime: propIsPartTime = false,
    isPractice: propIsPractice = false,
    maxSalaryOptions: propMaxSalaryOptions = [],
}: any) => {
    // 是否兼职的判断
    const [isPartTime, setPartTime] = useState(false)
    // 是否实习的判断
    const [isPractice, setPractice] = useState(false)
    const [maxSalaryOptions, setMaxSalaryOptions] = useState([])

    const formRef = useRef<any>(null)

    useDeepCompareEffect(() => {
        setMaxSalaryOptions(propMaxSalaryOptions)
        setPartTime(propIsPartTime)
        setPractice(propIsPractice)
    }, [propMaxSalaryOptions, propIsPartTime, propIsPractice])

    const onOk = async () => {
        const currentFormData = await formRef.current?.form?.validateFields()
        handleOk(currentFormData)
    }

    const onCancel = () => {
        formRef?.current?.form.resetFields()
        handleCancel()
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
            title={(type === 'edit' ? '编辑' : '添加') + '求职意向'}
            open={open}
            bodyStyle={{ padding: 0 }}
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose
        >
            {/* @ts-ignore */}
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
                onFinish={handleFinish}
            />
        </Modal>
    )
}

export default AddIntendPosition
