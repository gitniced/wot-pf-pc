import styles from './index.modules.less'
import { Input, Pagination, List } from 'antd'

import OccupationComponent from '@/components/OccupationComponent'
import { useState } from 'react'

const { Search } = Input

const Index: React.FC = () => {
    const onSearch = (_value: string) => {}
    const [arr, _setArr] = useState([
        {
            title: '信息安全测试员',
            updateTime: 1692760846826,
            definition:
                '职业定义：通过对评测目标的网络和系统进行渗透测试，发现安全问题并提出改进建议，使网络和系统免受恶意攻击的人员',
        },
        {
            title: '信息安全测试员1',
            updateTime: 1692760846826,
            definition:
                '职业定义：通过对评测目标的网络和系统进行渗透测试，发现安全问题并提出改进建议，使网络和系统免受恶意攻击的人员',
        },
        {
            title: '信息安全测试员2',
            updateTime: 1692760846826,
            definition:
                '职业定义：通过对评测目标的网络和系统进行渗透测试，发现安全问题并提出改进建议，使网络和系统免受恶意攻击的人员',
        },
    ])

    return (
        <div className={styles.container}>
            <div className={styles.search_wrap}>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={onSearch}
                />
            </div>

            <div>
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={arr}
                    renderItem={_item => (
                        <List.Item>
                            <OccupationComponent />
                        </List.Item>
                    )}
                />
            </div>
            <div>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </div>
    )
}

export default Index
