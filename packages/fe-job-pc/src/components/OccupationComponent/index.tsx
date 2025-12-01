import styles from './index.module.less'

const Index = () => {
   return <div className={styles.container} >
      <div className={styles.label} >
        <span className={styles.label_left} >
          建筑信息模型技术员L
        </span>
        <span className={styles.label_right} >
          查看职业技能标准
        </span>
      </div> 
      <div className={styles.desc} >
        <span>
        职业定义：利用计算机软件进行工程实践过程中的模拟建造，以改进其全过程中工程工序的技术人员。
        </span>
      
      </div>
      <div className={styles.base} >
         <span>4-04-05-04</span>
         <span>更新时间: 2021-12-02</span>
      </div>
   </div>
}

export default Index