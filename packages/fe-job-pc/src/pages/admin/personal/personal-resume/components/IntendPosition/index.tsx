import { forwardRef, useImperativeHandle, useState } from 'react'

import styles from './index.module.less'
import JobExpect from './JobExpect'
import AddIntendPosition from '../AddIntendPosition'

const IntendPosition = forwardRef(
    (
        {
            userJobIntention = [],
            loadCityData,
            loadIndustryData,
            saveJobExpect,
            deleteJobExpect,
            capacityTree,
            loadCapacityData,
            cityCascade,
            industryCascade,
            workArea,
        }: any,
        ref,
    ) => {
        const [open, setOpen] = useState<boolean>(false)
        const [formData, setFormData] = useState({})
        const [origin, setOrigin] = useState<any>({})

        const addFunc = () => {
            setOpen(true)
            setOrigin({})
        }

        useImperativeHandle(
            ref,
            () => {
                return {
                    addFunc,
                }
            },
            [],
        )

        const handleFinish = () => {
            setOpen(false)
        }

        const handleCancel = () => {
            setFormData({})
            setOpen(false)
        }

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
            await saveJobExpect(currentFormData)
            setOpen(false)
        }

        return (
            <div className={styles.intend_position}>
                {userJobIntention.map((item: any) => (
                    <JobExpect
                        item={item}
                        loadCityData={loadCityData}
                        loadIndustryData={loadIndustryData}
                        saveJobExpect={saveJobExpect}
                        deleteJobExpect={() => deleteJobExpect(item.code)}
                        workArea={workArea}
                        industryCascade={industryCascade}
                        capacityTree={capacityTree}
                        loadCapacityData={loadCapacityData}
                        cityCascade={cityCascade}
                    />
                ))}

                <AddIntendPosition
                    open={open}
                    type="add"
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
    },
)

export default IntendPosition
