import { useEffect, useState } from 'react'
import ExhibitionStore from './store'
import { Pagination, Input, Divider } from 'antd'
import type { PaginationProps } from 'antd'
import { useLocalObservable } from 'mobx-react'
import Cascade from '@/components/Cascade'
import styles from './index.modules.less'
import { history } from 'umi'
import { lessCertificateColumns } from './config'
import MarketAnalyze from './components/BarChart'
import Pie from '@/components/Pie'
import RankList from '@/components/RankList'
import JobScale from '@/components/JobScale'
import BtnGroup from './components/BtnGroup'

const { Search } = Input

const Index = () => {
    const store = useLocalObservable(() => new ExhibitionStore())

    // 级联数据源
    const [cascadeData, setCascadeData] = useState([] as any[][])
    const [_dataSource1, _setDataSource1] = useState([])
    const [_dataSource2, _setDataSource2] = useState([])

    const [newOccupation, _setNewOccupation] = useState([
        {
            url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/icon_rengongzhineng.png',
            name: '人工智能',
        },
        {
            url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/icon_rengongzhineng.png',
            name: '人工智能',
        },
        {
            url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/icon_rengongzhineng.png',
            name: '人工智能',
        },
        {
            url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/icon_rengongzhineng.png',
            name: '人工智能',
        },
        {
            url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/icon_rengongzhineng.png',
            name: '人工智能',
        },
        {
            url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/icon_rengongzhineng.png',
            name: '人工智能',
        },
        {
            url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/icon_rengongzhineng.png',
            name: '人工智能',
        },
        {
            url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/icon_rengongzhineng.png',
            name: '查看更多',
        },
    ])

    useEffect(() => {
        ;(async () => {
            const resp = await store.getJobTreeByCatalog()
            setCascadeData([resp])
        })()
    }, [])

    useEffect(() => {}, [cascadeData])

    // 当在组件外层点击事件，收起子级数据
    const clearData = () => {
        ;(async () => {
            const resp = await store.getJobLibrary()
            setCascadeData([resp])
        })()
    }

    // 分页组件监听调节每页的数量
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = _current => {}

    // 搜索框搜索事件
    function onSearch(value: string) {
        if (!value.trim()) return
        history.push(`/occupation-list?value=${encodeURIComponent(value)}`)
    }

    // 级联组件点击事件
    const clickHandle = async (param: any) => {
        const { level, id } = param
        if (level === 2) {
            // const second = cascadeData.filter(item => item.id === param.id)
            const resp = await store.getJobLibrary(param.id)
            setCascadeData([cascadeData[0], resp])
        } else if (level < 4) {
            const resp = await store.getJobInfoLibrary(String(param.id))
            setCascadeData([...cascadeData.slice(0, level), resp])
        } else {
            history.push(`/occupation-detail?id=${id}`)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.job_bank}>
                <Cascade dataSource={cascadeData} clickHandle={clickHandle} clearData={clearData} />
                <Search
                    placeholder=""
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={onSearch}
                />
            </div>

            <div className={styles.new_occupation}>
                <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-fe-pc/images/png_xinzengzhiye_blue.png" />
                <div className={styles.occupation_collection}>
                    {newOccupation.map(item => (
                        <div className={styles.occupation_collection_item} key={item.url}>
                            <img src={item.url} alt="" />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.rank_list_wrap}>
                <RankList
                    label="证书排行榜"
                    lg="linear-gradient(180deg, #FFEDED 0%, #FFF6F6 47%, #FFFFFF 100%)"
                    columns={lessCertificateColumns}
                    dataSource={[
                        {
                            job: '茶艺师',
                            occupation: '职业一',
                            index: '1',
                            level: '一级',
                            count: '2234',
                        },
                    ]}
                />
                <RankList
                    label="课程销量排行榜"
                    lg="linear-gradient(180deg, #FFF1DC 0%, #FFF9F2 47%, #FFFFFF 100%)"
                    columns={lessCertificateColumns}
                />
            </div>

            {/* <div>
                <div className={styles.ranking_list_title}>短期资源职业排行榜</div>
                <div className={styles.table_content}>
                    <div>
                        <div className={styles.sub_title}>课程资源较少职业</div>
                        <Table dataSource={dataSource1} columns={lessLessonColumns} />
                    </div>
                    <div>
                        <div className={styles.sub_title}>获证人数较少职业</div>
                        <Table dataSource={dataSource2} columns={lessCertificateColumns} />
                    </div>
                </div>
            </div> */}
            <div>
                <div className={styles.ranking_list_title}>市场供求分析</div>
                <div className={styles.table_content}>
                    <div>
                        <div className={styles.sub_title}>市场供求分析</div>
                        <MarketAnalyze />
                    </div>
                    <div>
                        <div className={styles.sub_title}>短期资源职业排行</div>
                        <div>
                            <RankList
                                onlyContent={true}
                                columns={lessCertificateColumns}
                                dataSource={[]}
                            />
                            <Pagination
                                showSizeChanger
                                onShowSizeChange={onShowSizeChange}
                                defaultCurrent={1}
                                total={500}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>全国十大城市岗位需求和求职排行榜</div>
                <div className={styles.apply_job_rank}>
                    <div>
                        <BtnGroup
                            list={[
                                { name: '城市一' },
                                { name: '城市二' },
                                { name: '城市三' },
                                { name: '城市四' },
                                { name: '城市五' },
                                { name: '城市六' },
                                { name: '城市七' },
                                { name: '城市八' },
                                { name: '城市九' },
                                { name: '城市十' },
                            ]}
                        />
                    </div>
                    <Divider type="vertical" />
                    <div>
                        <div className={styles.title}>
                            <div className={styles.icon} />
                            <div className={styles.name}>需求比例</div>
                        </div>
                        <Pie />
                    </div>
                    <div>
                        <JobScale
                            label="热招职业"
                            explain="（岗位空缺小于求职人数缺口最大的前三个职业）"
                            list={[
                                { name: '物业', scale: '1:2' },
                                { name: '会计专业人员', scale: '1:2' },
                                { name: '图书资料专业人员', scale: '1:2' },
                            ]}
                        />
                        <JobScale
                            label="短缺职业"
                            explain="（岗位空缺大于求职人数缺口最大的前三个职业）"
                            list={[
                                { name: '商品营业员', scale: '8:1' },
                                { name: '机械加工', scale: '6:1' },
                                { name: '客户服务管理员', scale: '4:1' },
                            ]}
                            customStyle={{ marginTop: 27 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
