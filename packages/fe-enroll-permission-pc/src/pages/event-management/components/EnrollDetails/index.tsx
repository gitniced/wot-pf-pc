import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Form, Tooltip } from 'antd'
import { DownloadOutlined, PaperClipOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { imgList } from '@/pages/enroll-setting/const'
import Cover from '@/pages/enroll-setting/components/Cover'
import { observer } from 'mobx-react'

function EnrollDetails({ store }: any) {
    const { portalInfoDetail, eventDetails } = store
    const { name, logo, provinceName, cityName, areaName, industryList } = portalInfoDetail
    const {
        name: enrollName,
        cover: cover_url,
        applyStartTime,
        applyEndTime,
        entryCodeInteger,
        filesLists,
        courseCode,
        detail,
        categoryName,
        contract,
    } = eventDetails
    const selectCover = imgList.filter(i => i.value === cover_url)?.[0]

    const timeRender = () => {
        if (!applyStartTime && !applyEndTime) {
            return '不限'
        }
        return (
            <span>
                {applyStartTime
                    ? dayjs(applyStartTime).format('YYYY-MM-DD HH:mm')
                    : '开始时间不限，'}
                {applyEndTime ? ' 至 ' : ''}
                {applyEndTime
                    ? dayjs(applyEndTime).format('YYYY-MM-DD HH:mm')
                    : '开始，结束时间不限'}
                {applyStartTime ? '' : '结束'}
            </span>
        )
    }

    const cateRender = () => {
        return categoryName.map((s: string) => <span>{s}</span>)
    }

    useEffect(() => {
        store.getPortalInfo()
    }, [])

    return (
        <div className={styles.enroll_details_container}>
            <div className={styles.details_top}>
                <div className={styles.cover_wrapper}>
                    <div className={styles.cover_preview}>
                        <Cover
                            text={selectCover?.color ? enrollName : ''}
                            color={selectCover?.color}
                            cover={cover_url}
                        />
                    </div>
                </div>
                <div className={styles.enroll_info}>
                    <div className={styles.enroll_title}>{enrollName}</div>
                    <div className={styles.tags_wrapper}>
                        {entryCodeInteger === 9 ? (
                            <span className={styles.course}>{courseCode?.label}</span>
                        ) : (
                            cateRender()
                        )}
                    </div>
                    <div className={styles.enroll_time}>报名时间：{timeRender()}</div>
                </div>
            </div>
            <div className={styles.details_content_wrapper}>
                <div className={styles.details_content}>
                    <div className={styles.sub_title}>机构信息</div>
                    {detail ? (
                        <div
                            className={styles.rich_text_wrapper}
                            dangerouslySetInnerHTML={{
                                __html: detail,
                            }}
                        />
                    ) : (
                        <div className={styles.no_data}>
                            <img
                                width={320}
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_saas_pc/image/no_data_eecec2a1.png"
                            />
                            <span>暂无数据</span>
                        </div>
                    )}
                </div>
                <div className={styles.details_content_right}>
                    <div className={styles.details_org}>
                        <div className={styles.sub_title}>机构信息</div>
                        <div className={styles.org_info}>
                            <img src={logo} />
                            <div>{name}</div>
                        </div>
                        <div className={styles.org_item}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#icon_hangye`} />
                            </svg>
                            {industryList?.map((item: any) => item.name)?.join(' / ') || '-'}
                        </div>
                        <div className={styles.org_item}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#jigou`} />
                            </svg>
                            {[provinceName, cityName, areaName].filter(i => i).join(` / `)}
                        </div>
                        {contract && (
                            <div className={styles.org_item}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon_phone`} />
                                </svg>
                                <Form.Item name="contract" label="" noStyle>
                                    {contract}
                                </Form.Item>
                            </div>
                        )}
                    </div>
                    <div className={styles.details_file}>
                        <div className={styles.sub_title}>附件材料</div>
                        {filesLists?.length ? (
                            filesLists?.map((item: any) => {
                                return (
                                    <div className={styles.file_item}>
                                        <PaperClipOutlined />
                                        <Tooltip className={styles.file_name} title={item.name}>
                                            {item.name}
                                        </Tooltip>
                                        <a href={item.url}>
                                            <DownloadOutlined />
                                            下载
                                        </a>
                                    </div>
                                )
                            })
                        ) : (
                            <div className={styles.no_data}>
                                <img
                                    width={200}
                                    src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_saas_pc/image/no_data_eecec2a1.png"
                                />
                                <span>暂无数据</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(EnrollDetails)
