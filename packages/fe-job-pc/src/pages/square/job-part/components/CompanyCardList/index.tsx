import CompanyCard from '../CompanyCard'
import styles from './index.module.less'
import { Col, Pagination, Row } from 'antd'
import { Empty } from '@wotu/wotu-components'
import type { CompanyActivityListItemRespDto, CompanyActivityListRespDto } from '../../interface'

const CompanyCardList: React.FC<{ data: CompanyActivityListRespDto; updatePageNo: any }> = ({
    data,
    updatePageNo,
}) => {
    const { data: companyList = [] } = data || {}
    /** 切换分页 */
    const onPagination = (pageNo, pageSize) => {
        updatePageNo({
            pageNo,
            pageSize,
        })
    }

    return (
        <div className={styles.card_list}>
            <Row gutter={[24, 20]}>
                {companyList?.length ? (
                    companyList?.map((item: CompanyActivityListItemRespDto) => (
                        <Col key={item.code} span={6}>
                            <CompanyCard params={item} />
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
                    current={data.currentPage}
                    total={data.totalCount}
                    pageSize={data.pageSize || 16}
                    onChange={onPagination}
                    pageSizeOptions={[16, 32, 48, 64]}
                />
            </div>
        </div>
    )
}

export default CompanyCardList
