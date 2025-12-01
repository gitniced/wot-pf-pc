import { Tabs } from 'antd'
import ModulesControl from './ModulesControl'
import SortControl from './SortControl/index'

const Index = ({ menuActive, userMenuConfig, saveMenuConfig }: any) => {
    const items = [
        {
            label: '模块',
            key: 'item-1',
            children: (
                <ModulesControl
                    menuActive={menuActive}
                    userMenuConfig={userMenuConfig}
                    saveMenuConfig={saveMenuConfig}
                />
            ),
        }, // 务必填写 key
        { label: '排序', key: 'item-2', children: <SortControl userMenuConfig={userMenuConfig} /> },
    ]

    return <Tabs items={items} />
}

export default Index
