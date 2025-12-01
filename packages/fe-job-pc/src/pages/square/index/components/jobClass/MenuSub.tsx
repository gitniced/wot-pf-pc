import styles from './index.module.less'
import { history } from 'umi'

/** 弹出的职业分类 */
const MenuSub: React.FC<{ option: any }> = ({ option }) => {
    return (
        <div className={styles.menu_sub}>
            <div className={styles.menu_article}>
                <div className={styles.first}>
                    <div className={styles.first_title}>{option.name}</div>
                    <div className={styles.first_content}>
                        {option?.childList?.map((second: any) => (
                            <div className={styles.second} key={second.id}>
                                <div className={styles.second_title}>{second.name}</div>
                                <div className={styles.second_content}>
                                    {second?.childList?.map((third: any) => (
                                        <div
                                            className={styles.third}
                                            key={third.id}
                                            onClick={() =>
                                                history.push(
                                                    `/square/job-list?professionTypeId=${third.id}`,
                                                )
                                            }
                                        >
                                            {third.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuSub
