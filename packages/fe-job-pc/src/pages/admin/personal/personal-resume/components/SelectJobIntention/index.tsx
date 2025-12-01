import { Modal } from 'antd'

import { useEffect, useState } from 'react'

import styles from './index.module.less'
import { Divider } from 'antd'
import classNames from 'classnames'
import { history } from 'umi'

const jobType = ['', '全职', '兼职', '实习', '校招']

const JobExpect = ({
    capacityName,
    industryName,
    cityName,
    minSalary,
    maxSalary,
    type,
    code,
    currentCode,
    onSelect,
}: any) => {
    return (
        <div
            className={classNames(styles.job_expect_container, {
                [styles.active]: code === currentCode,
            })}
            onClick={() => onSelect?.()}
        >
            <div className={styles.position_name}>
                <span>{capacityName}</span>
                <div className={styles.position_salary}>
                    {minSalary > 0 &&
                        maxSalary > 0 &&
                        `${String(minSalary).replace(/000$/, 'k')}~${String(maxSalary).replace(
                            /000$/,
                            'k',
                        )}`}
                </div>
            </div>
            <div className={styles.position_address}>
                {jobType[Number(type)]}
                {jobType[Number(type)] && cityName && <Divider type="vertical" />} {cityName}
                {industryName && <Divider type="vertical" />} {industryName}
            </div>
        </div>
    )
}

const SelectJobIntention = ({ open, userJobIntention, onCancel }: any) => {
    const [currentCode, setCurrentCode] = useState<string>()

    useEffect(() => {
        setCurrentCode(userJobIntention[0]?.code)
    }, [userJobIntention])

    const handleSelectJob = (item: any) => {
        setCurrentCode(item.code)
    }

    const handleSelectJobDone = () => {
        history.push(`/admin/personal/attachment-resume?jobExpectCode=${currentCode}`)
    }

    return (
        <Modal
            width={408}
            title="选择期望职位"
            open={open}
            className={styles.select_job_modal}
            onCancel={onCancel}
            onOk={handleSelectJobDone}
        >
            <div className={styles.title}>所选期望职位信息将展示在简历中</div>
            {userJobIntention?.map((item: any) => (
                <JobExpect
                    currentCode={currentCode}
                    key={item?.code}
                    {...item}
                    showEdit={false}
                    showDelete={false}
                    onSelect={() => handleSelectJob(item)}
                />
            ))}
        </Modal>
    )
}

export default SelectJobIntention
