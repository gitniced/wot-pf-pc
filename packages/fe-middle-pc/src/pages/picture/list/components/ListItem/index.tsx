import styles from './index.module.less'
import { history } from 'umi'
import type { ListItemProps } from '../../interface'
import dayjs from 'dayjs'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'

const ListItem = ({ data }: { data: ListItemProps }) => {
    const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
    const { title, publishTime, categoryNameList = [], cover, code } = data || {}

    return (
        <div
            className={[styles.list_item].join(' ')}
            onClick={() => {
                history.push(`/${currentDomain}/picture/detail?code=${code}`)
            }}
        >
            <div className={styles.base}>
                <div className={styles.title}>{title}</div>
                <div className={styles.info}>
                    <div className={styles.time}>
                        {publishTime === 0 ? '-' : dayjs(publishTime).format('YYYY-MM-DD')}
                    </div>
                    <div className={styles.tag_list}>
                        {categoryNameList.map((item, idx) => {
                            return (
                                idx < 2 && (
                                    <div key={item} className={styles.tag}>
                                        {item}
                                    </div>
                                )
                            )
                        })}
                    </div>
                </div>
            </div>
            {cover && <div className={styles.image} style={{ backgroundImage: `url(${cover})` }} />}
        </div>
    )
}

export default ListItem
