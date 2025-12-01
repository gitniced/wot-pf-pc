import type { PreviewItem } from '../../../../components/utils/interface'
import styles from './index.module.less'
import dayjs from 'dayjs'
import type { ContentItem } from './interface'
import classnames from 'classnames'

const CardRender = ({
    contentItemData,
    index,
}: {
    contentItemData: ContentItem
    index?: number
}) => {
    let { title, cover, categoryNameList, publishTime, categoryNames } = contentItemData || {}

    cover = cover || ''
    categoryNameList = categoryNameList || categoryNames || []

    const LeftCard = () => {
        return (
            <div className={styles.left}>
                <div className={styles.title}>{title}</div>
                <div className={styles.bottom}>
                    <div className={styles.time}>
                        {publishTime ? dayjs(publishTime).format('YYYY-MM-DD') : null}
                    </div>
                    <div className={classnames(styles.tags, cover ? styles.short_tags : null)}>
                        {categoryNameList?.length > 0 &&
                            categoryNameList.map((name: string) => (
                                <div className={styles.tag} key={name}>
                                    {name}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {cover ? (
                <div className={styles.item} key={index}>
                    <LeftCard />
                    <div className={styles.right}>
                        <div
                            className={styles.cover}
                            style={{
                                backgroundImage: `url(${cover})`,
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className={classnames(styles.item, styles.item_symbol)} key={index}>
                    <LeftCard />
                </div>
            )}
        </div>
    )
}

function ArticleContent(props: { data: PreviewItem; mode?: 'pc' | 'mobile' }) {
    props.mode ||= 'mobile'
    let valData = props.data?.codes || props.data?.content || [] //获取到数据
    const getSpace = () => props.mode === 'pc'
    /**
     * 1.遍历valData 判断数组里每一项是否为对象  如果为字符串得话 返回 valData= []
     * 是对象得话 返回 valData = valData
     */

    if (valData.filter(Boolean)?.some(i => typeof i === 'string')) {
        valData = []
    }

    const EmptyDom = () => {
        return (
            <div className={styles.empty}>
                <div className={styles.icon} />
                <div className={styles.label}>点击编辑在右侧上传图文内容11</div>
            </div>
        )
    }
    return (
        <div className={getSpace() ? styles.page_space : styles.page}>
            <div className={styles.content}>
                {valData.length === 0 ? (
                    <EmptyDom />
                ) : (
                    <div className={styles.imageText}>
                        {valData &&
                            valData.filter(Boolean)?.map((item: any, index: number) => {
                                return <CardRender contentItemData={item} key={index} />
                            })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArticleContent
