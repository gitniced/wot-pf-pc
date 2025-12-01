import React from 'react'
import './index.less'
import type { IEmptyProps } from './interface'

const defaultImageUrl = 'https://static.zpimg.cn/public/fe_user_pc/images/empty_bg.png'

export default (props: IEmptyProps) => {
    const { content = '暂无内容', imageUrl = defaultImageUrl, width = 120, height = 120 } = props
    return (
        <div className="global_empty_body">
            <img src={imageUrl} alt="imageUrl" width={width} height={height} />
            <p className="content">{content}</p>
        </div>
    )
}
