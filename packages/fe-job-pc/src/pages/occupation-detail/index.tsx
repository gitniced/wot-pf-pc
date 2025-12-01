import { observer, useLocalObservable } from 'mobx-react'
import { useLocation } from 'umi'
import { Button, Tooltip, Table } from 'antd'
import styles from './index.modules.less'
import OccupationDetailStore from './store'
import { useEffect, useState } from 'react'
import CardB from '../portrait-detail/components/CardB'

const Index = () => {
    const store = useLocalObservable(() => new OccupationDetailStore())

    const [dataSource, _setDataSource] = useState([
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ])
    const [columns, _setColumns] = useState([
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
    ])

    const { query } = useLocation() || {}
    // 根据路由上的id参数进行
    const { id = '' } = query || {}

    useEffect(() => {
        store.getJobDetail(id)
    }, [id])

    const jumpPdf = () => {
        window.open('https://i.zpimg.cn/public_read/16879682gj6yud4w.pdf', '_blank')
    }

    return (
        <div className={styles.detail_container}>
            <div className={styles.content_left}>
                <span>{store.jobDetail.name}</span>
                <span>{store.jobDetail.code}</span>
                {store.jobDetail?.fileList?.length !== 0 ? (
                    <Button onClick={jumpPdf} type="link">
                        查看职业技能标准
                    </Button>
                ) : (
                    <Tooltip title="该职业暂未公开职业技能标准">
                        <Button disabled={true} type="link">
                            查看职业技能标准
                        </Button>
                    </Tooltip>
                )}

                <div>从事计算机软件研究、 需求分析、 设计、 测试、 维护和管理的工程技术人员。</div>
                <div>主要工作任务</div>
                <div>
                    <div>1、研究、应用计算机软件开发技术和方法；</div>
                    <div>2、分析项目或产品需求, 编写需求说 明书及软件设计文档;</div>
                    <div>3、设计、编码和测试计算机软件;</div>
                    <div>4、部署和集成计算机软件;</div>
                    <div>5、编写和管理软件开发文档;</div>
                    <div>6、维护和管理计算机软件系统;</div>
                    <div>7、评估软件质量和软件过程能力, 改进软件过程实施;</div>
                    <div>8、实施软件质量保证和软件质量控制。</div>
                </div>

                <div>
                    <div>对口专业</div>
                    <Table dataSource={dataSource} columns={columns} />;
                </div>
            </div>
            <div className={styles.content_right}>
                <div>
                    <div>
                        <span>推荐职位</span>
                        <span>查看全部</span>
                    </div>
                    <div>
                        <CardB />
                        <CardB />
                        <CardB />
                    </div>
                </div>
                <div>
                    <div>
                        <span>推荐课程</span>
                        <span>查看全部</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Index)
