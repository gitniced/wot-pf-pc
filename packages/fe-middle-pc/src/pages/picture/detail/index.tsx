import { useEffect } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import listHooks from './hooks'
import styles from './index.module.less'
import type { IRoute } from 'umi'
import dayjs from 'dayjs'
import classnames from 'classnames'
import { PaperClipOutlined, DownloadOutlined } from '@ant-design/icons'
import { findSiteData } from '@wotu/wotu-components'

const List = observer((props: IRoute) => {
    const {
        siteStore,
        location: {
            query: { code },
        },
    } = props
    const { siteData } = siteStore
    const siteName = findSiteData(siteData || {}, 'name', { findKey: 'baseInfo' })

    const hooks = useLocalObservable(() => new listHooks())

    /**页面初始化 数据获取 */
    useEffect(() => {
        hooks.getImageTextDetail(code)
    }, [])

    useEffect(() => {
        const title = hooks?.imageText?.title
        siteName ? (document.title = `${title}-${siteName}`) : (document.title = title)
    }, [siteName, hooks?.imageText?.title])

    let {
        title = '',
        imageTextCategoryNameList = [],
        publishTime = 0,
        content = '',
        attachmentJson = '[]',
    } = hooks.imageText || {}

    // 将附件的json字符串转成对象
    let attachmentList = []
    try {
        attachmentList = JSON.parse(attachmentJson)
    } catch (e) {
        console.log(e)
    }

    return (
        <div className={styles.page}>
            <div className={styles.global_padding}>
                <div className={styles.content}>
                    <div className={styles.title}>{title}</div>
                    {imageTextCategoryNameList?.length ? (
                        <div className={styles.cate_list}>
                            {imageTextCategoryNameList?.map(item => {
                                return (
                                    <div key={item} className={styles.cate}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    ) : null}
                    <div className={styles.time}>
                        {publishTime === 0 ? '-' : dayjs(publishTime).format('YYYY-MM-DD')}
                    </div>
                    <div className={styles.split} />
                    <div className={styles.rich} dangerouslySetInnerHTML={{ __html: content }} />

                    <div className={styles.attachment}>
                        {attachmentList?.map?.(item => {
                            let { url = '', name = '' } = item || {}
                            return (
                                <div key={url} className={styles.attachment_item}>
                                    {/* 预览 PDF图片 格式的文件  PPT |pot|potx|pps|ppsx|ppt|pptx */}

                                    <div
                                        className={styles.attachment_item_show}
                                        onClick={() => hooks.previewHandler(url)}
                                    >
                                        <PaperClipOutlined
                                            className={classnames(
                                                styles.attachment_icon,
                                                styles.attachment_icon_show,
                                            )}
                                        />
                                        <div className={styles.attachment_item_name}>{name}</div>
                                    </div>

                                    <a
                                        onClick={() => hooks.downloadFile(url, name)}
                                        className={styles.attachment_upload}
                                    >
                                        <DownloadOutlined className={styles.attachment_icon} />
                                        下载
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
})

export default inject('userStore', 'siteStore')(List)
