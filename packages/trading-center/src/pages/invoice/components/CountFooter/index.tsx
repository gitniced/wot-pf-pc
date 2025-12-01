import { Button } from 'antd'
import type { CountFooterProps } from './interface'
import styles from './index.module.less'
import { useLocation } from 'umi'

const Footer: React.FC<CountFooterProps> = (props: CountFooterProps) => {
    const { query } = useLocation()
    const { count = 0, money = '0.00', showSubmit, onBack, onNext, onSubmit } = props
    return (
        <div className={styles.footer_content}>
            <div className={styles.content}>
                <div className={styles.left}>
                    已选择&nbsp;<span>{count}</span>&nbsp;个订单，合计&nbsp;<span>{money}</span>
                    &nbsp;元
                </div>
                <div className={styles.right}>
                    {/* {!query?.code ? (
                        <div className={styles.go_back} onClick={onBack}>
                            <svg
                                className={styles.svg_icon}
                                width="200"
                                height="200"
                                aria-hidden="true"
                            >
                                <use xlinkHref="#icon_back"> </use>
                            </svg>
                            返回
                        </div>
                    ) : (
                        <Button type={'default'} className={styles.prev_btn} onClick={onBack}>
                            上一步
                        </Button>
                    )} */}

                    {!query?.code ? (
                        showSubmit ? (
                            <Button type={'default'} className={styles.prev_btn} onClick={onBack}>
                                上一步
                            </Button>
                        ) : (
                            <Button type={'default'} className={styles.prev_btn} onClick={onBack}>
                                返回
                            </Button>
                        )
                    ) : null}

                    {showSubmit ? (
                        <Button type={'primary'} className={styles.next_btn} onClick={onSubmit}>
                            提交申请
                        </Button>
                    ) : (
                        <Button type={'primary'} className={styles.next_btn} onClick={onNext}>
                            下一步
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Footer
