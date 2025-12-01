import { icons } from './const'
import styles from './index.module.less'

export const IconsChoice = ({
    value,
    onChange,
}: {
    value?: string
    onChange?: (e: string) => void
}) => {
    return (
        <div className={styles.icons}>
            {icons?.map(item => {
                return (
                    <div
                        key={item.title}
                        className={styles.icon_div}
                        onClick={() => {
                            sessionStorage.setItem('isFirstOpenModal', '0')
                            onChange?.(item?.icon)
                        }}
                    >
                        <div
                            className={styles.icon_item}
                            style={{
                                border: value === item.icon ? '1px solid var(--primary-color)' : '',
                            }}
                        >
                            <svg
                                className="icon"
                                aria-hidden="true"
                                style={{ fill: value === item.icon ? 'var(--primary-color)' : '' }}
                            >
                                <use xlinkHref={`#${item.icon}`} />
                            </svg>
                        </div>
                        <div>
                            <span
                                style={{
                                    color: value === item.icon ? 'var(--primary-color)' : '',
                                }}
                            >
                                {item.title}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
