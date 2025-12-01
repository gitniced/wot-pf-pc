/* eslint-disable */
import { Divider, Space } from 'antd'
import styles from './index.module.less'
import OperationBtn from '../OperateBtn'
import { useState } from 'react'
import { calcInterShipPay, calcMaxMonthlyPay } from '../../config'
import AddIntendPosition from '../AddIntendPosition'

const jobType = ['全职', '兼职', '实习', '校招']

const JobExpect = ({
    item,
    loadCityData,
    loadIndustryData,
    saveJobExpect,
    capacityTree,
    loadCapacityData,
    cityCascade,
    industryCascade,
    workArea,
    deleteJobExpect,
}: any) => {
    const [open, setOpen] = useState<boolean>(false)
    const [code, setCode] = useState<string>()
    const [origin, setOrigin] = useState<any>({})
    // 是否兼职的判断
    const [isPartTime, setPartTime] = useState(false)
    // 是否实习的判断
    const [isPractice, setPractice] = useState(false)
    const [maxSalaryOptions, setMaxSalaryOptions] = useState([])
    const [formData, setFormData] = useState({})

    const { type, capacityName, minSalary, maxSalary, cityName } = item

    const handleEdit = async (obj: any) => {
        setOpen(true)
        setCode(obj.code)
        setOrigin(obj)

        // 兼职模式下隐藏薪资栏
        if (obj?.type === 2) {
            setPartTime(true)
        } else {
            setPartTime(false)
        }

        await loadCityData([{ value: obj.city }])
        await loadIndustryData([{ value: obj.parentIndustry }])
        const minSalary =
            obj.minSalary === 0
                ? ''
                : obj.minSalary / 1000 >= 1
                ? obj.minSalary / 1000
                : obj.minSalary
        if (obj.type === 3) {
            setPractice(true)
            setMaxSalaryOptions(calcInterShipPay(minSalary) as [])
        } else if (obj.type === 1 || obj.type === 4) {
            setMaxSalaryOptions(calcMaxMonthlyPay(minSalary) as [])
            setPractice(false)
        } else {
            setMaxSalaryOptions([])
            setPractice(false)
        }

        const maxSalary =
            obj.maxSalary === 0
                ? ''
                : obj.maxSalary / 1000 >= 1
                ? obj.maxSalary / 1000
                : obj.maxSalary

        setFormData({
            ...obj,
            minSalary,
            maxSalary,
            industry: obj.industryName,
            capacityId: obj.capacityName,
            city: obj.cityName,
            workArea: obj.workArea ? String(obj.workArea) : undefined,
            workTime: obj.workTime ? obj.workTime : undefined,
        })
    }

    // 添加求职意向成功
    const handleOk = async (currentFormData: any) => {
        const { capacityId, city, industry, minSalary, maxSalary } = currentFormData
        currentFormData.capacityId = Array.isArray(capacityId)
            ? capacityId[capacityId.length - 1]
            : origin.capacityId
        currentFormData.city = Array.isArray(city) ? city[city.length - 1] : origin.city
        currentFormData.industry = Array.isArray(industry)
            ? industry[industry.length - 1]
            : origin.industry

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
        currentFormData.code = code
        await saveJobExpect(currentFormData)
        setOpen(false)
    }

    // 关闭modal窗
    const handleCancel = () => {
        setFormData({})
        setOpen(false)
    }

    // 表单完成成功回调
    const handleFinish = (value: object) => {
        setOpen(false)
    }

    return (
        <div className={styles.job_expect_container}>
            <div className={styles.job_expect_container_left}>
                <div className={`${styles.job_type} ${styles[`job_type_${type}`]}`}>
                    {jobType[Number(type) - 1]}
                </div>

                <Space size={8} split={<Divider type="vertical" />}>
                    <div className={styles.capacity_name}>{capacityName}</div>
                    {minSalary > 0 && maxSalary > 0 && (
                        <div className={styles.salary}>
                            {String(minSalary).replace(/000$/, 'k')}~
                            {String(maxSalary).replace(/000$/, 'k')}
                        </div>
                    )}
                    {jobType[Number(type) - 1] && cityName && (
                        <div className={styles.city_name}>{cityName}</div>
                    )}
                </Space>
            </div>

            <div className={styles.operate}>
                <OperationBtn editFunc={() => handleEdit(item)} delFunc={deleteJobExpect} />
            </div>

            <AddIntendPosition
                open={open}
                type="edit"
                isPartTime={isPartTime}
                isPractice={isPractice}
                maxSalaryOptions={maxSalaryOptions}
                formData={formData}
                capacityTree={capacityTree}
                loadCapacityData={loadCapacityData}
                cityCascade={cityCascade}
                industryCascade={industryCascade}
                workArea={workArea}
                loadCityData={loadCityData}
                loadIndustryData={loadIndustryData}
                handleFinish={handleFinish}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />
        </div>
    )
}

export default JobExpect
