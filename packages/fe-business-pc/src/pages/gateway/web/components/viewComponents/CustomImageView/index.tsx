import React from 'react'
import { Spin } from 'antd'
import type { ImageItem } from '../../../../components/utils/interface'
import type { PreviewItem } from '../../../../components/utils/interface'
import styles from './index.module.less'

const ImageDom = (props: {
    data: ImageItem & { loading?: boolean }
    direction: PreviewItem['direction']
}) => {
    const { data, direction } = props
    return data.loading ? (
        <Spin
            className={[
                direction === 'horizontal'
                    ? styles.horizontal_image_item
                    : styles.vertical_image_item,
                styles.img,
            ].join(' ')}
        />
    ) : (
        <div
            className={[
                direction === 'horizontal'
                    ? styles.horizontal_image_item
                    : styles.vertical_image_item,
                styles.img,
            ].join(' ')}
        >
            <img src={data.image} className={styles.image} />
        </div>
    )
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
    let { list, direction, fillMethod } = props?.data || {}
    list = list || []

    /**
     *  获取内容节点
     * @returns
     */
    const getImageNode = () => {
        if (!list?.length) return <EmptyDom />
        if (direction === 'horizontal') {
            return (
                <div className={styles.horizontal_image}>
                    {list.map(item => {
                        return <ImageDom key={item.image} data={item} direction={direction} />
                    })}
                </div>
            )
        } else {
            return (
                <div className={styles.vertical_image}>
                    {list.map(item => {
                        return <ImageDom key={item.image} data={item} direction={direction} />
                    })}
                </div>
            )
        }
    }

    const getIsSpace = () => fillMethod === 'space' && props.mode === 'pc'

    return <div className={getIsSpace() ? styles.image_space : styles.image}>{getImageNode()}</div>
}

export default CustomImageView
