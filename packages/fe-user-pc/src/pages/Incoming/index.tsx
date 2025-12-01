import React from 'react'
import BlockBox from './components/BlockBox'
import style from './index.module.less'
import FromToUp from './components/FromToUp'

function Incoming() {
    return (
        <BlockBox>
            <div className={style.incoming}>
                <div>
                    <FromToUp />
                </div>
            </div>
        </BlockBox>
    )
}
Incoming.title = '线上进件'

export default Incoming
