// 附件简历

import { Button, message, Space, Spin } from 'antd'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Document, Page, pdfjs } from 'react-pdf'
import { getCookie, getLocalStorage } from '@/storage'

import Store from './store'
import { inject, observer, useLocalObservable } from 'mobx-react'
import { downloadUrlFile } from '@/utils/downloadUrlFile'
import { findSiteData } from '@wotu/wotu-components'
import { history } from 'umi'

pdfjs.GlobalWorkerOptions.workerSrc =
    'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/pdf.worker.min.js'

interface TemplateItem {
    url: string
    name: string
    id: number
}
const templateList: TemplateItem[] = [
    {
        url: 'https://static.zpimg.cn/public/job_fe_h5/images/08%E9%BB%98%E8%AE%A4%E6%A8%A1%E6%9D%BF%201.png',
        name: '默认模板',
        id: 1,
    },
    {
        url: 'https://static.zpimg.cn/public/job_fe_h5/images/10%E5%95%86%E5%8A%A1%E6%A8%A1%E6%9D%BF%201.png',
        name: '商务模板',
        id: 2,
    },
    {
        url: 'https://static.zpimg.cn/public/job_fe_h5/images/12%E5%85%B8%E9%9B%85%E6%A8%A1%E6%9D%BF%201.png',
        name: '典雅模板',
        id: 3,
    },
    {
        url: 'https://static.zpimg.cn/public/job_fe_h5/images/14%20%E4%B8%93%E4%B8%9A%E6%A8%A1%E6%9D%BF%201.png',
        name: '专业模板',
        id: 4,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/5-1%E7%B4%A0%E9%9B%85.png',
        name: '素雅模板',
        id: 5,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/6-1%20%E7%AE%80%E5%8D%95.png',
        name: '简单模板',
        id: 6,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/7-1%20%E9%AB%98%E7%BA%A7.png',
        name: '高级模板',
        id: 7,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/8-1%E6%B4%BB%E5%8A%9B.png',
        name: '活力模板',
        id: 8,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/9-1%20%E4%B8%AA%E6%80%A7.png',
        name: '个性模板',
        id: 9,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/10-1%20%E7%AE%80%E7%BA%A6.png',
        name: '简约模板',
        id: 10,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/11-1%20%E7%AE%80%E6%98%8E.png',
        name: '简明模板',
        id: 11,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/12-1%20%E5%88%97%E8%A1%A8.png',
        name: '列表模板',
        id: 12,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/13-1%E6%B7%A1%E9%9B%85.png',
        name: '淡雅模板',
        id: 13,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/14-1%E5%BC%A5%E6%95%A3.png',
        name: '弥散模板',
        id: 14,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/15-1%E6%97%A5%E5%87%BA.png',
        name: '日出模板',
        id: 15,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/16-1%E7%AE%80%E7%BA%A6%E7%81%B0.png',
        name: '简约灰模板',
        id: 16,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/17-1%E6%B5%B7%E6%B4%8B.png',
        name: '海洋模板',
        id: 17,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/18-1%E7%8E%AB%E7%B2%89.png',
        name: '玫粉模板',
        id: 18,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/19-1%E7%A7%91%E6%8A%80.png',
        name: '科技模板',
        id: 19,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/20-1%E6%9A%96%E9%98%B3.png',
        name: '暖阳模板',
        id: 20,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/21-1%E8%93%9D%E5%A4%A9.png',
        name: '海洋模板',
        id: 21,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/22-1%E5%85%B8%E8%97%8F%E7%BA%A2.png',
        name: '典藏红模板',
        id: 22,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/23-1%E7%99%BD%E8%89%B2%E5%95%86%E5%8A%A1.png',
        name: '白色商务模板',
        id: 23,
    },
    {
        url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job_fe_h5/images/24-1%E5%B9%BB%E7%B4%AB.png',
        name: '幻紫模板',
        id: 24,
    },
]

const AttachmentResume = (props: any) => {
    const siteStore = getLocalStorage('SITE_STORE')
    const store = useLocalObservable(() => new Store())
    const [loading, setLoading] = useState<boolean>(false)
    const [totalPages, setTotalPages] = useState([])
    const [currentAttachment, setCurrentAttachment] = useState<any>()
    const [currentTemplate, setCurrentTemplate] = useState<TemplateItem>(templateList[0])

    const { jobExpectCode } = history.location.query as { jobExpectCode: string }

    const midMobileDomain = findSiteData(siteStore.siteData, 'midMobileDomain', {
        findKey: 'baseInfo',
    })

    const generateResumeAttachment = async () => {
        setLoading(true)
        const sid = getLocalStorage('SID')
        const tempParams = {
            customCookies: {
                [`h5Token${sid}`]: getCookie('TOKEN'),
            },
            customLocalstorages: {
                openKey: '',
            },
            url: `${midMobileDomain}/job-center/my-resume/resume-template?id=${
                currentTemplate?.id || 1
            }&openKey=&bizCode=&jobExpectCode=${jobExpectCode}`,
            pdfScale: 1.25,
            pdfMargin: false,
        }

        store.generateResumeAttachment(tempParams).then(res => {
            setLoading(false)
            message.success('生成成功')
        })
    }

    const generateTempResumeAttachment = async (template?: TemplateItem) => {
        setLoading(true)
        const sid = getLocalStorage('SID')
        const tempParams = {
            customCookies: {
                [`h5Token${sid}`]: getCookie('TOKEN'),
            },
            customLocalstorages: {
                openKey: '',
            },
            url: `${midMobileDomain}/job-center/my-resume/resume-template?id=${
                template?.id || 1
            }&openKey=&bizCode=&jobExpectCode=${jobExpectCode}`,
            pdfScale: 1.25,
            pdfMargin: false,
        }

        store.generateTempResumeAttachment(tempParams).then(res => {
            setLoading(false)
            setCurrentAttachment(res)
        })
    }

    const onDownload = () => {
        downloadUrlFile(currentAttachment.fileUrl, currentAttachment.fileName)
        message.success('下载成功')
    }

    function onDocumentLoadSuccess({ numPages = 1 }) {
        const arr = new Array(numPages).fill(1)
        setTotalPages(arr as any)
    }

    const onSelectTemplate = (template: TemplateItem) => {
        setCurrentTemplate(template)
        generateTempResumeAttachment(template)
    }

    useEffect(() => {
        document.title = '附件简历'
        generateTempResumeAttachment()
    }, [])

    return (
        <div className={styles.page_attachment_resume}>
            <div className={styles.left}>
                <div className={styles.select_template}>
                    <div className={styles.text}>选择模板</div>
                </div>
                <div className={styles.template_list}>
                    {templateList.map(template => (
                        <div
                            className={classNames(styles.template_item, {
                                [styles.active]: template.id === currentTemplate?.id,
                            })}
                            key={template.id}
                            onClick={() => onSelectTemplate(template)}
                        >
                            <div className={styles.icon_wrapper}>
                                <svg className={styles.icon} aria-hidden="true">
                                    <use xlinkHref="#a-dagouchenggong"></use>
                                </svg>
                            </div>
                            <img src={template.url} alt="templateUrl" />
                            <div className={styles.name}>{template.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.operate}>
                    <Space size={16}>
                        <Button onClick={onDownload}>下载</Button>
                        <Button
                            loading={loading}
                            type="primary"
                            onClick={() => generateResumeAttachment()}
                        >
                            生成附件简历
                        </Button>
                    </Space>
                </div>
                <div className={styles.content}>
                    <Spin spinning={loading}>
                        <Document
                            className={styles.pdf_container}
                            file={currentAttachment?.fileUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={e => {}}
                        >
                            {totalPages.map((item, i) => (
                                <Page
                                    key={i}
                                    className={styles.page_style}
                                    pageNumber={i + 1}
                                    scale={1}
                                />
                            ))}
                        </Document>
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(AttachmentResume))
