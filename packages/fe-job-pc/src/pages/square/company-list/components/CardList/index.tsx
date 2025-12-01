import styles from './index.module.less'
import { Col, Pagination, Row } from 'antd';
import { Empty } from '@wotu/wotu-components';
import Card from './Card';

const CardList: React.FC<{ data: any }> = ({ data, setParams }) => {

    /** 切换分页 */
    const onPagination = (pageNo, pageSize) => {
        setParams({
            pageNo,
            pageSize
        })
    }

    return (
        <div className={styles.card_list}>
            <Row gutter={[21, 20]}>
                {data?.data?.length ? (
                    data?.data?.map(item => (
                        <Col key={item.code} span={6}>
                            <Card data={item} />
                        </Col>
                    ))
                ) : <Empty className={styles.empty} />}
            </Row>
            <div className={styles.pagination_box}>
                <Pagination
                    className={styles.pagination}
                    showQuickJumper
                    showSizeChanger
                    defaultPageSize={20}
                    current={data.currentPage}
                    total={data.totalCount}
                    onChange={onPagination}
                />
            </div>

        </div>
    )
}

export default CardList