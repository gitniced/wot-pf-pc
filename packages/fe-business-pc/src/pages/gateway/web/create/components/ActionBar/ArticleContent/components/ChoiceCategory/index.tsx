import ChoiceCategoryModal from '@/pages/gateway/web/components/ChoiceCategoryModal'
import styles from '../../index.module.less'
import React, { useState } from 'react'

interface IChoiceCategoryProps {
    datas: any
    fixPreviewList?: (data: any) => void
    type: 'mobile' | 'pc'
}
const ChoiceCategory = ({ datas, fixPreviewList, type = 'pc' }: IChoiceCategoryProps) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <div>
            {datas?.codes && datas?.selectCategory?.[0]?.name ? (
                <div className={styles.select}>
                    <div className={styles.select_content}>
                        {datas?.selectCategory?.[0]?.name || ''}
                    </div>
                    <div className={styles.edit} onClick={() => setModalVisible(true)}>
                        修改
                    </div>
                </div>
            ) : (
                <a className={styles.click_to_select} onClick={() => setModalVisible(true)}>
                    点击选择
                </a>
            )}

            {/* 选择分类modal */}
            <ChoiceCategoryModal
                visible={modalVisible}
                data={datas}
                closeDialog={() => setModalVisible(false)}
                fixPreviewList={fixPreviewList}
                mode={type}
            />
        </div>
    )
}

export default ChoiceCategory
