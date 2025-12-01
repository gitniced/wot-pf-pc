import { Button, Modal } from 'antd'
import styles from './index.module.less'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import { SAVE_TYPE } from '../const'
import DebounceBtn from '@/components/DebounceBtn'
import { history } from 'umi'

const { confirm } = Modal

interface CreateHeaderType {
    /**
     * 退出编辑的跳转地址
     */
    backPath?: string
    /**
     *  点击保存草稿
     * @returns
     */
    saveDaft?: (v: any) => Promise<any>
    /**
     *  点击发布
     * @returns
     */
    savePublish?: (v: any) => Promise<any>
    /**
     * 离开是否给提示
     */
    unSave?: boolean
    /**
     * 当前的微页面状态
     */
    status?: SAVE_TYPE
}

function CreateHeader({
    backPath = '/gateway/web',
    unSave,
    status,
    saveDaft,
    savePublish,
}: CreateHeaderType) {
    const quitPreview = e => {
        e.preventDefault()
        if (unSave) {
            Modal.confirm({
                title: '警告',
                centered: true,
                content: '离开页面数据将不会保存，确定要继续吗？',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    history.replace(backPath)
                },
            })
        } else {
            history.replace(backPath)
        }
    }

    return (
        <div id="create_hearder" className={styles.create_hearder}>
            <Button type={'text'} href={backPath} className={styles.quit_btn} onClick={quitPreview}>
                <svg className={styles.quit_icon} fill="currentColor">
                    <use xlinkHref={`#icon_tuichu`} />
                </svg>
                退出编辑
            </Button>
            <div className={styles.edit_con}>
                {/* 只有草稿才可以保存草稿 */}
                {status === SAVE_TYPE.DRAFT ? (
                    <DebounceBtn
                        onActive={saveDaft || Promise.resolve}
                        onActiveParams={SAVE_TYPE.DRAFT}
                        styleClass={styles.load_btn}
                        onActiveSuccess={() => {
                            history.push(backPath)
                        }}
                    >
                        <Button type={'default'} className={styles.draft_btn}>
                            保存草稿
                        </Button>
                    </DebounceBtn>
                ) : null}
                <DebounceBtn
                    onActive={params => {
                        return new Promise<void>((resolve, reject) => {
                            confirm({
                                title: '是否要进行发布？',
                                centered: true,
                                icon: <ExclamationCircleOutlined />,
                                okText: '确定',
                                cancelText: '取消',
                                onOk() {
                                    if (!savePublish) {
                                        resolve()
                                    } else {
                                        savePublish?.(params).then(resolve, reject)
                                    }
                                },
                                onCancel() {
                                    reject()
                                },
                            })
                        })
                    }}
                    onActiveParams={SAVE_TYPE.RELEASE}
                    styleClass={styles.load_btn}
                    onActiveSuccess={() => {
                        history.push(backPath)
                    }}
                >
                    <Button type={'primary'} className={styles.release_btn}>
                        发布
                    </Button>
                </DebounceBtn>
            </div>
        </div>
    )
}

export default observer(CreateHeader)
