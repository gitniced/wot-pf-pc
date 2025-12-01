import { Divider, Button, Space } from 'antd'
import {
    FormOutlined,
    MobileOutlined,
    MailOutlined,
    ManOutlined,
    WomanOutlined,
} from '@ant-design/icons'
import styles from './index.module.less'
import GeneralForm from '../GeneralForm'
import avatarConfig from './config'
import SimpleUpload from '@/components/SimpleUpload'
import { useEffect, useState } from 'react'

interface CandidateDto {
    /** 地址 */
    address: string
    /** 年龄 */
    age: number
    /** 头像 */
    avatar: string
    /** 二级版本id */
    bizCode?: string
    /** 城市 */
    city: string
    /** 城市名称 */
    cityName?: string
    /** 求职者编码 */
    code?: string
    /** 自我描述 */
    description: string
    /** 邮箱 */
    email: string
    /** 性别 1男  2女 */
    gender: number
    /** 入职时间 枚举 根据 join_time 获取 */
    joinTime: number
    /** 语言能力 */
    languageSkill: string
    /** 联系电话 */
    mobile: string
    /** 姓名 */
    name: string
    /** 求职者版本号key */
    openKey?: string
    /** 政治面貌 枚举 根据 political 获取 */
    political?: number
    /** 政治面貌名称 */
    politicalName?: string
    /** 省份 */
    province: string
    /** 省份名称 */
    provinceName?: string
    /** 更新时间 */
    updatedAt?: string
    /**  */
    userCode?: string
    /**  工作经验年限 枚举 根据 work_experience获取 */
    workExperience: number
    workExperienceName: string
}

const Index = ({
    id,
    candidateInfo,
    experienceOption,
    politicalOption,
    cityCascade,
    onCascaderChange,
    loadCityData,
    saveCandidateInfo,
    setResumeHasChanged,
}: {
    id: string
    candidateInfo: CandidateDto
    experienceOption: []
    politicalOption: []
    cityCascade: []
    onCascaderChange: (params: any) => void
    loadCityData: (params: any) => void
    saveCandidateInfo: (params: any) => void
    setResumeHasChanged: () => void
}) => {
    const [mode, setMode] = useState('view')

    const [avatar, setAvatar] = useState('')

    const [formData, setFormData] = useState({})

    const candidateInfoStr = JSON.stringify(candidateInfo)

    useEffect(() => {
        setFormData({ ...candidateInfo, city: [candidateInfo?.province, candidateInfo?.city] })
    }, [candidateInfoStr])

    const editFunc = () => {
        setMode('edit')
        setAvatar('')
    }

    const onFinish = (params: any) => {
        let extra = {}
        if (Array.isArray(params?.city)) {
            const [province, city] = params.city
            extra = { province, city }
        }
        saveCandidateInfo({
            ...candidateInfo,
            ...params,
            ...extra,
            ...(avatar
                ? { avatar }
                : {
                      avatar:
                          candidateInfo.avatar ||
                          'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-pc/img/avatar.png',
                  }),
        })
        setResumeHasChanged()
        setMode('view')
    }

    const onCancel = () => {
        setMode('view')
    }

    // 头像图片变换
    const onAvatarChange = (arr: any[]) => {
        if (arr[0]?.url) {
            setAvatar(arr[0].url)
        }
    }

    if (mode === 'view') {
        return (
            <div className={styles.container} id={id}>
                <div
                    style={{
                        background: `url(${
                            candidateInfo.avatar ||
                            'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-pc/img/avatar.png'
                        }) center center / cover no-repeat`,
                    }}
                    className={styles.avatar_img}
                />
                <div className={styles.avatar_content}>
                    <div>
                        <Space>
                            <span className={styles.candidate_name}>{candidateInfo.name}</span>
                            {candidateInfo?.gender === 1 && (
                                <ManOutlined
                                    style={{ fontSize: 20, fontWeight: 800, color: '#1678FF' }}
                                />
                            )}
                            {candidateInfo?.gender === 2 && (
                                <WomanOutlined
                                    style={{ fontSize: 20, fontWeight: 800, color: '#FF4D4F' }}
                                />
                            )}
                        </Space>
                    </div>
                    <div className={styles.candidate_basic}>
                        <span>
                            {candidateInfo.workExperienceName
                                ? candidateInfo.workExperienceName + '工作经验'
                                : ''}
                        </span>
                        {candidateInfo?.workExperienceName && candidateInfo?.age && (
                            <Divider type="vertical" />
                        )}
                        {candidateInfo?.age > 0 && <span>{candidateInfo.age}岁</span>}
                    </div>
                    <div className={styles.contact_information}>
                        <Space size={16}>
                            <Space size={3}>
                                <MobileOutlined /> <span>{candidateInfo.mobile}</span>
                            </Space>
                            <Space size={8}>
                                <MailOutlined />
                                <span>{candidateInfo.email}</span>
                            </Space>
                        </Space>
                    </div>
                </div>
                <div className={styles.avatar_edit}>
                    <Button onClick={editFunc} icon={<FormOutlined />} type="link">
                        编辑
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container} id={id}>
            <h4>编辑个人信息</h4>
            {/* @ts-ignore */}
            <GeneralForm
                structure={avatarConfig({
                    experienceOption,
                    politicalOption,
                    cityCascade,
                    onCascaderChange,
                    loadCityData,
                })}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            >
                {/* @ts-ignore */}
                <SimpleUpload fileType={['jpg', 'png', 'jpeg']} onChange={onAvatarChange}>
                    <div
                        style={{
                            background: `url(${
                                avatar ||
                                candidateInfo.avatar ||
                                'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-pc/img/avatar.png'
                            }) center center / cover no-repeat`,
                        }}
                        className={styles.avatar_edit_img}
                    >
                        <div className={styles.edit_img}>更换头像</div>
                    </div>
                </SimpleUpload>
            </GeneralForm>
        </div>
    )
}

export default Index
