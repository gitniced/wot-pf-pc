import { SearchOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { Input, Space } from 'antd'
import AreaCascader from '@/components/AreaCascader'
import { ReactNode, useState } from 'react'

const { Search } = Input
interface Props {
    defaultValue?: {
        professionName?: string
        cityCode?: string
    }
    onSearch: (professionName: any, cityCode?: string) => void
    displayRender?: (label: string[]) => ReactNode
    hiddenArea?: boolean
}

const Index: React.FC<Props> = ({ displayRender, onSearch, defaultValue, hiddenArea }) => {
    const [values, setValues] = useState<string[]>([])
    const [cityCode, setCityCode] = useState<string | undefined>(defaultValue?.cityCode || '100001')
    const [professionName, setProfessionName] = useState<string | undefined>(
        defaultValue?.professionName,
    )

    const onChangeArea = (values: string[]) => {
        setCityCode(values?.[values?.length - 1] || '-1')
        setValues(values)
    }
    const onChangeProfessionName = (value: string) => {
        setProfessionName(value)
    }

    return (
        <div className={styles.page}>
            <div className={styles.search_box}>
                <Space.Compact>
                    {!hiddenArea && (
                        <AreaCascader
                            type="city"
                            onChange={onChangeArea}
                            nationwideState={1}
                            value={values}
                            defaultValue={[
                                // @ts-ignore
                                `${defaultValue?.provinceCode || '100000'}`,
                                `${cityCode}`,
                            ]}
                            displayRender={displayRender}
                        />
                    )}
                    <Search
                        className={`${styles.search} ${hiddenArea ? styles.hidden_area : ''}`}
                        placeholder="请输入搜索关键词"
                        allowClear
                        enterButton={
                            <>
                                <SearchOutlined className={styles.icon} />
                                <span className={styles.text}>搜索</span>
                            </>
                        }
                        size="large"
                        onSearch={() => onSearch(professionName, cityCode)}
                        onChange={e => onChangeProfessionName(e.target.value)}
                        defaultValue={professionName}
                    />
                </Space.Compact>
            </div>
        </div>
    )
}

/** 职位列表搜索 */
export default Index
