import styles from './index.modules.less'

const Index = () => {
   return <div className={styles.container} >
       <div className={styles.job_name} >
         IT技术支持工程师
       </div>
       <div className={styles.job_desc} >
        利用IT技术进行排查、问题分析，解决产品生产、开发、运行等问题的技术支持人员。
       </div>
       <div className={styles.job_more} > 
         <span>
            更多
         </span>
       </div>
   </div>
}

export default Index