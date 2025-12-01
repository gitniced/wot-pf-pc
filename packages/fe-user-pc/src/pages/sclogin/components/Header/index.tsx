import { useEffect, useState } from 'react'
import styles from './index.modules.less'

interface HeaderProps {
    cartoon?: boolean
}
const Header: React.FC<HeaderProps> = ({ cartoon }) => {
    const [zero, setZero] = useState<number>(0)

    useEffect(() => {
        if (cartoon) {
            setZero(1)
            return
        }
        window.addEventListener('scroll', () => {
            console.log(document.documentElement.scrollTop)
            setZero(document.documentElement.scrollTop)
        })
    }, [])
    return (
        <div className={zero !== 0 ? styles.page : styles.page2}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <img
                        className={styles.image}
                        src={
                            zero !== 0
                                ? 'https://static.zpimg.cn/public/sclogin/sclogo_1.png'
                                : 'https://static.zpimg.cn/public/sclogin/sclogo_2.png'
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
