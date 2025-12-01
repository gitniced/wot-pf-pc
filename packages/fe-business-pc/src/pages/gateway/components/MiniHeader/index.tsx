import React from 'react'
import style from './index.module.less'

function MiniHeader({ title }: { title: string }) {
    return <div className={style.minihearder}>{title}</div>
}

export default MiniHeader
