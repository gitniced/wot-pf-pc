import styles from './index.modules.less'
import { useEffect, useRef } from 'react'

interface CascadeParam {
    dataSource: any[]                  //级联数据
    clickHandle: (param: any) => void, //级联点击事件 
    clearData: () => void              //初始化级联数据
}

interface CascadeItem {
    id: any
    name: string
}

const Index = (param: CascadeParam) => {
    const cascadeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // 监听页面点击事件, 点击页面其他区域，收起级联数据
        function handleClick(e: any) {
            if (!cascadeRef.current?.contains(e.target)) {
                param.clearData()
            }
        }
     
        window.addEventListener('click', handleClick, true)

        // 组件销毁时，移除事件监听
        return () => {
            window.removeEventListener('click', handleClick, true)
        }
    }, [])

    return (
        <div ref={cascadeRef} className={styles.container}>
            {param.dataSource.map((cascadeItem, i) => (
                <div style={{ left: i * 200 }} className={styles.job_level} key={i}>
                    {cascadeItem.map((item: CascadeItem) => (
                        <div key={item.id} onClick={() => param.clickHandle(item)}>
                            {item.name}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Index
