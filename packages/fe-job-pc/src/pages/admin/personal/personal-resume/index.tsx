import { useEffect, useState, useRef } from 'react'
import Avatar from './components/Avatar'
import Wrapper from './components/Wrapper'
import styles from './index.module.less'
import { useLocalStore, observer } from 'mobx-react'
import InformationDirectory from './components/InformationDirectory'
import EducationExperience from './components/EducationExperience'
import InternExperience from './components/InternExperience'
import QualificationCertificate from './components/QualificationCertificate'
import Hobby from './components/Hobby'
import Societies from './components/AcademicSocieties'
import Experience from './components/Volunteer'
import AwardExperience from './components/AwardExperience'
import Social from './components/Soical'
import ImgListWorks from './components/ImgListWorks'
import WorkExperience from './components/WorkExperience'
import ProjectExperience from './components/ProjectExperience'
import CustomModule from './components/CustomModule'
import AttachmentResume from './views/AttachmentResume'
import PersonalResumeStore from './store'
import MakeResume from './views/MakeResume'
import { getSessionStorage } from '@/storage'
import classNames from 'classnames'
import VideoWork from './components/VideoWork'
import { getCookie } from '@wotu/wotu-components'
import OnlineResume from './components/OnlineResume'
import JoinTime from './components/JoinTime'
import IntendPosition from './components/IntendPosition'
import AIRate from './views/AIRate'

const Index = () => {
    const store = useLocalStore(() => new PersonalResumeStore())
    const [mode, setMode] = useState('baseInfo')
    const contentRef = useRef<HTMLDivElement>(null)

    const platform = getSessionStorage('PLATFORM')

    useEffect(() => {
        document.title = '我的简历'
        // 获取菜单配置
        store.getMenuConfig().then(() => {
            // 获取附件简历
            store.getAttachmentFileList()
            // 获取期望岗位列表
            store.getJobExpectList()
            // 获取简历信息
            store.resumeDetail()
        })

        store.education()
        store.queryDegress()
        store.queryPolitical()
    }, [])

    const handleScroll = (key: string) => {
        const currentDOM = document.querySelector(`#${key}`) as HTMLDivElement
        if (contentRef.current) {
            if (key === 'candidate') {
                return contentRef.current.scrollTo(0, currentDOM.offsetTop - 200)
            }
            contentRef.current.scrollTo(0, currentDOM.offsetTop - 100)
        }
    }

    const onCascaderChange = () => {}

    // 根据上级行业code查询行业
    const loadIndustryData = ([{ value }]: any) => {
        store.getIndustryList(value)
    }

    // 根据上级职业类型code查询职业类型
    const loadCapacityData = ([{ value }]: any) => {
        store.getTree(value)
    }

    // 根据上级地区code查询地区
    const loadCityData = ([{ value }]: any) => {
        store.queryCitys(value)
    }

    const {
        schoolExperienceList,
        scienceList,
        awardsList,
        workExperienceList,
        volunteer,
        advantage,
        language,
        social,
        skill,
        imgList,
        videoList,
        projectExperienceList,
        selfDefine,
    } = store.menuConfigObj

    if (mode === 'baseInfo') {
        return (
            <div
                className={classNames(styles.resume_page, {
                    [styles.isMiddle]: platform === 'middle',
                    [styles.isWorkbench]: platform === 'workbench',
                    /** 师资求职能力实训没有layout, 使用 iframe 嵌套 */
                    [styles.isNoLayout]: getCookie('ALIAS') === 'szqznlsx',
                })}
            >
                <div className={styles.resume_container}>
                    <InformationDirectory
                        menuActive={store.menuActive}
                        userMenuConfig={store.userMenuConfig}
                        saveMenuConfig={store.saveMenuConfig}
                        onScroll={handleScroll}
                    />
                    <div ref={contentRef} className={styles.content_middle}>
                        <div className={styles.content_middle_top}>
                            {/* 在线简历 */}
                            <OnlineResume
                                userJobIntention={store.userJobIntention}
                                saveJobExpect={store.saveJobExpect}
                                capacityTree={store.capacityTree}
                                loadCapacityData={loadCapacityData}
                                cityCascade={store.cityCascade}
                                loadCityData={loadCityData}
                                industryCascade={store.industryList}
                                loadIndustryData={loadIndustryData}
                                workArea={store.workArea}
                            />
                        </div>
                        <div className={styles.content_middle_bottom}>
                            <Avatar
                                cityCascade={store.cityCascade}
                                onCascaderChange={onCascaderChange}
                                loadCityData={loadCityData}
                                saveCandidateInfo={store.saveCandidateInfo}
                                politicalOption={store.politicalOption}
                                candidateInfo={store.candidateInfo}
                                experienceOption={store.experienceOption}
                                setResumeHasChanged={store.setResumeHasChanged}
                                id="candidate"
                            />
                            {advantage && (
                                <Wrapper title="个人优势" type="edit" id="advantage">
                                    <Experience
                                        type={2}
                                        userExperience={store.advantage}
                                        saveExperience={store.saveExperience}
                                        recall={store.getSessionCode}
                                        getAIChat={store.getAIChat}
                                        ws={store.ws}
                                        remoteFunc={() => store.getExperience(2)}
                                    />
                                </Wrapper>
                            )}
                            {/* 求职状态 */}
                            <Wrapper title="求职状态" isShow={false} id="jobTime">
                                <JoinTime
                                    joinTimeOption={store.joinTimeOption}
                                    candidateInfo={store.candidateInfo}
                                    saveJoinTime={store.saveJoinTime}
                                    saveJobExpect={store.saveJobExpect}
                                />
                            </Wrapper>
                            {/* 求职期望 */}
                            <Wrapper
                                title="求职期望"
                                isShow={store.userJobIntention.length < 3}
                                id="jobExpect"
                            >
                                <IntendPosition
                                    userJobIntention={store.userJobIntention}
                                    loadCityData={loadCityData}
                                    loadIndustryData={loadIndustryData}
                                    workArea={store.workArea}
                                    cityCascade={store.cityCascade}
                                    industryCascade={store.industryList}
                                    capacityTree={store.capacityTree}
                                    loadCapacityData={loadCapacityData}
                                    saveJobExpect={store.saveJobExpect}
                                    deleteJobExpect={store.deleteJobExpect}
                                />
                            </Wrapper>
                            <Wrapper
                                title="教育经历"
                                isShow={
                                    Array.isArray(store.userEducationList) &&
                                    store.userEducationList.length < 3
                                }
                                id="educationList"
                            >
                                <EducationExperience
                                    recall={store.getSessionCode}
                                    getAIChat={store.getAIChat}
                                    ws={store.ws}
                                    remoteFunc={store.specialityList}
                                    saveEducation={store.saveEducation}
                                    userEducationList={store.userEducationList}
                                    degressOption={store.degressOption}
                                    requestFunc={store.searchSpeciality}
                                    searchSpeciality={store.searchSpeciality}
                                    requestUniversityFunc={store.searchUniversity}
                                    searchUniversity={store.searchUniversity}
                                    deleteEducation={store.deleteEducation}
                                />
                            </Wrapper>
                            <Wrapper
                                title="实习经历"
                                isShow={
                                    Array.isArray(store.userPracticeList) &&
                                    store.userPracticeList.length < 3
                                }
                                id="practiceExperienceList"
                            >
                                <InternExperience
                                    capacityTree={store.capacityTree}
                                    loadCapacityData={loadCapacityData}
                                    getAIChat={store.getAIChat}
                                    recall={store.getSessionCode}
                                    ws={store.ws}
                                    capacityList={store.capacityList}
                                    industryCascade={store.industryList}
                                    loadIndustryData={loadIndustryData}
                                    userPracticeList={store.userPracticeList}
                                    savePracticeExperience={store.savePracticeExperience}
                                    deletePracticeExperience={store.deletePracticeExperience}
                                />
                            </Wrapper>
                            <Wrapper
                                title="资格证书"
                                isShow={
                                    !(
                                        Array.isArray(store.userCertificateList) &&
                                        store.userCertificateList.length > 0
                                    )
                                }
                                id="certificateList"
                            >
                                <QualificationCertificate
                                    saveCertificate={store.saveCertificate}
                                    userCertificateList={store.userCertificateList}
                                />
                            </Wrapper>

                            <Wrapper title="兴趣爱好" type="edit" id="hobbyList">
                                <Hobby
                                    userHobbyList={store.userHobbyList}
                                    saveHobby={store.saveHobby}
                                    recall={store.getSessionCode}
                                    getAIChat={store.getAIChat}
                                    remoteFunc={store.getHobby}
                                    ws={store.ws}
                                />
                            </Wrapper>
                            {schoolExperienceList && (
                                <Wrapper
                                    title="社团和组织经历"
                                    isShow={
                                        Array.isArray(store.userSchoolExperienceList) &&
                                        store.userSchoolExperienceList.length < 3
                                    }
                                    id="schoolExperienceList"
                                >
                                    <Societies
                                        recall={store.getSessionCode}
                                        getAIChat={store.getAIChat}
                                        ws={store.ws}
                                        type={1}
                                        saveAcademicSocieties={store.saveAcademicSocieties}
                                        userSchoolExperienceList={store.userSchoolExperienceList}
                                        deleteAcademicSocieties={store.deleteAcademicSocieties}
                                    />
                                </Wrapper>
                            )}
                            {scienceList && (
                                <Wrapper
                                    title="学术经历"
                                    isShow={
                                        Array.isArray(store.userScienceList) &&
                                        store.userScienceList.length < 3
                                    }
                                    id="scienceList"
                                >
                                    <Societies
                                        type={2}
                                        recall={store.getSessionCode}
                                        getAIChat={store.getAIChat}
                                        ws={store.ws}
                                        saveAcademicSocieties={store.saveAcademicSocieties}
                                        userSchoolExperienceList={store.userScienceList}
                                        deleteAcademicSocieties={store.deleteAcademicSocieties}
                                    />
                                </Wrapper>
                            )}
                            {awardsList && (
                                <Wrapper
                                    title="获奖经历"
                                    isShow={
                                        Array.isArray(store.userAwardList) &&
                                        store.userAwardList.length < 3
                                    }
                                    id="awardsList"
                                >
                                    <AwardExperience
                                        userAwardList={store.userAwardList}
                                        saveAwardExperience={store.saveAwardExperience}
                                        deleteAwardExperience={store.deleteAwardExperience}
                                    />
                                </Wrapper>
                            )}
                            {workExperienceList && (
                                <Wrapper
                                    title="工作经历"
                                    isShow={
                                        Array.isArray(store.userWorkExperienceList) &&
                                        store.userWorkExperienceList.length < 3
                                    }
                                    id="workExperienceList"
                                >
                                    <WorkExperience
                                        capacityList={store.capacityList}
                                        capacityTree={store.capacityTree}
                                        loadCapacityData={loadCapacityData}
                                        recall={store.getSessionCode}
                                        getAIChat={store.getAIChat}
                                        ws={store.ws}
                                        industryCascade={store.industryList}
                                        loadIndustryData={loadIndustryData}
                                        userWorkExperienceList={store.userWorkExperienceList}
                                        saveWorkExperience={store.saveWorkExperience}
                                        deleteWorkExperience={store.deleteWorkExperience}
                                    />
                                </Wrapper>
                            )}

                            {projectExperienceList && (
                                <Wrapper
                                    title="项目经历"
                                    isShow={
                                        Array.isArray(store.userProjectExperienceList) &&
                                        store.userProjectExperienceList.length < 3
                                    }
                                    id="projectExperienceList"
                                >
                                    <ProjectExperience
                                        recall={store.getSessionCode}
                                        getAIChat={store.getAIChat}
                                        ws={store.ws}
                                        industryCascade={store.industryList}
                                        loadIndustryData={loadIndustryData}
                                        userProjectExperienceList={store.userProjectExperienceList}
                                        saveProjectExperience={store.saveProjectExperience}
                                        deleteProjectExperience={store.deleteProjectExperience}
                                    />
                                </Wrapper>
                            )}

                            {volunteer && (
                                <Wrapper title="志愿者经历" type="edit" id="volunteer">
                                    <Experience
                                        type={1}
                                        userExperience={store.userVolunteer}
                                        saveExperience={store.saveExperience}
                                        recall={store.getSessionCode}
                                        getAIChat={store.getAIChat}
                                        remoteFunc={() => store.getExperience(1)}
                                        ws={store.ws}
                                    />
                                </Wrapper>
                            )}

                            {language && (
                                <Wrapper title="语言能力" type="edit" id="language">
                                    <Experience
                                        type={3}
                                        userExperience={store.language}
                                        saveExperience={store.saveExperience}
                                        recall={store.getSessionCode}
                                        getAIChat={store.getAIChat}
                                        ws={store.ws}
                                        remoteFunc={() => store.getExperience(3)}
                                    />
                                </Wrapper>
                            )}
                            {social && (
                                <Wrapper
                                    title="社交主页"
                                    isShow={
                                        Array.isArray(store.userSocial) &&
                                        store.userSocial.length < 3
                                    }
                                    id="social"
                                >
                                    <Social
                                        label={'社交主页'}
                                        userSoical={store.userSocial}
                                        saveSoical={store.saveWorks}
                                        deleteWorks={store.deleteWorks}
                                        type={3}
                                    />
                                </Wrapper>
                            )}
                            {skill && (
                                <Wrapper title="专业技能" type="edit" id="skill">
                                    <Experience
                                        type={5}
                                        userExperience={store.skill}
                                        saveExperience={store.saveExperience}
                                        recall={store.getSessionCode}
                                        getAIChat={store.getAIChat}
                                        ws={store.ws}
                                        remoteFunc={() => store.getExperience(5)}
                                    />
                                </Wrapper>
                            )}
                            {imgList && (
                                <Wrapper title="图片作品" type="edit" id="imgList">
                                    <ImgListWorks
                                        userImgList={store.userImgList}
                                        saveImgWorks={store.saveImgWorks}
                                        type={1}
                                    />
                                </Wrapper>
                            )}
                            {videoList && (
                                <Wrapper
                                    title="视频作品"
                                    isShow={
                                        Array.isArray(store.userVideoList) &&
                                        store.userVideoList.length < 3
                                    }
                                    id="videoList"
                                >
                                    <VideoWork
                                        videoList={store.userVideoList}
                                        saveWorks={store.saveWorks}
                                        deleteWorks={store.deleteWorks}
                                    />
                                </Wrapper>
                            )}
                            {selfDefine &&
                                store.userSelfDefine.map(item => (
                                    <Wrapper
                                        key={item.code}
                                        type="ed"
                                        deleteInstance={() => store.deleteCustomModule(item.code)}
                                        title={item.title}
                                        id="selfDefine"
                                    >
                                        <CustomModule
                                            label={item.title}
                                            userCustomModule={item}
                                            saveCustomModule={store.saveCustomModule}
                                        />
                                    </Wrapper>
                                ))}

                            {selfDefine && store.userSelfDefine.length < 3 && (
                                <Wrapper type="none" title="增加模块">
                                    <CustomModule
                                        type={'addMode'}
                                        saveCustomModule={store.saveCustomModule}
                                    />
                                </Wrapper>
                            )}
                        </div>
                    </div>

                    <div className={styles.content_right}>
                        <AIRate
                            resumeHasChanged={store.resumeHasChanged}
                            setResumeHasChanged={store.setResumeHasChanged}
                            onScroll={handleScroll}
                        />
                        <AttachmentResume
                            setMode={setMode}
                            deleteAttachmentFile={store.deleteAttachmentFile}
                            saveAttachmentFile={store.saveAttachmentFile}
                            userAttachmentList={store.userAttachmentList}
                            renameResume={store.renameResume}
                        />
                    </div>
                </div>
            </div>
        )
    }

    if (mode === 'makeResume') {
        return <MakeResume store={store} setMode={setMode} />
    }
}

export default observer(Index)
