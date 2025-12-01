import React, { useCallback, useEffect, useState } from 'react'
import DashboardLayout from './components/DashboardLayout'
import ImageContainer from './components/ImageContainer'
import styles from './index.module.less'
import { getDashboardData } from './service'
import type { StatisticsDashboard } from './types'
import CoverNameCombine from '@/components/CoverNameCombine'
import { TRAIN_LEVEL_MAP } from '../../class/class/const'
import MajorScaleChart from './components/MajorScaleChart'
import ContentCard from './components/ContentCard'
import MajorRateChart from './components/MajorRateChart'
import DesignProgressChart from './components/DesignProgressChart'
import MajorDistributionChart from './components/MajorDistributionChart'
import LevelDistributionChart from './components/LevelDistributionChart'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC = () => {
    useSaasTitle('数据驾驶舱')
    const [dashboardData, setDashboardData] = useState<StatisticsDashboard | null>(null)
    const [_loading, setLoading] = useState<boolean>(false)

    const loadDashboardData = useCallback(async () => {
        setLoading(true)
        try {
            const res = await getDashboardData()
            setDashboardData(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadDashboardData()
    }, [loadDashboardData])

    // const createCourseNumLength =
    //     Math.max(
    //         ...(dashboardData?.courseContributionRank?.map(item => item.createCourseNum) || [1]),
    //     ).toString().length || 1
    // const joinCourseNumLength =
    //     Math.max(
    //         ...(dashboardData?.courseContributionRank?.map(item => item.joinCourseNum) || [1]),
    //     ).toString().length || 1

    return (
        <DashboardLayout
            containerClassName={styles.dashboard_layout_container}
            className={styles.dashboard_layout}
            backgroundImage="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg@2x.png"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <ImageContainer
                width={'100%'}
                height={90}
                image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/title@2x.png"
                backgroundSize="100% 216px"
                backgroundPosition="top"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 14,
                    paddingBottom: 24,
                }}
            >
                <span
                    style={{
                        // fontFamily: 'YouSheBiaoTiHei',
                        fontSize: 40,
                        color: '#FFFFFF',
                        height: '52px',
                        lineHeight: '52px',
                        textShadow: '0px 0px 8px #2876FF',
                        textAlign: 'left',
                        fontStyle: 'normal',
                    }}
                >
                    工学一体数据驾驶舱
                </span>
            </ImageContainer>

            <ImageContainer
                width={998}
                height={52}
                image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_icon_di@2x.png"
                style={{
                    position: 'absolute',
                    top: 172,
                    left: 461,
                }}
            />

            <div className={styles.dashboard_content}>
                <div className={styles.dashboard_content_column}>
                    <div className={styles.dashboard_content_column_item}>
                        <ImageContainer
                            width={186}
                            height={94}
                            image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_zong_l@2x.png"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    color: '#FFFFFF',
                                    lineHeight: '24px',
                                    height: '24px',
                                    opacity: 0.85,
                                }}
                            >
                                设计中
                            </span>
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <span
                                    style={{
                                        fontSize: 32,
                                        color: '#FFFFFF',
                                        lineHeight: '32px',
                                        height: '32px',
                                        background:
                                            'linear-gradient(to bottom, #FFFFFF 0%, #68F1FF 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {dashboardData?.courseNum?.designCourseNum || 0}
                                </span>
                                <span
                                    style={{
                                        fontWeight: 400,
                                        fontSize: 16,
                                        color: '#FFFFFF',
                                        lineHeight: '24px',
                                        height: '24px',
                                        opacity: 0.65,
                                    }}
                                >
                                    门
                                </span>
                            </div>
                        </ImageContainer>
                        <ImageContainer
                            width={130}
                            height={130}
                            image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_zong_circle@2x.png"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 40,
                                        color: '#FFFFFF',
                                        lineHeight: '40px',
                                        height: '40px',
                                        background:
                                            'linear-gradient(to bottom, #FFFFFF 0%, #FFB93A 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {dashboardData?.courseNum?.courseNum || 0}
                                </span>
                                <span
                                    style={{
                                        fontWeight: 400,
                                        fontSize: 16,
                                        color: '#FFBE49',
                                        lineHeight: '24px',
                                        height: '24px',
                                    }}
                                >
                                    门
                                </span>
                            </div>
                            <span
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    color: '#FFFFFF',
                                    lineHeight: '24px',
                                    height: '24px',
                                }}
                            >
                                课程总数
                            </span>
                        </ImageContainer>
                        <ImageContainer
                            width={186}
                            height={94}
                            image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_zong_r@2x.png"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    color: '#FFFFFF',
                                    lineHeight: '24px',
                                    height: '24px',
                                    opacity: 0.85,
                                }}
                            >
                                使用中
                            </span>
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <span
                                    style={{
                                        fontSize: 32,
                                        color: '#FFFFFF',
                                        lineHeight: '32px',
                                        height: '32px',
                                        background:
                                            'linear-gradient(to bottom, #FFFFFF 0%, #68F1FF 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {dashboardData?.courseNum?.useCourseNum || 0}
                                </span>
                                <span
                                    style={{
                                        fontWeight: 400,
                                        fontSize: 16,
                                        color: '#FFFFFF',
                                        lineHeight: '24px',
                                        height: '24px',
                                        opacity: 0.65,
                                    }}
                                >
                                    门
                                </span>
                            </div>
                        </ImageContainer>
                    </div>
                    <div className={styles.dashboard_content_column_item}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <ImageContainer
                                width={508}
                                height={51}
                                image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_title_short@2x.png"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    paddingLeft: 16,
                                }}
                            >
                                <ImageContainer
                                    width={25}
                                    height={24}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jiantou@2x.png"
                                    style={{ marginBottom: 8 }}
                                />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        color: '#FFFFFF',
                                        lineHeight: '24px',
                                        letterSpacing: '1px',
                                        marginBottom: 8,
                                    }}
                                >
                                    课程设计进度
                                </span>
                            </ImageContainer>
                            <ContentCard width={508} height={160} padding="16px 16px 12px 16px">
                                <DesignProgressChart data={dashboardData?.courseDesignProgress} />
                            </ContentCard>
                        </div>
                    </div>
                    <div className={styles.dashboard_content_column_item}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <ImageContainer
                                width={508}
                                height={51}
                                image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_title_short@2x.png"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    paddingLeft: 16,
                                }}
                            >
                                <ImageContainer
                                    width={25}
                                    height={24}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jiantou@2x.png"
                                    style={{ marginBottom: 8 }}
                                />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        color: '#FFFFFF',
                                        lineHeight: '24px',
                                        letterSpacing: '1px',
                                        marginBottom: 8,
                                    }}
                                >
                                    课程专业分布
                                </span>
                            </ImageContainer>
                            <ContentCard width={508} height={212} padding="16px">
                                <MajorDistributionChart
                                    data={dashboardData?.courseMajorDistribution}
                                />
                            </ContentCard>
                        </div>
                    </div>
                    <div className={styles.dashboard_content_column_item}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <ImageContainer
                                width={508}
                                height={51}
                                image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_title_short@2x.png"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    paddingLeft: 16,
                                }}
                            >
                                <ImageContainer
                                    width={25}
                                    height={24}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jiantou@2x.png"
                                    style={{ marginBottom: 8 }}
                                />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        color: '#FFFFFF',
                                        lineHeight: '24px',
                                        letterSpacing: '1px',
                                        marginBottom: 8,
                                    }}
                                >
                                    课程层级分布
                                </span>
                            </ImageContainer>
                            <LevelDistributionChart data={dashboardData?.courseLevelDistribution} />
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    <div className={styles.dashboard_content_column_item} style={{ marginTop: 18 }}>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <div style={{ width: 190, display: 'flex', alignItems: 'center' }}>
                                <ImageContainer
                                    width={84}
                                    height={84}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_zhuanye@2x.png"
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 4,
                                        marginLeft: 8,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 400,
                                            fontSize: 16,
                                            color: '#FFFFFF',
                                            lineHeight: '24px',
                                            height: '24px',
                                        }}
                                    >
                                        专业(个)
                                    </span>
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 32,
                                            color: '#FFFFFF',
                                            lineHeight: '32px',
                                            height: '32px',
                                            textAlign: 'left',
                                            fontStyle: 'normal',
                                            background:
                                                'linear-gradient(to bottom, #FFFFFF 0%, #FFB93A 100%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {dashboardData?.classAndStudentAndTeacherNum?.majorNum || 0}
                                    </span>
                                </div>
                            </div>
                            <div style={{ width: 190, display: 'flex', alignItems: 'center' }}>
                                <ImageContainer
                                    width={84}
                                    height={84}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_banji@2x.png"
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 4,
                                        marginLeft: 8,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 400,
                                            fontSize: 16,
                                            color: '#FFFFFF',
                                            lineHeight: '24px',
                                            height: '24px',
                                        }}
                                    >
                                        班级(个)
                                    </span>
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 32,
                                            color: '#FFFFFF',
                                            lineHeight: '32px',
                                            height: '32px',
                                            textAlign: 'left',
                                            fontStyle: 'normal',
                                            background:
                                                'linear-gradient(to bottom, #FFFFFF 0%, #FFB93A 100%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {dashboardData?.classAndStudentAndTeacherNum?.classNum || 0}
                                    </span>
                                </div>
                            </div>
                            <div style={{ width: 190, display: 'flex', alignItems: 'center' }}>
                                <ImageContainer
                                    width={84}
                                    height={84}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_xuesheng@2x.png"
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 4,
                                        marginLeft: 8,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 400,
                                            fontSize: 16,
                                            color: '#FFFFFF',
                                            lineHeight: '24px',
                                            height: '24px',
                                        }}
                                    >
                                        学生(个)
                                    </span>
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 32,
                                            color: '#FFFFFF',
                                            lineHeight: '32px',
                                            height: '32px',
                                            textAlign: 'left',
                                            fontStyle: 'normal',
                                            background:
                                                'linear-gradient(to bottom, #FFFFFF 0%, #FFB93A 100%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {dashboardData?.classAndStudentAndTeacherNum?.studentNum ||
                                            0}
                                    </span>
                                </div>
                            </div>
                            <div style={{ width: 190, display: 'flex', alignItems: 'center' }}>
                                <ImageContainer
                                    width={84}
                                    height={84}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jiaoshi@2x.png"
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 4,
                                        marginLeft: 8,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 400,
                                            fontSize: 16,
                                            color: '#FFFFFF',
                                            lineHeight: '24px',
                                            height: '24px',
                                        }}
                                    >
                                        教师(个)
                                    </span>
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 32,
                                            color: '#FFFFFF',
                                            lineHeight: '32px',
                                            height: '32px',
                                            textAlign: 'left',
                                            fontStyle: 'normal',
                                            background:
                                                'linear-gradient(to bottom, #FFFFFF 0%, #FFB93A 100%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {dashboardData?.classAndStudentAndTeacherNum?.teacherNum ||
                                            0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dashboard_content_column}>
                        <div className={styles.dashboard_content_column_item}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <ImageContainer
                                    width={808}
                                    height={51}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_title_long@2x.png"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        paddingLeft: 16,
                                    }}
                                >
                                    <ImageContainer
                                        width={25}
                                        height={24}
                                        image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jiantou@2x.png"
                                        style={{ marginBottom: 8 }}
                                    />
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                            color: '#FFFFFF',
                                            lineHeight: '24px',
                                            letterSpacing: '1px',
                                            marginBottom: 8,
                                        }}
                                    >
                                        专业规模
                                    </span>
                                </ImageContainer>

                                <ContentCard width={808} height={327} padding="16px">
                                    <MajorScaleChart data={dashboardData?.majorScale} />
                                </ContentCard>
                            </div>
                        </div>
                        <div className={styles.dashboard_content_column_item}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <ImageContainer
                                    width={808}
                                    height={51}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_title_long@2x.png"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        paddingLeft: 16,
                                    }}
                                >
                                    <ImageContainer
                                        width={25}
                                        height={24}
                                        image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jiantou@2x.png"
                                        style={{ marginBottom: 8 }}
                                    />
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                            color: '#FFFFFF',
                                            lineHeight: '24px',
                                            letterSpacing: '1px',
                                            marginBottom: 8,
                                        }}
                                    >
                                        专业合格率
                                    </span>
                                </ImageContainer>
                                <ContentCard width={808} height={327} padding="16px">
                                    <MajorRateChart data={dashboardData?.majorQualificationRate} />
                                </ContentCard>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.dashboard_content_column}>
                    <div className={styles.dashboard_content_column_item}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                            }}
                        >
                            <ImageContainer
                                width={508}
                                height={51}
                                image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_title_short@2x.png"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    paddingLeft: 16,
                                }}
                            >
                                <ImageContainer
                                    width={25}
                                    height={24}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jiantou@2x.png"
                                    style={{ marginBottom: 8 }}
                                />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        color: '#FFFFFF',
                                        lineHeight: '24px',
                                        letterSpacing: '1px',
                                        marginBottom: 8,
                                    }}
                                >
                                    课程建设贡献榜
                                </span>
                            </ImageContainer>
                            <ContentCard
                                padding="24px 16px"
                                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                                width={508}
                                height={292}
                            >
                                {(dashboardData?.courseContributionRank || []).map(
                                    (item, index) => {
                                        return (
                                            <div
                                                key={item.name}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    gap: 16,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {index < 3 ? (
                                                        <ImageContainer
                                                            width={32}
                                                            height={32}
                                                            image={`https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jinpai_${
                                                                index + 1
                                                            }.png`}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: 22,
                                                                height: 22,
                                                                margin: 5,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                background: '#0F376A',
                                                                border: '1px solid #4EAAE3',
                                                                borderRadius: '50%',
                                                                overflow: 'hidden',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    fontWeight: 400,
                                                                    fontSize: '16px',
                                                                    color: '#FFFFFF',
                                                                    lineHeight: '22px',
                                                                }}
                                                            >
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <img
                                                        src={item.avatar || defaultAvatar}
                                                        style={{
                                                            border: '1px solid #FFFFFF',
                                                            opacity: 0.8,
                                                            width: 36,
                                                            height: 36,
                                                            marginLeft: 8,
                                                            borderRadius: '50%',
                                                            userSelect: 'none',
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            marginLeft: 12,
                                                            fontWeight: 400,
                                                            fontSize: 18,
                                                            color: '#FFFFFF',
                                                            lineHeight: '26px',
                                                            height: '26px',
                                                        }}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: 400,
                                                            fontSize: 16,
                                                            color: '#FFFFFF',
                                                            lineHeight: '24px',
                                                            height: '24px',
                                                            opacity: 0.65,
                                                        }}
                                                    >
                                                        创建课程
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: 24,
                                                            color: '#FFFFFF',
                                                            lineHeight: '24px',
                                                            height: '24px',
                                                            textAlign: 'right',
                                                            fontStyle: 'normal',
                                                            background:
                                                                'linear-gradient(to bottom, #FFFFFF 0%, #68F1FF 100%)',
                                                            backgroundClip: 'text',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            marginLeft: 4,
                                                        }}
                                                    >
                                                        {item.createCourseNum}
                                                    </span>
                                                    <span
                                                        style={{
                                                            display: 'block',
                                                            width: 1,
                                                            height: 12,
                                                            background: '#FFFFFF',
                                                            borderRadius: '1px',
                                                            opacity: 0.6,
                                                            marginLeft: 12,
                                                            marginRight: 12,
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            fontWeight: 400,
                                                            fontSize: 16,
                                                            color: '#FFFFFF',
                                                            lineHeight: '24px',
                                                            height: '24px',
                                                            opacity: 0.65,
                                                        }}
                                                    >
                                                        参与课程
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: 24,
                                                            color: '#FFFFFF',
                                                            lineHeight: '24px',
                                                            height: '24px',
                                                            textAlign: 'right',
                                                            fontStyle: 'normal',
                                                            background:
                                                                'linear-gradient(to bottom, #FFFFFF 0%, #68F1FF 100%)',
                                                            backgroundClip: 'text',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            marginLeft: 4,
                                                        }}
                                                    >
                                                        {item.joinCourseNum}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    },
                                )}
                            </ContentCard>
                        </div>
                    </div>
                    <div className={styles.dashboard_content_column_item}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                            }}
                        >
                            <ImageContainer
                                width={508}
                                height={51}
                                image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_title_short@2x.png"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    paddingLeft: 16,
                                }}
                            >
                                <ImageContainer
                                    width={25}
                                    height={24}
                                    image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jiantou@2x.png"
                                    style={{ marginBottom: 8 }}
                                />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        color: '#FFFFFF',
                                        lineHeight: '24px',
                                        letterSpacing: '1px',
                                        marginBottom: 8,
                                    }}
                                >
                                    课程学习人数榜
                                </span>
                            </ImageContainer>
                            <ContentCard
                                padding="24px 16px"
                                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                                width={508}
                                height={504}
                            >
                                {(dashboardData?.courseLearningNumRank || []).map((item, index) => {
                                    return (
                                        <div
                                            key={item.courseName}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            <div style={{ position: 'relative' }}>
                                                <div
                                                    style={{
                                                        border: '1px solid #FFFFFF',
                                                        borderRadius: 4,
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <CoverNameCombine
                                                        width={128}
                                                        coverUrl={item.courseCover}
                                                        name={item.courseName}
                                                        style={{ opacity: 0.8 }}
                                                    />
                                                </div>
                                                {index < 3 && (
                                                    <ImageContainer
                                                        width={32}
                                                        height={32}
                                                        image={`https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/icon_jinpai_${
                                                            index + 1
                                                        }.png`}
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    marginLeft: 12,
                                                    height: 64,
                                                    width: 212,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: 500,
                                                        fontSize: '18px',
                                                        color: '#FFFFFF',
                                                        lineHeight: '26px',
                                                        height: '26px',
                                                    }}
                                                >
                                                    {item.courseName}
                                                </span>

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: 400,
                                                            fontSize: '14px',
                                                            color: '#FFFFFF',
                                                            lineHeight: '22px',
                                                            opacity: 0.65,
                                                        }}
                                                    >
                                                        {item.majorName}
                                                    </span>
                                                    <span
                                                        style={{
                                                            width: 3,
                                                            height: 3,
                                                            background: '#FFFFFF',
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            fontWeight: 400,
                                                            fontSize: '14px',
                                                            color: '#FFFFFF',
                                                            lineHeight: '22px',
                                                            opacity: 0.65,
                                                        }}
                                                    >
                                                        {item.trainLevel
                                                            ? TRAIN_LEVEL_MAP[item.trainLevel]
                                                            : ''}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginLeft: 16,
                                                    flex: 1,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: '1px',
                                                        height: '40px',
                                                        background: '#194A89',
                                                        borderRadius: '1px',
                                                    }}
                                                />
                                                <div style={{ flex: 1, textAlign: 'right' }}>
                                                    <span
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '24px',
                                                            color: '#FFFFFF',
                                                            lineHeight: '24px',
                                                            textAlign: 'center',
                                                            fontStyle: 'normal',
                                                            background:
                                                                'linear-gradient(to bottom, #FFFFFF 0%, #68F1FF 100%)',
                                                            backgroundClip: 'text',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                        }}
                                                    >
                                                        {item.learningNum}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontWeight: 400,
                                                            fontSize: '14px',
                                                            color: '#FFFFFF',
                                                            lineHeight: '22px',
                                                            opacity: 0.65,
                                                            marginLeft: 2,
                                                        }}
                                                    >
                                                        人学习
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </ContentCard>
                        </div>
                    </div>
                </div>
            </div>

            <ImageContainer
                width={'100%'}
                height={50}
                image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/bg_bottom@2x.png"
            />
        </DashboardLayout>
    )
}

export default Index
