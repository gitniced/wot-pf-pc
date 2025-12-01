// 选择分类组件

import { Space, Typography } from 'antd'
import type { SelectCategoryProps } from './interface'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import CategoryModal from './CategoryModal'

const SelectCategory = ({ value, onChange }: SelectCategoryProps) => {
    // 是否显示选择分类弹窗
    const [visible, setVisible] = useState<boolean>(false)
    // 分类名称
    const [categoryName, setCategoryName] = useState<string>()

    const hasSelect = !!value

    useEffect(() => {
        setCategoryName(value?.name)
    }, [value])

    const handleShowModal = () => {
        setVisible(true)
    }

    return (
        <div className={styles.component_select_category}>
            <Space>
                {hasSelect && <div className={styles.name}>{categoryName}</div>}
                <Typography.Link onClick={handleShowModal}>
                    {hasSelect ? '修改' : '点击选择'}
                </Typography.Link>
            </Space>

            <CategoryModal
                selectedCategory={value}
                open={visible}
                onCancel={() => setVisible(false)}
                onOk={selectedCategory => {
                    setVisible(false)
                    onChange?.(selectedCategory)
                }}
            />
        </div>
    )
}

export default SelectCategory
