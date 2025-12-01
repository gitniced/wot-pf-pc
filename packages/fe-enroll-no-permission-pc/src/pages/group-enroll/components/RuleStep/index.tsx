import styles from './index.module.less'
import { Checkbox } from 'antd'
import { observer } from 'mobx-react'

import type SiteStore from '@/stores/siteStore'
import { findSiteData } from '@wotu/wotu-components'

/**
 *
 * @returns 报名须知组件
 */
const RuleStep = ({ siteStore, store }: { siteStore: SiteStore; store: any }) => {
    const { siteData } = siteStore
    // 须知内容
    const notice_content = findSiteData(siteData, 'notice_content')

    return (
        <div className={styles.component_rule_step}>
            <div className={styles.title}>报名须知</div>
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: notice_content?.value }}
            />

            {!!store.needRead && (
                <Checkbox
                    className={styles.checkbox_wrapper}
                    checked={store.enrollRuleConfirm}
                    onChange={e => store.updateEnrollRule(e.target.checked)}
                >
                    我已完整阅读以上报名须知内容
                </Checkbox>
            )}
        </div>
    )
}

export default observer(RuleStep)
