// 内容卡片组件
import React from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import './index.module.less'

import { MOBILE_LAYOUT_ENUM } from '@/pages/gateway/web/create/components/ActionBar/Course/const'
import classNames from 'classnames'
const courseCard = (props: any) => {
    console.log('courseCard', props)

    let {
        image = '',
        title = '',
        price = 0,
        allowDelete = false,
        onDelete,
        layoutStyle = MOBILE_LAYOUT_ENUM.LIST,
    } = props
    price ||= '免费'

    return (
        <div className={classNames(`${layoutStyle}_card`, 'course_card')}>
            {allowDelete && (
                <CloseCircleFilled
                    className={classNames(`${layoutStyle}_card_close`, 'course_card_close')}
                    onClick={onDelete}
                />
            )}
            <img
                className={classNames(`${layoutStyle}_card_image`, 'course_card_image')}
                src={image || DEFAULT_IMAGE}
            />
            <div className={classNames(`${layoutStyle}_card_content`, 'course_card_content')}>
                <div className={classNames(`${layoutStyle}_card_title`, 'course_card_title')}>
                    {title}
                </div>
                <div className={classNames(`${layoutStyle}_card_price`, 'course_card_price')}>
                    {price}
                </div>
            </div>
        </div>
    )
}

export default courseCard
