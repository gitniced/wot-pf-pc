import styles from './index.module.less'

const Footers = () => {
    return (
        <div className={styles.portal_footer}>
            <div className={styles.footer_content}>
                <div className={styles.footer_left}>
                    <div className={styles.left_content}>
                        <h4>友情链接</h4>
                        {/* 要点击跳转 */}
                        <p className={styles.link}>
                            <span className={styles.link_item}>杭州沃土教育科技股份有限公司</span>
                            <span className={styles.link_item}>中国就业培训技术指导中心</span>
                            <span className={styles.link_item}>亿卓智库</span>
                        </p>
                    </div>
                </div>
                <div className={styles.footer_hotline}>
                    <div className={styles.hotline_item}>
                        <div className={styles.hotline_label}>全国服务热线</div>
                        <div className={styles.hotline_content}>19157800767</div>
                    </div>
                    {/* 江苏站点要判断 */}
                    {true ? (
                        <div className={styles.hotline_item}>
                            <div className={styles.hotline_label}>平台电话咨询</div>
                            <div className={styles.hotline_content}>400-0123-571</div>
                        </div>
                    ) : (
                        <div className={styles.hotline_item}>
                            <div className={styles.hotline_label}>联系地址</div>
                            <div className={[styles.hotline_content, styles.address].join(' ')}>
                                杭州市西湖区教工路88号立元大厦16F
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.footer_right}>
                    <div className={styles.app_logo}>
                        <span className={styles.img_box}>
                            <img src="https://cp-oss.busionline.com/images/gongzonghao.png" />
                        </span>
                        <p>网络创业培训公众号</p>
                    </div>
                    <div className={styles.app_logo}>
                        <span className={styles.img_box}>
                            <img src="https://cp-oss.busionline.com/images/wochuang_wechat_applet.jpg" />
                        </span>
                        <p>沃创课堂小程序</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footers
