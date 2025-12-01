import type { ProfessionListFrontDto } from '@/@types/profession'
import { Button, Popconfirm, Checkbox } from 'antd'
import styles from './index.module.less'

interface Iparams extends ProfessionListFrontDto {
    deleteFunc: (code: string) => void
    editFunc: (code: string) => void
    publishFunc: (code: string) => void
    closeFunc: (code: string) => void
    store: any
}

const statusCollect = ['待发布', '已发布', '下架']

const Index = ({
    professionName,
    _recruitType,
    cityName,
    _desc,
    code,
    status,
    salaryMin,
    salaryMax,
    experience,
    education,
    deleteFunc,
    editFunc,
    publishFunc,
    closeFunc,
    store,
}: Iparams) => {
    const edu = store.educationOption.find(item => item.code === education)
    const exp = store.experienceOption.find(item => item.code === experience)

    return (
        <div className={styles.container}>
            <div className={styles.profession_name}>
                <Checkbox value={code} />
                <div className={styles.profession_name_content}>
                    <div>{professionName}</div>
                    <div>
                        {cityName}|{`${salaryMin}-${salaryMax}`}|{edu.desc}|{exp.desc}
                    </div>
                </div>
            </div>
            <div>{statusCollect[status]}</div>
            <div>
                <Button onClick={() => editFunc(code as string)} type="link">
                    编辑
                </Button>
                {status !== 1 && (
                    <Button onClick={() => publishFunc(code as string)} type="link">
                        发布
                    </Button>
                )}
                {status === 1 && (
                    <Button onClick={() => closeFunc(code as string)} type="link">
                        关闭
                    </Button>
                )}
                <Popconfirm
                    placement="topRight"
                    title={`是否确认要删除${professionName}职位?`}
                    onConfirm={() => deleteFunc(code as string)}
                    okText="确认"
                    cancelText="取消"
                >
                    <span>删除</span>
                </Popconfirm>
            </div>
        </div>
    )
}

export default Index
