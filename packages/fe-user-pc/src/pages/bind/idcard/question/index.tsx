import CustomTitle from '@/components/Global/CustomTitle'
import { Button } from 'antd'
import { inject, observer } from 'mobx-react'
import React from 'react'
import type { IRoute } from 'umi'
import { history } from 'umi'
import { getQuestionList } from './const'
import styles from './index.module.less'
import type { PageProps } from '@/types'
import MyBreadcrumbs from '@/components/Global/MyBreadcrumbs'

const Question = (props: PageProps) => {
    let { siteStore, userStore } = props || {}
    let { siteData } = siteStore || {}
    const openAuditModal = e => {
        e.preventDefault()
        history.push('/bind/idcard?type=audit')
    }

    let questionList = getQuestionList({
        userData: userStore?.userData,
        siteData: siteData?.data,
        openAuditModal,
        hrefUrl: '/bind/idcard?type=audit',
    })

    return (
        <div className={styles.page}>
            <MyBreadcrumbs />
            <div className={styles.content}>
                <CustomTitle title="实名认证问题" marginBottom="16px" />
                <div className={styles.list}>
                    {questionList.map(item => {
                        let {
                            key,
                            title,
                            description,
                            buttonText,
                            renderButton,
                            onButtonClick = e => {
                                e.preventDefault()
                            },
                            hidden,
                            hrefUrl,
                        } = item || {}
                        onButtonClick ??= new Function()
                        return (
                            !hidden && (
                                <div className={styles.item} key={key}>
                                    <div className={styles.left}>
                                        <div className={styles.title}>{title}</div>
                                        <div className={styles.description}>{description}</div>
                                    </div>
                                    {renderButton ? (
                                        renderButton?.()
                                    ) : (
                                        <Button
                                            className={styles.button}
                                            onClick={onButtonClick}
                                            href={hrefUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {buttonText}
                                        </Button>
                                    )}
                                </div>
                            )
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const ObserverQuestion: IRoute = inject('userStore', 'siteStore')(observer(Question))

ObserverQuestion.title = '实名认证'

export default ObserverQuestion
