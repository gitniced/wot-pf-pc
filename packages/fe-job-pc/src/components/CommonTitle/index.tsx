import styles from './index.module.less'

const Index = (props) => {
   return <div style={props?.style} className={styles.container1} >
      <div className={styles.left}  />
      <span>{props.children}</span>
   </div>
}

export default Index