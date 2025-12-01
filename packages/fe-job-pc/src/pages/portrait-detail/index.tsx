import styles from './index.modules.less'
import Card from './components/Card'
import CardA from './components/CardA'
import CardB from './components/CardB'
import WorldCloud from '@/components/WorldCloud'

const Index = () => {
    return (
        <div className={styles.container}>
            <div className={styles.job_title}>
                <div>信息安全工程师</div>
                <div>从事信息安全管理、防护、监控工作的技术人员。</div>
            </div>
            <div className={styles.desc_content}>
                <div className={styles.desc_content_item} >
                    <div>工作内容</div>
                    <div>
                        1、监控公司信息存储和传输安全，防止信息泄密。对信息安全问题导致的紧急与突发事件需制定应急预案，并做好预防性措施及定期演练
                        3、负责所有信息系统的用户，角色，权限的合理性审核与校正工作
                        4、负责对整体IT信息架构安全隐患地挖掘、追踪与消除
                        5、强化公司员工信息安全意识，定期进行各部门的信息安全培训
                    </div>
                </div>
                <div className={styles.desc_content_item} >
                    <div>任职要求</div>
                    <div>
                        1、熟悉国内外信息安全相关法律法规、管理标准和技术标准
                        2、熟悉国内外主流安全产品和工具，具备扎实的信息安全理论知识
                        3、熟悉渗透测试的各类技术及方法，熟练掌握各种渗透测试工具
                        4、热爱安全技术,具备良好的团队精神和合作精神，对工作有热情，能够在一定压力下工作
                    </div>
                </div>
                <div className={styles.desc_content_item} >
                    <div>职位能力</div>
                    <WorldCloud />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.content_left}>
                    <div>能力进阶</div>
                    <div className={styles.flex_bet}>
                        <div>推荐课程</div>
                        <div>更多</div>
                    </div>
                    <div className={styles.flex_basic}>
                        <Card />
                        <Card />
                        <Card />
                    </div>

                    <div>推荐证书</div>
                    <div className={styles.flex_bet}>
                        <div>推荐课程</div>
                        <div>更多</div>
                    </div>
                    <div className={styles.flex_basic}>
                        <CardA />
                        <CardA />
                    </div>
                </div>

                <div className={styles.content_right}>
                    <div>相似职位</div>
                    <div className={styles.similar_job}>
                        <CardB />
                        <CardB />
                        <CardB />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
