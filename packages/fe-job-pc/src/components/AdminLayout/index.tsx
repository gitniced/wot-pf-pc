import { Layout } from 'antd'

const { Header, _Footer, Sider, Content } = Layout

const AdminLayout = props => {
    return (
        <Layout>
            <Header style={{ background: '#3ba0e9' }}>Header</Header>
            <Layout hasSider>
                <Sider style={{ background: '#3ba0e9', height: 'calc(100vh - 66px)' }}>Sider</Sider>
                <Content>{props.children}</Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
