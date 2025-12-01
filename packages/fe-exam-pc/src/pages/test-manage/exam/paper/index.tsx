// 试卷
import { Watermark, findSiteData } from '@wotu/wotu-components'
import styles from './index.module.less'
import ReadonlyPage from '../../components/ReadonlyPage'
import Header from './components/Header'
import Questions from './components/Questions'
import { observer, useLocalObservable } from 'mobx-react'
import TestStore from '@/pages/test-manage/store'
import { GenerateState, WatermarkState } from '../../constant'
import { useEffect, useRef, useState } from 'react'
import MsgDrawer from './components/MsgDrawer'
import Socket from '@/utils/websocket'
import { getCookie, setLocalStorage } from '@/storage'
import type { MessageData } from './interface'
import { getLocalStorage } from '@/storage'
import { message } from 'antd'
import { FORCE_SUBMIT, MessageType } from '@/pages/test-manage/exam/constant'
import { wsKingUrlObj } from '@/servers/kingUrl'
import useSiteStore from '@/hooks/useSiteStore'
import PaperStore from './store'
// @ts-ignore
import { history } from 'umi'
import CustomAlert from './components/CustomAlert'

const Paper = () => {
    const store = useLocalObservable(() => TestStore)
    const paperStore = useLocalObservable(() => PaperStore)
    const siteStore = useSiteStore()

    const { name, generateState, admissionTicketNumber, projectNo } = store.candidateData
    const { watermarkState, cutAutoWinding, cutAutoWindingNum } = store.examData
    const { cutCount, msgList, getMsgList } = store

    const [MsgDrawerVisible, setMsgDrawerVisible] = useState<boolean>(false)
    const [openAlert, setOpenAlert] = useState<boolean>(false)

    const cutCountRef = useRef<number>(getLocalStorage('CUT_COUNT') ?? 0)

    // 开启水印配置，水印内容为考生姓名
    const watermarkContent = watermarkState === WatermarkState.ENABLE ? `${projectNo ? `${projectNo}\n` : ''}${name}${admissionTicketNumber ? `\n${admissionTicketNumber}` : ''}` : ''

    // 判断是否已经答题了，没有答题的情况下才显示答题页面
    const isShow = generateState === GenerateState.NO

    message.config({
        top: 180,
    })

    //socket
    const initSocket = () => {
        const localSearchParams = getLocalStorage('TEST_SEARCH_PARAMS')

        new Socket(
            `${wsKingUrlObj[BUILD_ENV]}/exam/message/${findSiteData(siteStore.siteData, 'alias', {
                findKey: 'baseInfo',
            })}/${getCookie('TOKEN')}/${localSearchParams.examCode}`,
            res => {
                const messageData: MessageData = JSON.parse(res)
                const { messageType, messageContent, newContent } = messageData
                if (newContent) {
                    switch (messageType) {
                        case MessageType.REMINDER:
                            message.warning({
                                content: `监考员提醒您: ${messageContent}`,
                                duration: 10,
                            })
                            getMsgList()
                            break
                        case MessageType.DELAY:
                            message.warning({
                                content: `监考员为您延时: ${messageContent}`,
                                duration: 10,
                            })
                            store.getCandidateData()
                            getMsgList()
                            break
                        case MessageType.FORCE_WINDING:
                            // 监考员强制收卷之后直接跳转到交卷结果页面
                            history.push('/test-manage/exam/result')
                            break
                        default:
                            break
                    }
                }
            },
        )
    }

    useEffect(() => {
        document.title = '答题'
        getMsgList()
        initSocket()

        store.getCandidateData()
        store.getExamData()
    }, [])

    // 监听切屏次数
    useEffect(() => {
        // 如果开启了切屏自动收卷
        const blurFn = () => {
            if (cutCountRef.current >= cutAutoWindingNum!) return
            
            // 检查是否是因为 iframe 内的 kityformula 导致的失焦
            const activeElement = document.activeElement;
            const iframe = document.getElementById('iframe-custom');
            
            // 如果当前焦点在 iframe 内，则不认为是切屏
            if (iframe && activeElement === iframe) {
                return;
            }
            
            // 检查是否是因为 kityformula 相关的元素导致的失焦
            const kityFormulaContainer = document.querySelector('.w-e-kity-formula-container');
            if (kityFormulaContainer && kityFormulaContainer.contains(activeElement)) {
                return;
            }
            
            // 失去焦点切屏次数+1
            cutCountRef.current = cutCountRef.current + 1
            store.changeCutCount(cutCountRef.current)
            setLocalStorage('CUT_COUNT', cutCountRef.current)
            setOpenAlert(true)
        }
        const focusFn = () => {
            if (cutCountRef.current > cutAutoWindingNum!) return

            if (cutCountRef.current === cutAutoWindingNum) {
                paperStore.submitExam(FORCE_SUBMIT.CUT_AUTO).then(() => {
                    cutCountRef.current = 0
                    // 自动交卷之后跳转到交卷结果页面
                    history.push('/test-manage/exam/result')
                })
            }
        }
        if (cutAutoWinding) {
            window.addEventListener('blur', blurFn)
            window.addEventListener('focus', focusFn)
        }
        return () => {
            window.removeEventListener('blur', blurFn)
            window.removeEventListener('focus', focusFn)
        }
    }, [cutAutoWinding, cutAutoWindingNum])

    // 禁用右键和F12以及Shift+Ctrl+i
    useEffect(() => {
        // 禁用右键
        document.oncontextmenu = () => {
            return false
        }

        // F12和Shift+Ctrl+i
        window.onkeydown = event => {
            if (event.code === 'F12') {
                return event.preventDefault()
            }
            if (event.code === 'KeyI' && event.ctrlKey && event.shiftKey) {
                return event.preventDefault()
            }
        }
    }, [])

    return (
        <ReadonlyPage>
            {isShow && (
                <>
                    <Header setVisible={setMsgDrawerVisible} handleSubmit={() => {
                        cutCountRef.current = 0
                    }} />
                    <Watermark content={watermarkContent} className={styles.watermark_content}>
                        <MsgDrawer
                            visible={MsgDrawerVisible}
                            setVisible={setMsgDrawerVisible}
                            msgList={msgList}
                        />

                        <div className={styles.page_paper}>
                            <Questions />
                        </div>
                    </Watermark>
                    {cutCount > 0 ? (
                        <CustomAlert
                            open={openAlert}
                            cutCount={cutCount}
                            cutAutoWindingNum={cutAutoWindingNum!}
                            onClose={() => setOpenAlert(false)}
                        />
                    ) : null}
                </>
            )}
        </ReadonlyPage>
    )
}

export default observer(Paper)
