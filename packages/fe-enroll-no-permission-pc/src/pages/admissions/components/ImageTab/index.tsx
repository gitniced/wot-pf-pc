import React from 'react'
import styles from './index.module.less'
import { observer } from 'mobx-react'
import { Image } from 'antd'
import { Empty } from '@wotu/wotu-components'

function ImageTabs({ store }: any) {
    const { imageUrlList } = store?.orgInfo || {}
    return (
        <div className={styles.image_tabs_wrapper}>
            {imageUrlList?.length ? (
                <Image.PreviewGroup>
                    {imageUrlList?.map((url: string) => {
                        return <Image className={styles.img} height={122} width={217} src={url} />
                    })}
                </Image.PreviewGroup>
            ) : (
                <Empty />
            )}
        </div>
    )
}

export default observer(ImageTabs)
