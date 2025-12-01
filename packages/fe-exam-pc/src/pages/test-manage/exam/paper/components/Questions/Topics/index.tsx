// 题目区
import { observer } from 'mobx-react'
import FontSize from '../../FontSize'
import styles from './index.module.less'
import Operate from './Operate'
import Options from './Options'
import TypeTitle from './TypeTitle'

const Topics = () => {
    return (
        <div className={styles.component_topics}>
            {/* 题目类型  */}
            <TypeTitle />
            <div className={styles.content}>
                {/* 题目选项 */}
                <Options />
                {/* 题目操作区 */}
                <Operate />
            </div>
            {/* 修改字体大小、调用计算器 */}
            <FontSize />
        </div>
    )
}

export default observer(Topics)
