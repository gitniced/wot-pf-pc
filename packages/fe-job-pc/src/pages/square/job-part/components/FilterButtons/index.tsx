import styles from './index.module.less'

import FilterButton from '@/pages/square/components/FilterButton'
import { useEffect, useMemo } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { Form, message } from 'antd'
import { CaretRightOutlined, CheckOutlined } from '@ant-design/icons'
import { salaryOptions } from './const'
import { getPidList } from './utils'

interface ButtonProps {
    value?: (string | number)[]
    onChange?: (e: any) => void
    getOptions: () => void
    options: any[]
}

/** 公司行业 */
const CompanyIndustry: React.FC<ButtonProps> = ({ value = [], onChange, getOptions, options }) => {
    useEffect(() => {
        getOptions()
    }, [])

    /** 点击选项 */
    const onClick = (id: number) => {
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
                                {item.children?.map((children: any) => (
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

interface MenuSubProps {
    option: any
    value: any
    onChange?: (value: any) => void
}
/** 弹出的职业分类 */
const MenuSub: React.FC<MenuSubProps> = ({ option, value = [], onChange }) => {
    const onclick = (id: string) => {
        const index = value.indexOf(id)
        if (index === -1) {
            onChange?.([...value, id])
        } else {
            value.splice(index, 1)
            onChange?.([...value])
        }
    }

    return (
        <div className={styles.menu_sub}>
            <div className={styles.menu_article}>
                <div className={styles.first}>
                    <div className={styles.first_title}>{option.name}</div>
                    <div className={styles.first_content}>
                        {option?.childList?.map((second: any) => (
                            <div className={styles.second} key={second.id}>
                                <div className={styles.second_title}>{second.name}</div>
                                <div className={styles.second_content}>
                                    {second?.childList?.map((third: any) => (
                                        <div
                                            className={`${styles.third} ${
                                                value.includes(third.id) && styles.active
                                            }`}
                                            key={third.id}
                                            onClick={() => onclick(third.id)}
                                        >
                                            {third.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface PositionTypeProps {
    value?: (string | number)[]
    onChange?: (e: any) => void
    getOptions: () => void
    options: any[]
}
/** 职位类型 */
const PositionType: React.FC<PositionTypeProps> = ({
    value = [],
    onChange,
    getOptions,
    options,
}) => {
    useEffect(() => {
        getOptions?.()
    }, [])

    const optionIds = useMemo(() => getPidList({ value, options }), [value, options])

    return (
        <div className={styles.position_type}>
            <FilterButton title="职位类型" num={value?.length}>
                <div className={styles.content}>
                    <div className={styles.options}>
                        {options.map(item => (
                            <div
                                key={item.id}
                                className={`${styles.option} ${
                                    optionIds.includes(item.id) && styles.option_active
                                }`}
                            >
                                <span className={styles.label}>{item.name}</span>
                                <CaretRightOutlined width={5} height={8} className={styles.icon} />
                                <MenuSub option={item} value={value} onChange={onChange} />
                            </div>
                        ))}
                    </div>
                </div>
            </FilterButton>
        </div>
    )
}

interface SelectionProps {
    value?: (string | number)[]
    onChange?: (e: any) => void
    getOptions?: () => void
    options: any[]
    type: string
    title: string
}
/** 多选下拉框 */
const Selection: React.FC<SelectionProps> = ({
    value = [],
    onChange,
    options,
    getOptions,
    type,
    title,
}) => {
    useEffect(() => {
        getOptions?.()
    }, [])

    const onClick = (code: number) => {
        if (code === 0) {
            onChange?.([])
        } else if (type === 'radio') {
            onChange?.([code])
        } else {
            const findIndex = value?.findIndex(item => item === code)
            if (findIndex !== -1) {
                value.splice(findIndex, 1)
                onChange?.([...value])
            } else {
                onChange?.([...value, code])
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

const FilterButtons: React.FC<{
    setParams: (params: any) => void
    params: any
}> = ({ setParams, params }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(params)
    }, [params])

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
                <Form.Item name="professionTypeIds">
                    <PositionType getOptions={store.getJobOptions} options={store.jobOptions} />
                </Form.Item>
                <Form.Item name="experiences">
                    <Selection
                        title="工作经验"
                        type="checkbox"
                        options={store.experience}
                        getOptions={store.getExperience}
                    />
                </Form.Item>
                <Form.Item name="salary">
                    <Selection title="薪资待遇" type="radio" options={salaryOptions} />
                </Form.Item>
                <Form.Item name="educations">
                    <Selection
                        title="学历要求"
                        type="checkbox"
                        options={store.education}
                        getOptions={store.getEducation}
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
