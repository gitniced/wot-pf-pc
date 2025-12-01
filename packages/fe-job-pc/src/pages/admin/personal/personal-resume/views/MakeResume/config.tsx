import Avatar from '../../components/Avatar'
import Wapper from '../../components/Wrapper'

import EducationExperience from '../../components/EducationExperience'
import InternExperience from '../../components/InternExperience'
import QualificationCertificate from '../../components/QualificationCertificate'
import Hobby from '../../components/Hobby'
import Societies from '../../components/AcademicSocieties'
import Experience from '../../components/Volunteer'
import AwardExperience from '../../components/AwardExperience'
import Social from '../../components/Soical'
import ImgListWorks from '../../components/ImgListWorks'
import WorkExperience from '../../components/WorkExperience'
import ProjectExperience from '../../components/ProjectExperience'
import CustomModule from '../../components/CustomModule'

const jobCollect = ({
    key,
    store,
    onCascaderChange,
    loadCityData,
    loadCapacityData,
    loadIndustryData,
}: {
    key: string
    store: any
    onCascaderChange: (param: any) => void
    loadCityData: (param: any) => void
    loadCapacityData: (param: any) => void
    loadIndustryData: (param: any) => void
}) => ({
    candidate: (
        <Avatar
            key={key}
            cityCascade={store.cityCascade}
            onCascaderChange={onCascaderChange}
            loadCityData={loadCityData}
            saveCandidateInfo={store.saveCandidateInfo}
            politicalOption={store.politicalOption}
            candidateInfo={store.candidateInfo}
            experienceOption={store.experienceOption}
        />
    ),
    educationList: (
        <Wapper
            key={key}
            title="教育经历"
            isShow={Array.isArray(store.userEducationList) && store.userEducationList.length < 3}
        >
            <EducationExperience
                getAIChat={store.getAIChat}
                ws={store.ws}
                remoteFunc={store.specialityList}
                saveEducation={store.saveEducation}
                userEducationList={store.userEducationList}
                degressOption={store.degressOption}
                requestFunc={store.searchSpeciality}
                searchSpeciality={store.searchSpeciality}
                deleteEducation={store.deleteEducation}
            />
        </Wapper>
    ),
    practiceExperienceList: (
        <Wapper
            key={key}
            title="实习经历"
            isShow={Array.isArray(store.userPracticeList) && store.userPracticeList.length < 3}
        >
            <InternExperience
                capacityTree={store.capacityTree}
                loadCapacityData={loadCapacityData}
                getAIChat={store.getAIChat}
                ws={store.ws}
                capacityList={store.capacityList}
                industryCascade={store.industryList}
                loadIndustryData={loadIndustryData}
                userPracticeList={store.userPracticeList}
                savePracticeExperience={store.savePracticeExperience}
                deletePracticeExperience={store.deletePracticeExperience}
            />
        </Wapper>
    ),
    certificateList: (
        <Wapper key={key} title="资格证书">
            <QualificationCertificate
                saveCertificate={store.saveCertificate}
                userCertificateList={store.userCertificateList}
            />
        </Wapper>
    ),
    hobbyList: (
        <Wapper key={key} title="兴趣爱好" type="edit">
            <Hobby userHobbyList={store.userHobbyList} saveHobby={store.saveHobby} />
        </Wapper>
    ),
    schoolExperienceList: (
        <Wapper
            key={key}
            title="社团和组织经历"
            isShow={
                Array.isArray(store.userSchoolExperienceList) &&
                store.userSchoolExperienceList.length < 3
            }
        >
            <Societies
                getAIChat={store.getAIChat}
                ws={store.ws}
                type={1}
                saveAcademicSocieties={store.saveAcademicSocieties}
                userSchoolExperienceList={store.userSchoolExperienceList}
                deleteAcademicSocieties={store.deleteAcademicSocieties}
            />
        </Wapper>
    ),

    scienceList: (
        <Wapper
            key={key}
            title="学术经历"
            isShow={Array.isArray(store.userScienceList) && store.userScienceList.length < 3}
        >
            <Societies
                type={2}
                saveAcademicSocieties={store.saveAcademicSocieties}
                userSchoolExperienceList={store.userScienceList}
                deleteAcademicSocieties={store.deleteAcademicSocieties}
            />
        </Wapper>
    ),

    awardsList: (
        <Wapper
            key={key}
            title="获奖经历"
            isShow={Array.isArray(store.userAwardList) && store.userAwardList.length < 3}
        >
            <AwardExperience
                userAwardList={store.userAwardList}
                saveAwardExperience={store.saveAwardExperience}
                deleteAwardExperience={store.deleteAwardExperience}
            />
        </Wapper>
    ),
    workExperienceList: (
        <Wapper
            key={key}
            title="工作经历"
            isShow={Array.isArray(store.capacityList) && store.capacityList.length < 3}
        >
            <WorkExperience
                capacityList={store.capacityList}
                capacityTree={store.capacityTree}
                loadCapacityData={loadCapacityData}
                getAIChat={store.getAIChat}
                ws={store.ws}
                industryCascade={store.industryList}
                loadIndustryData={loadIndustryData}
                userWorkExperienceList={store.userWorkExperienceList}
                saveWorkExperience={store.saveWorkExperience}
                deleteWorkExperience={store.deleteWorkExperience}
            />
        </Wapper>
    ),
    projectExperienceList: (
        <Wapper
            key={key}
            title="项目经历"
            isShow={
                Array.isArray(store.userProjectExperienceList) &&
                store.userProjectExperienceList.length < 3
            }
        >
            <ProjectExperience
                getAIChat={store.getAIChat}
                ws={store.ws}
                industryCascade={store.industryList}
                loadIndustryData={loadIndustryData}
                userProjectExperienceList={store.userProjectExperienceList}
                saveProjectExperience={store.saveProjectExperience}
                deleteProjectExperience={store.deleteProjectExperience}
            />
        </Wapper>
    ),

    volunteer: (
        <Wapper key={key} title="志愿者经历" type="edit">
            <Experience
                type={1}
                userExperience={store.userVolunteer}
                saveExperience={store.saveExperience}
            />
        </Wapper>
    ),
    advantage: (
        <Wapper key={key} title="个人优势" type="edit">
            <Experience
                type={2}
                userExperience={store.advantage}
                saveExperience={store.saveExperience}
            />
        </Wapper>
    ),
    language: (
        <Wapper key={key} title="语言能力" type="edit">
            <Experience
                type={3}
                userExperience={store.language}
                saveExperience={store.saveExperience}
            />
        </Wapper>
    ),
    social: (
        <Wapper
            key={key}
            title="社交主页"
            isShow={Array.isArray(store.userSocial) && store.userSocial.length < 3}
        >
            <Social
                label={'社交主页'}
                userSoical={store.userSocial}
                saveSoical={store.saveWorks}
                deleteWorks={store.deleteWorks}
                type={3}
            />
        </Wapper>
    ),
    skill: (
        <Wapper key={key} title="专业技能" type="edit">
            <Experience
                type={5}
                userExperience={store.skill}
                saveExperience={store.saveExperience}
            />
        </Wapper>
    ),
    imgList: (
        <Wapper key={key} title="图片作品" type="edit">
            <ImgListWorks
                userImgList={store.userImgList}
                saveImgWorks={store.saveImgWorks}
                // deleteWorks={store.deleteWorks}
                type={1}
            />
        </Wapper>
    ),
    videoList: (
        <Wapper
            key={key}
            title="视频作品"
            isShow={Array.isArray(store.userVideoList) && store.userVideoList.length < 3}
        >
            <Social
                label={'视频作品'}
                userSoical={store.userVideoList}
                saveSoical={store.saveWorks}
                deleteWorks={store.deleteWorks}
                type={2}
            />
        </Wapper>
    ),
    selfDefine: (
        <>
            {store.userSelfDefine.map(item => (
                <Wapper
                    key={item.code}
                    type="ed"
                    deleteInstance={() => store.deleteCustomModule(item.code)}
                    title={item.title}
                >
                    <CustomModule
                        label={item.title}
                        userCustomModule={item}
                        saveCustomModule={store.saveCustomModule}
                    />
                </Wapper>
            ))}

            {store.userSelfDefine.length < 3 && (
                <Wapper type="none" title="增加模块">
                    <CustomModule type={'addMode'} saveCustomModule={store.saveCustomModule} />
                </Wapper>
            )}
        </>
    ),
})

export default jobCollect
