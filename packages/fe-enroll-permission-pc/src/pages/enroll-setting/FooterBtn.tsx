import styles from './index.modules.less'
import { Button } from 'antd'
import { history, useLocation } from 'umi'
import { PUBLISH_STATUS_ENUM } from './const'
import { useEffect, useState } from 'react'

//categoryId 分类得最后一层id   careerId 职业Id  workId 工种Id  levelId 等级id             //categoryCode  categoryName
/** 报名设置 */
export function FooterBtn(props: {
    onFinishSubmit: (arg0: number) => void
    store: {
        isEdit: boolean
        echoDetail: { publishStatus: PUBLISH_STATUS_ENUM }
        btnLoading: boolean | { delay?: number | undefined } | undefined
    }
    disBtn: boolean | undefined
}) {
    const [fatherLeft, setFatherLeft] = useState(0)
    const { query } = useLocation() || {}
    useEffect(() => {
        const resizeHandler = () => {
            const fatherDom = document.getElementsByClassName('right_content')?.[0] || null
            if (fatherDom) {
                const { x: left } = fatherDom?.getBoundingClientRect?.() || {}
                setFatherLeft(left || 0)
            }
        }
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        window.addEventListener('scroll', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
            window.removeEventListener('scroll', resizeHandler)
        }
    }, [])
    return (
        <div
            className={styles.form_btn}
            style={{ width: `calc(100vw - ${fatherLeft}px)`, left: `${fatherLeft}px` }}
        >
            <Button
                onClick={() => {
                    history.replace('/event-management')
                }}
            >
                取消
            </Button>
            <Button
                type="primary"
                onClick={() =>
                    props.onFinishSubmit(
                        props.store.isEdit ? Number(props.store.echoDetail?.publishStatus) : 0,
                    )
                }
                disabled={props.disBtn}
                loading={props.store.btnLoading}
            >
                保存
            </Button>
            {query.code ? null : props.store.echoDetail?.publishStatus ===
              PUBLISH_STATUS_ENUM.RELEASE ? (
                <Button
                    type="primary"
                    onClick={() => props.onFinishSubmit(2)}
                    disabled={props.disBtn}
                    loading={props.store.btnLoading}
                >
                    取消发布
                </Button>
            ) : (
                <Button
                    type="primary"
                    onClick={() => props.onFinishSubmit(1)}
                    disabled={props.disBtn}
                    loading={props.store.btnLoading}
                >
                    保存并发布
                </Button>
            )}
        </div>
    )
}
