export interface OuccupationItemProps {
    title: string
    updateTime: number
    definition: string
}
import styles from './index.modules.less'

const Index = (occupationObj: OuccupationItemProps) => {
    // 时间戳转换时间
    const convertTime = (time: number) => {
        const placeholderZero = (num: number) => (num > 9 ? num : `0${num}`)

        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return `${year}-${placeholderZero(month)}-${placeholderZero(day)} ${placeholderZero(
            hour,
        )}:${placeholderZero(minute)}:${placeholderZero(second)}`
    }
    // 新开标签页，打开pdf展示职业技能标准
    const jumpPdf = () => {
       window.open("https://i.zpimg.cn/public_read/16879682gj6yud4w.pdf", '_blank')
    }
    return (
        <div className={styles.occupation_item}>
            <div className={styles} >
                <span>{occupationObj.title}</span>
                <span onClick={jumpPdf} >查看职业技能标准</span>
            </div>
            <div>{convertTime(occupationObj.updateTime)}</div>
            <div>{occupationObj.definition}</div>
        </div>
    )
}

export default Index
