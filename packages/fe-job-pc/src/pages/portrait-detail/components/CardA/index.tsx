import styles from './index.modules.less';
import { Button } from 'antd';

const Index = () => {
   return <div className={styles.card_container}>
        <div className={styles.img_wrap}>
            <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" alt="" />
        </div>
        <div className={styles.content} >
            <div className={styles.name}  >
                西式烹调师/一级厨师
            </div>
            <div>
               近期报考计划: 
            </div>
            <div>
                2023-07-15 杭州沃土教育科技有限公司
            </div>
            <div>
                2023-07-15 杭州第一技师学院
            </div>
            <div className={styles.sign_up} >
                <Button type="primary">去报名</Button>    
            </div>
        </div>
   </div>
}

export default Index;