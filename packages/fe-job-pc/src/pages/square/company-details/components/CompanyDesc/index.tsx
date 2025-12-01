import { Col, Image, Row } from 'antd'
import styles from './index.module.less'
import Commerce from '../../../components/Commerce'
import { Tooltip } from 'antd'
import { useState } from 'react'
import Preview from '../../../components/Preview'
import { Empty } from '@wotu/wotu-components'

/** 公司主要信息 */
const CompanyDesc: React.FC<{ data: any }> = ({ data }) => {
    const {
        businessIntroductionDto,
        introductionDto,
        photoList = [],
        productList = [],
    } = data ?? {}
    const _productList = productList.filter(
        (item: any) => item.logo || item.title || item.introduction,
    )

    const [video, setVideo] = useState<string[]>([])

    const businessIntroductionDtoList = [
        {
            label: '公司名称',
            value: businessIntroductionDto?.companyName,
        },
        {
            label: '法定代表人',
            value: businessIntroductionDto?.legalRepresentative,
        },
        {
            label: '统一社会信用代码',
            value: businessIntroductionDto?.unifiedSocialCreditCode,
        },
        {
            label: '注册地址',
            value: businessIntroductionDto?.registeredAddress,
        },
        {
            label: '注册资金',
            value: businessIntroductionDto?.registeredCapital,
        },
    ]

    return (
        <div className={styles.company_desc}>
            {introductionDto?.introduction ? (
                <div className={styles.introduction}>
                    <h2 className={styles.h2}>公司简介</h2>
                    <div className={styles.desc}>{introductionDto?.introduction}</div>
                </div>
            ) : (
                <Empty />
            )}

            {photoList?.length ? (
                <div className={styles.photo_list}>
                    <h2 className={styles.h2}>公司相册</h2>
                    <Row className={styles.photo_box} gutter={[12, 12]}>
                        {photoList.map((item: any) => (
                            <Col key={item.url} span={6}>
                                {item.urlType === 1 ? (
                                    <Image className={styles.photo} src={item?.url} />
                                ) : (
                                    <div
                                        className={styles.video}
                                        onClick={() => setVideo([item?.url])}
                                    >
                                        <video className={styles.photo} src={item?.url} />
                                    </div>
                                )}
                            </Col>
                        ))}
                    </Row>
                    <Preview data={video} onCancel={() => setVideo([])} />
                </div>
            ) : null}

            {_productList?.length ? (
                <div className={styles.product_list}>
                    <h2 className={styles.h2}>产品介绍</h2>
                    <Row className={styles.product_box} gutter={[24, 16]}>
                        {_productList.map((item: any) => (
                            <Col key={item.logo} span={12}>
                                <div className={styles.product}>
                                    <img className={styles.image} src={item.logo || defaultImage} />
                                    <div className={styles.info}>
                                        <Tooltip title={item.title}>
                                            <div className={styles.title}>{item.title}</div>
                                        </Tooltip>
                                        <Tooltip title={item.introduction}>
                                            <div className={styles.introduction}>
                                                {item.introduction}
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : null}

            {businessIntroductionDto && (
                <div>
                    <h2 className={styles.h2}>工商信息</h2>
                    <Commerce data={businessIntroductionDtoList} />
                </div>
            )}
        </div>
    )
}

export default CompanyDesc
