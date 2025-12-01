import { Layout } from 'antd'
import styles from './_layout.module.less'
import { observer } from 'mobx-react'

const AssistantLayout: React.FC = props => {
    return (
        <Layout className={styles.assistant_layout}>
            {/* <LayoutHeader
                type="assistant"
                rightRender={
                    isDesign ? (
                        <ChatButton params={{ courseCode: aiStore?.exchangeData?.courseCode }} />
                    ) : null
                }
            /> */}

            <Layout.Content className={styles.content}>{props.children}</Layout.Content>
        </Layout>
    )
}

export default observer(AssistantLayout)
