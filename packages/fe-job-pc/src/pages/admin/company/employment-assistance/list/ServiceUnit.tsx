import { Select, Tabs } from 'antd'

const ServiceUnit = () => {
    const dropdownRender = () => (
        <Tabs tabPosition="left">
            <Tabs.TabPane key="competentAuthority" tab="主管部门" />
            <Tabs.TabPane key="organization" tab="机构" />
        </Tabs>
    )

    return <Select placeholder="请选择" dropdownRender={dropdownRender} />
}

export default ServiceUnit
