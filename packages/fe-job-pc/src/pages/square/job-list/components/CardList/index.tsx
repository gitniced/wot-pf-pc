import JobCard from '@/pages/square/components/JobCard'
import styles from './index.module.less'
import { Col, Pagination, Row } from 'antd'
import { Empty } from '@wotu/wotu-components'

const CardList: React.FC<{
    data: any
    setJobParams?: (val: any, search?: boolean) => void
    source?: string
}> = ({ data, setJobParams, source }) => {
    /** 切换分页 */
    const onPagination = (pageNo: number, pageSize: number) => {
        setJobParams?.({
            pageNo,
            pageSize,
        })
    }

    return (
        <div className={styles.card_list}>
            <Row gutter={[24, 20]}>
                {data?.data?.length ? (
                    data?.data?.map((item: { code: number }) => (
                        <Col key={item.code} span={12}>
                            <JobCard type="default" data={item} source={source} />
                        </Col>
                    ))
                ) : (
                    <Empty className={styles.empty} />
                )}
            </Row>
            {data.totalCount > data.pageSize && (
                <div className={styles.pagination_box}>
                    <Pagination
                        className={styles.pagination}
                        showQuickJumper
                        showSizeChanger
                        current={data.currentPage}
                        total={data.totalCount}
                        onChange={onPagination}
                    />
                </div>
            )}
        </div>
    )
}

export default CardList
