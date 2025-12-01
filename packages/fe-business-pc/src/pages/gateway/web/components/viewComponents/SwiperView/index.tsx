import { Carousel } from 'antd'
import { useLocalObservable, observer } from 'mobx-react'
import { Spin } from 'antd'
import type { ImageItem } from '../../../../components/utils/interface'
import type { PreviewItem } from '../../../../components/utils/interface'
import { getViewStore } from '../../../create/store'
import styles from './index.module.less'

const getImage = (list: ImageItem[]) => {
    return list.map(item => {
        return (
            <div key={item.image} className={[styles.image_item].join(' ')}>
                <div
                    className={[styles.image_item].join(' ')}
                    style={{ backgroundImage: `url(${item.image})` }}
                />
            </div>
        )
    })
}

const EmptyDom = () => {
    return (
        <div className={styles.empty}>
            <div className={styles.icon} />
            <div className={styles.label}>点击编辑在右侧上传图片</div>
        </div>
    )
}

function CustomImageView(props: { data: PreviewItem; mode?: 'pc' | 'mobile' }) {
    let { list, fillMethod } = props?.data || {}
    list = list || []
    const webStore = useLocalObservable(() => getViewStore())
    const getCarousel = (_list: PreviewItem['list']) => {
        return _list?.length === 0 ? (
            <EmptyDom />
        ) : (
            <Carousel autoplay={true} dots={false} className={styles.carousel}>
                {getImage(_list || [])}
            </Carousel>
        )
    }
    const getFill = () => fillMethod === 'space' && props.mode === 'pc'
    return (
        <div className={getFill() ? styles.image_space : styles.image}>
            {webStore.ispadding ? <Spin className={styles.now_loading} /> : getCarousel(list)}
        </div>
    )
}

export default observer(CustomImageView)
