import React from 'react'
import styles from './index.module.less'

export default function AssistanceHeader(props: any) {
  const { data } = props

  return (
    <div className={styles.logo}>
      <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-middle-pc/png_logo%402x_27e0dd2f.png" />
      {data?.region ? (
        <div className={styles.platform_select}>{data?.region}</div>
      ) : undefined}
    </div>
  )
}
