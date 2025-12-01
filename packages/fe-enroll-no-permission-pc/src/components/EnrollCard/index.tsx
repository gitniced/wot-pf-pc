import React from 'react'
import Cover from '../Cover'
import { imgList, statusText } from '../Cover/const'
import { judegTimeInDay, setRedColor, TimeTips, ACTIVITY_STATUS } from './const'
import './index.module.less'

export default function Enrollcard({ data, forceUpdate, onClick }: any) {
    const {
        siteName,
        cover,
        name,
        applyStartTime,
        applyEndTime,
        status,
        quota,
        appliedNum,
        courseName,
        categoryName,
        entryCode,
        organizationLogo,
        organizationName,
    } = data || {}
    const selectCover = imgList.filter(i => i.value === cover)?.[0]

    // 渲染剩余人数与报名时间
    const renderTips = () => {
        let content
        if (
            status === ACTIVITY_STATUS.REGISTERING &&
            quota! > 0 &&
            Number(quota) - Number(appliedNum) < 10
        ) {
            content = <>剩余名额{setRedColor(Number(quota) - Number(appliedNum))}</>
        }
        // 未开始且在四天之内 开始报名
        if (judegTimeInDay(applyStartTime!) && ACTIVITY_STATUS.NOT_START === status) {
            content = (
                <>
                    {content}
                    <TimeTips forceUpdate={forceUpdate} time={applyStartTime!} />
                </>
            )
        }

        // 一开始且在4四天之内 结束
        if (judegTimeInDay(applyEndTime!) && ACTIVITY_STATUS.REGISTERING === status) {
            content = (
                <>
                    {content ? <>{content},</> : ''}剩余时间
                    <TimeTips
                        label=""
                        forceUpdate={forceUpdate}
                        time={applyEndTime!}
                        showSecond={false}
                    />
                </>
            )
        }

        if (!content) return
        return <div className={'pt_enroll_card3__tips'}>{content}</div>
    }

    return (
        <div className="pt_enroll_card_3" onClick={onClick}>
            <div className="pt_enroll_card3__top">
                <Cover
                    cover={cover}
                    text={selectCover?.color ? name : ''}
                    color={selectCover?.color}
                />
                {renderTips()}
            </div>
            <div className="pt_enroll_card3__bottom">
                <div className="pt_enroll_card3__right">
                    <div className="pt_enroll_card3__name" title={name}>
                        {name}
                    </div>
                    <div className={`pt_enroll_card3__info`}>
                        <span
                            className={`pt_enroll_card3__status${
                                status === ACTIVITY_STATUS.REGISTERING ? ' status_2' : ''
                            }`}
                        >
                            {statusText[status]}
                        </span>
                        {entryCode === 'COURSE_APPLY'
                            ? courseName && (
                                  <span className={'pt_enroll_card3__course'}>{courseName}</span>
                              )
                            : categoryName?.[0] && (
                                  <span className={'pt_enroll_card3__cate'}>
                                      {categoryName?.[0]}
                                  </span>
                              )}
                    </div>
                </div>
                <div className="pt_enroll_card3__divider" />
                <div className="pt_enroll_card3__org">
                    <img
                        src={
                            organizationLogo ||
                            'https://static.zpimg.cn/public/fe_user_pc/images/default_org@2x.png'
                        }
                    />
                    <span>{organizationName || siteName}</span>
                </div>
            </div>
        </div>
    )
}
