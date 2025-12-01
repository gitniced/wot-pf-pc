import JobCard from '../JobCard'
import styles from './index.module.less'
import { Col, Pagination, Row } from 'antd'
import { Empty } from '@wotu/wotu-components'
import type { JobActivityListItemRespDto, JobActivityListRespDto } from '../../interface'

const JobCardList: React.FC<{ data: JobActivityListRespDto; updatePageNo: any }> = ({
    data,
    updatePageNo,
}) => {
    const { data: jobList = [] } = data || {}

    /** 切换分页 */
    const onPagination = (pageNo: number, pageSize: number) => {
        updatePageNo({
            pageNo,
            pageSize,
        })
    }

    return (
        <div className={styles.card_list}>
            <Row gutter={[24, 20]}>
                {jobList?.length ? (
                    jobList?.map((item: JobActivityListItemRespDto) => (
                        <Col key={item.code} span={12}>
                            <JobCard type="default" data={item} />
                        </Col>
                    ))
                ) : (
                    <Empty className={styles.empty} />
                )}
            </Row>
            <div className={styles.pagination_box}>
                <Pagination
                    className={styles.pagination}
                    showQuickJumper
                    showSizeChanger
                    pageSize={data.pageSize || 10}
                    current={data.currentPage!}
                    total={data.totalCount!}
                    onChange={onPagination}
                />
            </div>
        </div>
    )
}

export default JobCardList
