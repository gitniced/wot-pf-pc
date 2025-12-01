import { Modal } from 'antd'
import styles from './index.module.less'
import { useState } from 'react'
import AddJobIntention from '../AddJobIntention'
import SelectJobIntention from '../SelectJobIntention'

const OnlineResume = ({
    saveJobExpect,
    capacityTree,
    loadCapacityData,
    cityCascade,
    loadCityData,
    industryCascade,
    loadIndustryData,
    workArea,
    userJobIntention = [],
}: any) => {
    const [open, setOpen] = useState<boolean>(false)
    const [openSelect, setOpenSelect] = useState<boolean>(false)

    const handleShowAddJobModal = () => {
        setOpen(true)
    }

    const handleLinkToAttachment = () => {
        if (!userJobIntention.length) {
            Modal.confirm({
                title: '请先添加意向岗位',
                onOk: () => handleShowAddJobModal(),
                okText: '去添加',
                cancelText: '暂不添加',
            })
        } else {
            setOpenSelect(true)
        }
    }

    return (
        <div className={styles.online_resume}>
            <div className={styles.left}>我的在线简历</div>
            <div className={styles.right} onClick={handleLinkToAttachment}>
                <svg className={styles.icon}>
                    <use xlinkHref={'#jianli'} />
                </svg>
                <span className={styles.text}>生成附件简历</span>
            </div>

            <AddJobIntention
                open={open}
                saveJobExpect={saveJobExpect}
                capacityTree={capacityTree}
                loadCapacityData={loadCapacityData}
                cityCascade={cityCascade}
                loadCityData={loadCityData}
                industryCascade={industryCascade}
                loadIndustryData={loadIndustryData}
                workArea={workArea}
                onCancel={() => setOpen(false)}
            />

            <SelectJobIntention
                open={openSelect}
                userJobIntention={userJobIntention}
                onCancel={() => setOpenSelect(false)}
            />
        </div>
    )
}

export default OnlineResume
