import { useCallback, useEffect, useState } from 'react'
import { inject, useLocalObservable, Observer } from 'mobx-react'
import { history } from 'umi'
import { setCookie, setSessionStorage, getCookie, getLocalStorage } from '@/storage'
import styles from './index.module.less'
import { ENGINEER_LOGIN_IDENTITY, engineerLoginIdentityItems } from './const'
import { Button, Form, Input, Row, message } from 'antd'
import validateRule from '@/components/Global/ValidateRule'
import TCaptcha from '@/components/TCaptcha'
import { checkLoginIdentity } from './service'
import EngineerLoginHooks from './hooks'
import Footer from './components/Footer'
import type { PageProps } from '@/types'
import { useVideoIntersection } from './hooks/useVideoIntersection'
import { findSiteData } from '@wotu/wotu-components'

const Engineer = (props: PageProps) => {
    const { userStore, siteStore } = props || {}
    const [loginForm] = Form.useForm()
    const [loginIdentity, setLoginIdentity] = useState<ENGINEER_LOGIN_IDENTITY>(
        ENGINEER_LOGIN_IDENTITY.student,
    )
    const hooks = useLocalObservable(() => new EngineerLoginHooks())
    let { siteData } = siteStore!
    const siteAlias = findSiteData(siteData, 'alias', { findKey: 'baseInfo' }) || ''

    const video1 = useVideoIntersection()
    const video2 = useVideoIntersection()
    const video3 = useVideoIntersection()

    // 检查是否已登录，如果已登录则重定向到工作台
    useEffect(() => {
        const userToken = getCookie('TOKEN')
        if (userToken) {
            history.replace('/account')
            return
        }
    }, [])

    useEffect(() => {
        document.title = '登录-工学一体'
        hooks.bindForm(loginForm)
    }, [])

    useEffect(() => {
        if (siteStore?.siteData) {
            hooks.mapConfigList(siteStore.siteData)
        }
    }, [siteStore?.siteData])

    const handleLoginIdentityChange = useCallback((key: ENGINEER_LOGIN_IDENTITY) => {
        setLoginIdentity(key)
        hooks.setLoginIdentity(key)
    }, [])

    const handleLogin = useCallback(
        async (values: any) => {
            if (hooks.loginTypes === 1) {
                const isRegister = await checkLoginIdentity({
                    account: values.account,
                    identity: loginIdentity,
                    sid: getLocalStorage('SID'),
                    setDefaultIdentity: true,
                })

                if (!isRegister) {
                    message.error('该账号未注册，请联系管理员')
                    return
                }
            }

            setCookie('SELECT_IDENTITY_CODE', loginIdentity)
            hooks.loginHandler(values, siteStore!, userStore!, loginForm)
        },
        [loginIdentity, hooks, userStore, siteStore, loginForm],
    )

    /**
     * 微信/钉钉扫码登录跳转
     */
    const goToQRcode = useCallback(
        (_type: string) => {
            setSessionStorage('AUTH_USER_TYPE', hooks.tabIndex)
            history.push(`/user/qrcode?type=${_type}`)
        },
        [hooks.tabIndex],
    )

    if (siteAlias !== 'engineer') {
        history.replace('/user/login')
        return null
    }

    return (
        <div className={styles.engineer}>
            <header>
                <div className={styles.header_top}>
                    <img
                        src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/logo%402x.png"
                        alt="logo"
                    />
                </div>

                <div className={styles.header_wrapper}>
                    <div className={styles.header_slogan}>
                        <div className={styles.slogan_title}>
                            <span>重构工学一体化</span>
                            <span>教育全流程</span>
                        </div>

                        <div className={styles.slogan_desc}>
                            工学一体化智慧教学管理服务平台，以AI、VR/AR、区块链等技术为支撑，打通“教、学、评、管”全环节
                        </div>
                    </div>

                    <div className={styles.header_login}>
                        <div className={styles.login_tabs}>
                            {engineerLoginIdentityItems.map(item => (
                                <div
                                    className={`${styles.login_tab_item} ${
                                        loginIdentity === item.key ? ` ${styles.active}` : ''
                                    }`}
                                    key={item.key}
                                    onClick={() => handleLoginIdentityChange(item.key)}
                                >
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <Observer>
                            {() => (
                                <Form
                                    className={styles.login_form}
                                    form={loginForm}
                                    validateTrigger={'onBlur'}
                                    size="large"
                                    name="normal_login"
                                    initialValues={{ remember: true }}
                                    onFinish={handleLogin}
                                >
                                    {hooks.loginTypes === 1 ? (
                                        // 密码登录
                                        <>
                                            <Form.Item
                                                name="account"
                                                rules={[
                                                    { required: true, message: '请输入手机号' },
                                                ]}
                                            >
                                                <Input
                                                    className={styles.input}
                                                    placeholder="请输入手机号"
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="password"
                                                rules={[{ required: true, message: '请输入密码' }]}
                                            >
                                                <Input.Password
                                                    className={styles.input}
                                                    type="password"
                                                    placeholder="请输入密码"
                                                />
                                            </Form.Item>
                                        </>
                                    ) : (
                                        // 验证码登录
                                        <>
                                            <Form.Item
                                                name="account"
                                                rules={[
                                                    validateRule({
                                                        rule: 'MOBILE',
                                                        message: '手机号格式错误',
                                                        noEmpty: true,
                                                        noEmptyMessage: '请输入手机号',
                                                    }),
                                                ]}
                                            >
                                                <Input
                                                    className={styles.input}
                                                    placeholder="请输入手机号"
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="verifyCode"
                                                rules={[
                                                    { required: true, message: '请输入验证码' },
                                                ]}
                                            >
                                                <Row>
                                                    <Input
                                                        className={styles.code}
                                                        placeholder="请输入验证码"
                                                    />
                                                    <TCaptcha
                                                        depend={{ form: loginForm, key: 'account' }}
                                                        serverVerify={hooks.serverVerify}
                                                    >
                                                        <Button
                                                            disabled={
                                                                hooks.codeBtnStr !== '发送验证码'
                                                            }
                                                            className={styles.code_btn}
                                                            onClick={hooks.getCode}
                                                        >
                                                            {hooks.codeBtnStr}
                                                        </Button>
                                                    </TCaptcha>
                                                </Row>
                                            </Form.Item>
                                        </>
                                    )}

                                    <Form.Item noStyle>
                                        <div className={styles.login_operation}>
                                            <div
                                                onClick={() =>
                                                    hooks.setLoginType(
                                                        hooks.loginTypes === 1 ? 2 : 1,
                                                    )
                                                }
                                            >
                                                {hooks.loginTypes === 1
                                                    ? '切换短信登录'
                                                    : '切换账号登录'}
                                            </div>
                                            {hooks.loginTypes === 1 && (
                                                <a
                                                    className={styles.forget_btn}
                                                    href="/account/user/forget"
                                                >
                                                    忘记密码？
                                                </a>
                                            )}
                                        </div>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className={styles.login_btn}
                                        >
                                            登录
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )}
                        </Observer>

                        <Observer>
                            {() => {
                                const showWxLogin =
                                    hooks.personList.includes('login_personal_method5')

                                if (!showWxLogin) {
                                    return null
                                }

                                return (
                                    <div className={styles.login_footer}>
                                        <span>其他登录方式</span>
                                        <svg
                                            aria-hidden="true"
                                            className="icon"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => goToQRcode('wx')}
                                        >
                                            <use xlinkHref={`#icon_wechat`} />
                                        </svg>
                                    </div>
                                )
                            }}
                        </Observer>
                    </div>
                </div>
            </header>

            <main>
                <div className={styles.main_item}>
                    <div className={styles.main_item_bar}>
                        <div className={styles.main_item_bar_title}>
                            <img
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_zuo@2x.png"
                                alt=""
                                style={{ width: '32px', height: '32px' }}
                            />
                            <span>教研赋能</span>
                            <img
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/ic_you@2x.png"
                                alt=""
                                style={{ width: '32px', height: '32px' }}
                            />
                        </div>
                        <div className={styles.main_item_bar_desc}>
                            让教学文件“会生成、能联动、贴产业”
                        </div>
                    </div>
                    <div className={styles.enabling_content}>
                        <div
                            className={styles.enabling_content_item}
                            style={{ gap: '78px', justifyContent: 'flex-start' }}
                        >
                            <video
                                ref={video1.videoRef}
                                className={styles.item_video}
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/banner_video_1.mp4"
                                muted
                            />
                            <div className={styles.item_content}>
                                <div className={styles.item_content_title}>
                                    <span>智能生成</span>
                                    <span>，12份文件一键搞定</span>
                                </div>
                                <div className={styles.item_content_desc}>
                                    <p>输入课程名称与校本转化要求</p>
                                    <p>AI自动生成12份工学一体化课堂标准体例</p>
                                    <p>传统3周工作量缩短至1小时</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.enabling_content_item}>
                            <div className={styles.item_content}>
                                <div className={styles.item_content_title}>
                                    <span>联动更新</span>
                                    <span>，改一处同步全文档</span>
                                </div>
                                <div className={styles.item_content_desc}>
                                    <p>修改《学习任务工作页》任一项描述</p>
                                    <p>《考核方案》等关联文件自动同步更新</p>
                                    <p>杜绝重复劳动，确保内容高度一致</p>
                                </div>
                            </div>
                            <video
                                ref={video2.videoRef}
                                className={styles.item_video}
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/banner_video_2.mp4"
                                muted
                            />
                        </div>
                        <div
                            className={styles.enabling_content_item}
                            style={{ gap: '78px', justifyContent: 'flex-start' }}
                        >
                            <video
                                ref={video3.videoRef}
                                className={styles.item_video}
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/banner_video_3.mp4"
                                muted
                            />
                            <div className={styles.item_content}>
                                <div className={styles.item_content_title}>
                                    <span>校本定制</span>
                                    <span>，融入区域产业特色</span>
                                </div>
                                <div className={styles.item_content_desc}>
                                    <p>输入“绿色能源”“数字经济”等关键词</p>
                                    <p>AI自动替换通用案例</p>
                                    <p>生成差异分析报告</p>
                                    <p>让教学内容深度匹配区域产业（如地方链主企</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.main_item} ${styles.pbl_wrapper}`}>
                    <div className={styles.main_item_bar}>
                        <div className={styles.main_item_bar_title} style={{ color: '#fff' }}>
                            <img
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/ic_zuo_w@2x.png"
                                alt=""
                                style={{ width: '32px', height: '32px' }}
                            />
                            <span>PBL项目式学习</span>
                            <img
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/ic_you_w@2x.png"
                                alt=""
                                style={{ width: '32px', height: '32px' }}
                            />
                        </div>
                        <div
                            className={styles.main_item_bar_desc}
                            style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                        >
                            围绕真实项目，注重理论与实践结合
                        </div>
                    </div>
                    <div className={styles.pbl_content}>
                        <div className={styles.pbl_content_item}>
                            <div className={styles.item_left}>
                                <div className={styles.item_left_title}>学习进度一目了然</div>
                                <div className={styles.item_left_desc}>
                                    学生可以在学习路径和任务清单中清晰看到自己的学习进度、完成情况以及下一步学习任务，随时掌握学习节奏，不掉队。
                                </div>
                            </div>
                            <div className={styles.item_right}>
                                <img
                                    src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_xiangmu1@2x.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className={styles.pbl_content_item}>
                            <div className={styles.item_left}>
                                <div className={styles.item_left_title}>AI助教实时互动支持</div>
                                <div className={styles.item_left_desc}>
                                    无论是在课堂活动、成果制作还是课后作业中，AI助教都能提供名词解析、思路启发、内容润色与个性化建议，让学习更高效、更有方向感。
                                </div>
                            </div>
                            <div className={styles.item_right}>
                                <img
                                    src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_xiangmu2@2x.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className={styles.pbl_content_item}>
                            <div className={styles.item_left}>
                                <div className={styles.item_left_title}>多维度激励机制</div>
                                <div className={styles.item_left_desc}>
                                    结合学习成果上传、课后作业完成、课堂测验表现等指标，生成排行榜、成就徽章与学习积分，持续激发学生的参与热情与竞争意识。
                                </div>
                            </div>
                            <div className={styles.item_right}>
                                <img
                                    src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_xiangmu3@2x.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className={styles.pbl_content_item}>
                            <div className={styles.item_left}>
                                <div className={styles.item_left_title}>自我提升看得见</div>
                                <div className={styles.item_left_desc}>
                                    系统会自动整理学生的学习记录、成果和作业表现，生成个人成长小结，让学生清楚看到自己的进步与提升空间。
                                </div>
                            </div>
                            <div className={styles.item_right}>
                                <img
                                    src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_xiangmu4@2x.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.main_item} ${styles.assistant_wrapper}`}>
                    <div className={styles.main_item_bar}>
                        <div className={styles.main_item_bar_title}>
                            <img
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_zuo@2x.png"
                                alt=""
                                style={{ width: '32px', height: '32px' }}
                            />
                            <span>教辅升级</span>
                            <img
                                src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/ic_you@2x.png"
                                alt=""
                                style={{ width: '32px', height: '32px' }}
                            />
                        </div>
                        <div className={styles.main_item_bar_desc}>
                            让教学过程更精准、更高效、更有成效
                        </div>
                    </div>
                    <div className={styles.assistant_content}>
                        <div className={styles.content_data}>
                            <div className={styles.assistant_content_title}>
                                全程可追踪的教学数据
                            </div>
                            <div className={styles.assistant_content_desc}>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_1@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            学习进度自动跟踪
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            实时记录学生课堂测验、学习成果、课后作业的提交情况，方便教师随时掌握学习节奏。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_2@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            学习成果全面监控
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            自动统计课后作业、课堂测验和学习成果的提交率与合格率，方便教师分析学生的学习质量。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_3@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            学习动态智能提醒
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            对学习滞后或未完成关键任务的学生进行系统提示，方便教师及时干预与指导。
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.content_analysis}>
                            <div className={styles.assistant_content_title}>
                                深入可视化的学情分析
                            </div>
                            <div className={styles.assistant_content_desc}>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_4@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            知识点掌握度诊断
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            系统融合学习数据，自动生成知识点掌握度评分并图表呈现，助力教师精准锁定难点。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_5@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            学习行为轨迹追踪
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            记录学生登录频率、学习时长、资源访问等数据，生成学习行为轨迹图，帮助判断学习状态趋势。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_6@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            班级与个体对比分析
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            支持学生与班级平均及团队对比，快速发现差距和群体特征，助力分层教学和个性化辅导。
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.content_quality}>
                            <div className={styles.assistant_content_title}>AI赋能提升教学质量</div>
                            <div className={styles.assistant_content_desc}>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_7@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            AI自动成果点评
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            AI自动分析学生作业和测验，精准生成个性化点评，节省批改时间，提升教学效率。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_8@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            教学策略智能辅助
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            基于学生学习、考核数据，智能分析学习状况，辅助教师制定针对性的教学策略，提升教学质量。
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.assistant_content_desc_item}>
                                    <div className={styles.assistant_content_desc_item_left}>
                                        <img
                                            src="https://static.zpimg.cn/public/fe_user_pc/images/engineer/icon_9@2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={styles.assistant_content_desc_item_right}>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_title
                                            }
                                        >
                                            教学数据综合分析
                                        </div>
                                        <div
                                            className={
                                                styles.assistant_content_desc_item_right_desc
                                            }
                                        >
                                            汇总系统数据，深入挖掘学生表现趋势，帮助教师及时发现教学中的问题，优化教学方法。
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default inject('siteStore', 'userStore')(Engineer)
