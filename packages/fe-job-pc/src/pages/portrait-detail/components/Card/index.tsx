import styles from './index.modules.less'

const Index = () => {
    return <div className={styles.card_container} >
        <div className={styles.img_wrap} >
            <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" alt=""  />
        </div>
        <div className={styles.name}  >
            茶艺师茶艺师茶艺师茶艺师
        </div>
        <div className={styles.footer}  >
           <div>
             <span className={styles.price} >免费</span>
             <span className={styles.origin_price} >¥90.00</span>
           </div>
           <div>
             <img src="https://zpimg.cn/bj/img/20210624/60d3ff306b52e.png" alt="" />
             <span>格莱森职培</span>
           </div>
          
        </div>
    </div>
}

export default Index;