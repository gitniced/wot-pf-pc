import styles from './index.module.less'
import React, { useState } from 'react'
import EnrollModal from '@/components/EnrollModal'
import { TYPE_TAG_TRANSFORMED, TYPE_TAG_TRANSFORMED_NUMBER } from '@/components/EnrollModal/const'
import Http from '@/servers/http'
import { getCookie, getLocalStorage } from '@/storage'

interface IChoiceCategoryProps {
    datas: any
    fixPreviewList?: (data: any) => void
    type?: 'mobile' | 'pc'
    text?: string
}

/**  获取报名 按分类选择的数据  */
export const getEnrollByCategoryData = async (n: number) => {
    const organizationCode: string = getCookie('SELECT_ORG_CODE') || ''
    const selectedOrganizationDetail =
        getLocalStorage('USER_STORE')?.selectedOrganizationDetail || {}
    const { logo: organizationLogo, name: organizationName } = selectedOrganizationDetail || {}

    const enrollData: any = await Http('/apply/front/activity/page', 'post', {
        pageNo: 1,
        pageSize: 10,
        publishStatus: 1,
        organizationCode,
        statusList: [1, 2, 3],
        entryCodeInteger: n,
    })
    return (
        enrollData?.data?.map((item: any) => ({ ...item, organizationLogo, organizationName })) ||
        []
    )
}

const ChoiceCategoryEnroll = ({
    datas,
    fixPreviewList,
    // type = 'pc',
    text = '点击选择',
}: IChoiceCategoryProps) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <div>
            {datas?.selectCategory?.[0]?.name ? (
                <div className={styles.select}>
                    <div className={styles.select_content}>
                        {datas?.selectCategory?.[0]?.name
                            ? TYPE_TAG_TRANSFORMED[datas?.selectCategory?.[0]?.name]
                            : null}
                    </div>
                    <div className={styles.edit} onClick={() => setModalVisible(true)}>
                        修改
                    </div>
                </div>
            ) : (
                <a className={styles.click_to_select} onClick={() => setModalVisible(true)}>
                    {text}
                </a>
            )}

            {/* 报名选择分类modal */}
            {modalVisible && (
                <EnrollModal
                    type="radio"
                    visible={modalVisible}
                    contentType={'project'}
                    onOk={async e => {
                        let data = await getEnrollByCategoryData(
                            TYPE_TAG_TRANSFORMED_NUMBER[e?.[0]?.name],
                        )
                        fixPreviewList &&
                            fixPreviewList({
                                ...datas,
                                codes: data,
                                selectCategory: [{ name: e?.[0]?.name }],
                            })
                        setModalVisible(false)
                    }}
                    onCancel={() => setModalVisible(false)}
                />
            )}
        </div>
    )
}

export default ChoiceCategoryEnroll
