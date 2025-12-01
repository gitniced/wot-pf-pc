import styles from './index.module.less'

import FilterButton from '@/pages/square/components/FilterButton'
import { useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { Form, message } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

/** 公司行业 */
const CompanyIndustry: React.FC = ({ value = [], onChange, getOptions, options }) => {
    useEffect(() => {
        getOptions()
    }, [])

    /** 点击选项 */
    const onClick = id => {
        const index = value.findIndex(item => item === id)
        if (index !== -1) {
            value.splice(index, 1)
            onChange?.([...value])
        } else {
            if (value.length >= 3) {
                message.error('最多选择3个哦~')
                return
            }
            onChange?.([...value, id])
        }
    }

    return (
        <FilterButton title="公司行业" num={value.length}>
            <div className={styles.company_industry}>
                <div className={styles.options_box}>
                    {options?.map(item => (
                        <div className={styles.clearfix} key={item.id}>
                            <span className={styles.label}>{item.name}</span>
                            <div className={styles.select_list}>
                                {item.children?.map(children => (
                                    <div
                                        onClick={() => onClick(children.id)}
                                        className={[
                                            styles.children,
                                            value.includes(children.id) && styles.active,
                                        ].join(' ')}
                                        key={children.id}
                                    >
                                        <span>{children.name}</span>
                                        <CheckOutlined className={styles.icon} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FilterButton>
    )
}

/** 多选下拉框 */
const Selection: React.FC = ({ value = [], onChange, options, getOptions, type, title }) => {
    useEffect(() => {
        getOptions?.()
    }, [])

    const onClick = code => {
        if (code === 0) {
            onChange([])
        } else if (type === 'radio') {
            onChange([code])
        } else {
            const findIndex = value?.findIndex(item => item === code)
            if (findIndex !== -1) {
                value.splice(findIndex, 1)
                onChange([...value])
            } else {
                onChange([...value, code])
            }
        }
    }

    return (
        <div className={styles.selection}>
            <FilterButton title={title} num={value?.length}>
                <div className={styles.options_box}>
                    {options.map(item => (
                        <div
                            key={item.code}
                            onClick={() => onClick(item.code)}
                            className={[
                                styles.option,
                                value.includes(item.code) && styles.active,
                            ].join(' ')}
                        >
                            <span>{item.label}</span>
                            <CheckOutlined className={styles.icon} />
                        </div>
                    ))}
                </div>
            </FilterButton>
        </div>
    )
}

const FilterButtons: React.FC = ({ setParams }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    /** 重置 */
    const onReset = () => {
        form.resetFields()
        form.validateFields().then(val => setParams({ ...val, pageNo: 1 }))
    }

    return (
        <div className={styles.filter_buttons}>
            <Form
                layout="inline"
                form={form}
                onValuesChange={changedValues => setParams({ ...changedValues, pageNo: 1 })}
            >
                <Form.Item name="industryIds">
                    <CompanyIndustry
                        getOptions={store.getIndustryList}
                        options={store.industryList}
                    />
                </Form.Item>
                <Form.Item name="scales">
                    <Selection
                        title="公司规模"
                        type="checkbox"
                        options={store.category}
                        getOptions={store.getCategory}
                    />
                </Form.Item>
            </Form>
            <div className={styles.reset} onClick={onReset}>
                清除筛选条件
            </div>
        </div>
    )
}

export default observer(FilterButtons)
